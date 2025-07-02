'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Zap, Shield, Target, Sparkles, Star, Rocket } from 'lucide-react'

export default function CTASection() {
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
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
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height
        })
      }
    }

    const sectionElement = sectionRef.current
    if (sectionElement) {
      sectionElement.addEventListener('mousemove', handleMouseMove)
      return () => sectionElement.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const scrollToDashboard = () => {
    document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section 
      ref={sectionRef} 
      className="relative py-24 lg:py-32 bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden"
    >
      {/* Enhanced background effects */}
      <div className="absolute inset-0">
        {/* Dynamic gradient overlay */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 via-transparent to-blue-500/10 transition-all duration-700"
          style={{
            transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`,
          }}
        />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(240, 255, 38, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(240, 255, 38, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`
          }}
        />
        
        {/* Animated particles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full opacity-60"
            style={{
              left: `${10 + i * 6}%`,
              top: `${10 + (i % 3) * 30}%`,
              animation: `float ${4 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`
            }}
          />
        ))}
        
        {/* Floating orbs */}
        <div className="absolute inset-0">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full opacity-20 animate-pulse"
              style={{
                background: 'radial-gradient(circle, rgba(240, 255, 38, 0.4) 0%, transparent 70%)',
                width: `${200 + i * 100}px`,
                height: `${200 + i * 100}px`,
                left: `${10 + i * 30}%`,
                top: `${20 + i * 20}%`,
                animationDelay: `${i * 1}s`,
                transform: `translate(${mousePosition.x * (20 + i * 10)}px, ${mousePosition.y * (20 + i * 10)}px)`
              }}
            />
          ))}
        </div>
        
        {/* Radial gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(240,255,38,0.1),transparent)]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          {/* Enhanced header */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-flex items-center space-x-2 mb-6">
              <Star className="w-5 h-5 text-yellow-400 animate-pulse" />
              <span className="text-yellow-400 font-semibold tracking-wide">Ready to Start?</span>
              <Star className="w-5 h-5 text-yellow-400 animate-pulse" />
            </div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-8 leading-tight">
              Ready to Uncover
              <br />
              <span className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                Hidden APIs?
              </span>
            </h2>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Join thousands of security professionals who trust Ziro to discover 
              critical vulnerabilities and map complete attack surfaces in seconds.
            </p>
          </div>

          {/* Enhanced feature highlights */}
          <div className={`mb-12 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex flex-wrap justify-center gap-8">
              {[
                { icon: Zap, title: "Lightning Fast", desc: "Seconds, not hours", color: "yellow" },
                { icon: Shield, title: "Undetectable", desc: "99.9% stealth rate", color: "blue" },
                { icon: Target, title: "Comprehensive", desc: "Complete coverage", color: "green" }
              ].map((item, index) => {
                const Icon = item.icon
                const colorClasses = {
                  yellow: "bg-yellow-400/20 text-yellow-400",
                  blue: "bg-blue-400/20 text-blue-400", 
                  green: "bg-green-400/20 text-green-400"
                }
                return (
                  <div key={index} className="flex items-center space-x-3 text-gray-300">
                    <div className={`w-12 h-12 rounded-full ${colorClasses[item.color as keyof typeof colorClasses]} flex items-center justify-center`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-white">{item.title}</div>
                      <div className="text-sm text-gray-400">{item.desc}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Enhanced CTA buttons */}
          <div className={`flex flex-col sm:flex-row gap-6 justify-center items-center mb-12 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="relative inline-block group">
              {/* Animated border */}
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse" />
              
              <button
                onClick={scrollToDashboard}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="relative px-10 py-5 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold rounded-xl leading-none flex items-center space-x-3 transition-all duration-300 hover:scale-105 text-lg group"
              >
                <Rocket className={`w-6 h-6 transition-all duration-300 ${isHovered ? 'animate-bounce' : ''}`} />
                <span>Start Free Discovery</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
              </button>
            </div>
            
            <button className="group px-10 py-5 rounded-2xl font-medium text-white text-lg border-2 border-gray-600 hover:border-gray-500 transition-all duration-300 hover:bg-gray-900/50 flex items-center space-x-3">
              <span>Watch 2-Min Demo</span>
              <div className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center">
                <div className="w-0 h-0 border-l-4 border-l-current border-y-2 border-y-transparent ml-0.5" />
              </div>
            </button>
          </div>

          <p className="text-gray-400 text-sm mb-12">
            Free to start • No credit card required • Ready in 60 seconds
          </p>

          {/* Trust indicators */}
          <div className={`mb-16 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex flex-wrap justify-center items-center gap-8 text-gray-500 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span>No credit card required</span>
              </div>
              <div className="w-1 h-4 bg-gray-700 hidden sm:block" />
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-green-400" />
                <span>SOC 2 Compliant</span>
              </div>
              <div className="w-1 h-4 bg-gray-700 hidden sm:block" />
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-blue-400" />
                <span>99.9% Uptime SLA</span>
              </div>
            </div>
          </div>

          {/* Final stats */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto transition-all duration-1000 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400 mb-2">10K+</div>
              <div className="text-gray-400 font-medium">APIs Discovered Daily</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400 mb-2">500+</div>
              <div className="text-gray-400 font-medium">Security Teams</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400 mb-2">&lt; 30s</div>
              <div className="text-gray-400 font-medium">Average Discovery</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}