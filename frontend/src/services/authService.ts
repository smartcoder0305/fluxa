import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

// Create axios instance
const api = axios.create({
  baseURL: `${API_URL}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export interface User {
  id: number
  email: string
  first_name?: string
  last_name?: string
  full_name?: string
  display_name: string
  avatar_url?: string
  is_active: boolean
  is_superuser: boolean
  oauth_provider?: string
  email_verified: boolean
  subscription_tier: string
  created_at: string
}

export interface Token {
  access_token: string
  token_type: string
  expires_in: number
  user_id: number
  email: string
}

export interface AuthResponse {
  user: User
  token: Token
}

export interface LoginData {
  email: string
  password: string
}

export interface RegisterData {
  first_name: string
  last_name: string
  email: string
  password: string
  confirm_password: string
}

export interface GoogleOAuthData {
  id_token: string
  access_token?: string
}

class AuthService {
  // Store user and token in localStorage
  private setAuthData(data: AuthResponse) {
    localStorage.setItem('access_token', data.token.access_token)
    localStorage.setItem('user', JSON.stringify(data.user))
  }

  // Clear auth data
  private clearAuthData() {
    localStorage.removeItem('access_token')
    localStorage.removeItem('user')
  }

  // Get stored user
  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user')
    if (userStr) {
      try {
        return JSON.parse(userStr)
      } catch {
        return null
      }
    }
    return null
  }

  // Get stored token
  getToken(): string | null {
    return localStorage.getItem('access_token')
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.getToken()
  }

  // Login user
  async login(data: LoginData): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>('/auth/login', data)
      this.setAuthData(response.data)
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  // Register user
  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>('/auth/register', data)
      this.setAuthData(response.data)
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  // Google OAuth login/register
  async googleOAuth(data: GoogleOAuthData): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>('/auth/google', data)
      this.setAuthData(response.data)
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  // Get current user from API
  async getCurrentUserFromAPI(): Promise<User> {
    try {
      const response = await api.get<User>('/auth/me')
      // Update stored user data
      localStorage.setItem('user', JSON.stringify(response.data))
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  // Refresh token
  async refreshToken(): Promise<Token> {
    try {
      const response = await api.post<Token>('/auth/refresh')
      // Update stored token
      localStorage.setItem('access_token', response.data.access_token)
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  // Logout user
  logout() {
    this.clearAuthData()
    // Redirect to login page
    window.location.href = '/login'
  }

  // Handle API errors
  private handleError(error: any): Error {
    if (error.response?.data?.detail) {
      return new Error(error.response.data.detail)
    }
    if (error.message) {
      return new Error(error.message)
    }
    return new Error('An unexpected error occurred')
  }
}

export const authService = new AuthService()
export default authService
