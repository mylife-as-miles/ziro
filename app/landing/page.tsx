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
import AdvancedDashboard from '../../components/AdvancedDashboard'

export default function LandingPage() {
  const [showLoader, setShowLoader] = useState(true)
  const [showDashboard, setShowDashboard] = useState(false)

  const handleLoaderComplete = () => {
    setShowLoader(false)
  }

  if (showLoader) {
    return <AdvancedLoader onComplete={handleLoaderComplete} />
  }

  if (showDashboard) {
    return <AdvancedDashboard />
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
                See the future of API discovery in action. Watch as Ziro&apos;s AI uncaps hidden endpoints
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