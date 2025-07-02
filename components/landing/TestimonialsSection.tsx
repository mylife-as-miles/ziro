'use client'

import { useEffect, useRef, useState } from 'react'
import { Star, Quote } from 'lucide-react'

export default function TestimonialsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
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
      setActiveTestimonial(prev => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Senior Security Engineer",
      company: "TechCorp",
      avatar: "SC",
      rating: 5,
      text: "Ziro discovered 47 undocumented API endpoints in our main application that our manual testing missed. The stealth mode is incredible - completely undetected by our WAF.",
      highlight: "47 undocumented endpoints discovered",
      gradient: "from-blue-400 to-cyan-400"
    },
    {
      name: "Marcus Rodriguez",
      role: "Penetration Tester", 
      company: "SecureNet",
      avatar: "MR",
      rating: 5,
      text: "As a pen tester, I've tried every API discovery tool out there. Ziro's AI-powered approach finds endpoints that others simply can't. It's become essential to my workflow.",
      highlight: "Essential to my workflow",
      gradient: "from-green-400 to-emerald-400"
    },
    {
      name: "Dr. Emily Watson",
      role: "CISO",
      company: "DataFlow Systems",
      avatar: "EW",
      rating: 5,
      text: "Ziro helped us identify critical security gaps in our API infrastructure. The detailed reports and Postman integration saved our team weeks of manual work.",
      highlight: "Weeks of manual work saved",
      gradient: "from-purple-400 to-pink-400"
    },
    {
      name: "Alex Kumar",
      role: "DevSecOps Lead",
      company: "CloudBase",
      avatar: "AK", 
      rating: 5,
      text: "The real-time discovery capabilities are game-changing. We integrated Ziro into our CI/CD pipeline and now catch API vulnerabilities before they reach production.",
      highlight: "Game-changing capabilities",
      gradient: "from-orange-400 to-red-400"
    }
  ]
      text: "This tool has revolutionized our API discovery process. What used to take weeks now takes minutes. The Postman integration saves us hours of manual work.",
      highlight: "Weeks to minutes discovery time"
    },
    {
      name: "Emily Watson",
      role: "CISO",
      company: "DataFlow Inc",
      avatar: "EW",
      rating: 5,
      text: "The comprehensive reporting and team collaboration features make Ziro perfect for enterprise use. Our security posture has improved dramatically.",
      highlight: "Dramatically improved security posture"
    },
    {
      name: "David Kim",
      role: "Security Consultant",
      company: "Independent",
      avatar: "DK",
      rating: 5,
      text: "As a consultant, I need tools that work reliably across different client environments. Ziro's AI-powered discovery adapts to any application architecture.",
      highlight: "Works across any architecture"
    },
    {
      name: "Lisa Thompson",
      role: "DevSecOps Lead",
      company: "CloudBase",
      avatar: "LT",
      rating: 5,
      text: "The real-time monitoring and instant export capabilities fit perfectly into our CI/CD pipeline. Security testing has never been this efficient.",
      highlight: "Perfect CI/CD integration"
    }
  ]

  return (
    <section id="testimonials" ref={sectionRef} className="relative py-24 lg:py-32 bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(240,255,38,0.1),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_80%,rgba(59,130,246,0.05),transparent)]" />
        
        {/* Floating quote marks */}
        {[...Array(6)].map((_, i) => (
          <Quote 
            key={i}
            className="absolute w-8 h-8 text-yellow-400/10 animate-float"
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 2) * 40}%`,
              animationDelay: `${i * 2}s`,
              animationDuration: `${4 + i}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center space-x-2 mb-6">
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <span className="text-yellow-400 font-semibold">4.9/5 Average Rating</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Trusted by Security
            <br />
            <span className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
              Professionals Worldwide
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            See what industry experts are saying about Ziro's revolutionary approach to API discovery and security testing.
          </p>
        </div>

        {/* Enhanced testimonials grid */}
        <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => {
              const isActive = activeTestimonial === index
              
              return (
                <div
                  key={index}
                  className={`group relative p-8 rounded-3xl border transition-all duration-500 ${
                    isActive 
                      ? 'border-yellow-400/50 bg-gradient-to-br from-yellow-400/10 via-transparent to-transparent scale-105 shadow-2xl shadow-yellow-400/20' 
                      : 'border-gray-800 bg-black/20 hover:border-gray-700 hover:bg-gray-900/30'
                  }`}
                  onClick={() => setActiveTestimonial(index)}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  {/* Quote decoration */}
                  <div className={`absolute top-4 right-4 transition-all duration-300 ${
                    isActive ? 'text-yellow-400 scale-110' : 'text-gray-600 group-hover:text-gray-500'
                  }`}>
                    <Quote className="w-8 h-8" />
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 fill-current transition-colors duration-300 ${
                        isActive ? 'text-yellow-400' : 'text-gray-400 group-hover:text-yellow-400'
                      }`} />
                    ))}
                  </div>

                  {/* Testimonial text */}
                  <blockquote className={`text-lg leading-relaxed mb-6 transition-colors duration-300 ${
                    isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'
                  }`}>
                    "{testimonial.text}"
                  </blockquote>

                  {/* Highlight */}
                  <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-6 transition-all duration-300 ${
                    isActive 
                      ? 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/30' 
                      : 'bg-gray-800 text-gray-400 group-hover:bg-gray-700 group-hover:text-gray-300'
                  }`}>
                    💡 {testimonial.highlight}
                  </div>

                  {/* Author */}
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white font-bold transition-transform duration-300 group-hover:scale-110`}>
                      {testimonial.avatar}
                    </div>
                    
                    <div>
                      <div className={`font-semibold transition-colors duration-300 ${
                        isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'
                      }`}>
                        {testimonial.name}
                      </div>
                      <div className={`text-sm transition-colors duration-300 ${
                        isActive ? 'text-gray-400' : 'text-gray-500 group-hover:text-gray-400'
                      }`}>
                        {testimonial.role} at {testimonial.company}
                      </div>
                    </div>
                  </div>

                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute bottom-4 right-4">
                      <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse" />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Navigation dots */}
        <div className={`flex justify-center space-x-3 mt-12 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeTestimonial === index 
                  ? 'bg-yellow-400 scale-125' 
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
              onClick={() => setActiveTestimonial(index)}
            />
          ))}
        </div>

        {/* Stats section */}
        <div className={`mt-20 transition-all duration-1000 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { value: "10,000+", label: "Security Professionals" },
              { value: "4.9/5", label: "Average Rating" },
              { value: "99.2%", label: "Customer Satisfaction" },
              { value: "500+", label: "Enterprise Clients" }
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-3xl lg:text-4xl font-bold text-yellow-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.value}
                </div>
                <div className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
            See what security teams around the world are saying about Ziro
          </p>
        </div>

        {/* Main Testimonial */}
        <div className={`max-w-4xl mx-auto mb-16 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="relative p-8 md:p-12 rounded-3xl border border-gray-800 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm">
            <Quote className="absolute top-6 left-6 w-8 h-8 text-yellow-400/30" />
            
            <div className="text-center">
              <div className="flex justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <blockquote className="text-xl md:text-2xl text-gray-200 leading-relaxed mb-8 font-medium">
                "{testimonials[activeTestimonial].text}"
              </blockquote>
              
              <div className="inline-flex items-center space-x-4 p-4 rounded-2xl bg-yellow-400/10 border border-yellow-400/20">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center text-black font-bold text-lg">
                  {testimonials[activeTestimonial].avatar}
                </div>
                <div className="text-left">
                  <div className="text-white font-bold text-lg">
                    {testimonials[activeTestimonial].name}
                  </div>
                  <div className="text-gray-400">
                    {testimonials[activeTestimonial].role}
                  </div>
                  <div className="text-yellow-400 font-medium">
                    {testimonials[activeTestimonial].company}
                  </div>
                </div>
              </div>
              
              <div className="mt-6 inline-block px-4 py-2 rounded-full bg-green-500/20 border border-green-500/30">
                <span className="text-green-400 font-medium text-sm">
                  ✓ {testimonials[activeTestimonial].highlight}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial Navigation */}
        <div className={`flex justify-center space-x-3 mb-16 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeTestimonial === index 
                  ? 'bg-yellow-400 scale-125' 
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
            />
          ))}
        </div>

        {/* All Testimonials Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {testimonials.slice(0, 6).map((testimonial, index) => (
            <div
              key={index}
              className="p-6 rounded-xl border border-gray-800 bg-gray-900/30 hover:border-gray-700 hover:bg-gray-900/50 transition-all duration-300 hover:scale-105"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center text-white font-bold">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="text-white font-medium">{testimonial.name}</div>
                  <div className="text-gray-400 text-sm">{testimonial.role}</div>
                </div>
              </div>
              
              <div className="flex mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <p className="text-gray-300 text-sm leading-relaxed">
                "{testimonial.text.substring(0, 120)}..."
              </p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className={`mt-16 grid grid-cols-1 md:grid-cols-4 gap-8 text-center transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div>
            <div className="text-3xl font-bold text-yellow-400 mb-2">4.9/5</div>
            <div className="text-gray-400">Average Rating</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-yellow-400 mb-2">500+</div>
            <div className="text-gray-400">Security Teams</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-yellow-400 mb-2">50K+</div>
            <div className="text-gray-400">APIs Discovered</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-yellow-400 mb-2">99.9%</div>
            <div className="text-gray-400">Uptime</div>
          </div>
        </div>
      </div>
    </section>
  )
}