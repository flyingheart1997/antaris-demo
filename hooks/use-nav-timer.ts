'use client'

import { useState, useEffect } from 'react'
import { format } from 'date-fns'

/**
 * useNavTimer hook provides real-time UTC date and time strings.
 * Uses date-fns for high-fidelity formatting (ordinals, padding).
 */
export function useNavTimer() {
    const [now, setNow] = useState<Date | null>(null)

    useEffect(() => {
        // Set initial time on mount to avoid hydration mismatch
        setNow(new Date())
        const timer = setInterval(() => setNow(new Date()), 1000)
        return () => clearInterval(timer)
    }, [])

    if (!now) {
        return {
            dateString: '',
            timeString: '',
            isLoading: true
        }
    }

    // Convert to a local date object that carries UTC values 
    // to allow date-fns formatters (which are local-first) to render UTC data correctly.
    const utcRef = new Date(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate(),
        now.getUTCHours(),
        now.getUTCMinutes(),
        now.getUTCSeconds()
    )

    return {
        dateString: format(utcRef, "EEE, do MMM, yyyy"),
        timeString: format(utcRef, "HH:mm 'UTC'"),
        isLoading: false
    }
}
