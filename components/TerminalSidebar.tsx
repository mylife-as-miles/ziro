'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Terminal } from 'lucide-react'

interface TerminalSidebarProps {
  logs: string[]
  isOpen: boolean
  onToggle: () => void
}

export default function TerminalSidebar({ logs, isOpen, onToggle }: TerminalSidebarProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (!isPaused && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [logs, isPaused])

  return (
    <>
      {/* Toggle Button - Bottom Right */}
      <button
        onClick={onToggle}
        className="fixed bottom-3 xs:bottom-4 sm:bottom-6 lg:bottom-8 right-3 xs:right-4 sm:right-6 lg:right-8 z-50 flex items-center space-x-1.5 xs:space-x-2 lg:space-x-3 px-2.5 xs:px-3 sm:px-4 lg:px-5 xl:px-6 py-1.5 xs:py-2 sm:py-3 lg:py-4 bg-black border border-gray-700 text-gray-300 rounded-md xs:rounded-lg lg:rounded-xl hover:bg-gray-900 hover:text-white transition-all duration-200 shadow-lg text-xs xs:text-xs sm:text-sm lg:text-base xl:text-lg"
        aria-label="Toggle terminal sidebar"
      >
        <Terminal className="w-3 h-3 xs:w-3 xs:h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6" />
        <span className="hidden xs:inline font-medium tracking-tight">Live Log</span>
        <span className="xs:hidden font-medium tracking-tight">Log</span>
        {isOpen ? <ChevronRight className="w-3 h-3 xs:w-3 xs:h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6" /> : <ChevronLeft className="w-3 h-3 xs:w-3 xs:h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6" />}
      </button>

      {/* Sidebar */}
      <div 
        className={`fixed top-0 right-0 h-full w-full xs:w-80 sm:w-80 lg:w-96 xl:w-[28rem] 2xl:w-[32rem] bg-black border-l border-gray-800 transform transition-transform duration-300 ease-in-out z-40 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-2.5 xs:p-3 sm:p-4 lg:p-5 xl:p-6 border-b border-gray-800">
            <div className="flex items-center space-x-1.5 xs:space-x-2 lg:space-x-3">
              <Terminal className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 text-gray-400" />
              <h3 className="text-gray-300 font-medium tracking-tight text-xs xs:text-sm sm:text-base lg:text-lg xl:text-xl">Crawl Terminal</h3>
            </div>
            <button
              onClick={onToggle}
              className="text-gray-500 hover:text-gray-300 transition-colors p-1"
              aria-label="Close terminal"
            >
              <ChevronRight className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7" />
            </button>
          </div>

          <div 
            ref={scrollRef}
            className="flex-1 p-2.5 xs:p-3 sm:p-4 lg:p-5 xl:p-6 overflow-y-auto scrollbar-hide font-mono text-xs xs:text-xs sm:text-sm lg:text-base xl:text-lg leading-relaxed space-y-0.5 xs:space-y-1"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {logs.length === 0 ? (
              <div className="text-gray-500 italic text-xs xs:text-sm lg:text-base">
                Waiting for crawl to start...
              </div>
            ) : (
              logs.map((log, index) => (
                <div key={index} className="break-all" style={{ color: '#F0FF26' }}>
                  <span className="text-gray-500 text-xs xs:text-xs lg:text-sm">[{new Date().toLocaleTimeString()}]</span>{' '}
                  <span className="text-xs xs:text-xs sm:text-sm lg:text-base xl:text-lg">{log}</span>
                </div>
              ))
            )}
          </div>

          {isPaused && (
            <div className="px-2.5 xs:px-3 sm:px-4 lg:px-5 xl:px-6 py-1.5 xs:py-2 lg:py-3 bg-gray-900 text-yellow-400 text-xs xs:text-xs sm:text-sm lg:text-base border-t border-gray-800">
              Auto-scroll paused (hover to continue)
            </div>
          )}
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 xs:hidden"
          onClick={onToggle}
        />
      )}
    </>
  )
}