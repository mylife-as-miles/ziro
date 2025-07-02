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
      text: "Ziro has completely transformed our API discovery process. What used to take days now takes minutes. The stealth capabilities are incredible.",
      highlight: "Days to minutes discovery",
      gradient: "from-blue-400 to-cyan-400"
    },
    {
      name: "Marcus Rodriguez",
      role: "DevOps Lead",
      company: "SecurityFirst",
      avatar: "MR", 
      rating: 5,
      text: "The precision and speed of Ziro's AI-powered discovery is unmatched. We've uncovered critical vulnerabilities that other tools completely missed.",
      highlight: "Unmatched precision and speed",
      gradient: "from-green-400 to-emerald-400"
    },
    {
      name: "Jennifer Park",
      role: "Cybersecurity Analyst",
      company: "DataShield",
      avatar: "JP",
      rating: 5,
      text: "The real-time analysis and comprehensive reporting make Ziro an essential tool for our security operations. Highly recommended.",
      highlight: "Essential security tool",
      gradient: "from-purple-400 to-pink-400"
    },
    {
      name: "Alex Thompson",
      role: "Principal Engineer",
      company: "CloudTech",
      avatar: "AT",
      rating: 5,
      text: "The real-time discovery capabilities are game-changing. We integrated Ziro into our CI/CD pipeline and now catch API vulnerabilities before they reach production.",
      highlight: "Game-changing capabilities",
      gradient: "from-orange-400 to-red-400"
    },
    {
      name: "Emily Watson",
      role: "CISO",
      company: "DataFlow Inc",
      avatar: "EW",
      rating: 5,
      text: "The comprehensive reporting and team collaboration features make Ziro perfect for enterprise use. Our security posture has improved dramatically.",
      highlight: "Dramatically improved security posture",
      gradient: "from-indigo-400 to-purple-400"
    },
    {
      name: "David Kim",
      role: "Security Consultant",
      company: "Independent",
      avatar: "DK",
      rating: 5,
      text: "As a consultant, I need tools that work reliably across different client environments. Ziro's AI-powered discovery adapts to any application architecture.",
      highlight: "Works across any architecture",
      gradient: "from-cyan-400 to-teal-400"
    }
  ]

  const stats = [
    { value: "98%", label: "Customer Satisfaction", subtext: "from security professionals" },
    { value: "10,000+", label: "APIs Discovered", subtext: "in the last month" },
    { value: "500+", label: "Security Teams", subtext: "trust Ziro daily" },
    { value: "99.9%", label: "Uptime", subtext: "enterprise-grade reliability" }
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
              left: `${20 + i * 15}%`,
              top: `${10 + i * 20}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${4 + i}s`
            }}
          />
        ))}
        
        {/* Animated grid */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(240, 255, 38, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(240, 255, 38, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '100px 100px',
              animation: 'gridFloat 20s ease-in-out infinite'
            }}
          />
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center space-x-2 mb-6">
            <Star className="w-6 h-6 text-yellow-400 fill-current" />
            <span className="text-yellow-400 font-semibold">Trusted by Professionals</span>
            <Star className="w-6 h-6 text-yellow-400 fill-current" />
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            See what security teams
            <br />
            around the world are saying about
            <br />
            <span className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
              Ziro
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Join thousands of security professionals who trust Ziro for their API discovery and security testing needs.
          </p>
        </div>

        {/* Testimonials showcase */}
        <div className={`mb-20 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Navigation dots */}
          <div className="flex justify-center space-x-3 mb-12">
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

          {/* Featured testimonial */}
          <div className="max-w-4xl mx-auto">
            <div className="relative bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm border border-gray-800 rounded-3xl p-8 lg:p-12">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-transparent rounded-3xl" />
              
              <div className="relative z-10">
                <Quote className="w-12 h-12 text-yellow-400 mb-6" />
                
                <blockquote className="text-xl lg:text-2xl text-white font-medium leading-relaxed mb-8">
                  "{testimonials[activeTestimonial].text}"
                </blockquote>
                
                <div className="flex items-center space-x-4">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${testimonials[activeTestimonial].gradient} flex items-center justify-center text-white font-bold text-lg`}>
                    {testimonials[activeTestimonial].avatar}
                  </div>
                  
                  <div className="flex-1">
                    <div className="text-white font-semibold text-lg">{testimonials[activeTestimonial].name}</div>
                    <div className="text-gray-400">{testimonials[activeTestimonial].role}</div>
                    <div className="text-yellow-400 font-medium">{testimonials[activeTestimonial].company}</div>
                  </div>
                  
                  <div className="flex space-x-1">
                    {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-yellow-400/10 rounded-xl border border-yellow-400/20">
                  <div className="text-yellow-400 font-semibold">Key Highlight:</div>
                  <div className="text-white">{testimonials[activeTestimonial].highlight}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials grid */}
        <div className={`mb-20 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="group relative bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-yellow-400/50 transition-all duration-300 hover:scale-105 cursor-pointer"
                onClick={() => setActiveTestimonial(index)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${testimonial.gradient} flex items-center justify-center text-white font-bold`}>
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="text-white font-semibold">{testimonial.name}</div>
                      <div className="text-gray-400 text-sm">{testimonial.role}</div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-gray-300 leading-relaxed text-sm line-clamp-4">
                    {testimonial.text}
                  </p>
                  
                  <div className="mt-4 text-yellow-400 text-sm font-medium">
                    {testimonial.company}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats section */}
        <div className={`transition-all duration-1000 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              Trusted by the Industry
            </h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Join thousands of security professionals who rely on Ziro for critical API discovery and security testing.
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-yellow-400 mb-2">{stat.value}</div>
                <div className="text-white font-semibold mb-1">{stat.label}</div>
                <div className="text-gray-400 text-sm">{stat.subtext}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
