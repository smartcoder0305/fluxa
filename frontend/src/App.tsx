import { Routes, Route } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from '@/components/theme-provider'
import { AuthProvider } from '@/contexts/auth-context'
import Layout from '@/components/layout'
import Home from '@/pages/home'
import Login from '@/pages/auth/login'
import Register from '@/pages/auth/register'
import Dashboard from '@/pages/dashboard'
import Projects from '@/pages/projects'
import Pricing from '@/pages/pricing'
import Features from '@/pages/features'
import ProtectedRoute from '@/components/protected-route'

function App() {
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <ThemeProvider defaultTheme="dark" storageKey="fluxa-theme">
        <AuthProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/features" element={<Features />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/projects"
                element={
                  <ProtectedRoute>
                    <Projects />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Layout>
          <Toaster />
        </AuthProvider>
      </ThemeProvider>
    </GoogleOAuthProvider>
  )
}

export default App 