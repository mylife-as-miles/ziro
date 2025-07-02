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
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black pt-14 xs:pt-16 sm:pt-16 lg:pt-20"
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
            backgroundSize: '30px 30px xs:40px xs:40px sm:50px sm:50px md:60px md:60px lg:75px lg:75px xl:85px xl:85px 2xl:100px 2xl:100px 3xl:120px 3xl:120px',
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
                width: `${40 + i * 20}px`,
                height: `${40 + i * 20}px`,
                left: `${20 + i * 15}%`,
                top: `${10 + i * 20}%`,
                animationDelay: `${i * 0.5}s`,
                transform: `translate(${mousePosition.x * (10 + i * 5)}px, ${mousePosition.y * (10 + i * 5)}px)`
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 3xl:px-20 text-center max-w-7xl 3xl:max-w-9xl">
        {/* Main heading */}
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl 3xl:text-[10rem] 4xl:text-[12rem] font-bold text-white mb-3 xs:mb-4 sm:mb-6 lg:mb-8 tracking-tight leading-none">
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
          <p className="text-base xs:text-lg sm:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl 3xl:text-5xl text-gray-400 mb-6 sm:mb-8 lg:mb-12 max-w-xl xs:max-w-2xl lg:max-w-4xl 2xl:max-w-6xl 3xl:max-w-8xl mx-auto leading-relaxed px-2 xs:px-4">
            AI-powered browser automation that discovers undocumented endpoints, 
            maps attack surfaces, and generates Postman collections instantly.
          </p>
        </div>

        {/* Feature highlights */}
        <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex flex-col xs:flex-row sm:flex-row flex-wrap justify-center gap-3 xs:gap-4 sm:gap-6 lg:gap-8 xl:gap-10 2xl:gap-12 mb-6 xs:mb-8 sm:mb-12 lg:mb-16">
            <div className="flex items-center justify-center sm:justify-start space-x-2 lg:space-x-3 text-gray-300">
              <Zap className="w-4 h-4 xs:w-4 xs:h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 2xl:w-8 2xl:h-8 text-yellow-400" />
              <span className="font-medium text-sm xs:text-sm sm:text-base lg:text-lg xl:text-xl 2xl:text-2xl">Lightning Fast</span>
            </div>
            <div className="flex items-center justify-center sm:justify-start space-x-2 lg:space-x-3 text-gray-300">
              <Shield className="w-4 h-4 xs:w-4 xs:h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 2xl:w-8 2xl:h-8 text-yellow-400" />
              <span className="font-medium text-sm xs:text-sm sm:text-base lg:text-lg xl:text-xl 2xl:text-2xl">Undetectable</span>
            </div>
            <div className="flex items-center justify-center sm:justify-start space-x-2 lg:space-x-3 text-gray-300">
              <Target className="w-4 h-4 xs:w-4 xs:h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 2xl:w-8 2xl:h-8 text-yellow-400" />
              <span className="font-medium text-sm xs:text-sm sm:text-base lg:text-lg xl:text-xl 2xl:text-2xl">Precision Mapping</span>
            </div>
          </div>
        </div>

        {/* CTA buttons */}
        <div className={`transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex flex-col xs:flex-col sm:flex-row gap-3 xs:gap-4 sm:gap-4 lg:gap-6 justify-center items-center px-2 xs:px-4">
            <button
              onClick={scrollToDashboard}
              className="group w-full xs:w-full sm:w-auto px-5 xs:px-6 sm:px-8 lg:px-10 xl:px-12 2xl:px-16 py-3 xs:py-3 sm:py-4 lg:py-5 xl:py-6 2xl:py-8 rounded-xl lg:rounded-2xl font-bold text-black transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center justify-center space-x-2 lg:space-x-3 text-sm xs:text-sm sm:text-base lg:text-lg xl:text-xl 2xl:text-2xl"
              style={{
                background: 'linear-gradient(135deg, #F0FF26 0%, #E0EF16 100%)',
                boxShadow: '0 10px 40px rgba(240, 255, 38, 0.3)'
              }}
            >
              <span>Start Free Discovery</span>
              <ArrowRight className="w-4 h-4 xs:w-4 xs:h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 2xl:w-8 2xl:h-8 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button className="group w-full xs:w-full sm:w-auto px-5 xs:px-6 sm:px-8 lg:px-10 xl:px-12 2xl:px-16 py-3 xs:py-3 sm:py-4 lg:py-5 xl:py-6 2xl:py-8 rounded-xl lg:rounded-2xl font-medium text-white border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:bg-gray-900/50 flex items-center justify-center space-x-2 lg:space-x-3 text-sm xs:text-sm sm:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
              <Play className="w-4 h-4 xs:w-4 xs:h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 2xl:w-8 2xl:h-8" />
              <span>Watch Demo</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className={`transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="mt-8 xs:mt-12 sm:mt-16 lg:mt-20 xl:mt-24 2xl:mt-32 grid grid-cols-1 xs:grid-cols-3 sm:grid-cols-3 gap-4 xs:gap-6 sm:gap-8 lg:gap-12 xl:gap-16 2xl:gap-20 max-w-sm xs:max-w-xl sm:max-w-2xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto px-2 xs:px-4">
            <div className="text-center">
              <div className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-yellow-400 mb-1 xs:mb-2 lg:mb-3">10K+</div>
              <div className="text-gray-400 font-medium text-xs xs:text-sm sm:text-base lg:text-lg xl:text-xl 2xl:text-2xl">APIs Discovered</div>
            </div>
            <div className="text-center">
              <div className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-yellow-400 mb-1 xs:mb-2 lg:mb-3">99.9%</div>
              <div className="text-gray-400 font-medium text-xs xs:text-sm sm:text-base lg:text-lg xl:text-xl 2xl:text-2xl">Undetected Rate</div>
            </div>
            <div className="text-center">
              <div className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-yellow-400 mb-1 xs:mb-2 lg:mb-3">&lt; 30s</div>
              <div className="text-gray-400 font-medium text-xs xs:text-sm sm:text-base lg:text-lg xl:text-xl 2xl:text-2xl">Average Discovery</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 xs:bottom-6 sm:bottom-8 lg:bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-4 h-6 xs:w-5 xs:h-8 sm:w-6 sm:h-10 lg:w-7 lg:h-12 xl:w-8 xl:h-14 border-2 border-gray-600 rounded-full flex justify-center">
          <div className="w-1 h-2 xs:h-2 sm:h-3 lg:h-4 xl:h-5 bg-gray-600 rounded-full mt-1 xs:mt-2 lg:mt-3 animate-pulse" />
        </div>
      </div>
    </section>
  )
}