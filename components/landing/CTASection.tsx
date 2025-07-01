'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Zap, Shield, Target } from 'lucide-react'

export default function CTASection() {
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
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
      className="relative py-20 bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0">
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(240, 255, 38, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(240, 255, 38, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`
          }}
        />
        
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
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
            Ready to Uncover
            <br />
            <span className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
              Hidden APIs?
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto mb-12 leading-relaxed">
            Join thousands of security professionals who trust Ziro to discover 
            critical vulnerabilities and map complete attack surfaces in seconds.
          </p>

          {/* Feature highlights */}
          <div className={`flex flex-wrap justify-center gap-8 mb-12 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex items-center space-x-3 text-gray-300">
              <div className="w-12 h-12 rounded-full bg-yellow-400/20 flex items-center justify-center">
                <Zap className="w-6 h-6 text-yellow-400" />
              </div>
              <div className="text-left">
                <div className="font-bold text-white">Lightning Fast</div>
                <div className="text-sm text-gray-400">Seconds, not hours</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 text-gray-300">
              <div className="w-12 h-12 rounded-full bg-blue-400/20 flex items-center justify-center">
                <Shield className="w-6 h-6 text-blue-400" />
              </div>
              <div className="text-left">
                <div className="font-bold text-white">Undetectable</div>
                <div className="text-sm text-gray-400">99.9% stealth rate</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 text-gray-300">
              <div className="w-12 h-12 rounded-full bg-green-400/20 flex items-center justify-center">
                <Target className="w-6 h-6 text-green-400" />
              </div>
              <div className="text-left">
                <div className="font-bold text-white">Comprehensive</div>
                <div className="text-sm text-gray-400">Complete coverage</div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-6 justify-center items-center mb-12 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <button
              onClick={scrollToDashboard}
              className="group px-10 py-5 rounded-2xl font-bold text-black text-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl flex items-center space-x-3"
              style={{
                background: 'linear-gradient(135deg, #F0FF26 0%, #E0EF16 100%)',
                boxShadow: '0 20px 60px rgba(240, 255, 38, 0.4)'
              }}
            >
              <span>Start Free Discovery</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </button>
            
            <button className="group px-10 py-5 rounded-2xl font-medium text-white text-lg border-2 border-gray-600 hover:border-gray-500 transition-all duration-300 hover:bg-gray-900/50 flex items-center space-x-3">
              <span>Watch 2-Min Demo</span>
              <div className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center">
                <div className="w-0 h-0 border-l-4 border-l-current border-y-2 border-y-transparent ml-0.5" />
              </div>
            </button>
          </div>

          {/* Trust indicators */}
          <div className={`transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex flex-wrap justify-center items-center gap-8 text-gray-500 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span>No credit card required</span>
              </div>
              <div className="w-1 h-4 bg-gray-700" />
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                <span>30-day money back guarantee</span>
              </div>
              <div className="w-1 h-4 bg-gray-700" />
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                <span>SOC 2 compliant</span>
              </div>
            </div>
          </div>

          {/* Final stats */}
          <div className={`mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
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