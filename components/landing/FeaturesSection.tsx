'use client'

import { useEffect, useRef, useState } from 'react'
import { 
  Zap, Shield, Target, Clock, Download, Users, 
  Code, Database, Lock, Cpu, Globe, FileText 
} from 'lucide-react'

export default function FeaturesSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeFeature, setActiveFeature] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const mainFeatures = [
    {
      icon: Zap,
      title: "Lightning-Fast Discovery",
      description: "AI-powered crawling discovers APIs in seconds, not hours",
      image: "/api/placeholder/600/400"
    },
    {
      icon: Shield,
      title: "Undetectable Stealth Mode",
      description: "Advanced evasion techniques ensure complete invisibility",
      image: "/api/placeholder/600/400"
    },
    {
      icon: Target,
      title: "Precision Endpoint Mapping",
      description: "Comprehensive analysis of every discoverable endpoint",
      image: "/api/placeholder/600/400"
    }
  ]

  const allFeatures = [
    { icon: Code, title: "Smart Code Analysis", description: "Analyzes JavaScript and network requests intelligently" },
    { icon: Database, title: "Multiple Export Formats", description: "Postman, OpenAPI, JSON, and custom formats" },
    { icon: Lock, title: "Enterprise Security", description: "SOC 2 compliant with enterprise-grade encryption" },
    { icon: Cpu, title: "AI-Powered Intelligence", description: "Machine learning optimizes discovery patterns" },
    { icon: Globe, title: "Global Proxy Network", description: "Worldwide proxy infrastructure for stealth operations" },
    { icon: FileText, title: "Detailed Reporting", description: "Comprehensive reports with actionable insights" },
    { icon: Clock, title: "Real-Time Monitoring", description: "Live progress tracking and instant notifications" },
    { icon: Users, title: "Team Collaboration", description: "Share discoveries and collaborate seamlessly" }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % mainFeatures.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [mainFeatures.length])

  return (
    <section id="features" ref={sectionRef} className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Enterprise-Grade
            <br />
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">
              API Discovery
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Advanced features designed for security professionals and enterprise teams
          </p>
        </div>

        {/* Main Features Showcase */}
        <div className={`mb-20 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Feature Content */}
            <div className="space-y-8">
              {mainFeatures.map((feature, index) => {
                const Icon = feature.icon
                const isActive = activeFeature === index
                
                return (
                  <div
                    key={index}
                    className={`p-6 rounded-2xl border transition-all duration-500 cursor-pointer ${
                      isActive 
                        ? 'border-yellow-400/50 bg-yellow-400/5 scale-105' 
                        : 'border-gray-800 bg-gray-900/30 hover:border-gray-700'
                    }`}
                    onClick={() => setActiveFeature(index)}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        isActive ? 'bg-yellow-400/20' : 'bg-gray-800'
                      }`}>
                        <Icon className={`w-6 h-6 transition-colors duration-300 ${
                          isActive ? 'text-yellow-400' : 'text-gray-400'
                        }`} />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className={`text-xl font-bold mb-2 transition-colors duration-300 ${
                          isActive ? 'text-white' : 'text-gray-300'
                        }`}>
                          {feature.title}
                        </h3>
                        <p className={`transition-colors duration-300 ${
                          isActive ? 'text-gray-300' : 'text-gray-400'
                        }`}>
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Feature Visualization */}
            <div className="relative">
              <div className="aspect-video rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-gray-800 overflow-hidden">
                <div className="p-8 h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-yellow-400/20 to-yellow-500/20 flex items-center justify-center">
                      {(() => {
                        const Icon = mainFeatures[activeFeature].icon
                        return <Icon className="w-12 h-12 text-yellow-400" />
                      })()}
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-4">
                      {mainFeatures[activeFeature].title}
                    </h4>
                    <p className="text-gray-400">
                      {mainFeatures[activeFeature].description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* All Features Grid */}
        <div className={`transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            Complete Feature Set
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {allFeatures.map((feature, index) => {
              const Icon = feature.icon
              
              return (
                <div
                  key={index}
                  className="p-6 rounded-xl border border-gray-800 bg-gray-900/30 hover:border-gray-700 hover:bg-gray-900/50 transition-all duration-300 hover:scale-105"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-12 h-12 mb-4 rounded-lg bg-gray-800 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-gray-400" />
                  </div>
                  
                  <h4 className="text-lg font-bold text-white mb-2">{feature.title}</h4>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        <div className={`text-center mt-16 transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <button
            onClick={() => document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 rounded-xl font-bold text-black transition-all duration-300 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #F0FF26 0%, #E0EF16 100%)',
              boxShadow: '0 10px 40px rgba(240, 255, 38, 0.3)'
            }}
          >
            Explore All Features
          </button>
        </div>
      </div>
    </section>
  )
}