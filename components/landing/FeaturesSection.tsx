'use client'

import { useEffect, useRef, useState } from 'react'
import { 
  Zap, Shield, Target, Clock, Download, Users, 
  Code, Database, Lock, Cpu, Globe, FileText, Sparkles, Brain 
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

    // Auto-rotate features
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3)
    }, 4000)

    return () => {
      observer.disconnect()
      clearInterval(interval)
    }
  }, [])

  const mainFeatures = [
    {
      icon: Brain,
      title: "AI-Powered Discovery",
      description: "Advanced machine learning algorithms intelligently crawl and discover hidden endpoints in seconds",
      details: "Our AI engine uses pattern recognition and behavioral analysis to uncover APIs that traditional tools miss",
      color: "from-blue-400 to-cyan-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30"
    },
    {
      icon: Shield,
      title: "Stealth Mode Operations",
      description: "Undetectable browsing with advanced evasion techniques that bypass all security measures",
      details: "Human-like behavior simulation, fingerprint randomization, and advanced anti-detection measures",
      color: "from-green-400 to-emerald-400",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/30"
    },
    {
      icon: Target,
      title: "Precision Mapping",
      description: "Comprehensive endpoint analysis with detailed parameter extraction and documentation generation",
      details: "Complete API surface mapping with authentication detection, parameter analysis, and payload examples",
      color: "from-purple-400 to-pink-400",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/30"
    }
  ]

  const allFeatures = [
    { icon: Code, title: "Smart Code Analysis", description: "Analyzes JavaScript and network requests intelligently", color: "text-blue-400" },
    { icon: Database, title: "Multiple Export Formats", description: "Postman, OpenAPI, JSON, and custom formats", color: "text-green-400" },
    { icon: Lock, title: "Enterprise Security", description: "SOC 2 compliant with enterprise-grade encryption", color: "text-red-400" },
    { icon: Cpu, title: "AI-Powered Intelligence", description: "Machine learning optimizes discovery patterns", color: "text-purple-400" },
    { icon: Globe, title: "Global Proxy Network", description: "Worldwide proxy infrastructure for stealth operations", color: "text-cyan-400" },
    { icon: FileText, title: "Detailed Reporting", description: "Comprehensive reports with actionable insights", color: "text-orange-400" },
    { icon: Clock, title: "Real-Time Monitoring", description: "Live progress tracking and instant notifications", color: "text-pink-400" },
    { icon: Users, title: "Team Collaboration", description: "Share discoveries and collaborate seamlessly", color: "text-indigo-400" }
  ]

  return (
    <section id="features" ref={sectionRef} className="relative py-24 bg-black overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(240,255,38,0.1),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_80%,rgba(59,130,246,0.1),transparent)]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Section Header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center space-x-2 mb-6">
            <Sparkles className="w-6 h-6 text-yellow-400" />
            <span className="text-yellow-400 font-semibold">Advanced Features</span>
            <Sparkles className="w-6 h-6 text-yellow-400" />
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Enterprise-Grade
            <br />
            <span className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
              API Discovery
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Advanced features designed for security professionals, penetration testers, and enterprise teams 
            who demand the most comprehensive API discovery solution.
          </p>
        </div>

        {/* Enhanced Main Features Showcase */}
        <div className={`mb-24 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Feature Content */}
            <div className="space-y-6">
              {mainFeatures.map((feature, index) => {
                const Icon = feature.icon
                const isActive = activeFeature === index
                
                return (
                  <div
                    key={index}
                    className={`group p-6 rounded-2xl border transition-all duration-500 cursor-pointer ${
                      isActive 
                        ? 'border-yellow-400/50 bg-gradient-to-r from-yellow-400/10 to-transparent scale-105 shadow-lg shadow-yellow-400/20' 
                        : 'border-gray-800 bg-black/30 hover:border-gray-700 hover:bg-gray-900/30'
                    }`}
                    onClick={() => setActiveFeature(index)}
                  >
                    <div className="flex items-start space-x-6">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                        isActive 
                          ? `bg-gradient-to-br ${feature.color}` 
                          : 'bg-gray-800 group-hover:bg-gray-700'
                      }`}>
                        <Icon className={`w-7 h-7 transition-colors duration-300 ${
                          isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'
                        }`} />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className={`text-xl font-bold mb-3 transition-colors duration-300 ${
                          isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'
                        }`}>
                          {feature.title}
                        </h3>
                        <p className={`text-base mb-2 transition-colors duration-300 ${
                          isActive ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300'
                        }`}>
                          {feature.description}
                        </p>
                        {isActive && (
                          <p className="text-sm text-gray-400 leading-relaxed animate-in fade-in duration-300">
                            {feature.details}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
              
              {/* Feature indicators */}
              <div className="flex space-x-2 pt-4">
                {mainFeatures.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      activeFeature === index 
                        ? 'bg-yellow-400 scale-125' 
                        : 'bg-gray-600 hover:bg-gray-500'
                    }`}
                    onClick={() => setActiveFeature(index)}
                  />
                ))}
              </div>
            </div>

            {/* Enhanced Feature Visualization */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-gray-900 via-black to-gray-900 border border-gray-800 overflow-hidden relative">
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-transparent" />
                
                <div className="relative p-8 h-full flex flex-col items-center justify-center text-center">
                  <div className="relative mb-8">
                    <div className={`w-28 h-28 mx-auto rounded-3xl bg-gradient-to-br ${mainFeatures[activeFeature].color} flex items-center justify-center animate-float`}>
                      {(() => {
                        const Icon = mainFeatures[activeFeature].icon
                        return <Icon className="w-14 h-14 text-white" />
                      })()}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-transparent rounded-3xl blur-xl" />
                  </div>
                  
                  <h4 className="text-3xl font-bold text-white mb-4">
                    {mainFeatures[activeFeature].title}
                  </h4>
                  <p className="text-gray-300 text-lg leading-relaxed max-w-md">
                    {mainFeatures[activeFeature].description}
                  </p>
                  
                  {/* Decorative elements */}
                  <div className="absolute top-4 right-4 w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                  <div className="absolute bottom-4 left-4 w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                  <div className="absolute top-1/3 left-4 w-1 h-1 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced All Features Grid */}
        <div className={`transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-16">
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Complete Feature Ecosystem
            </h3>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Every tool you need for comprehensive API discovery and security assessment
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {allFeatures.map((feature, index) => {
              const Icon = feature.icon
              
              return (
                <div
                  key={index}
                  className="group p-6 rounded-2xl border border-gray-800 bg-black/30 hover:border-gray-700 hover:bg-gray-900/50 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-12 h-12 mb-4 rounded-xl bg-gray-800 group-hover:bg-gray-700 flex items-center justify-center transition-colors duration-300">
                    <Icon className={`w-6 h-6 ${feature.color} group-hover:scale-110 transition-transform duration-300`} />
                  </div>
                  
                  <h4 className="text-lg font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors duration-300">
                    {feature.title}
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}