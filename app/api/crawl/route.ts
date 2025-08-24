import { NextRequest } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import OpenAI from 'openai'
import { Hyperbrowser } from '@hyperbrowser/sdk'
import { dedupeEndpoints, generatePostmanCollection } from '../../../lib/utils'

// Rate limiting map - in production, use Redis or database
const rateLimitMap = new Map<string, number>()
const RATE_LIMIT_WINDOW = 60 * 60 * 1000 // 1 hour
const MAX_REQUESTS = 1

// Timeout constants for serverless environments
const MAX_EXECUTION_TIME = 45000 // 45 seconds, extended for AI processing
const PAGE_LOAD_TIMEOUT = 15000 // 15 seconds for page load
const INTERACTION_TIMEOUT = 20000 // 20 seconds for AI-driven interactions

interface ApiEndpoint {
  method: string
  url: string
  status: number
  size: number
  contentType?: string
}

type PlannedAction =
  | { action: 'click'; selector: string; reason: string }
  | { action: 'type'; selector: string; text: string; reason: string; submitWithEnter?: boolean }
  | { action: 'scroll'; direction: 'down' | 'up'; steps?: number; reason: string }

export async function POST(request: NextRequest) {
  const startTime = Date.now()
  let browser: any = null
  let session: any = null
  let hb: any = null

  try {
    const { url } = await request.json()
    
    if (!url || typeof url !== 'string') {
      return new Response('URL is required', { status: 400 })
    }

    // Basic URL validation
    try {
      new URL(url)
    } catch {
      return new Response('Invalid URL format', { status: 400 })
    }

    // Rate limiting by IP
    const clientIP = request.headers.get('x-forwarded-for') || 
                    request.headers.get('x-real-ip') || 
                    'unknown'
                    
    const now = Date.now()
    const lastRequest = rateLimitMap.get(clientIP)
    
    if (lastRequest && (now - lastRequest) < RATE_LIMIT_WINDOW) {
      return new Response('Rate limit exceeded. Please try again in an hour.', { 
        status: 429,
        headers: {
          'Retry-After': Math.ceil((RATE_LIMIT_WINDOW - (now - lastRequest)) / 1000).toString()
        }
      })
    }
    
    rateLimitMap.set(clientIP, now)

    // Initialize Hyperbrowser & OpenAI
    if (!process.env.HYPERBROWSER_API_KEY || !process.env.OPENAI_API_KEY) {
      throw new Error('HYPERBROWSER_API_KEY and OPENAI_API_KEY must be configured')
    }

    hb = new Hyperbrowser({
      apiKey: process.env.HYPERBROWSER_API_KEY,
    })

    // Create readable stream for SSE
    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      async start(controller) {
        const sendSSE = (data: any) => {
          try {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`))
          } catch (error) {
            console.warn('Failed to send SSE data:', error)
          }
        }

        // Helper function to check if we're running out of time
        const checkTimeout = (label: string) => {
          const elapsed = Date.now() - startTime
          if (elapsed > MAX_EXECUTION_TIME) {
            throw new Error(`Operation timeout at '${label}' - execution time limit reached`)
          }
          return elapsed
        }

        try {
          const crawlId = uuidv4()
          const endpoints: ApiEndpoint[] = []
          let progress = 0
          const maxProgress = 90 // Reserve 10% for final processing

          sendSSE({ type: 'log', message: `Starting crawl for ${url}` })
          sendSSE({ type: 'progress', progress: 5 })

          checkTimeout('session-start')

          // Create browser session with timeout
          console.log('Creating browser session...')
          session = await Promise.race([
            hb.sessions.create({ useStealth: true, useProxy: true }),
            new Promise((_, reject) => setTimeout(() => reject(new Error('Browser session creation timeout')), 10000))
          ])

          sendSSE({ type: 'log', message: 'Browser session created' })
          sendSSE({ type: 'progress', progress: 10 })

          checkTimeout('puppeteer-connect')

          // Connect with Puppeteer
          const { connect } = await import('puppeteer-core')
          browser = await Promise.race([
            connect({ browserWSEndpoint: session.wsEndpoint, defaultViewport: null }),
            new Promise((_, reject) => setTimeout(() => reject(new Error('Browser connection timeout')), 8000))
          ])

          const [page] = await browser.pages()
          let requestCount = 0

          sendSSE({ type: 'log', message: 'Connected to browser' })
          sendSSE({ type: 'progress', progress: 15 })

          checkTimeout('request-monitoring-setup')

          // Network instrumentation
          page.on('requestfinished', async (req: any) => {
            try {
              const res = req.response()
              if (!res) return
              const status = res.status()
              const headers = res.headers()
              const method = req.method()
              const reqUrl = req.url()
              const contentType = headers['content-type'] || ''
              const size = parseInt(headers['content-length'] || '0', 10)

              const skipPatterns = [
                /\.(css|js|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$/i,
                /google-analytics|googletagmanager|facebook|twitter|linkedin/i,
                /posthog|mixpanel|segment|amplitude|hotjar/i,
                /cdn\.|assets\.|static\./i,
              ]
              const isStaticAsset = skipPatterns.some((p) => p.test(reqUrl))

              const isApiEndpoint = !isStaticAsset && (
                reqUrl.includes('/api/') || reqUrl.includes('/v1/') || reqUrl.includes('/v2/') || reqUrl.includes('/v3/') ||
                /\/(api|rest|graphql|gql)\//i.test(reqUrl) || reqUrl.includes('.json') ||
                contentType.includes('application/json') || contentType.includes('application/api') ||
                (contentType.includes('text/plain') && (method === 'POST' || method === 'PUT')) ||
                method !== 'GET' ||
                /\/(auth|login|logout|user|users|data|config|settings)/i.test(reqUrl) ||
                /\/(submit|upload|download|search|query)/i.test(reqUrl)
              )

              if (isApiEndpoint) {
                endpoints.push({ method, url: reqUrl, status, size, contentType })
                const logMessage = `${method} ${reqUrl} → ${status} (${contentType})`
                sendSSE({ type: 'log', message: logMessage })
                requestCount++
                progress = Math.min(15 + requestCount * 2, maxProgress)
                sendSSE({ type: 'progress', progress })
              }
            } catch (err) { /* swallow */ }
          })

          sendSSE({ type: 'log', message: `Navigating to ${url}` })
          await page.goto(url, { waitUntil: 'domcontentloaded', timeout: PAGE_LOAD_TIMEOUT })
          await page.waitForTimeout(3000) // Settle

          sendSSE({ type: 'log', message: 'Page loaded, analyzing DOM for interactions' })
          sendSSE({ type: 'progress', progress: 30 })

          checkTimeout('dom-analysis')

          // Snapshot of likely-clickable elements
          const clickables = await page.evaluate(() => {
            function cssPath(el: Element): string {
              if (!(el instanceof Element)) return ''
              if (el.id) return `#${el.id}`
              let path: string[] = []
              while (el && el.nodeType === Node.ELEMENT_NODE) {
                let selector = el.nodeName.toLowerCase()
                if (el.className) {
                  const classes = (el.className as string).split(/\s+/).filter(Boolean).slice(0, 2).join('.')
                  if (classes) selector += `.${classes}`
                }
                const parent = el.parentNode as Element
                if (parent) {
                  const siblings = Array.from(parent.children).filter(s => s.nodeName === el.nodeName)
                  if (siblings.length > 1) {
                    selector += `:nth-of-type(${siblings.indexOf(el) + 1})`
                  }
                }
                path.unshift(selector)
                el = parent
              }
              return path.join(' > ')
            }
            const nodes = Array.from(document.querySelectorAll('a,button,[role="button"],[onclick],input[type="submit"],.btn')).slice(0, 150)
            return nodes.map(el => ({
              tag: el.tagName.toLowerCase(),
              text: (el as HTMLElement).innerText?.trim().slice(0, 100) || el.getAttribute('aria-label') || '',
              selector: cssPath(el),
            }))
          })

          sendSSE({ type: 'log', message: `Asking AI to plan high-signal interactions...` })
          sendSSE({ type: 'progress', progress: 40 })

          checkTimeout('ai-planning')

          // Ask AI for an interaction plan
          let planned: PlannedAction[] = []
          try {
            const openai = new OpenAI({
              apiKey: process.env.OPENAI_API_KEY,
            })
            const planPrompt = `You are a web exploration agent. Your goal is to trigger API requests. Analyze the following clickable elements from ${url} and create a JSON array of up to 10 high-value actions. Actions can be 'click', 'type', or 'scroll'. Prioritize actions that reveal data, like search, filtering, or viewing content. Avoid generic navigation like "Terms of Service". Respond with only a valid JSON array of actions. Elements: ${JSON.stringify(clickables, null, 2)}`
            
            const planResp = await openai.chat.completions.create({
              model: 'gpt-4o',
              messages: [{ role: 'user', content: planPrompt }],
              temperature: 0.1,
              response_format: { type: 'json_object' },
            });

            const raw = planResp.choices[0].message.content || '[]'
            const result = JSON.parse(raw)
            planned = (result.actions || result).slice(0, 10) // Handle nested "actions" key
          } catch (err: any) {
            console.error('AI planning failed:', err.message)
            sendSSE({ type: 'log', message: 'AI planning failed, falling back to simple interactions.' })
            // Fallback plan
            planned = [
              { action: 'scroll', direction: 'down', steps: 5, reason: 'Fallback scroll' },
            ]
          }

          sendSSE({ type: 'log', message: `AI planned ${planned.length} interactions. Executing now.` })
          sendSSE({ type: 'progress', progress: 50 })

          // Execute AI-driven plan
          for (const step of planned) {
            checkTimeout(`interaction-${step.action}`)
            try {
              if (!page) break

              const target = 'selector' in step ? `"${step.selector}"` : 'page'
              sendSSE({ type: 'log', message: `Executing: ${step.action} on ${target} (Reason: ${step.reason})` })

              if (step.action === 'scroll') {
                for (let i = 0; i < (step.steps || 5); i++) {
                  await page.evaluate((dir: 'down' | 'up') => window.scrollBy(0, dir === 'down' ? 400 : -400), step.direction)
                  await page.waitForTimeout(300)
                }
              } else if (step.action === 'click' && step.selector) {
                const el = await page.$(step.selector)
                if (el) await el.click({ delay: 80 })
              } else if (step.action === 'type' && step.selector) {
                const el = await page.$(step.selector)
                if (el) {
                  await el.type(step.text, { delay: 50 })
                  if (step.submitWithEnter) await el.press('Enter')
                }
              }
              await page.waitForTimeout(1000) // Wait for network requests
            } catch (err: any) {
              sendSSE({ type: 'log', message: `Interaction failed: ${err.message}` })
            }
          }
          
          sendSSE({ type: 'progress', progress: 75 })
          await new Promise(r => setTimeout(r, 3000)) // Final network settle

          checkTimeout('cleanup')
          if (browser) await browser.close().catch((e: any) => console.warn('Browser close error', e.message))
          if (session && hb) await hb.sessions.stop(session.id).catch((e: any) => console.warn('Session stop error', e.message))
          
          sendSSE({ type: 'log', message: 'Processing discovered endpoints' })
          sendSSE({ type: 'progress', progress: 85 })

          const uniqueEndpoints = dedupeEndpoints(endpoints)
          const postmanCollection = generatePostmanCollection(url, uniqueEndpoints)
          
          sendSSE({ type: 'progress', progress: 95 })
          sendSSE({ type: 'log', message: `Crawl complete! Found ${uniqueEndpoints.length} unique endpoints (model: gpt-4o)` })

          // Send final result
          sendSSE({
            type: 'complete',
            result: {
              crawlId,
              model: 'gpt-4o',
              endpoints: uniqueEndpoints,
              postmanCollection
            }
          })

          sendSSE({ type: 'progress', progress: 100 })
          
        } catch (error) {
          console.error('Crawl error:', error)
          sendSSE({ type: 'error', message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` })
          
          try {
            if (browser) await browser.close().catch((e:any) => {})
            if (session && hb) await hb.sessions.stop(session.id).catch((e:any) => {})
          } catch {}
        } finally {
          try {
            controller.close()
          } catch {}
        }
      }
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    })

  } catch (error) {
    console.error('API error:', error)
    
    try {
      if (browser) await browser.close().catch((e:any) => {})
      if (session && hb) await hb.sessions.stop(session.id).catch((e:any) => {})
    } catch {}
    
    return new Response(
      error instanceof Error ? error.message : 'Internal server error',
      { status: 500 }
    )
  }
}