import { NextRequest } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import { Hyperbrowser } from '@hyperbrowser/sdk'
import { dedupeEndpoints, generatePostmanCollection } from '../../../lib/utils'

// Rate limiting map - in production, use Redis or database
const rateLimitMap = new Map<string, number>()
const RATE_LIMIT_WINDOW = 60 * 60 * 1000 // 1 hour
const MAX_REQUESTS = 1

// Timeout constants for serverless environments
const MAX_EXECUTION_TIME = 25000 // 25 seconds (well under typical 30s serverless limit)
const PAGE_LOAD_TIMEOUT = 15000 // 15 seconds for page load
const INTERACTION_TIMEOUT = 8000 // 8 seconds for user interactions

interface ApiEndpoint {
  method: string
  url: string
  status: number
  size: number
}

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

    // Initialize Hyperbrowser
    if (!process.env.HYPERBROWSER_API_KEY) {
      throw new Error('HYPERBROWSER_API_KEY is not configured')
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
        const checkTimeout = () => {
          const elapsed = Date.now() - startTime
          if (elapsed > MAX_EXECUTION_TIME) {
            throw new Error('Operation timeout - execution time limit reached')
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

          checkTimeout()

          // Create browser session with timeout
          console.log('Creating browser session...')
          session = await Promise.race([
            hb.sessions.create({
              useStealth: true,
              useProxy: true
            }),
            new Promise((_, reject) => 
              setTimeout(() => reject(new Error('Browser session creation timeout')), 10000)
            )
          ])

          sendSSE({ type: 'log', message: 'Browser session created' })
          sendSSE({ type: 'progress', progress: 15 })

          checkTimeout()

          // Connect with Puppeteer with timeout
          console.log('Connecting to browser...')
          const { connect } = await import('puppeteer-core')
          browser = await Promise.race([
            connect({
              browserWSEndpoint: session.wsEndpoint,
              defaultViewport: null,
            }),
            new Promise((_, reject) => 
              setTimeout(() => reject(new Error('Browser connection timeout')), 8000)
            )
          ])

          const [page] = await browser.pages()
          let requestCount = 0

          sendSSE({ type: 'log', message: 'Connected to browser' })
          sendSSE({ type: 'progress', progress: 20 })

          checkTimeout()

          // Set up request monitoring with error handling
          page.on('requestfinished', (request: any) => {
            try {
              const response = request.response()
              if (response) {
                const method = request.method()
                const reqUrl = request.url()
                const status = response.status()
                const headers = response.headers()
                const size = parseInt(headers['content-length'] || '0', 10)
                const contentType = headers['content-type'] || ''

                // Skip static assets and analytics
                const skipPatterns = [
                  /\.(css|js|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$/i,
                  /google-analytics|googletagmanager|facebook|twitter|linkedin/i,
                  /posthog|mixpanel|segment|amplitude|hotjar/i,
                  /cdn\.|assets\.|static\./i
                ]

                const isStaticAsset = skipPatterns.some(pattern => pattern.test(reqUrl))
                
                // Enhanced API detection patterns
                const isApiEndpoint = !isStaticAsset && (
                  reqUrl.includes('/api/') ||
                  reqUrl.includes('/v1/') || reqUrl.includes('/v2/') || reqUrl.includes('/v3/') ||
                  reqUrl.match(/\/(api|rest|graphql|gql)\//i) ||
                  reqUrl.includes('.json') ||
                  contentType.includes('application/json') ||
                  contentType.includes('application/api') ||
                  contentType.includes('text/plain') && (method === 'POST' || method === 'PUT') ||
                  (method !== 'GET' && !isStaticAsset) ||
                  reqUrl.match(/\/(auth|login|logout|user|users|data|config|settings)/i) ||
                  reqUrl.match(/\/(submit|upload|download|search|query)/i) ||
                  reqUrl.match(/\/(repos|repositories|gists|notifications|issues|pulls)/i) ||
                  reqUrl.match(/\/(orgs|organizations|teams|projects|actions)/i) ||
                  reqUrl.match(/\/(graphql|rest|api|_private|internal)/i) ||
                  [200, 201, 202, 400, 401, 403, 404, 422, 500, 502, 503].includes(status) && 
                  !reqUrl.includes('favicon') && 
                  !reqUrl.includes('robots.txt')
                )

                if (isApiEndpoint) {
                  endpoints.push({ method, url: reqUrl, status, size })
                  
                  const logMessage = `${method} ${reqUrl} → ${status} (${contentType})`
                  sendSSE({ type: 'log', message: logMessage })
                  
                  requestCount++
                  progress = Math.min(10 + (requestCount * 2), maxProgress)
                  sendSSE({ type: 'progress', progress })
                }
              }
            } catch (err) {
              console.warn('Error processing request:', err)
            }
          })

          sendSSE({ type: 'log', message: `Navigating to ${url}` })
          
          checkTimeout()

          // Navigate to the URL with strict timeout
          console.log('Navigating to page...')
          try {
            await Promise.race([
              page.goto(url, { 
                waitUntil: 'domcontentloaded',
                timeout: PAGE_LOAD_TIMEOUT
              }),
              new Promise((_, reject) => 
                setTimeout(() => reject(new Error('Page navigation timeout')), PAGE_LOAD_TIMEOUT)
              )
            ])
            
            // Brief wait for additional requests
            await Promise.race([
              page.waitForTimeout(2000),
              new Promise((_, reject) => 
                setTimeout(() => reject(new Error('Additional wait timeout')), 3000)
              )
            ])
          } catch (error: unknown) {
            console.log('Page load error:', (error as Error).message)
            sendSSE({ type: 'log', message: `Page load issue: ${(error as Error).message}, continuing with analysis` })
          }

          sendSSE({ type: 'log', message: 'Page loaded, analyzing network traffic' })
          sendSSE({ type: 'progress', progress: 50 })

          checkTimeout()

          // Trigger user interactions with strict timeout
          sendSSE({ type: 'log', message: 'Simulating user interactions to discover APIs' })
          
          try {
            console.log('Starting user interactions...')
            await Promise.race([
              (async () => {
                // Quick scroll to trigger lazy loading
                await page.evaluate(() => {
                  return new Promise((resolve) => {
                    let totalHeight = 0
                    const distance = 200 // Larger steps for faster scrolling
                    const timer = setInterval(() => {
                      window.scrollBy(0, distance)
                      totalHeight += distance
                      
                      if(totalHeight >= Math.min(document.body.scrollHeight, 2000)) { // Limit scroll depth
                        clearInterval(timer)
                        resolve(null)
                      }
                    }, 50) // Faster scrolling
                  })
                })
                
                // Quick click on common interactive elements
                const clickableSelectors = [
                  'button', '.btn', '[role="button"]',
                  '.nav-link', '.menu-item', 
                  '.js-site-search-form', '.header-search-button'
                ]
                
                for (const selector of clickableSelectors.slice(0, 3)) { // Limit selectors
                  try {
                    const elements = await page.$$(selector)
                    if (elements.length > 0) {
                      await elements[0].click({ delay: 50 })
                      await page.waitForTimeout(300) // Shorter wait
                    }
                  } catch (err) {
                    // Continue if clicking fails
                  }
                  
                  checkTimeout() // Check timeout during interactions
                }
                
                // Quick form interaction
                try {
                  const searchInput = await page.$('input[type="search"], input[name*="search"]')
                  if (searchInput) {
                    await searchInput.type('test', { delay: 50 })
                    await page.waitForTimeout(500)
                  }
                } catch (err) {
                  // Continue if search fails
                }
              })(),
              new Promise((_, reject) => 
                setTimeout(() => reject(new Error('User interaction timeout')), INTERACTION_TIMEOUT)
              )
            ])
          } catch (error: unknown) {
            console.log('User interaction error:', (error as Error).message)
            sendSSE({ type: 'log', message: `User interaction completed: ${(error as Error).message}` })
          }
          
          sendSSE({ type: 'progress', progress: 70 })
          
          checkTimeout()
          
          // Brief final wait for API calls
          await Promise.race([
            new Promise(resolve => setTimeout(resolve, 1500)),
            new Promise((_, reject) => 
              setTimeout(() => reject(new Error('Final wait timeout')), 2000)
            )
          ]).catch(() => {
            // Continue if final wait times out
          })
          
          sendSSE({ type: 'log', message: 'Processing discovered endpoints' })
          sendSSE({ type: 'progress', progress: 80 })

          // Clean up resources
          console.log('Cleaning up resources...')
          if (browser) {
            await browser.close().catch((err: any) => console.warn('Browser close error:', err))
          }
          if (session && hb) {
            await hb.sessions.stop(session.id).catch((err: any) => console.warn('Session stop error:', err))
          }
          
          // Process results
          const uniqueEndpoints = dedupeEndpoints(endpoints)
          const postmanCollection = generatePostmanCollection(url, uniqueEndpoints)
          
          sendSSE({ type: 'progress', progress: 95 })
          sendSSE({ type: 'log', message: `Crawl complete! Found ${uniqueEndpoints.length} unique endpoints` })

          // Send final result
          sendSSE({
            type: 'complete',
            result: {
              crawlId,
              endpoints: uniqueEndpoints,
              postmanCollection
            }
          })

          sendSSE({ type: 'progress', progress: 100 })
          
        } catch (error) {
          console.error('Crawl error:', error)
          sendSSE({ 
            type: 'error',
            message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` 
          })
          
          // Ensure cleanup on error
          try {
            if (browser) {
              await browser.close().catch((err: any) => console.warn('Error cleanup - browser close:', err))
            }
            if (session && hb) {
              await hb.sessions.stop(session.id).catch((err: any) => console.warn('Error cleanup - session stop:', err))
            }
          } catch (cleanupError) {
            console.warn('Cleanup error:', cleanupError)
          }
        } finally {
          try {
            controller.close()
          } catch (closeError) {
            console.warn('Controller close error:', closeError)
          }
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
    
    // Ensure cleanup on outer error
    try {
      if (browser) {
        await browser.close().catch((err: any) => console.warn('Outer error cleanup - browser close:', err))
      }
      if (session && hb) {
        await hb.sessions.stop(session.id).catch((err: any) => console.warn('Outer error cleanup - session stop:', err))
      }
    } catch (cleanupError) {
      console.warn('Outer cleanup error:', cleanupError)
    }
    
    return new Response(
      error instanceof Error ? error.message : 'Internal server error',
      { status: 500 }
    )
  }
}