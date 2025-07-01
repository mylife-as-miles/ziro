'use client'

import { useEffect, useState } from 'react'

interface AdvancedLoaderProps {
  onComplete: () => void
}

export default function AdvancedLoader({ onComplete }: AdvancedLoaderProps) {
  const [progress, setProgress] = useState(0)
  const [stage, setStage] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(onComplete, 500)
          return 100
        }
        return prev + 2
      })
    }, 50)

    return () => clearInterval(timer)
  }, [onComplete])

  useEffect(() => {
    if (progress > 30) setStage(1)
    if (progress > 60) setStage(2)
    if (progress > 90) setStage(3)
  }, [progress])

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(240, 255, 38, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(240, 255, 38, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px sm:50px sm:50px',
          animation: 'grid-move 20s linear infinite'
        }} />
      </div>

      <div className="relative z-10 text-center px-4">
        {/* Logo animation */}
        <div className="mb-6 sm:mb-8 relative">
          <div className={`transition-all duration-1000 ${stage >= 1 ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-2">
              Zir<span style={{ color: '#F0FF26' }}>0</span>
            </h1>
            <div className="h-1 w-20 sm:w-24 md:w-32 mx-auto bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-60" />
          </div>
        </div>

        {/* Loading text */}
        <div className={`mb-6 sm:mb-8 transition-all duration-700 ${stage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="text-gray-400 text-base sm:text-lg font-medium tracking-wide">
            Initializing AI-Powered Discovery
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-64 sm:w-72 md:w-80 mx-auto mb-4 sm:mb-6">
          <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-yellow-400 to-yellow-300 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs sm:text-sm text-gray-500">
            <span>0%</span>
            <span className="text-yellow-400 font-medium">{progress}%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Loading stages */}
        <div className={`transition-all duration-500 ${stage >= 3 ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex items-center justify-center space-x-2 text-yellow-400">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
            <span className="text-xs sm:text-sm font-medium">Ready to discover hidden APIs</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(30px, 30px); }
        }
        @media (min-width: 640px) {
          @keyframes grid-move {
            0% { transform: translate(0, 0); }
            100% { transform: translate(50px, 50px); }
          }
        }
      `}</style>
    </div>
  )
}