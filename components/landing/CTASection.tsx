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
        
        {/* Radial gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(240,255,38,0.1),transparent)]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Enhanced header */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-flex items-center space-x-2 mb-6">
              <Star className="w-5 h-5 text-yellow-400 animate-pulse" />
              <span className="text-yellow-400 font-semibold tracking-wide">Ready to Start?</span>
              <Star className="w-5 h-5 text-yellow-400 animate-pulse" />
            </div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Start Discovering
              <br />
              <span className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                Hidden APIs Today
              </span>
            </h2>
            
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Join thousands of security professionals who trust Ziro for comprehensive API discovery. 
              Get started in less than 60 seconds.
            </p>
          </div>

          {/* Enhanced feature highlights */}
          <div className={`mb-12 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {[
                { icon: Zap, title: "Instant Setup", desc: "No configuration required" },
                { icon: Shield, title: "100% Secure", desc: "Enterprise-grade security" },
                { icon: Target, title: "Precise Results", desc: "AI-powered accuracy" }
              ].map((item, index) => {
                const Icon = item.icon
                return (
                  <div 
                    key={index}
                    className="group p-6 rounded-2xl bg-black/30 border border-gray-800 hover:border-yellow-400/50 transition-all duration-300 hover:scale-105"
                  >
                    <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-yellow-400/20 to-yellow-500/20 flex items-center justify-center group-hover:from-yellow-400/30 group-hover:to-yellow-500/30 transition-all duration-300">
                      <Icon className="w-6 h-6 text-yellow-400 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">
                      {item.desc}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Enhanced CTA button */}
          <div className={`transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="relative inline-block group">
              {/* Animated border */}
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse" />
              
              <button
                onClick={scrollToDashboard}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="relative px-12 py-6 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold rounded-xl leading-none flex items-center space-x-4 transition-all duration-300 hover:scale-105 text-xl group"
              >
                <Rocket className={`w-6 h-6 transition-all duration-300 ${isHovered ? 'animate-bounce' : ''}`} />
                <span>Launch Ziro Now</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
              </button>
            </div>
            
            <p className="text-gray-400 text-sm mt-4">
              Free to start • No credit card required • Ready in 60 seconds
            </p>
          </div>

          {/* Trust indicators */}
          <div className={`mt-16 transition-all duration-1000 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex justify-center items-center space-x-8 text-gray-500 text-sm">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span>Trusted by 10K+ users</span>
              </div>
              <div className="w-px h-4 bg-gray-700" />
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-green-400" />
                <span>SOC 2 Compliant</span>
              </div>
              <div className="w-px h-4 bg-gray-700" />
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-blue-400" />
                <span>99.9% Uptime SLA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}