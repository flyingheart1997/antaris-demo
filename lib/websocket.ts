/**
 * lib/websocket.ts — WebSocketManager
 *
 * A standalone WebSocket client designed for the Antaris ATMOS real-time
 * data layer (telemetry, mission events, command feedback).
 *
 * Features:
 *  - Connects to any endpoint under NEXT_PUBLIC_WEBSOCKET_BACKEND_BASE_URL
 *  - Sends Keycloak access token as ?token= query param (standard WS auth)
 *  - Auto-reconnects with exponential back-off (capped at maxReconnectDelay)
 *  - Typed pub/sub: `.on('event-type', handler)` returns an unsubscribe fn
 *  - Messages are expected to be JSON: { type: string, data: unknown }
 *    Raw (non-JSON) messages are dispatched to 'raw' listeners
 *
 * Usage:
 *   const ws = new WebSocketManager({ endpoint: 'telemetry/' })
 *   ws.connect(accessToken)
 *   const unsub = ws.on('altitude', (data) => console.log(data))
 *   ws.send('command', { action: 'ping' })
 *   ws.disconnect()
 *   unsub()
 *
 * Prefer the React hook (hooks/use-websocket.ts) inside components.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type WSStatus = 'idle' | 'connecting' | 'connected' | 'disconnected' | 'error'

export interface WSMessage<T = unknown> {
    type: string
    data: T
}

export interface WSManagerOptions {
    /** Path appended to NEXT_PUBLIC_WEBSOCKET_BACKEND_BASE_URL. Default: '' */
    endpoint?: string
    /** Auto-reconnect after unexpected close. Default: true */
    autoReconnect?: boolean
    /** Initial reconnect delay in ms. Default: 1000 */
    reconnectDelay?: number
    /** Maximum reconnect delay in ms (exponential back-off cap). Default: 30000 */
    maxReconnectDelay?: number
}

type MessageHandler<T = unknown> = (data: T) => void
type StatusHandler = (status: WSStatus) => void

// ---------------------------------------------------------------------------
// WebSocketManager
// ---------------------------------------------------------------------------

export class WebSocketManager {
    private socket: WebSocket | null = null
    private token: string | null = null
    private reconnectTimer: ReturnType<typeof setTimeout> | null = null
    private currentDelay: number
    private intentionallyClosed = false

    private readonly opts: Required<WSManagerOptions>
    private readonly messageListeners = new Map<string, Set<MessageHandler>>()
    private readonly statusListeners = new Set<StatusHandler>()

    constructor(opts: WSManagerOptions = {}) {
        this.opts = {
            endpoint: opts.endpoint ?? '',
            autoReconnect: opts.autoReconnect ?? true,
            reconnectDelay: opts.reconnectDelay ?? 1000,
            maxReconnectDelay: opts.maxReconnectDelay ?? 30_000,
        }
        this.currentDelay = this.opts.reconnectDelay
    }

    // -------------------------------------------------------------------------
    // Public API
    // -------------------------------------------------------------------------

    /**
     * Open the WebSocket connection.
     * Call this once on mount (or when the auth token becomes available).
     * Safe to call again with a new token — reconnects transparently.
     */
    connect(token?: string | null) {
        if (token !== undefined) this.token = token
        this.intentionallyClosed = false
        this._cleanup()
        this._open()
    }

    /**
     * Close the WebSocket connection permanently (no auto-reconnect).
     * Call on component unmount.
     */
    disconnect() {
        this.intentionallyClosed = true
        this._cleanup()
        this._notifyStatus('disconnected')
    }

