'use client'

import { useState } from 'react'
import AdvancedLoader from '../../components/landing/AdvancedLoader'
import LandingNavbar from '../../components/landing/LandingNavbar'
import HeroSection from '../../components/landing/HeroSection'
import TrustLogos from '../../components/landing/TrustLogos'
import LossAversionSection from '../../components/landing/LossAversionSection'
import BenefitsSection from '../../components/landing/BenefitsSection'
import ProcessSection from '../../components/landing/ProcessSection'
import FeaturesSection from '../../components/landing/FeaturesSection'
import PricingSection from '../../components/landing/PricingSection'
import TestimonialsSection from '../../components/landing/TestimonialsSection'
import FAQSection from '../../components/landing/FAQSection'
import CTASection from '../../components/landing/CTASection'
import Footer from '../../components/landing/Footer'

// Import the existing dashboard components
import UrlForm from '../../components/UrlForm'
import ProgressBar from '../../components/ProgressBar'
import ResultCard from '../../components/ResultCard'
import TerminalSidebar from '../../components/TerminalSidebar'

interface ApiEndpoint {
  method: string
  url: string
  status: number
  size: number
}

interface CrawlResult {
  endpoints: ApiEndpoint[]
  postmanCollection: any
  crawlId: string
}

export default function LandingPage() {
  const [showLoader, setShowLoader] = useState(true)
  const [showDashboard, setShowDashboard] = useState(false)
  
  // Dashboard state
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState<CrawlResult | null>(null)
  const [logs, setLogs] = useState<string[]>([])
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLoaderComplete = () => {
    setShowLoader(false)
  }

  const handleCrawl = async (url: string) => {
    setIsLoading(true)
    setProgress(0)
    setResult(null)
    setLogs([])
    setError(null)
    setSidebarOpen(true)

    let reader: ReadableStreamDefaultReader<Uint8Array> | null = null

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => {
        controller.abort()
      }, 30000) // 30 second client-side timeout

      const response = await fetch('/api/crawl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`HTTP ${response.status}: ${errorText}`)
      }

      reader = response.body?.getReader()
      if (!reader) throw new Error('No response body')

      const decoder = new TextDecoder()
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() || ''

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6))

              if (data.type === 'progress') {
                setProgress(data.progress)
              } else if (data.type === 'log') {
                setLogs(prev => [...prev, data.message])
              } else if (data.type === 'complete') {
                setResult(data.result)
                setProgress(100)
                setIsLoading(false)
              } else if (data.type === 'error') {
                setError(data.message)
                setLogs(prev => [...prev, `❌ ${data.message}`])
                setIsLoading(false)
              }
            } catch (e) {
              console.warn('Failed to parse SSE data:', line)
            }
          }
        }
      }
    } catch (error) {
      console.error('Crawl failed:', error)
      
      let errorMessage = 'Unknown error occurred'
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          errorMessage = 'Request timed out. The crawl took too long to complete.'
        } else if (error.message.includes('fetch')) {
          errorMessage = 'Connection lost. The server may be overloaded or the crawl timed out.'
        } else {
          errorMessage = error.message
        }
      }
      
      setError(errorMessage)
      setLogs(prev => [...prev, `❌ Error: ${errorMessage}`])
      setIsLoading(false)
    } finally {
      // Clean up reader
      if (reader) {
        try {
          await reader.cancel()
        } catch (e) {
          console.warn('Failed to cancel reader:', e)
        }
      }
    }
  }

  if (showLoader) {
    return <AdvancedLoader onComplete={handleLoaderComplete} />
  }

  if (showDashboard) {
    return (
      <div className="min-h-screen bg-black">
        <LandingNavbar />

        <main className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-4 xs:py-6 sm:py-8 lg:py-12 max-w-xs xs:max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-4xl 2xl:max-w-5xl" style={{ paddingTop: '3rem xs:3.5rem sm:4rem lg:5rem xl:6rem' }}>
          <div className="text-center mb-6 xs:mb-8 sm:mb-12 lg:mb-16">
            <div className="flex items-center justify-center mb-3 xs:mb-4 sm:mb-6">
              <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold text-white tracking-tight">
                Deep<span style={{ color: '#F0FF26' }}>Crawler</span>
              </h1>
            </div>
            <p className="text-sm xs:text-base sm:text-lg lg:text-xl xl:text-2xl text-gray-500 tracking-tight px-2 xs:px-4">
              Unlock Hidden APIs in Seconds with{' '}
              <span className="items-center">
                <img src="/Yellow BG.png" alt="Hyperbrowser" className="inline h-3 xs:h-4 sm:h-5 lg:h-6 xl:h-7 w-auto rounded-full" />
              </span>
            </p>
          </div>

          <div
            className="relative rounded-xl xs:rounded-2xl lg:rounded-3xl p-3 xs:p-4 sm:p-6 lg:p-8 xl:p-10 2xl:p-12 overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(240, 255, 38, 0.1) 0%, rgba(0, 0, 0, 0.8) 50%, rgba(240, 255, 38, 0.05) 100%)',
              border: '1px solid rgba(240, 255, 38, 0.2)'
            }}
          >
            <ProgressBar progress={progress} isLoading={isLoading} />

            <UrlForm onSubmit={handleCrawl} isLoading={isLoading} />

            {error && (
              <div className="mt-4 xs:mt-6 sm:mt-8 p-3 xs:p-4 rounded-lg xs:rounded-xl bg-red-900/20 border border-red-500/30">
                <div className="flex items-center space-x-2">
                  <span className="text-red-400">⚠️</span>
                  <p className="text-red-300 text-xs xs:text-sm lg:text-base">{error}</p>
                </div>
                <p className="text-red-400/70 text-xs lg:text-sm mt-2">
                  This may be due to server timeout or resource limits. Try again with a simpler website.
                </p>
              </div>
            )}

            {result && (
              <div className="mt-4 xs:mt-6 sm:mt-8 animate-in fade-in duration-500">
                <ResultCard
                  endpointCount={result.endpoints.length}
                  crawlId={result.crawlId}
                  postmanCollection={result.postmanCollection}
                />
              </div>
            )}
          </div>

          {result && (
            <div className="mt-4 xs:mt-6 sm:mt-8 text-center px-2 xs:px-4">
              <p className="text-xs xs:text-xs sm:text-sm lg:text-base xl:text-lg text-gray-500 font-medium tracking-tight">
                Powered by{' '}
                <a
                  href="https://hyperbrowser.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white font-medium transition-colors"
                >
                  Hyperbrowser
                </a>
                {' • '}
                <a
                  href="https://docs.hyperbrowser.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Get your API key
                </a>
              </p>
            </div>
          )}
        </main>

        <TerminalSidebar
          logs={logs}
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <LandingNavbar />
      <HeroSection />
      <TrustLogos />
      <LossAversionSection />
      <BenefitsSection />
      <ProcessSection />
      <FeaturesSection />
      <PricingSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
      
      {/* Dashboard Section */}
      <section id="dashboard" className="py-12 xs:py-16 sm:py-20 lg:py-24 xl:py-32 2xl:py-40 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 3xl:px-20">
          <div className="text-center mb-6 xs:mb-8 sm:mb-12 lg:mb-16 xl:mb-20">
            <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl 3xl:text-8xl font-bold text-white mb-3 xs:mb-4 sm:mb-6 lg:mb-8">
              Try Ziro Now
            </h2>
            <p className="text-base xs:text-lg sm:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl text-gray-400 max-w-lg xs:max-w-2xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl 3xl:max-w-7xl mx-auto mb-4 xs:mb-6 sm:mb-8 lg:mb-12 px-2 xs:px-4">
              Experience the power of AI-driven API discovery. Enter any URL and watch Ziro uncover hidden endpoints in real-time.
            </p>
            <button
              onClick={() => setShowDashboard(true)}
              className="px-4 xs:px-6 sm:px-8 lg:px-10 xl:px-12 2xl:px-16 py-2.5 xs:py-3 sm:py-4 lg:py-5 xl:py-6 2xl:py-8 rounded-lg xs:rounded-xl sm:rounded-xl lg:rounded-2xl font-bold text-black transition-all duration-300 hover:scale-105 text-sm xs:text-sm sm:text-base lg:text-lg xl:text-xl 2xl:text-2xl"
              style={{
                background: 'linear-gradient(135deg, #F0FF26 0%, #E0EF16 100%)',
                boxShadow: '0 10px 40px rgba(240, 255, 38, 0.3)'
              }}
            >
              Launch Dashboard
            </button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  )
}