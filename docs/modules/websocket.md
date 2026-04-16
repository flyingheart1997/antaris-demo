# Module: WebSocket

## Purpose

Real-time bidirectional communication with the ATMOS backend for live telemetry, mission events, and command feedback. Built on the native browser WebSocket API — no external library required.

---

## Key Files

| File | Role |
|---|---|
| `lib/websocket.ts` | `WebSocketManager` — core connection logic, reconnect, typed pub/sub |
| `hooks/use-websocket.ts` | `useWebSocket()` — React hook wrapping the manager to component lifecycle |

---

## Architecture

```
NEXT_PUBLIC_WEBSOCKET_BACKEND_BASE_URL   (wss://app-flatsat.antaris-staging.cloud/ws/)
        │
        │ + endpoint path (e.g. 'telemetry/')
        │ + ?token=<keycloak-access-token>
        ▼
WebSocketManager (lib/websocket.ts)
        │
        │  on(type, handler) — typed message subscription
        │  send(type, data)  — JSON message sending
        │  onStatusChange()  — connection status subscription
        ▼
useWebSocket (hooks/use-websocket.ts)
        │
        │  status — 'idle' | 'connecting' | 'connected' | 'disconnected' | 'error'
        │  send   — send typed message
        │  on     — subscribe to message type (returns unsubscribe fn)
        ▼
Client Component ('use client')
```

---

## Message Protocol

All messages are JSON with a `type` discriminant and a `data` payload:

```typescript
// Outbound (client → server)
{ "type": "command", "data": { "action": "ping" } }
{ "type": "subscribe", "data": { "stream": "telemetry" } }

// Inbound (server → client)
{ "type": "telemetry", "data": { "altitude": 550, "velocity": 7700 } }
{ "type": "mission_event", "data": { "event": "eclipse_entry", "timestamp": 1720000000 } }
{ "type": "error", "data": { "code": 403, "message": "Unauthorized" } }
```

**Special listener types:**
- `'*'` — receives every inbound `WSMessage<unknown>` object
- `'raw'` — receives non-JSON string messages as plain strings

---

## Authentication

The Keycloak access token is sent as a query parameter:

```
wss://app-flatsat.antaris-staging.cloud/ws/telemetry/?token=<JWT>
```

This is the standard WebSocket auth pattern (browsers cannot set Authorization headers on WS connections). The token is re-sent on every reconnect.

When `middleware.ts` silently refreshes the access token, the `useWebSocket` hook detects the new token and reconnects automatically.

---

## API Reference

### `WebSocketManager` (`lib/websocket.ts`)

```typescript
import { WebSocketManager } from '@/lib/websocket'

const ws = new WebSocketManager({
    endpoint: 'telemetry/',    // appended to NEXT_PUBLIC_WEBSOCKET_BACKEND_BASE_URL
    autoReconnect: true,       // default: true
    reconnectDelay: 1000,      // initial delay in ms (default: 1000)
    maxReconnectDelay: 30_000, // back-off cap in ms (default: 30000)
})
```

| Method | Signature | Description |
|---|---|---|
| `connect` | `(token?: string \| null) => void` | Open connection. Safe to call again with new token. |
| `disconnect` | `() => void` | Close permanently, no auto-reconnect. Call on cleanup. |
| `send` | `<T>(type: string, data: T) => boolean` | Send typed JSON message. Returns `false` if not connected. |
| `on` | `<T>(type: string, handler: (data: T) => void) => () => void` | Subscribe to message type. Returns unsubscribe fn. |
| `off` | `<T>(type: string, handler: (data: T) => void) => void` | Unsubscribe specific handler. |
| `onStatusChange` | `(handler: (status: WSStatus) => void) => () => void` | Subscribe to status changes. Returns unsubscribe fn. |
| `status` | `(getter) => WSStatus` | Current status: `'idle' \| 'connecting' \| 'connected' \| 'disconnected' \| 'error'` |

### `useWebSocket` hook (`hooks/use-websocket.ts`)

```typescript
import { useWebSocket } from '@/hooks/use-websocket'

const { status, send, on } = useWebSocket(
    'telemetry/',  // endpoint (optional, default: '')
    {              // options (optional)
        autoReconnect: true,
        reconnectDelay: 1000,
        maxReconnectDelay: 30_000,
    }
)
```

