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
  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-black overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(240,255,38,0.08),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_80%,rgba(59,130,246,0.08),transparent)]" />
        
        {/* Animated gradient orbs */}
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-20 animate-float"
            style={{
              background: `radial-gradient(circle, rgba(240, 255, 38, 0.2) 0%, transparent 70%)`,
              width: `${100 + i * 50}px`,
              height: `${100 + i * 50}px`,
              left: `${20 + i * 20}%`,
              top: `${10 + i * 15}%`,
              animationDelay: `${i * 1.5}s`,
              animationDuration: `${6 + i}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced section header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center space-x-2 mb-6">
            <TrendingUp className="w-6 h-6 text-yellow-400" />
            <span className="text-yellow-400 font-semibold">Superior Performance</span>
            <Award className="w-6 h-6 text-yellow-400" />
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Why Security Teams
            <br />
            <span className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
              Choose Ziro
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Experience the next generation of API discovery with cutting-edge technology that delivers unmatched results 
            while maintaining complete stealth and operational security.
          </p>
        </div>

        {/* Key metrics showcase */}
        <div className={`mb-20 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {keyMetrics.map((metric, index) => {
              const isActive = activeMetric === index
              return (
                <div 
                  key={index}
                  className={`text-center p-6 rounded-2xl border transition-all duration-500 ${
                    isActive 
                      ? 'border-yellow-400/50 bg-gradient-to-b from-yellow-400/10 to-transparent scale-110 shadow-lg shadow-yellow-400/20' 
                      : 'border-gray-800 bg-black/20 hover:border-gray-700'
                  }`}
                >
                  <div className={`text-3xl lg:text-4xl font-bold mb-2 transition-colors duration-300 ${
                    isActive ? 'text-yellow-400' : 'text-white'
                  }`}>
                    {metric.value}
                  </div>
                  <div className={`font-semibold mb-1 transition-colors duration-300 ${
                    isActive ? 'text-white' : 'text-gray-300'
                  }`}>
                    {metric.label}
                  </div>
                  <div className={`text-sm transition-colors duration-300 ${
                    isActive ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    {metric.subtext}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Enhanced benefits grid */}
        <div className={`transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              const isHovered = hoveredCard === index
              
              return (
                <div
                  key={index}
                  className={`group relative p-8 rounded-3xl border transition-all duration-500 cursor-pointer ${
                    isHovered 
                      ? 'border-yellow-400/50 bg-gradient-to-br from-yellow-400/10 via-transparent to-transparent scale-105 shadow-2xl shadow-yellow-400/20' 
                      : 'border-gray-800 bg-black/20 hover:border-gray-700 hover:bg-gray-900/30'
                  }`}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  {/* Icon */}
                  <div className={`w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br ${benefit.color} flex items-center justify-center transition-all duration-300 ${
                    isHovered ? 'scale-110 shadow-lg' : 'group-hover:scale-105'
                  }`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className={`text-xl font-bold mb-4 transition-colors duration-300 ${
                    isHovered ? 'text-white' : 'text-gray-300 group-hover:text-white'
                  }`}>
                    {benefit.title}
                  </h3>
                  
                  <p className={`text-base leading-relaxed mb-6 transition-colors duration-300 ${
                    isHovered ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300'
                  }`}>
                    {benefit.description}
                  </p>

                  {/* Metric highlight */}
                  <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                    isHovered 
                      ? `bg-gradient-to-r ${benefit.color} text-white` 
                      : `${benefit.bgColor} border border-gray-700 text-gray-400 group-hover:text-gray-300`
                  }`}>
                    <span className="font-bold">{benefit.metric}</span>
                    <span className="text-sm">{benefit.detail}</span>
                  </div>

                  {/* Hover effect glow */}
                  {isHovered && (
                    <div className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-10 rounded-3xl -z-10 blur-xl`} />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-20 transition-all duration-1000 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center space-x-4 text-gray-400">
            <span>Ready to experience these benefits?</span>
            <button 
              onClick={() => document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-yellow-400 hover:text-yellow-300 font-semibold transition-colors duration-300 underline decoration-yellow-400/50 hover:decoration-yellow-300"
            >
              Try Ziro Now →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}