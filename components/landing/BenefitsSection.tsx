'use client'

import { useEffect, useRef, useState } from 'react'
import { Zap, Shield, Target, Clock, Download, Users, TrendingUp, Award, Gauge, Brain } from 'lucide-react'

export default function BenefitsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [activeMetric, setActiveMetric] = useState(0)
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

    // Auto-rotate metrics
    const interval = setInterval(() => {
      setActiveMetric(prev => (prev + 1) % 4)
    }, 3000)

    return () => {
      observer.disconnect()
      clearInterval(interval)
    }
  }, [])

  const benefits = [
    {
      icon: Brain,
      title: "AI-Powered Discovery",
      description: "Revolutionary machine learning algorithms that understand application behavior and discover hidden endpoints with unprecedented accuracy.",
      metric: "30x faster",
      detail: "than manual methods",
      color: "from-blue-400 to-cyan-400",
      bgColor: "bg-blue-500/10"
    },
    {
      icon: Shield,
      title: "Stealth Operations",
      description: "Military-grade evasion techniques ensure complete invisibility while conducting comprehensive reconnaissance of target systems.",
      metric: "99.9% undetected",
      detail: "success rate",
      color: "from-green-400 to-emerald-400",
      bgColor: "bg-green-500/10"
    },
    {
      icon: Target,
      title: "Precision Mapping",
      description: "Complete API surface analysis with detailed parameter extraction, authentication detection, and comprehensive documentation generation.",
      metric: "100% coverage",
      detail: "of accessible endpoints",
      color: "from-purple-400 to-pink-400",
      bgColor: "bg-purple-500/10"
    },
    {
      icon: Gauge,
      title: "Real-Time Intelligence",
      description: "Live monitoring and instant analysis provide immediate insights into API vulnerabilities and security gaps as they're discovered.",
      metric: "< 15 seconds",
      detail: "average discovery time",
      color: "from-orange-400 to-red-400",
      bgColor: "bg-orange-500/10"
    },
    {
      icon: Download,
      title: "Universal Export",
      description: "Seamless integration with your existing workflow through multiple export formats including Postman, OpenAPI, and custom schemas.",
      metric: "10+ formats",
      detail: "supported",
      color: "from-cyan-400 to-teal-400",
      bgColor: "bg-cyan-500/10"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Enterprise-grade collaboration features enable security teams to share discoveries, coordinate testing, and maintain comprehensive audits.",
      metric: "Unlimited teams",
      detail: "and shared workspaces",
      color: "from-indigo-400 to-purple-400",
      bgColor: "bg-indigo-500/10"
    }
  ]

  const keyMetrics = [
    { value: "47", label: "Avg. Endpoints Found", subtext: "per application scan" },
    { value: "15s", label: "Discovery Time", subtext: "for most applications" },
    { value: "99.9%", label: "Stealth Success", subtext: "undetected operations" },
    { value: "10K+", label: "Security Pros", subtext: "trust Ziro daily" }
  ]
      color: "green"
    },
    {
      icon: Clock,
      title: "Real-Time Analysis",
      description: "Live monitoring and instant results with detailed logs and progress tracking throughout the process.",
      metric: "Real-time",
      detail: "progress updates",
      color: "purple"
    },
    {
      icon: Download,
      title: "Export Ready",
      description: "Generate Postman collections, OpenAPI specs, and detailed reports ready for your security workflow.",
      metric: "Multiple formats",
      detail: "supported",
      color: "orange"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Share discoveries with your team, integrate with existing tools, and maintain centralized documentation.",
      metric: "Seamless",
      detail: "team integration",
      color: "pink"
    }
  ]

  const getColorClasses = (color: string, isHovered: boolean) => {
    const colors = {
      yellow: {
        bg: isHovered ? 'bg-yellow-500/20' : 'bg-yellow-500/10',
        border: isHovered ? 'border-yellow-400/50' : 'border-yellow-500/30',
        icon: isHovered ? 'text-yellow-300' : 'text-yellow-400',
        metric: 'text-yellow-400'
      },
      blue: {
        bg: isHovered ? 'bg-blue-500/20' : 'bg-blue-500/10',
        border: isHovered ? 'border-blue-400/50' : 'border-blue-500/30',
        icon: isHovered ? 'text-blue-300' : 'text-blue-400',
        metric: 'text-blue-400'
      },
      green: {
        bg: isHovered ? 'bg-green-500/20' : 'bg-green-500/10',
        border: isHovered ? 'border-green-400/50' : 'border-green-500/30',
        icon: isHovered ? 'text-green-300' : 'text-green-400',
        metric: 'text-green-400'
      },
      purple: {
        bg: isHovered ? 'bg-purple-500/20' : 'bg-purple-500/10',
        border: isHovered ? 'border-purple-400/50' : 'border-purple-500/30',
        icon: isHovered ? 'text-purple-300' : 'text-purple-400',
        metric: 'text-purple-400'
      },
      orange: {
        bg: isHovered ? 'bg-orange-500/20' : 'bg-orange-500/10',
        border: isHovered ? 'border-orange-400/50' : 'border-orange-500/30',
        icon: isHovered ? 'text-orange-300' : 'text-orange-400',
        metric: 'text-orange-400'
      },
      pink: {
        bg: isHovered ? 'bg-pink-500/20' : 'bg-pink-500/10',
        border: isHovered ? 'border-pink-400/50' : 'border-pink-500/30',
        icon: isHovered ? 'text-pink-300' : 'text-pink-400',
        metric: 'text-pink-400'
      }
    }
    return colors[color as keyof typeof colors]
  }

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Why Security Teams
            <br />
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">
              Choose Ziro
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Transform your API discovery process with enterprise-grade automation and intelligence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            const isHovered = hoveredCard === index
            const colorClasses = getColorClasses(benefit.color, isHovered)
            
            return (
              <div
                key={index}
                className={`relative p-8 rounded-2xl border transition-all duration-500 hover:scale-105 cursor-pointer ${
                  colorClasses.bg
                } ${colorClasses.border} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ animationDelay: `${index * 150}ms` }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="relative z-10">
                  <div className={`w-16 h-16 mb-6 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    isHovered ? 'scale-110' : 'scale-100'
                  }`} style={{
                    background: `linear-gradient(135deg, ${benefit.color === 'yellow' ? 'rgba(240, 255, 38, 0.2)' : 
                      benefit.color === 'blue' ? 'rgba(59, 130, 246, 0.2)' :
                      benefit.color === 'green' ? 'rgba(34, 197, 94, 0.2)' :
                      benefit.color === 'purple' ? 'rgba(168, 85, 247, 0.2)' :
                      benefit.color === 'orange' ? 'rgba(249, 115, 22, 0.2)' :
                      'rgba(236, 72, 153, 0.2)'} 0%, transparent 100%)`
                  }}>
                    <Icon className={`w-8 h-8 transition-all duration-300 ${colorClasses.icon}`} />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-4">{benefit.title}</h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">{benefit.description}</p>
                  
                  <div className={`transition-all duration-300 ${isHovered ? 'scale-105' : 'scale-100'}`}>
                    <div className={`text-lg font-bold mb-1 ${colorClasses.metric}`}>
                      {benefit.metric}
                    </div>
                    <div className="text-sm text-gray-500">
                      {benefit.detail}
                    </div>
                  </div>
                </div>

                {isHovered && (
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                )}
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
            Experience the Difference
          </button>
        </div>
      </div>
    </section>
  )
}