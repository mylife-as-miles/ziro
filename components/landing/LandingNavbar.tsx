'use client'

import { useState, useEffect } from 'react'
import { Menu, X, ExternalLink, Github, BookOpen } from 'lucide-react'

export default function LandingNavbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      isScrolled 
        ? 'bg-black/95 backdrop-blur-md border-b border-gray-800' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <img src="/hb.svg" alt="Ziro" className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Zir<span style={{ color: '#F0FF26' }}>0</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <button 
              onClick={() => scrollToSection('features')}
              className="text-gray-400 hover:text-white transition-colors font-medium text-sm xl:text-base"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('pricing')}
              className="text-gray-400 hover:text-white transition-colors font-medium text-sm xl:text-base"
            >
              Pricing
            </button>
            <button 
              onClick={() => scrollToSection('testimonials')}
              className="text-gray-400 hover:text-white transition-colors font-medium text-sm xl:text-base"
            >
              Testimonials
            </button>
            <a
              href="https://docs.hyperbrowser.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors font-medium text-sm xl:text-base"
            >
              <BookOpen className="w-4 h-4" />
              <span>Docs</span>
            </a>
            <a
              href="https://github.com/hyperbrowserai"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors font-medium text-sm xl:text-base"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button
              onClick={() => scrollToSection('dashboard')}
              className="px-4 py-2 lg:px-6 lg:py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 text-sm lg:text-base"
              style={{
                background: 'linear-gradient(135deg, #F0FF26 0%, #E0EF16 100%)',
                color: '#000000'
              }}
            >
              Try Ziro Free
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-400 hover:text-white transition-colors p-1"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md border-b border-gray-800">
            <div className="px-4 py-6 space-y-4">
              <button 
                onClick={() => scrollToSection('features')}
                className="block w-full text-left text-gray-400 hover:text-white transition-colors font-medium py-2"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('pricing')}
                className="block w-full text-left text-gray-400 hover:text-white transition-colors font-medium py-2"
              >
                Pricing
              </button>
              <button 
                onClick={() => scrollToSection('testimonials')}
                className="block w-full text-left text-gray-400 hover:text-white transition-colors font-medium py-2"
              >
                Testimonials
              </button>
              <a
                href="https://docs.hyperbrowser.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors font-medium py-2"
              >
                <BookOpen className="w-4 h-4" />
                <span>Docs</span>
              </a>
              <a
                href="https://github.com/hyperbrowserai"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors font-medium py-2"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <button
                onClick={() => scrollToSection('dashboard')}
                className="w-full px-6 py-3 rounded-lg font-medium transition-all duration-200 mt-4"
                style={{
                  background: 'linear-gradient(135deg, #F0FF26 0%, #E0EF16 100%)',
                  color: '#000000'
                }}
              >
                Try Ziro Free
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}