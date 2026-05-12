import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { User, AuthCredentials, SignUpData } from '@/types'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const loading = ref(false)

  // Getters
  const isAuthenticated = computed(() => !!user.value && !!token.value)

  // Actions
  const login = async (credentials: AuthCredentials): Promise<void> => {
    loading.value = true
    try {
      // TODO: Replace with actual API call
      await Promise.resolve()

      // Mock user data
      const mockUser: User = {
        id: '1',
        email: credentials.email,
        name: 'Demo User',
        avatar: undefined,
        createdAt: new Date(),
      }

      user.value = mockUser
      token.value = 'mock-jwt-token'

      // Store token in localStorage
      localStorage.setItem('auth-token', token.value)
      localStorage.setItem('auth-user', JSON.stringify(mockUser))
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  const signup = async (data: SignUpData): Promise<void> => {
    loading.value = true
    try {
      // TODO: Replace with actual API call
      await Promise.resolve()

      // Mock user data
      const mockUser: User = {
        id: '1',
        email: data.email,
        name: data.name,
        avatar: undefined,
        createdAt: new Date(),
      }

      user.value = mockUser
      token.value = 'mock-jwt-token'

      // Store token in localStorage
      localStorage.setItem('auth-token', token.value)
      localStorage.setItem('auth-user', JSON.stringify(mockUser))
    } catch (error) {
      console.error('Signup failed:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  const logout = (): void => {
    user.value = null
    token.value = null
    localStorage.removeItem('auth-token')
    localStorage.removeItem('auth-user')
  }

  const restoreSession = (): void => {
    const storedToken = localStorage.getItem('auth-token')
    const storedUser = localStorage.getItem('auth-user')

    if (storedToken && storedUser) {
      try {
        token.value = storedToken
        user.value = JSON.parse(storedUser)
      } catch (error) {
        console.error('Failed to restore session:', error)
        logout()
      }
    }
  }

  // Initialize auth state from localStorage
  restoreSession()

  return {
    user,
    token,
    loading,
    isAuthenticated,
    login,
    signup,
    logout,
    restoreSession,
  }
})
