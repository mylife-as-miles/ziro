'use client'

import { useEffect, useRef, useState } from 'react'

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
    { name: 'TechCorp', logo: 'TC' },
    { name: 'SecureNet', logo: 'SN' },
    { name: 'DataFlow', logo: 'DF' },
    { name: 'CloudBase', logo: 'CB' },
    { name: 'APIFirst', logo: 'AF' },
    { name: 'DevTools', logo: 'DT' }
  ]

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 bg-gray-900/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-8 sm:mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-gray-400 font-medium text-base sm:text-lg mb-6 sm:mb-8">
            Trusted by security teams at leading companies
          </p>
        </div>

        <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 lg:gap-8 items-center">
            {companies.map((company, index) => (
              <div
                key={company.name}
                className="group flex items-center justify-center p-4 sm:p-6 rounded-lg border border-gray-800 hover:border-gray-700 transition-all duration-300 hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 rounded-lg bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center text-white font-bold text-sm sm:text-lg group-hover:from-yellow-400/20 group-hover:to-yellow-500/20 transition-all duration-300">
                    {company.logo}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500 group-hover:text-gray-400 transition-colors">
                    {company.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`text-center mt-8 sm:mt-12 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-gray-400">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs sm:text-sm font-medium">SOC 2 Compliant</span>
            </div>
            <div className="hidden sm:block w-1 h-4 bg-gray-700" />
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              <span className="text-xs sm:text-sm font-medium">GDPR Ready</span>
            </div>
            <div className="hidden sm:block w-1 h-4 bg-gray-700" />
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
              <span className="text-xs sm:text-sm font-medium">Enterprise Grade</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}