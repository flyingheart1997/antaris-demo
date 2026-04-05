'use client'

import { useRef } from 'react'
import { useAuthStore } from '@/store/auth-store'

interface AuthProviderProps {
  token: string | null
  children: React.ReactNode
}

/**
 * Client-side provider to hydrate the Auth Store from server-side props.
 * This is rendered at the top level of the provider tree.
 */
export function AuthProvider({ token, children }: AuthProviderProps) {
  const initialized = useRef(false)
  
  if (!initialized.current) {
    // Immediate hydration without useEffect for zero-latency initial render
    useAuthStore.setState({ token, isLoading: false, isError: false })
    initialized.current = true
  }

  return <>{children}</>
}
