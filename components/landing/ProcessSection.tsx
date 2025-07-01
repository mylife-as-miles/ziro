'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Globe, Cpu, FileText, Download } from 'lucide-react'

export default function ProcessSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
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

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setActiveStep(prev => (prev + 1) % 4)
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [isVisible])

  const steps = [
    {
      icon: Globe,
      title: "Enter Target URL",
      description: "Simply paste any website URL and let Ziro handle the rest",
      detail: "Supports any web application or API gateway",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Cpu,
      title: "AI-Powered Crawling",
      description: "Advanced browser automation discovers hidden endpoints intelligently",
      detail: "Simulates real user behavior to avoid detection",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: FileText,
      title: "Deep Analysis",
      description: "Comprehensive mapping of all discovered APIs with detailed metadata",
      detail: "Analyzes parameters, responses, and authentication",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Download,
      title: "Export Results",
      description: "Generate Postman collections and detailed reports instantly",
      detail: "Ready for immediate security testing",
      color: "from-yellow-500 to-orange-500"
    }
  ]

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            How Ziro Works
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            From URL to comprehensive API documentation in four simple steps
          </p>
        </div>

        {/* Desktop Process Flow */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Connection lines */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gray-700 to-transparent transform -translate-y-1/2" />
            
            <div className="grid grid-cols-4 gap-8">
              {steps.map((step, index) => {
                const Icon = step.icon
                const isActive = activeStep === index
                
                return (
                  <div
                    key={index}
                    className={`relative text-center transition-all duration-700 ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    {/* Step circle */}
                    <div className={`relative w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center transition-all duration-500 ${
                      isActive ? 'scale-110' : 'scale-100'
                    }`} style={{
                      background: isActive 
                        ? `linear-gradient(135deg, ${step.color.split(' ')[1]} 0%, ${step.color.split(' ')[3]} 100%)`
                        : 'linear-gradient(135deg, rgba(55, 65, 81, 0.8) 0%, rgba(31, 41, 55, 0.8) 100%)',
                      boxShadow: isActive ? '0 20px 40px rgba(0, 0, 0, 0.3)' : 'none'
                    }}>
                      <Icon className={`w-10 h-10 transition-colors duration-300 ${
                        isActive ? 'text-white' : 'text-gray-400'
                      }`} />
                      
                      {/* Step number */}
                      <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                        isActive ? 'bg-white text-black' : 'bg-gray-700 text-gray-300'
                      }`}>
                        {index + 1}
                      </div>
                    </div>
                    
                    <h3 className={`text-xl font-bold mb-3 transition-colors duration-300 ${
                      isActive ? 'text-white' : 'text-gray-300'
                    }`}>
                      {step.title}
                    </h3>
                    
                    <p className={`text-gray-400 mb-2 transition-colors duration-300 ${
                      isActive ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      {step.description}
                    </p>
                    
                    <p className={`text-sm transition-colors duration-300 ${
                      isActive ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {step.detail}
                    </p>

                    {/* Arrow */}
                    {index < steps.length - 1 && (
                      <ArrowRight className={`absolute top-12 -right-4 w-6 h-6 transition-colors duration-300 ${
                        isActive ? 'text-yellow-400' : 'text-gray-600'
                      }`} />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Mobile Process Flow */}
        <div className="lg:hidden space-y-8">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isActive = activeStep === index
            
            return (
              <div
                key={index}
                className={`flex items-start space-x-6 p-6 rounded-2xl border transition-all duration-500 ${
                  isActive 
                    ? 'border-yellow-400/30 bg-yellow-400/5' 
                    : 'border-gray-800 bg-gray-900/30'
                } ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                  isActive ? 'scale-110' : 'scale-100'
                }`} style={{
                  background: isActive 
                    ? `linear-gradient(135deg, ${step.color.split(' ')[1]} 0%, ${step.color.split(' ')[3]} 100%)`
                    : 'linear-gradient(135deg, rgba(55, 65, 81, 0.8) 0%, rgba(31, 41, 55, 0.8) 100%)'
                }}>
                  <Icon className={`w-8 h-8 transition-colors duration-300 ${
                    isActive ? 'text-white' : 'text-gray-400'
                  }`} />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className={`text-lg font-bold transition-colors duration-300 ${
                      isActive ? 'text-white' : 'text-gray-300'
                    }`}>
                      {step.title}
                    </h3>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                      isActive ? 'bg-yellow-400 text-black' : 'bg-gray-700 text-gray-400'
                    }`}>
                      {index + 1}
                    </div>
                  </div>
                  
                  <p className={`text-gray-400 mb-1 transition-colors duration-300 ${
                    isActive ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    {step.description}
                  </p>
                  
                  <p className={`text-sm transition-colors duration-300 ${
                    isActive ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {step.detail}
                  </p>
                </div>
              </div>
            )
          })}
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
            Try It Now
          </button>
        </div>
      </div>
    </section>
  )
}