import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Mail, Lock } from 'lucide-react'

const Login: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      // TODO: Implement login logic
      console.log('Login attempt:', { email, password })
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      navigate('/dashboard')
    } catch (error) {
      console.error('Login failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    try {
      // TODO: Implement Google OAuth
      console.log('Google login attempt')
      await new Promise(resolve => setTimeout(resolve, 1000))
      navigate('/dashboard')
    } catch (error) {
      console.error('Google login failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const testimonials = [
    {
      text: "Fluxa looks perfect for founders who want to build fast without...",
      name: "Best of Philosophy",
      handle: "@BotPhilosophyQ",
      avatar: "B",
      platform: "x"
    },
    {
      text: "You can now build a full AI app without writing any code. This to...",
      name: "Hasan Toor",
      handle: "@hasantoxr",
      avatar: "H",
      platform: "x"
    },
    {
      text: "Okay No ite",
      name: "John Doe",
      handle: "@johndoe",
      avatar: "J",
      platform: "x"
    },
    {
      text: "onizes app development rs t...",
      name: "Cohen",
      handle: "@cohen",
      avatar: "C",
      platform: "p"
    },
    {
      text: "Fastest Aha! moment I have ever had.",
      name: "Erel Cohen",
      handle: "@erelcohen",
      avatar: "E",
      platform: "p"
    },
    {
      text: "Start building in minutes immediately. Great!",
      name: "Roy Kotzer",
      handle: "@roykotzer",
      avatar: "R",
      platform: "p"
    }
  ]

  return (
    <div className="min-h-screen flex">
      {/* Left Column - Login Form */}
      <div className="w-full lg:w-1/2 bg-white flex items-center justify-center px-8 py-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex items-center space-x-2 mb-8">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">F</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Fluxa</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Welcome to Fluxa
          </h1>

          {/* Google Login Button */}
          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-6"
          >
            <div className="flex items-center justify-center space-x-3">
              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                G
              </div>
              <span>Log in with Google</span>
            </div>
          </button>

          {/* Separator */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">OR</span>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-blue-600 hover:text-blue-500 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Logging in...' : 'Log In'}
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="text-center mt-6 text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-600 hover:text-blue-500 font-medium transition-colors">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* Right Column - Testimonials */}
      <div className="hidden lg:block w-1/2 bg-gradient-to-b from-yellow-50 via-orange-100 to-red-100 relative overflow-hidden">
        <div className="absolute inset-0 p-8">
          <div className="grid grid-cols-2 gap-4 h-full">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20"
              >
                <p className="text-gray-700 text-sm mb-3 leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                    {testimonial.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {testimonial.handle}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    {testimonial.platform === 'x' ? (
                      <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">X</span>
                      </div>
                    ) : (
                      <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">P</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login 