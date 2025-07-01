'use client'

import { useEffect, useRef, useState } from 'react'
import { Check, Zap, Crown, Building } from 'lucide-react'

export default function PricingSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [isAnnual, setIsAnnual] = useState(false)
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

  const plans = [
    {
      name: "Starter",
      icon: Zap,
      description: "Perfect for individual security researchers",
      monthlyPrice: 29,
      annualPrice: 290,
      features: [
        "100 API discoveries per month",
        "Basic stealth mode",
        "Postman collection export",
        "Email support",
        "Basic reporting",
        "Single user account"
      ],
      popular: false,
      color: "gray"
    },
    {
      name: "Professional",
      icon: Crown,
      description: "Ideal for security teams and consultants",
      monthlyPrice: 99,
      annualPrice: 990,
      features: [
        "1,000 API discoveries per month",
        "Advanced stealth mode",
        "All export formats",
        "Priority support",
        "Advanced reporting",
        "Team collaboration (5 users)",
        "Custom integrations",
        "API access"
      ],
      popular: true,
      color: "yellow"
    },
    {
      name: "Enterprise",
      icon: Building,
      description: "For large organizations with custom needs",
      monthlyPrice: null,
      annualPrice: null,
      features: [
        "Unlimited API discoveries",
        "Enterprise stealth mode",
        "Custom export formats",
        "24/7 dedicated support",
        "Custom reporting",
        "Unlimited team members",
        "On-premise deployment",
        "SLA guarantees",
        "Custom integrations",
        "Training & onboarding"
      ],
      popular: false,
      color: "purple"
    }
  ]

  const getColorClasses = (color: string, popular: boolean) => {
    if (popular) {
      return {
        border: 'border-yellow-400/50',
        bg: 'bg-gradient-to-b from-yellow-400/10 to-yellow-500/5',
        button: 'bg-gradient-to-r from-yellow-400 to-yellow-300 text-black hover:from-yellow-300 hover:to-yellow-200',
        icon: 'bg-yellow-400/20 text-yellow-400'
      }
    }
    
    const colors = {
      gray: {
        border: 'border-gray-700',
        bg: 'bg-gray-900/30',
        button: 'bg-white text-black hover:bg-gray-100',
        icon: 'bg-gray-700 text-gray-300'
      },
      purple: {
        border: 'border-purple-500/30',
        bg: 'bg-purple-500/5',
        button: 'bg-gradient-to-r from-purple-500 to-purple-400 text-white hover:from-purple-400 hover:to-purple-300',
        icon: 'bg-purple-500/20 text-purple-400'
      }
    }
    
    return colors[color as keyof typeof colors]
  }

  return (
    <section id="pricing" ref={sectionRef} className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Simple, Transparent
            <br />
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">
              Pricing
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Choose the plan that fits your security testing needs
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center space-x-4 p-1 bg-gray-900 rounded-lg border border-gray-700">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-4 py-2 rounded-md transition-all duration-200 ${
                !isAnnual 
                  ? 'bg-yellow-400 text-black font-medium' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-4 py-2 rounded-md transition-all duration-200 ${
                isAnnual 
                  ? 'bg-yellow-400 text-black font-medium' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Annual
              <span className="ml-2 text-xs bg-green-500 text-white px-2 py-1 rounded-full">
                Save 17%
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => {
            const Icon = plan.icon
            const colorClasses = getColorClasses(plan.color, plan.popular)
            const price = isAnnual ? plan.annualPrice : plan.monthlyPrice
            
            return (
              <div
                key={index}
                className={`relative p-8 rounded-2xl border transition-all duration-500 hover:scale-105 ${
                  colorClasses.border
                } ${colorClasses.bg} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-yellow-400 text-black px-4 py-1 rounded-full text-sm font-bold">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="text-center mb-8">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center ${colorClasses.icon}`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-gray-400 mb-6">{plan.description}</p>
                  
                  <div className="mb-6">
                    {price ? (
                      <div>
                        <span className="text-4xl font-bold text-white">${price}</span>
                        <span className="text-gray-400 ml-2">
                          /{isAnnual ? 'year' : 'month'}
                        </span>
                        {isAnnual && (
                          <div className="text-sm text-green-400 mt-1">
                            Save ${(plan.monthlyPrice! * 12) - plan.annualPrice!} annually
                          </div>
                        )}
                      </div>
                    ) : (
                      <div>
                        <span className="text-4xl font-bold text-white">Custom</span>
                        <div className="text-gray-400 mt-1">Contact for pricing</div>
                      </div>
                    )}
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 px-6 rounded-xl font-bold transition-all duration-200 ${colorClasses.button}`}
                >
                  {price ? 'Get Started' : 'Contact Sales'}
                </button>
              </div>
            )
          })}
        </div>

        <div className={`text-center mt-16 transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              All plans include
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-400">
              <div className="flex items-center justify-center space-x-2">
                <Check className="w-5 h-5 text-green-400" />
                <span>99.9% uptime SLA</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Check className="w-5 h-5 text-green-400" />
                <span>SOC 2 compliance</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Check className="w-5 h-5 text-green-400" />
                <span>30-day money back</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}