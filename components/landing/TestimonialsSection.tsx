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
      highlight: "47 undocumented endpoints discovered"
    },
    {
      name: "Marcus Rodriguez",
      role: "Penetration Tester",
      company: "SecureNet",
      avatar: "MR",
      rating: 5,
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
    <section id="testimonials" ref={sectionRef} className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Trusted by Security
            <br />
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">
              Professionals
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
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