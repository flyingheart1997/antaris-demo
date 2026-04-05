'use client'

import { useEffect } from 'react'
import { ErrorView } from '@/components/error'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global Error Captured:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <ErrorView error={error} reset={reset} />
    </div>
  )
}
