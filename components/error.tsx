'use client'

import React from 'react'
import { AlertCircle, RefreshCw, Home } from 'lucide-react'
import { Button } from './ui/button'
import Link from 'next/link'

interface ErrorViewProps {
    error?: Error & { digest?: string }
    reset?: () => void
    title?: string
    description?: string
}

const ErrorView = ({
    error,
    reset,
    title = "Something went wrong",
    description = "We encountered an unexpected error. Our team has been notified."
}: ErrorViewProps) => {
    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center text-center p-8 bg-surface-bg animate-in fade-in duration-700">
            {/* Visual Error Icon */}
            <div className="relative mb-10">
                <div className="absolute inset-0 bg-red-500/20 blur-3xl rounded-full scale-150 animate-pulse" />
                <div className="relative h-24 w-24 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                    <AlertCircle className="h-12 w-12 text-red-500" />
                </div>
            </div>

            {/* Error Content */}
            <h2 className="text-4xl font-bold text-text-primary tracking-tight mb-4">
                {title}
            </h2>
            <p className="text-text-secondary text-lg max-w-md mb-12 leading-relaxed">
                {description}
            </p>

            {/* Error Digest (if exists) */}
            {error?.digest && (
                <div className="mb-12 px-4 py-2 bg-surface-secondary/50 rounded-xl border border-stroke-primary/10">
                    <code className="text-xs text-text-disabled font-mono">Error ID: {error.digest}</code>
                </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                {reset && (
                    <Button 
                        onClick={() => reset()} 
                        variant="solid" 
                        color="accent"
                        size="lg"
                        className="rounded-2xl px-10 font-bold text-sm uppercase tracking-widest shadow-xl shadow-green-500/10 active:scale-95 transition-all group"
                    >
                        <RefreshCw className="mr-2 h-5 w-5 group-hover:rotate-180 transition-transform duration-500" />
                        Try Again
                    </Button>
                )}
                <Link href="/">
                    <Button 
                        variant="outline" 
                        size="lg"
                        className="rounded-2xl px-10 font-bold text-sm uppercase tracking-widest border-stroke-primary/50 text-text-secondary hover:bg-surface-secondary transition-all"
                    >
                        <Home className="mr-2 h-5 w-5" />
                        Back Home
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default ErrorView
export { ErrorView } // Export both for flexibility