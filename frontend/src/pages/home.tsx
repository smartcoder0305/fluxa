import React from 'react'
import { ArrowRight, Play, Check, Star, Zap, Shield, Users, Code, Database, Palette, Rocket } from 'lucide-react'

const Home: React.FC = () => {
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
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Product</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
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
          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Let's make your dream a{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              reality
            </span>
            . Right now.
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Fluxa helps you build fully functional applications with just your words. No coding necessary.
          </p>
          
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="What do you want to build?"
                className="w-full px-6 py-4 text-lg border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-300"
              />
              <button className="absolute right-2 top-2 bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-xl transition-colors">
                <Play className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex flex-wrap justify-center gap-3 mt-4">
              <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm transition-colors">
                Reporting dashboard
              </button>
              <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm transition-colors">
                Scheduling app
              </button>
              <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm transition-colors">
                Meal tracker
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          {/* Feature 1 */}
          <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Create at the speed of thought
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Set Fluxa your idea, and watch it transform into a working app—complete with all the necessary components, pages, flows and features.
              </p>
              <button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                Start Building
              </button>
            </div>
            <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">SubTracker Dashboard</h3>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">$12,450</div>
                    <div className="text-sm text-gray-500">Total Revenue</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">1,234</div>
                    <div className="text-sm text-gray-500">Active Subs</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">2.1%</div>
                    <div className="text-sm text-gray-500">Churn Rate</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-white rounded">
                    <span className="text-sm text-gray-600">Netflix Premium</span>
                    <span className="text-sm font-medium text-gray-900">$15.99</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white rounded">
                    <span className="text-sm text-gray-600">Spotify Family</span>
                    <span className="text-sm font-medium text-gray-900">$14.99</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
            <div className="order-2 md:order-1">
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Task Manager</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <input type="checkbox" className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-gray-700">Design new landing page</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <input type="checkbox" className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-gray-700">Implement user authentication</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <input type="checkbox" className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-gray-700">Set up payment processing</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <input type="checkbox" className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-gray-700">Write API documentation</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                The backend's built-in automatically
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Everything your app needs to function, like letting users sign in, saving their data, or creating role-based permissions, is taken care of by our backend.
              </p>
              <button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                Start Building
              </button>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Ready to use, instantly.
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Our platform comes with built-in hosting, so once your app is ready, the only thing left to do is publish, and it's live, and share it with your friends or community.
              </p>
              <button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                Start Building
              </button>
            </div>
            <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Financial Dashboard</h3>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">$45,230</div>
                    <div className="text-sm text-gray-500">Total Revenue</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">$12,450</div>
                    <div className="text-sm text-gray-500">Total Expenses</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">$32,780</div>
                    <div className="text-sm text-gray-500">Profit</div>
                  </div>
                </div>
                <div className="h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-sm text-gray-600">Charts & Analytics</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-green-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                  J
                </div>
                <div className="ml-3">
                  <div className="font-semibold text-gray-900">John Smith</div>
                  <div className="text-sm text-gray-500">@johnsmith</div>
                </div>
              </div>
              <p className="text-gray-700">
                "World's best product for founders who need to build fast yet good..."
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                  S
                </div>
                <div className="ml-3">
                  <div className="font-semibold text-gray-900">Sarah Johnson</div>
                  <div className="text-sm text-gray-500">@sarahj</div>
                </div>
              </div>
              <p className="text-gray-700">
                "Amazing understanding of the user's needs, and thorough hands..."
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-semibold">
                  M
                </div>
                <div className="ml-3">
                  <div className="font-semibold text-gray-900">Mike Chen</div>
                  <div className="text-sm text-gray-500">@mikechen</div>
                </div>
              </div>
              <p className="text-gray-700">
                "Incredible platform that actually delivers on its promises..."
              </p>
            </div>
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
            Start Building
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
                Fluxa is the AI-powered platform that lets you build fully functional apps in minutes. Using natural language, tell our AI agent what you want to build, and it will generate a polished and production-ready app.
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
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">PRODUCT</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Roadmap</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">RESOURCES</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Fluxa Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home 