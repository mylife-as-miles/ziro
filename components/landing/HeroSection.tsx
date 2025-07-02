'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Play, Zap, Shield, Target, Sparkles, Cpu, Globe2 } from 'lucide-react'

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [typedText, setTypedText] = useState('')
  const heroRef = useRef<HTMLDivElement>(null)
  
  const fullText = "Hidden APIs"
  
  useEffect(() => {
    setIsVisible(true)
    
    // Typing animation for the main title
    let i = 0
    const typeTimer = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.slice(0, i + 1))
        i++
      } else {
        clearInterval(typeTimer)
      }
    }, 150)
    
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height
        })
      }
    }

    const heroElement = heroRef.current
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove)
      return () => {
        heroElement.removeEventListener('mousemove', handleMouseMove)
        clearInterval(typeTimer)
      }
    }
    
    return () => clearInterval(typeTimer)
  }, [])

  const scrollToDashboard = () => {
    document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black pt-20"
    >
      {/* Enhanced animated background */}
      <div className="absolute inset-0">
        {/* Dynamic grid pattern */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(rgba(240, 255, 38, 0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(240, 255, 38, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        />
        
        {/* Floating orbs with enhanced effects */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full opacity-40"
              style={{
                background: `radial-gradient(circle, rgba(240, 255, 38, ${0.4 - i * 0.05}) 0%, transparent 70%)`,
                width: `${60 + i * 25}px`,
                height: `${60 + i * 25}px`,
                left: `${15 + i * 10}%`,
                top: `${5 + i * 15}%`,
                animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
                animationDelay: `${i * 0.3}s`,
                transform: `translate(${mousePosition.x * (15 + i * 3)}px, ${mousePosition.y * (15 + i * 3)}px)`,
                transition: 'transform 0.2s ease-out'
              }}
            />
          ))}
        </div>
        
        {/* Particle system */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-yellow-400 rounded-full opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${2 + Math.random() * 3}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>
        
        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(240,255,38,0.15),transparent)]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-7xl">
        {/* Enhanced main heading with typing effect */}
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="relative inline-block mb-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-bold text-white mb-4 tracking-tight leading-none">
              Uncover
              <br />
              <span className="relative inline-block">
                <span 
                  className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent"
                  style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                >
                  {typedText}
                </span>
                <span className="animate-pulse">|</span>
              </span>
              <br />
              <span className="relative">
                in Seconds
                <Sparkles className="absolute -top-4 -right-8 w-8 h-8 text-yellow-400 animate-pulse" />
              </span>
            </h1>
            
            {/* Glow effect behind text */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-transparent blur-3xl -z-10" />
          </div>
        </div>

        {/* Enhanced subtitle with better animation */}
        <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Revolutionary AI-powered browser automation that discovers undocumented endpoints, 
            maps attack surfaces, and generates comprehensive Postman collections in real-time.
          </p>
        </div>

        {/* Enhanced feature highlights with icons */}
        <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex flex-wrap justify-center gap-6 lg:gap-8 mb-12">
            {[
              { icon: Zap, text: "Lightning Fast", color: "text-yellow-400" },
              { icon: Shield, text: "Undetectable", color: "text-blue-400" },
              { icon: Target, text: "Precision Mapping", color: "text-green-400" },
              { icon: Cpu, text: "AI-Powered", color: "text-purple-400" },
              { icon: Globe2, text: "Universal", color: "text-cyan-400" }
            ].map((feature, index) => {
              const Icon = feature.icon
              return (
                <div 
                  key={index}
                  className="group flex items-center space-x-3 px-4 py-2 rounded-full bg-black/30 border border-gray-700/50 backdrop-blur-sm hover:border-yellow-400/50 transition-all duration-300"
                >
                  <Icon className={`w-5 h-5 ${feature.color} group-hover:scale-110 transition-transform`} />
                  <span className="font-medium text-gray-300 group-hover:text-white transition-colors">
                    {feature.text}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Enhanced CTA buttons with advanced effects */}
        <div className={`transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* Primary CTA with advanced effects */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
              <button
                onClick={scrollToDashboard}
                className="relative px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold rounded-xl leading-none flex items-center space-x-3 transition-all duration-300 hover:scale-105"
              >
                <span className="text-lg">Start Free Discovery</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            
            {/* Secondary CTA */}
            <button className="group px-8 py-4 rounded-xl font-medium text-white border border-gray-600 hover:border-yellow-400/50 transition-all duration-300 hover:bg-gray-900/50 flex items-center space-x-3 backdrop-blur-sm">
              <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="text-lg">Watch Demo</span>
            </button>
          </div>
        </div>

        {/* Enhanced stats with better visual design */}
        <div className={`transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { value: "15K+", label: "APIs Discovered", icon: "🔍" },
              { value: "99.9%", label: "Success Rate", icon: "⚡" },
              { value: "< 15s", label: "Average Discovery", icon: "⏱️" }
            ].map((stat, index) => (
              <div 
                key={index}
                className="text-center p-6 rounded-2xl bg-black/20 border border-yellow-400/20 backdrop-blur-sm hover:border-yellow-400/40 transition-all duration-300 group"
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-3xl lg:text-4xl font-bold text-yellow-400 mb-2 group-hover:scale-110 transition-transform">
                  {stat.value}
                </div>
                <div className="text-gray-400 font-medium group-hover:text-gray-300 transition-colors">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center p-2">
            <div className="w-1 h-3 bg-yellow-400 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  )
}