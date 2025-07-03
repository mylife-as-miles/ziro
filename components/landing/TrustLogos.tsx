'use client'

import { useEffect, useRef, useState } from 'react'
import { Shield, Star, Award, CheckCircle } from 'lucide-react'

export default function TrustLogos() {
  const [isVisible, setIsVisible] = useState(false)
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

  const companies = [
    { name: 'TechCorp', logo: 'TC', color: 'from-blue-400 to-blue-600' },
    { name: 'SecureNet', logo: 'SN', color: 'from-green-400 to-green-600' },
    { name: 'DataFlow', logo: 'DF', color: 'from-purple-400 to-purple-600' },
    { name: 'CloudBase', logo: 'CB', color: 'from-cyan-400 to-cyan-600' },
    { name: 'APIFirst', logo: 'AF', color: 'from-pink-400 to-pink-600' },
    { name: 'DevTools', logo: 'DT', color: 'from-orange-400 to-orange-600' }
  ]

  const trustIndicators = [
    { icon: Shield, label: "SOC 2 Certified", value: "Type II" },
    { icon: Star, label: "Customer Rating", value: "4.9/5" },
    { icon: Award, label: "Security Award", value: "2024" },
    { icon: CheckCircle, label: "Uptime SLA", value: "99.9%" }
  ]

  return (
    <section ref={sectionRef} className="relative py-16 lg:py-20 bg-gradient-to-b from-black via-gray-900/30 to-black overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(240,255,38,0.05),transparent)]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced header */}
        <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center space-x-2 mb-4">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
            <p className="text-gray-400 font-medium text-lg">
              Trusted by Security Teams Worldwide
            </p>
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
          </div>
          
          <div className="flex justify-center items-center space-x-4 text-gray-500 text-sm">
            <span>10,000+ Security Professionals</span>
            <div className="w-1 h-1 bg-gray-600 rounded-full" />
            <span>500+ Enterprise Clients</span>
            <div className="w-1 h-1 bg-gray-600 rounded-full" />
            <span>50+ Countries</span>
          </div>
        </div>

        {/* Company logos */}
        <div className={`mb-16 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
            {companies.map((company, index) => (
              <div
                key={company.name}
                className="group relative flex items-center justify-center p-6 rounded-2xl border border-gray-800 hover:border-gray-600 transition-all duration-300 hover:scale-105 bg-black/20 hover:bg-gray-900/30"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Logo */}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${company.color} flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform duration-300`}>
                  {company.logo}
                </div>
                
                {/* Company name */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-black/80 px-2 py-1 rounded text-xs text-gray-300 whitespace-nowrap">
                    {company.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust indicators */}
        <div className={`transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {trustIndicators.map((indicator, index) => {
              const Icon = indicator.icon
              return (
                <div 
                  key={index}
                  className="group text-center p-6 rounded-2xl bg-black/20 border border-gray-800 hover:border-yellow-400/50 transition-all duration-300 hover:scale-105"
                >
                  <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-yellow-400/20 to-yellow-500/20 flex items-center justify-center group-hover:from-yellow-400/30 group-hover:to-yellow-500/30 transition-all duration-300">
                    <Icon className="w-6 h-6 text-yellow-400 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  
                  <div className="text-xl font-bold text-white mb-1 group-hover:text-yellow-400 transition-colors duration-300">
                    {indicator.value}
                  </div>
                  
                  <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    {indicator.label}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Additional trust elements */}
        <div className={`mt-12 text-center transition-all duration-1000 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center space-x-8 text-gray-500 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
              <span>GDPR Compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" />
              <span>ISO 27001 Certified</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse" />
              <span>PCI DSS Level 1</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}