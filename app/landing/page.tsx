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

  const handleLoaderComplete = () => {
    setShowLoader(false)
  }

  const handleCrawl = async (url: string) => {
    setIsLoading(true)
    setProgress(0)
    setResult(null)
    setLogs([])
    setSidebarOpen(true)

    try {
      const response = await fetch('/api/crawl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const reader = response.body?.getReader()
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
              }
            } catch (e) {
              console.warn('Failed to parse SSE data:', line)
            }
          }
        }
      }
    } catch (error) {
      console.error('Crawl failed:', error)
      setLogs(prev => [...prev, `Error: ${error instanceof Error ? error.message : 'Unknown error'}`])
      setIsLoading(false)
    }
  }

  if (showLoader) {
    return <AdvancedLoader onComplete={handleLoaderComplete} />
  }

  if (showDashboard) {
    return (
      <div className="min-h-screen bg-black">
        <LandingNavbar />

        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl" style={{ paddingTop: '4rem sm:5rem' }}>
          <div className="text-center mb-8 sm:mb-12">
            <div className="flex items-center justify-center mb-4 sm:mb-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
                Deep<span style={{ color: '#F0FF26' }}>Crawler</span>
              </h1>
            </div>
            <p className="text-base sm:text-lg text-gray-500 tracking-tight px-4">
              Unlock Hidden APIs in Seconds with{' '}
              <span className="items-center">
                <img src="/Yellow BG.png" alt="Hyperbrowser" className="inline h-4 sm:h-5 w-auto rounded-full" />
              </span>
            </p>
          </div>

          <div
            className="relative rounded-2xl p-4 sm:p-6 lg:p-8 overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(240, 255, 38, 0.1) 0%, rgba(0, 0, 0, 0.8) 50%, rgba(240, 255, 38, 0.05) 100%)',
              border: '1px solid rgba(240, 255, 38, 0.2)'
            }}
          >
            <ProgressBar progress={progress} isLoading={isLoading} />

            <UrlForm onSubmit={handleCrawl} isLoading={isLoading} />

            {result && (
              <div className="mt-6 sm:mt-8 animate-in fade-in duration-500">
                <ResultCard
                  endpointCount={result.endpoints.length}
                  crawlId={result.crawlId}
                  postmanCollection={result.postmanCollection}
                />
              </div>
            )}
          </div>

          {result && (
            <div className="mt-6 sm:mt-8 text-center px-4">
              <p className="text-xs sm:text-sm text-gray-500 font-medium tracking-tight">
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
      <section id="dashboard" className="py-16 sm:py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
              Try Ziro Now
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl lg:max-w-3xl mx-auto mb-6 sm:mb-8 px-4">
              Experience the power of AI-driven API discovery. Enter any URL and watch Ziro uncover hidden endpoints in real-time.
            </p>
            <button
              onClick={() => setShowDashboard(true)}
              className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-black transition-all duration-300 hover:scale-105 text-sm sm:text-base"
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