    /**
     * Send a typed JSON message to the server.
     * Returns true if the socket was open and the message was sent.
     */
    send<T>(type: string, data: T): boolean {
        if (this.socket?.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify({ type, data }))
            return true
        }
        return false
    }

    /**
     * Subscribe to a specific message type.
     * Use '*' to receive every message object (WSMessage<unknown>).
     * Use 'raw' to receive non-JSON text messages as plain strings.
     *
     * Returns an unsubscribe function — call it on cleanup.
     *
     * @example
     * const unsub = ws.on<{ altitude: number }>('telemetry', (data) => console.log(data.altitude))
     * // later:
     * unsub()
     */
    on<T = unknown>(type: string, handler: MessageHandler<T>): () => void {
        if (!this.messageListeners.has(type)) {
            this.messageListeners.set(type, new Set())
        }
        this.messageListeners.get(type)!.add(handler as MessageHandler)
        return () => this.off(type, handler)
    }

    /** Unsubscribe a specific handler. */
    off<T = unknown>(type: string, handler: MessageHandler<T>) {
        this.messageListeners.get(type)?.delete(handler as MessageHandler)
    }

    /**
     * Subscribe to connection status changes.
     * Returns an unsubscribe function.
     */
    onStatusChange(handler: StatusHandler): () => void {
        this.statusListeners.add(handler)
        return () => this.statusListeners.delete(handler)
    }

    /** Current connection status (derived from socket.readyState). */
    get status(): WSStatus {
        if (!this.socket) return 'idle'
        switch (this.socket.readyState) {
            case WebSocket.CONNECTING: return 'connecting'
            case WebSocket.OPEN: return 'connected'
            default: return 'disconnected'
        }
    }

    // -------------------------------------------------------------------------
    // Internal helpers
    // -------------------------------------------------------------------------

    private _buildUrl(): string {
        const base = process.env.NEXT_PUBLIC_WEBSOCKET_BACKEND_BASE_URL ?? 'ws://localhost:8000/ws/'
        // Ensure base ends with / before appending endpoint
        const normalizedBase = base.endsWith('/') ? base : `${base}/`
        const url = new URL(this.opts.endpoint, normalizedBase)
        if (this.token) {
            url.searchParams.set('token', this.token)
        }
        return url.toString()
    }

    private _open() {
        this._notifyStatus('connecting')
        try {
            this.socket = new WebSocket(this._buildUrl())
        } catch (err) {
            console.error('[WebSocket] Failed to construct WebSocket:', err)
            this._notifyStatus('error')
            if (this.opts.autoReconnect && !this.intentionallyClosed) {
                this._scheduleReconnect()
            }
            return
        }

        this.socket.onopen = () => {
            this.currentDelay = this.opts.reconnectDelay // reset back-off on success
            this._notifyStatus('connected')
        }

        this.socket.onclose = (event) => {
            this._notifyStatus('disconnected')
            if (!event.wasClean) {
                console.warn(`[WebSocket] Connection closed unexpectedly (code ${event.code})`)
            }
            if (this.opts.autoReconnect && !this.intentionallyClosed) {
                this._scheduleReconnect()
            }
        }

        this.socket.onerror = () => {
            // onerror is always followed by onclose — status update happens there
            this._notifyStatus('error')
        }

        this.socket.onmessage = (event: MessageEvent) => {
            if (typeof event.data !== 'string') return

            try {
                const msg: WSMessage = JSON.parse(event.data)

                // Type-specific listeners
                this.messageListeners.get(msg.type)?.forEach(fn => fn(msg.data))

                // Wildcard listeners receive the full message object
                this.messageListeners.get('*')?.forEach(fn => fn(msg))
            } catch {
                // Non-JSON — dispatch to 'raw' listeners
                this.messageListeners.get('raw')?.forEach(fn => fn(event.data))
            }
        }
    }

    private _scheduleReconnect() {
        this.reconnectTimer = setTimeout(() => {
            this.currentDelay = Math.min(this.currentDelay * 2, this.opts.maxReconnectDelay)
            console.info(`[WebSocket] Reconnecting... (next in ${this.currentDelay}ms)`)
            this._open()
        }, this.currentDelay)
    }

    private _cleanup() {
        if (this.reconnectTimer !== null) {
            clearTimeout(this.reconnectTimer)
            this.reconnectTimer = null
        }
        if (this.socket) {
            // Null out handlers before closing to prevent spurious onclose → reconnect
            this.socket.onopen = null
            this.socket.onclose = null
            this.socket.onerror = null
            this.socket.onmessage = null
            if (
                this.socket.readyState === WebSocket.OPEN ||
                this.socket.readyState === WebSocket.CONNECTING
            ) {
                this.socket.close(1000, 'Client disconnect')
            }
            this.socket = null
        }
    }

    private _notifyStatus(status: WSStatus) {
        this.statusListeners.forEach(fn => fn(status))
    }
}
