'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

interface AdvancedLoaderProps {
  onComplete: () => void
}

export default function AdvancedLoader({ onComplete }: AdvancedLoaderProps) {
  const [progress, setProgress] = useState(0)
  const [stage, setStage] = useState(0)
  const [isCompleting, setIsCompleting] = useState(false)

  const stages = [
    "Initializing AI Systems...",
    "Loading Neural Networks...", 
    "Preparing Discovery Engine...",
    "Optimizing Performance...",
    "Finalizing Setup..."
  ]

  useEffect(() => {
    const duration = 3000 // 3 seconds total
    const interval = 50 // Update every 50ms
    const increment = 100 / (duration / interval)

    const timer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + increment
        
        // Update stage based on progress
        const newStage = Math.min(Math.floor(newProgress / 20), stages.length - 1)
        setStage(newStage)
        
        if (newProgress >= 100) {
          clearInterval(timer)
          setIsCompleting(true)
          
          // Complete after a brief pause
          setTimeout(() => {
            onComplete()
          }, 800)
          
          return 100
        }
        
        return newProgress
      })
    }, interval)

    return () => clearInterval(timer)
  }, [onComplete, stages.length])

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50 overflow-hidden">
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
            backgroundSize: '50px 50px',
            animation: 'gridFloat 20s ease-in-out infinite'
          }}
        />
        
        {/* Floating particles */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
        
        {/* Radial gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(240,255,38,0.15),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_80%,rgba(59,130,246,0.1),transparent)]" />
      </div>

      {/* Main loader content */}
      <div className="relative z-10 text-center max-w-md mx-auto px-6">
        {/* Logo with animation */}
        <div className="mb-12">
          <div className="relative inline-block">
            <Image
              src="/hb.svg"
              alt="Ziro"
              width={64}
              height={64}
              className="w-16 h-16 mx-auto mb-4 animate-pulse"
              style={{
                filter: 'drop-shadow(0 0 20px rgba(240, 255, 38, 0.5))'
              }}
            />
            <div className="absolute inset-0 bg-yellow-400/20 rounded-full blur-xl animate-pulse" />
          </div>
          
          <h1 className="text-4xl font-bold text-white mb-2">
            Zir<span className="text-yellow-400">0</span>
          </h1>
          
          <p className="text-gray-400 text-lg">
            Intelligent API Discovery
          </p>
        </div>

        {/* Enhanced progress section */}
        <div className="space-y-6">
          {/* Stage indicator */}
          <div className={`transition-all duration-500 ${isCompleting ? 'opacity-0 translate-y-4' : 'opacity-100'}`}>
            <p className="text-yellow-400 font-medium mb-2 min-h-[24px]">
              {stages[stage]}
            </p>
          </div>

          {/* Progress bar */}
          <div className="relative">
            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full transition-all duration-300 ease-out relative"
                style={{ width: `${progress}%` }}
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent shimmer" />
              </div>
            </div>
            
            {/* Progress percentage */}
            <div className="flex justify-between mt-2 text-sm text-gray-500">
              <span>Loading...</span>
              <span>{Math.round(progress)}%</span>
            </div>
          </div>

          {/* Loading dots */}
          <div className="flex justify-center space-x-2 mt-8">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"
                style={{
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: '1s'
                }}
              />
            ))}
          </div>
        </div>

        {/* Completion animation */}
        {isCompleting && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center animate-in fade-in zoom-in duration-500">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 flex items-center justify-center">
                <svg className="w-10 h-10 text-black" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-white text-xl font-bold">Ready to Launch!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}