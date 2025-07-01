'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

export default function FAQSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [openFAQ, setOpenFAQ] = useState<number | null>(0)
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

  const faqs = [
    {
      question: "How does Ziro remain undetected by security systems?",
      answer: "Ziro uses advanced browser automation with human-like behavior patterns, rotating IP addresses, realistic timing delays, and sophisticated fingerprint masking. Our stealth technology has a 99.9% success rate against modern WAFs and bot detection systems."
    },
    {
      question: "What types of APIs can Ziro discover?",
      answer: "Ziro can discover REST APIs, GraphQL endpoints, WebSocket connections, internal microservices, admin panels, debug endpoints, and even undocumented legacy APIs. It analyzes JavaScript code, network requests, and performs intelligent crawling to map the complete attack surface."
    },
    {
      question: "Is Ziro legal to use for security testing?",
      answer: "Yes, when used on systems you own or have explicit permission to test. Ziro is designed for legitimate security testing, penetration testing, and bug bounty programs. Always ensure you have proper authorization before testing any system."
    },
    {
      question: "How accurate are the discovered endpoints?",
      answer: "Ziro has a 95%+ accuracy rate for endpoint discovery. Our AI filters out false positives and validates endpoints through multiple verification methods. Each discovered endpoint includes detailed metadata about parameters, authentication requirements, and response formats."
    },
    {
      question: "Can I integrate Ziro with my existing security tools?",
      answer: "Absolutely! Ziro exports to Postman, OpenAPI/Swagger, Burp Suite, and custom JSON formats. We also provide REST APIs for integration with CI/CD pipelines, SIEM systems, and vulnerability management platforms."
    },
    {
      question: "What's included in the free trial?",
      answer: "The free trial includes 10 API discoveries, basic stealth mode, Postman export, and email support. No credit card required. You can upgrade anytime to access advanced features and higher limits."
    },
    {
      question: "How does pricing work for team accounts?",
      answer: "Team pricing is based on the number of discoveries per month, not individual users. The Professional plan includes 5 team members, and Enterprise plans support unlimited users. Contact us for custom enterprise pricing."
    },
    {
      question: "What kind of support do you provide?",
      answer: "We offer email support for all plans, priority support for Professional users, and 24/7 dedicated support for Enterprise customers. Our team includes security experts who understand the unique challenges of API discovery and testing."
    }
  ]

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  return (
    <section ref={sectionRef} className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Frequently Asked
            <br />
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Everything you need to know about Ziro and API discovery
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFAQ === index
              
              return (
                <div
                  key={index}
                  className={`border border-gray-800 rounded-xl overflow-hidden transition-all duration-500 hover:border-gray-700 ${
                    isOpen ? 'bg-gray-900/50' : 'bg-gray-900/20'
                  } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-900/30 transition-colors duration-200"
                  >
                    <h3 className="text-lg font-bold text-white pr-4">
                      {faq.question}
                    </h3>
                    <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    </div>
                  </button>
                  
                  <div className={`transition-all duration-300 overflow-hidden ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="p-6 pt-0 border-t border-gray-800">
                      <p className="text-gray-300 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className={`text-center mt-16 transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-2xl mx-auto p-8 rounded-2xl border border-gray-800 bg-gray-900/30">
            <h3 className="text-2xl font-bold text-white mb-4">
              Still have questions?
            </h3>
            <p className="text-gray-400 mb-6">
              Our security experts are here to help you get the most out of Ziro
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 rounded-lg font-medium text-white border border-gray-700 hover:border-gray-600 hover:bg-gray-900/50 transition-all duration-200">
                Contact Support
              </button>
              <button className="px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #F0FF26 0%, #E0EF16 100%)',
                  color: '#000000'
                }}
              >
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}