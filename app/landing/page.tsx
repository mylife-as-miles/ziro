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

      reader = response.body?.getReader() || null
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
                  href="https://zir0.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white font-medium transition-colors"
                >
                  Hyperbrowser
                </a>
                {' • '}
                <a
                  href="https://docs.zir0.ai"
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
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated background particles */}
      <div className="fixed inset-0 z-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10">
        <LandingNavbar />
        <HeroSection />
        
        {/* Enhanced sections with modern styling */}
        <div className="relative">
          {/* Gradient divider */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent" />
          
          <TrustLogos />
          
          {/* Modern section separator */}
          <div className="flex justify-center py-8">
            <div className="w-12 h-px bg-gradient-to-r from-yellow-400/50 to-yellow-600/50" />
          </div>
          
          <LossAversionSection />
          <BenefitsSection />
          
          {/* Floating section divider */}
          <div className="relative py-16">
            <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900/50 to-black" />
            <div className="relative z-10 flex justify-center">
              <div className="w-32 h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
            </div>
          </div>
          
          <ProcessSection />
          <FeaturesSection />
          
          {/* Enhanced pricing section backdrop */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/30 to-black" />
            <div className="relative z-10">
              <PricingSection />
            </div>
          </div>
          
          <TestimonialsSection />
          <FAQSection />
          <CTASection />
        </div>
        
        {/* Enhanced Dashboard Section */}
        <section id="dashboard" className="relative py-20 lg:py-32 bg-gradient-to-b from-black via-gray-900/50 to-black overflow-hidden">
          {/* Advanced background effects */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(240,255,38,0.1)_0%,transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(240,255,38,0.15),transparent)]" />
          </div>
          
          {/* Animated grid overlay */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(rgba(240, 255, 38, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(240, 255, 38, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
              animation: 'gridFloat 20s ease-in-out infinite'
            }}
          />
          
          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              {/* Enhanced heading with gradient and glow */}
              <div className="inline-block relative mb-6">
                <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-white via-yellow-100 to-white bg-clip-text text-transparent leading-tight">
                  Experience Ziro
                </h2>
                <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400/20 to-transparent blur-lg rounded-lg -z-10" />
              </div>
              
              {/* Enhanced subtitle */}
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed">
                See the future of API discovery in action. Watch as Ziro's AI uncaps hidden endpoints 
                and generates comprehensive documentation in real-time.
              </p>
              
              {/* Enhanced CTA button with advanced effects */}
              <div className="relative inline-block group">
                <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse" />
                <button
                  onClick={() => setShowDashboard(true)}
                  className="relative px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold rounded-xl leading-none flex items-center space-x-3 transition-all duration-300 hover:scale-105 text-lg group"
                >
                  <span>Launch Interactive Demo</span>
                  <div className="w-2 h-2 bg-black rounded-full animate-ping" />
                  <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              
              {/* Real-time stats display */}
              <div className="mt-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
                <div className="text-center p-4 rounded-xl bg-black/20 border border-yellow-400/20 backdrop-blur-sm">
                  <div className="text-2xl font-bold text-yellow-400 mb-1">Live</div>
                  <div className="text-sm text-gray-400">Ready to Scan</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-black/20 border border-yellow-400/20 backdrop-blur-sm">
                  <div className="text-2xl font-bold text-yellow-400 mb-1">~15s</div>
                  <div className="text-sm text-gray-400">Avg. Discovery</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-black/20 border border-yellow-400/20 backdrop-blur-sm">
                  <div className="text-2xl font-bold text-yellow-400 mb-1">AI-Powered</div>
                  <div className="text-sm text-gray-400">Intelligence</div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <Footer />
      </div>
    </div>
  )
}