import React, { useState } from 'react'
import { Check, Star, Zap, Shield, Users, Code, Database, Palette, Rocket, Crown } from 'lucide-react'

const Pricing: React.FC = () => {
  const [isYearly, setIsYearly] = useState(true)

  const plans = [
    {
      name: 'Free',
      price: isYearly ? '$0' : '$0',
      period: '/mo',
      description: 'Perfect for getting started',
      features: [
        'Analytics dashboard',
        'Authentication system',
        'Database functionality',
        'Basic templates',
        'Community support',
        '25 message credits/month',
        '500 integration credits/month'
      ],
      buttonText: 'Get started',
      popular: false,
      icon: Star
    },
    {
      name: 'Starter',
      price: isYearly ? '$16' : '$20',
      period: '/mo',
      description: 'Great for small projects',
      features: [
        'Everything in Free plan',
        'Unlimited app creation',
        'In-app code edits',
        'Custom branding',
        'Email support',
        '100 message credits/month',
        '2,000 integration credits/month'
      ],
      buttonText: 'Get started',
      popular: false,
      icon: Zap
    },
    {
      name: 'Builder',
      price: isYearly ? '$40' : '$50',
      period: '/mo',
      description: 'Ideal for growing teams',
      features: [
        'Everything in Starter plan',
        'Custom domains',
        'GitHub integration',
        'Advanced analytics',
        'Priority support',
        '250 message credits/month',
        '10,000 integration credits/month'
      ],
      buttonText: 'Get started',
      popular: true,
      icon: Code
    },
    {
      name: 'Pro',
      price: isYearly ? '$80' : '$100',
      period: '/mo',
      description: 'For professional developers',
      features: [
        'Everything in Builder plan',
        'Early access to beta features',
        'Advanced integrations',
        'White-label options',
        'Dedicated support',
        '500 message credits/month',
        '20,000 integration credits/month'
      ],
      buttonText: 'Get started',
      popular: false,
      icon: Crown
    },
    {
      name: 'Elite',
      price: isYearly ? '$160' : '$200',
      period: '/mo',
      description: 'Enterprise-grade solution',
      features: [
        'Everything in Pro plan',
        'Premium support',
        'Custom integrations',
        'Advanced security',
        'SLA guarantees',
        '1,200 message credits/month',
        '50,000 integration credits/month'
      ],
      buttonText: 'Get started',
      popular: false,
      icon: Rocket
    }
  ]

  const includedFeatures = [
    'AI powered app building',
    'Integrated backend and database system',
    'Responsive visual editor',
    'Analytics dashboard',
    'Multi-user editing and collaboration',
    'Cloud storage',
    'Authentication and user management',
    'Payment processing',
    'Email marketing tools',
    'Debugging and troubleshooting tools'
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">F</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Fluxa</span>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="/" className="text-gray-600 hover:text-gray-900 transition-colors">Home</a>
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
              <a href="#resources" className="text-gray-600 hover:text-gray-900 transition-colors">Resources</a>
              <a href="#enterprise" className="text-gray-600 hover:text-gray-900 transition-colors">Enterprise</a>
            </nav>
            
            <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
              Start Building
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 via-purple-50 to-orange-50">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Plans from first idea to full scale
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Start for free. Upgrade when you're ready.
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-12">
            <span className={`text-sm ${!isYearly ? 'text-gray-900' : 'text-gray-500'}`}>Monthly</span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isYearly ? 'bg-green-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isYearly ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm ${isYearly ? 'text-gray-900' : 'text-gray-500'}`}>
              Yearly <span className="text-green-600 font-semibold">(save 20%)</span>
            </span>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-6">
            {plans.map((plan, index) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl border-2 p-8 ${
                  plan.popular
                    ? 'border-blue-500 bg-blue-50 shadow-xl scale-105'
                    : 'border-gray-200 bg-white hover:border-gray-300 transition-colors'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <div className="flex justify-center mb-4">
                    <plan.icon className={`w-8 h-8 ${
                      plan.popular ? 'text-blue-600' : 'text-gray-600'
                    }`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-500 ml-1">{plan.period}</span>
                  </div>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                    plan.popular
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-gray-900 hover:bg-gray-800 text-white'
                  }`}
                >
                  {plan.buttonText}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Looking for enterprise solutions?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Get custom pricing, dedicated support, and enterprise-grade features for your organization.
          </p>
          <button className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors">
            Contact sales
          </button>
        </div>
      </section>

      {/* Included Features */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">
            Eliminate costly, complex add-ons. Every Fluxa plan includes:
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="space-y-4">
              {includedFeatures.slice(0, 5).map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <Check className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span className="text-lg text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              {includedFeatures.slice(5).map((feature, index) => (
                <div key={index + 5} className="flex items-center space-x-3">
                  <Check className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span className="text-lg text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">FAQs</h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "What's included in the free plan?",
                answer: "The free plan includes basic app building capabilities, analytics dashboard, authentication system, and database functionality. Perfect for getting started and building simple applications."
              },
              {
                question: "What are integration credits?",
                answer: "Integration credits are used when your app connects to external services like payment processors, email services, or third-party APIs. Each integration consumes credits based on usage."
              },
              {
                question: "What happens if I reach my plan limits?",
                answer: "When you reach your plan limits, you'll receive a notification and can either upgrade to a higher plan or wait until your credits reset the following month."
              }
            ].map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between cursor-pointer">
                  <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                  <span className="text-2xl text-gray-400">+</span>
                </div>
                <p className="text-gray-600 mt-4">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-400 to-purple-500">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-8">
            So, what are we building?
          </h2>
          <button className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
            Start now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">F</span>
                </div>
                <span className="text-xl font-bold">Fluxa</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Fluxa is the AI-powered platform that lets users build fully functioning apps in minutes. Using nothing but natural language, Fluxa enables anyone to turn their words into personal productivity apps, back-office tools, customer portals, or complete enterprise products that are ready to use, no integrations required.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Discord</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0110 4.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.934.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.137 18.163 20 14.418 20 10c0-5.523-4.477-10-10-10z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Medium</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0110 4.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.934.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.137 18.163 20 14.418 20 10c0-5.523-4.477-10-10-10z" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">PRODUCT</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Enterprise</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Affiliate Program</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Roadmap</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Changelog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Feature Request</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">RESOURCES</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Docs & FAQs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Higher Ed</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Report misuse</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>2025 Fluxa Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Pricing 