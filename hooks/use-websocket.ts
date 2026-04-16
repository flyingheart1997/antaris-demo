'use client'

/**
 * hooks/use-websocket.ts — React hook for WebSocket connections
 *
 * Creates a WebSocketManager per hook instance, tied to the component lifecycle:
 *  - Connects on mount (with current auth token)
 *  - Reconnects when the auth token changes (new token after refresh)
 *  - Disconnects + cleans up on unmount
 *
 * Usage:
 *
 * ```tsx
 * const { status, send, on } = useWebSocket('telemetry/')
 *
 * // Listen to a message type
 * useEffect(() => {
 *     return on<{ altitude: number }>('altitude_update', (data) => {
 *         setAltitude(data.altitude)
 *     })
 * }, [on])
 *
 * // Send a message
 * const handlePing = () => send('ping', { timestamp: Date.now() })
 * ```
 *
 * Status values: 'idle' | 'connecting' | 'connected' | 'disconnected' | 'error'
 */

import { useCallback, useEffect, useRef, useState } from 'react'
import { WebSocketManager, type WSStatus, type WSManagerOptions } from '@/lib/websocket'
import { useAuth } from '@/hooks/use-auth'

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

interface UseWebSocketReturn {
    /** Current connection status */
    status: WSStatus

    /**
     * Send a typed JSON message to the server.
     * Returns false if the socket is not open.
     */
    send: <T>(type: string, data: T) => boolean

    /**
     * Subscribe to a message type. Returns an unsubscribe function.
     * Wrap in useEffect so the subscription is cleaned up properly.
     *
     * @example
     * useEffect(() => on<Telemetry>('telemetry', setTelemetry), [on])
     */
    on: <T = unknown>(type: string, handler: (data: T) => void) => () => void
}

type UseWebSocketOptions = Pick<WSManagerOptions, 'autoReconnect' | 'reconnectDelay' | 'maxReconnectDelay'>

/**
 * @param endpoint - Path appended to NEXT_PUBLIC_WEBSOCKET_BACKEND_BASE_URL.
 *                   E.g. `'telemetry/'` → `wss://…/ws/telemetry/`
 * @param options  - Optional WebSocketManager configuration overrides.
 */
export function useWebSocket(
    endpoint: string = '',
    options: UseWebSocketOptions = {},
): UseWebSocketReturn {
    const { token } = useAuth()
    const [status, setStatus] = useState<WSStatus>('idle')
    const managerRef = useRef<WebSocketManager | null>(null)

    // Create manager once on mount (endpoint is stable — pass as dep below)
    useEffect(() => {
        const manager = new WebSocketManager({
            endpoint,
            autoReconnect: options.autoReconnect,
            reconnectDelay: options.reconnectDelay,
            maxReconnectDelay: options.maxReconnectDelay,
        })
        managerRef.current = manager

        const unsubStatus = manager.onStatusChange(setStatus)
        manager.connect(token)

        return () => {
            unsubStatus()
            manager.disconnect()
            managerRef.current = null
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [endpoint]) // Re-create if endpoint changes; options are captured at mount

    // When the auth token rotates (silent refresh via middleware.ts),
    // reconnect with the fresh token so the server can re-validate.
    useEffect(() => {
        if (managerRef.current && token) {
            managerRef.current.connect(token)
        }
    }, [token])

    const send = useCallback(<T>(type: string, data: T): boolean => {
        return managerRef.current?.send(type, data) ?? false
    }, [])

    const on = useCallback(<T = unknown>(
        type: string,
        handler: (data: T) => void,
    ): (() => void) => {
        return managerRef.current?.on<T>(type, handler) ?? (() => {})
    }, [])

    return { status, send, on }
}
