import { create } from 'zustand'

interface AuthState {
  token: string | null
  user: any | null
  isLoading: boolean
  isError: boolean
  setToken: (token: string | null) => void
  setUser: (user: any | null) => void
}

/**
 * Global Zustand store for authentication state.
 * Move this to store/ directory to separate state definition from consumer hooks.
 */
export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  isLoading: true,
  isError: false,
  setToken: (token) => set({ token, isLoading: false, isError: false }),
  setUser: (user) => set({ user }),
}))
