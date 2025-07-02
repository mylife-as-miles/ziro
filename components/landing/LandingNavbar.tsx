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
      <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 3xl:px-20">
        <div className="flex items-center justify-between h-12 xs:h-14 sm:h-16 lg:h-18 xl:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-2 xs:space-x-2 sm:space-x-3 lg:space-x-4">
            <img src="/hb.svg" alt="Ziro" className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8" />
            <span className="text-base xs:text-lg sm:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-bold text-white tracking-tight">
              Zir<span style={{ color: '#F0FF26' }}>0</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4 lg:space-x-6 xl:space-x-8 2xl:space-x-10 3xl:space-x-12">
            <button 
              onClick={() => scrollToSection('features')}
              className="text-gray-400 hover:text-white transition-colors font-medium text-sm lg:text-base xl:text-lg 2xl:text-xl"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('pricing')}
              className="text-gray-400 hover:text-white transition-colors font-medium text-sm lg:text-base xl:text-lg 2xl:text-xl"
            >
              Pricing
            </button>
            <button 
              onClick={() => scrollToSection('testimonials')}
              className="text-gray-400 hover:text-white transition-colors font-medium text-sm lg:text-base xl:text-lg 2xl:text-xl"
            >
              Testimonials
            </button>
            <a
              href="https://docs.hyperbrowser.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors font-medium text-sm lg:text-base xl:text-lg 2xl:text-xl"
            >
              <BookOpen className="w-4 h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6" />
              <span>Docs</span>
            </a>
            <a
              href="https://github.com/hyperbrowserai"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors font-medium text-sm lg:text-base xl:text-lg 2xl:text-xl"
            >
              <Github className="w-4 h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6" />
              <span>GitHub</span>
            </a>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button
              onClick={() => scrollToSection('dashboard')}
              className="px-3 py-1.5 md:px-4 md:py-2 lg:px-6 lg:py-2 xl:px-8 xl:py-3 2xl:px-10 2xl:py-4 rounded-lg lg:rounded-xl font-medium transition-all duration-200 hover:scale-105 text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl"
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
            {isMobileMenuOpen ? <X className="w-5 h-5 xs:w-6 xs:h-6" /> : <Menu className="w-5 h-5 xs:w-6 xs:h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md border-b border-gray-800">
            <div className="px-3 xs:px-4 py-4 xs:py-6 space-y-3 xs:space-y-4">
              <button 
                onClick={() => scrollToSection('features')}
                className="block w-full text-left text-gray-400 hover:text-white transition-colors font-medium py-2 xs:py-3 text-sm xs:text-base"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('pricing')}
                className="block w-full text-left text-gray-400 hover:text-white transition-colors font-medium py-2 xs:py-3 text-sm xs:text-base"
              >
                Pricing
              </button>
              <button 
                onClick={() => scrollToSection('testimonials')}
                className="block w-full text-left text-gray-400 hover:text-white transition-colors font-medium py-2 xs:py-3 text-sm xs:text-base"
              >
                Testimonials
              </button>
              <a
                href="https://docs.hyperbrowser.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors font-medium py-2 xs:py-3 text-sm xs:text-base"
              >
                <BookOpen className="w-4 h-4 xs:w-5 xs:h-5" />
                <span>Docs</span>
              </a>
              <a
                href="https://github.com/hyperbrowserai"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors font-medium py-2 xs:py-3 text-sm xs:text-base"
              >
                <Github className="w-4 h-4 xs:w-5 xs:h-5" />
                <span>GitHub</span>
              </a>
              <button
                onClick={() => scrollToSection('dashboard')}
                className="w-full px-4 xs:px-6 py-3 xs:py-4 rounded-lg font-medium transition-all duration-200 mt-3 xs:mt-4 text-sm xs:text-base"
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