| Return | Type | Description |
|---|---|---|
| `status` | `WSStatus` | Reactive connection status |
| `send` | `<T>(type: string, data: T) => boolean` | Send a message |
| `on` | `<T>(type: string, handler: (data: T) => void) => () => void` | Subscribe to message type |

---

## Usage Examples

### Basic telemetry stream

```tsx
'use client'

import { useEffect, useState } from 'react'
import { useWebSocket } from '@/hooks/use-websocket'

interface TelemetryData {
    altitude: number
    velocity: number
    battery: number
}

export function TelemetryPanel() {
    const { status, on } = useWebSocket('telemetry/')
    const [telemetry, setTelemetry] = useState<TelemetryData | null>(null)

    useEffect(() => {
        // on() returns unsubscribe fn — useEffect cleanup handles it
        return on<TelemetryData>('telemetry', setTelemetry)
    }, [on])

    if (status !== 'connected') {
        return <p>WebSocket: {status}</p>
    }

    return (
        <div>
            <p>Altitude: {telemetry?.altitude} km</p>
            <p>Velocity: {telemetry?.velocity} m/s</p>
            <p>Battery: {telemetry?.battery}%</p>
        </div>
    )
}
```

### Sending commands

```tsx
'use client'

import { useWebSocket } from '@/hooks/use-websocket'

export function CommandPanel() {
    const { status, send } = useWebSocket('commands/')

    const handlePing = () => {
        const sent = send('ping', { timestamp: Date.now() })
        if (!sent) console.warn('WebSocket not connected')
    }

    return (
        <button disabled={status !== 'connected'} onClick={handlePing}>
            Send Ping
        </button>
    )
}
```

### Multiple message types on one connection

```tsx
'use client'

import { useEffect, useState } from 'react'
import { useWebSocket } from '@/hooks/use-websocket'

export function MissionMonitor({ missionId }: { missionId: string }) {
    const { status, on } = useWebSocket(`missions/${missionId}/`)
    const [events, setEvents] = useState<string[]>([])

    useEffect(() => {
        // Subscribe to two different message types on the same connection
        const unsubTelemetry = on<{ altitude: number }>('telemetry', (data) => {
            setEvents(prev => [...prev, `Altitude: ${data.altitude} km`])
        })
        const unsubEvent = on<{ event: string }>('mission_event', (data) => {
            setEvents(prev => [...prev, `Event: ${data.event}`])
        })

        // Clean up both subscriptions on unmount
        return () => {
            unsubTelemetry()
            unsubEvent()
        }
    }, [on])

    return <ul>{events.map((e, i) => <li key={i}>{e}</li>)}</ul>
}
```

### Using WebSocketManager directly (non-React context)

```typescript
import { WebSocketManager } from '@/lib/websocket'
import { getAccessToken } from '@/lib/auth/session'

// E.g. in a Next.js Route Handler or utility
const ws = new WebSocketManager({ endpoint: 'telemetry/' })
const token = await getAccessToken()
ws.connect(token)

const unsub = ws.on<{ altitude: number }>('telemetry', (data) => {
    console.log('Altitude:', data.altitude)
})

// Cleanup
unsub()
ws.disconnect()
```

---

## Reconnect Behavior

```
Connect attempt
    │
    ├─ Success → currentDelay reset to reconnectDelay (1s default)
    │
    └─ Failure (unexpected close or error)
            │
            └─ autoReconnect=true?
                    │
                    ├─ YES → wait currentDelay → retry
                    │          currentDelay = min(currentDelay × 2, maxReconnectDelay)
                    │          (exponential back-off: 1s → 2s → 4s → 8s → ... → 30s)
                    │
                    └─ NO  → stop (manual reconnect needed)
```

Intentional `disconnect()` call always stops reconnection regardless of `autoReconnect`.

---

## Environment Variable

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_WEBSOCKET_BACKEND_BASE_URL` | `wss://app-flatsat.antaris-staging.cloud/ws/` |

Set in `.env`. The `NEXT_PUBLIC_` prefix means it's available in browser bundles (safe — it's not a secret).

---

## See Also

- [`docs/architecture/data-flow.md`](../architecture/data-flow.md) — WebSocket flow diagram (section 7)
- [`docs/features/authentication.md`](../features/authentication.md) — Token lifecycle (refresh affects WS reconnect)
- [`docs/setup/environment.md`](../setup/environment.md) — Environment variable reference
