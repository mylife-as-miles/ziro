'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Play, Zap, Shield, Target } from 'lucide-react'

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsVisible(true)
    
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
      return () => heroElement.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const scrollToDashboard = () => {
    document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black pt-14 sm:pt-16"
    >
      {/* Animated background */}
      <div className="absolute inset-0">
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(240, 255, 38, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(240, 255, 38, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px sm:75px sm:75px lg:100px lg:100px',
            transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`
          }}
        />
        
        {/* Floating orbs */}
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full opacity-20 animate-pulse"
              style={{
                background: 'radial-gradient(circle, rgba(240, 255, 38, 0.3) 0%, transparent 70%)',
                width: `${60 + i * 30}px`,
                height: `${60 + i * 30}px`,
                left: `${20 + i * 15}%`,
                top: `${10 + i * 20}%`,
                animationDelay: `${i * 0.5}s`,
                transform: `translate(${mousePosition.x * (10 + i * 5)}px, ${mousePosition.y * (10 + i * 5)}px)`
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main heading */}
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-4 sm:mb-6 tracking-tight leading-none">
            Uncover
            <br />
            <span 
              className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent"
              style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
            >
              Hidden APIs
            </span>
            <br />
            in Seconds
          </h1>
        </div>

        {/* Subtitle */}
        <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-400 mb-6 sm:mb-8 max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-4">
            AI-powered browser automation that discovers undocumented endpoints, 
            maps attack surfaces, and generates Postman collections instantly.
          </p>
        </div>

        {/* Feature highlights */}
        <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6 mb-8 sm:mb-12">
            <div className="flex items-center justify-center sm:justify-start space-x-2 text-gray-300">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
              <span className="font-medium text-sm sm:text-base">Lightning Fast</span>
            </div>
            <div className="flex items-center justify-center sm:justify-start space-x-2 text-gray-300">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
              <span className="font-medium text-sm sm:text-base">Undetectable</span>
            </div>
            <div className="flex items-center justify-center sm:justify-start space-x-2 text-gray-300">
              <Target className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
              <span className="font-medium text-sm sm:text-base">Precision Mapping</span>
            </div>
          </div>
        </div>

        {/* CTA buttons */}
        <div className={`transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
            <button
              onClick={scrollToDashboard}
              className="group w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-black transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center justify-center space-x-2 text-sm sm:text-base"
              style={{
                background: 'linear-gradient(135deg, #F0FF26 0%, #E0EF16 100%)',
                boxShadow: '0 10px 40px rgba(240, 255, 38, 0.3)'
              }}
            >
              <span>Start Free Discovery</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button className="group w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-medium text-white border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:bg-gray-900/50 flex items-center justify-center space-x-2 text-sm sm:text-base">
              <Play className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Watch Demo</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className={`transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-xl sm:max-w-2xl mx-auto px-4">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-2">10K+</div>
              <div className="text-gray-400 font-medium text-sm sm:text-base">APIs Discovered</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-2">99.9%</div>
              <div className="text-gray-400 font-medium text-sm sm:text-base">Undetected Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-2">&lt; 30s</div>
              <div className="text-gray-400 font-medium text-sm sm:text-base">Average Discovery</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-gray-600 rounded-full flex justify-center">
          <div className="w-1 h-2 sm:h-3 bg-gray-600 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  )
}