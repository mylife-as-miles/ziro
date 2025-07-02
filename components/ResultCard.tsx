'use client'

import { Download, Copy, ExternalLink } from 'lucide-react'
import { useState } from 'react'

interface ResultCardProps {
  endpointCount: number
  crawlId: string
  postmanCollection: any
}

export default function ResultCard({ endpointCount, crawlId, postmanCollection }: ResultCardProps) {
  const [copied, setCopied] = useState(false)

  const handleDownloadPostman = () => {
    const blob = new Blob([JSON.stringify(postmanCollection, null, 2)], {
      type: 'application/json'
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url

    // Generate a safe filename from the collection name
    const collectionName = postmanCollection.info?.name || 'collection'
    const safeName = collectionName.replace(/[^a-zA-Z0-9.-]/g, '-').toLowerCase()
    a.download = `zir0-${safeName}.json`

    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleCopyCollection = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(postmanCollection, null, 2))
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="border-t border-gray-700/50 pt-4 xs:pt-6 sm:pt-8 lg:pt-10">
      <div className="text-center mb-4 xs:mb-6 sm:mb-8 lg:mb-10">
        <div className="inline-flex items-center justify-center w-10 h-10 xs:w-12 xs:h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 rounded-full mb-2 xs:mb-3 sm:mb-4 lg:mb-6 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(240, 255, 38, 0.2) 0%, rgba(240, 255, 38, 0.1) 100%)',
            border: '1px solid rgba(240, 255, 38, 0.3)'
          }}
        >
          <svg className="w-5 h-5 xs:w-6 xs:h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12" fill="none" stroke="#F0FF26" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg xs:text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-1 xs:mb-2 lg:mb-3 tracking-tight">Discovery Complete!</h3>
        <p className="text-xs xs:text-sm sm:text-base lg:text-lg xl:text-xl text-gray-400 font-medium tracking-tight px-1 xs:px-2">
          Found <span className="font-bold" style={{ color: '#F0FF26' }}>{endpointCount}</span> API endpoints
        </p>
      </div>

      <div className="space-y-2.5 xs:space-y-3 sm:space-y-4 lg:space-y-5">
        <button
          onClick={handleDownloadPostman}
          className="w-full flex items-center justify-center space-x-2 xs:space-x-2 sm:space-x-3 lg:space-x-4 py-2.5 xs:py-3 sm:py-4 lg:py-5 xl:py-6 px-3 xs:px-4 sm:px-6 lg:px-8 xl:px-10 rounded-lg xs:rounded-xl lg:rounded-2xl transition-all duration-200 text-white font-medium tracking-tight border border-gray-700/50 hover:border-gray-600 text-xs xs:text-sm sm:text-base lg:text-lg xl:text-xl"
          style={{
            background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(31, 41, 55, 0.4) 100%)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-1px)'
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          <Download className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7" />
          <span>Download Postman Collection</span>
        </button>

        <button
          onClick={handleCopyCollection}
          className="w-full flex items-center justify-center space-x-2 xs:space-x-2 sm:space-x-3 lg:space-x-4 py-2.5 xs:py-3 sm:py-4 lg:py-5 xl:py-6 px-3 xs:px-4 sm:px-6 lg:px-8 xl:px-10 rounded-lg xs:rounded-xl lg:rounded-2xl transition-all duration-200 text-white font-medium tracking-tight border border-gray-700/50 hover:border-gray-600 text-xs xs:text-sm sm:text-base lg:text-lg xl:text-xl"
          style={{
            background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(31, 41, 55, 0.4) 100%)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-1px)'
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = 'none'
          }}
          disabled={copied}
        >
          <Copy className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7" />
          <span>{copied ? 'Copied!' : 'Copy as JSON'}</span>
        </button>

        <div className="pt-3 xs:pt-4 sm:pt-6 lg:pt-8 border-t border-gray-700/50">
          <p className="text-xs xs:text-xs sm:text-sm lg:text-base xl:text-lg text-gray-500 mb-2 xs:mb-3 sm:mb-4 lg:mb-5 font-medium tracking-tight uppercase">
            POWERED BY ZIR0
          </p>
          <a
            href="https://docs.zir0.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 lg:space-x-3 text-gray-300 hover:text-white font-medium text-xs xs:text-xs sm:text-sm lg:text-base xl:text-lg transition-colors tracking-tight"
          >
            <span>Get your API key to build more</span>
            <ExternalLink className="w-3 h-3 xs:w-3 xs:h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6" />
          </a>
        </div>
      </div>
    </div>
  )
}