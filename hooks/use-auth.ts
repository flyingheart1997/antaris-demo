'use client'

import { useAuthStore } from '@/store/auth-store'

/**
 * Custom hook to access authentication state and token details in client components.
 */
export function useAuth() {
  const { token, isLoading, isError, user } = useAuthStore()

  // Derived state for convenience
  const isAuthenticated = !!token

  /**
   * Helper to decode JWT payload without external libraries.
   * Useful for getting "token details" like user info.
   */
  const getDecodedToken = () => {
    if (!token) return null
    try {
      const base64Url = token.split('.')[1]
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
      const jsonPayload = decodeURIComponent(
        window
          .atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      )
      return JSON.parse(jsonPayload)
    } catch (e) {
      console.error('Error decoding token:', e)
      return null
    }
  }

  return {
    token,
    isLoading,
    isError,
    isAuthenticated,
    user: user || getDecodedToken(),
    // Expose store actions if needed for manual updates
    setToken: useAuthStore.getState().setToken,
    setUser: useAuthStore.getState().setUser,
  }
}
