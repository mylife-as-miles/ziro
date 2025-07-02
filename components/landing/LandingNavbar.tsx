'use client'

import { useState, useEffect } from 'react'
import { Menu, X, ExternalLink, Github, BookOpen, Sparkles } from 'lucide-react'

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
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-black/90 backdrop-blur-xl border-b border-yellow-400/20 shadow-lg shadow-yellow-400/10' 
          : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Enhanced Logo */}
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="relative">
                <img src="/hb.svg" alt="Ziro" className="w-8 h-8 lg:w-10 lg:h-10 group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 bg-yellow-400/20 rounded-full blur group-hover:bg-yellow-400/40 transition-all duration-300" />
              </div>
              <span className="text-xl lg:text-2xl font-bold text-white tracking-tight group-hover:text-yellow-400 transition-colors duration-300">
                Zir<span className="text-yellow-400">0</span>
              </span>
              <Sparkles className="w-4 h-4 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Enhanced Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {[
                { label: 'Features', id: 'features' },
                { label: 'Pricing', id: 'pricing' },
                { label: 'Testimonials', id: 'testimonials' }
              ].map((item) => (
                <button 
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="relative text-gray-400 hover:text-white transition-colors font-medium text-base lg:text-lg group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
              
              <a
                href="https://docs.zir0.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors font-medium text-base lg:text-lg group"
              >
                <BookOpen className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Docs</span>
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              
              <a
                href="https://github.com/zir0ai"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors font-medium text-base lg:text-lg group"
              >
                <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>GitHub</span>
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>

            {/* Enhanced CTA Button */}
            <div className="hidden md:block">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-xl blur opacity-0 group-hover:opacity-75 transition duration-300" />
                <button
                  onClick={() => scrollToSection('dashboard')}
                  className="relative px-6 py-3 rounded-lg lg:rounded-xl font-semibold transition-all duration-300 hover:scale-105 text-base lg:text-lg bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-300 hover:to-yellow-400"
                >
                  Try Ziro Free
                </button>
              </div>
            </div>

            {/* Enhanced Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-900/50"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-yellow-400/20 shadow-lg shadow-yellow-400/10">
            <div className="px-4 py-6 space-y-4">
              {[
                { label: 'Features', id: 'features' },
                { label: 'Pricing', id: 'pricing' },
                { label: 'Testimonials', id: 'testimonials' }
              ].map((item) => (
                <button 
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left text-gray-400 hover:text-white transition-colors font-medium py-3 text-base hover:bg-gray-900/30 rounded-lg px-3"
                >
                  {item.label}
                </button>
              ))}
              
              <a
                href="https://docs.zir0.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors font-medium py-3 px-3 hover:bg-gray-900/30 rounded-lg"
              >
                <BookOpen className="w-5 h-5" />
                <span>Docs</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              
              <a
                href="https://github.com/zir0ai"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors font-medium py-3 px-3 hover:bg-gray-900/30 rounded-lg"
              >
                <Github className="w-5 h-5" />
                <span>GitHub</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              
              <div className="pt-4">
                <button
                  onClick={() => scrollToSection('dashboard')}
                  className="w-full px-6 py-4 rounded-lg font-semibold transition-all duration-300 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-300 hover:to-yellow-400"
                >
                  Try Ziro Free
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}