'use client'

import { useEffect, useRef, useState } from 'react'
import { AlertTriangle, Clock, DollarSign, Shield } from 'lucide-react'

export default function LossAversionSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeCard, setActiveCard] = useState(0)
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
    const interval = setInterval(() => {
      setActiveCard(prev => (prev + 1) % 4)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const risks = [
    {
      icon: AlertTriangle,
      title: "Hidden Vulnerabilities",
      description: "Undiscovered API endpoints are security blind spots waiting to be exploited",
      stat: "73% of breaches",
      detail: "involve undocumented APIs"
    },
    {
      icon: Clock,
      title: "Manual Discovery Takes Weeks",
      description: "Traditional methods require extensive manual testing and documentation review",
      stat: "2-4 weeks",
      detail: "average discovery time"
    },
    {
      icon: DollarSign,
      title: "Breach Costs Are Skyrocketing",
      description: "API-related security incidents cost organizations millions in damages",
      stat: "$4.45M",
      detail: "average breach cost"
    },
    {
      icon: Shield,
      title: "Compliance Gaps",
      description: "Unknown endpoints create compliance risks and audit failures",
      stat: "89% of audits",
      detail: "find undocumented APIs"
    }
  ]

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-black to-red-950/20">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Don&apos;t Let Hidden APIs
            <br />
            <span className="text-red-400">Become Your Biggest Risk</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Every day without complete API visibility increases your attack surface and compliance risk
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {risks.map((risk, index) => {
            const Icon = risk.icon
            const isActive = activeCard === index
            
            return (
              <div
                key={index}
                className={`relative p-6 rounded-xl border transition-all duration-500 hover:scale-105 cursor-pointer ${
                  isActive 
                    ? 'border-red-500/50 bg-red-950/30' 
                    : 'border-gray-800 bg-gray-900/50 hover:border-gray-700'
                } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ animationDelay: `${index * 200}ms` }}
                onMouseEnter={() => setActiveCard(index)}
              >
                <div className="text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isActive ? 'bg-red-500/20' : 'bg-gray-800'
                  }`}>
                    <Icon className={`w-8 h-8 transition-colors duration-300 ${
                      isActive ? 'text-red-400' : 'text-gray-400'
                    }`} />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3">{risk.title}</h3>
                  <p className="text-gray-400 mb-4 text-sm leading-relaxed">{risk.description}</p>
                  
                  <div className={`transition-all duration-300 ${isActive ? 'scale-110' : 'scale-100'}`}>
                    <div className={`text-2xl font-bold mb-1 ${isActive ? 'text-red-400' : 'text-yellow-400'}`}>
                      {risk.stat}
                    </div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide">
                      {risk.detail}
                    </div>
                  </div>
                </div>

                {isActive && (
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-500/10 to-transparent pointer-events-none" />
                )}
              </div>
            )
          })}
        </div>

        <div className={`text-center mt-12 transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center space-x-4 px-6 py-3 rounded-full bg-red-950/30 border border-red-500/30">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <span className="text-red-300 font-medium">
              Every minute of delay increases your risk exposure
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}