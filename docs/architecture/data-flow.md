# Data Flow — Antaris

## Overview

Data in Antaris flows through a strict layered pipeline:
**UI → tRPC Client → tRPC Server (with middleware) → External API → Response → Cache → UI**

---

## 1. Read Flow (Query)

```mermaid
sequenceDiagram
    participant Browser as Browser
    participant SC as Server Component
    participant QC as QueryClient
    participant DLink as Direct-Call Link (lib/trpc.server.ts)
    participant Router as tRPC Router
    participant API as External API

    Browser->>SC: Request page (e.g., /users)
    SC->>QC: getQueryClient()
    SC->>QC: prefetchQuery(trpc.user.list.queryOptions())
    QC->>DLink: Call via globalThis.$trpcClient (direct, no HTTP)
    DLink->>Router: user.list procedure (in-process)
    Router->>API: fetch('https://crudcrud.com/.../users')
    API-->>Router: JSON response
    Router-->>DLink: Zod-validated data
    DLink-->>QC: Cache populated
    SC->>Browser: HydrationBoundary (dehydrated state)
    Browser->>Browser: Client Component: useSuspenseQuery(trpc.user.list.queryOptions())
    Browser->>Browser: Reads from pre-populated cache (no fetch!)
```

### Key Points:
- Server Component prefetches data **before** rendering
- Data is dehydrated and sent as part of the HTML
- Client component reads from cache — **zero loading state**
- After `staleTime` (60s), background refetch occurs automatically

---

## 2. Write Flow (Mutation)

```mermaid
sequenceDiagram
    participant UI as Client Component
    participant TClient as tRPC Client (HTTP)
    participant RPC as /rpc Handler (fetchRequestHandler)
    participant MW as Arcjet Middleware
    participant Router as tRPC Router
    participant API as External API
    participant QC as QueryClient

    UI->>TClient: useMutation(trpc.user.create.mutationOptions())
    TClient->>RPC: POST /rpc
    RPC->>MW: Standard Security (WAF + Bot)
    MW->>MW: Rate Limit Check (1 req/min)
    MW-->>RPC: Allowed
    RPC->>Router: user.create procedure
    Router->>API: POST https://crudcrud.com/.../users
    API-->>Router: 201 Created
    Router-->>RPC: Success
    RPC-->>TClient: Response
    TClient-->>UI: onSuccess callback
    UI->>QC: invalidateQueries(trpc.user.list.queryKey())
    QC->>QC: Refetch user list in background
    QC-->>UI: Updated data
```

### Key Points:
- Mutations go through HTTP (not direct call) — client-side tRPC client
- Security middleware runs **before** business logic
- After mutation success, related queries are invalidated
- Cache is automatically refreshed — UI stays in sync

---

## 3. Authentication Flow

```mermaid
sequenceDiagram
    participant Browser as Browser
    participant MW as middleware.ts
    participant Next as Next.js Server
    participant KC as Keycloak
    participant Cookie as httpOnly Cookies
    participant ZS as Zustand Auth Store

    Browser->>MW: Visit any page
    MW->>Cookie: Check atmos_access_token

    alt Token expired + refresh token valid
        MW->>KC: POST /token (refresh_token grant)
        KC-->>MW: New access_token + refresh_token
        MW->>Cookie: Set new tokens
        MW->>Next: Continue request
    end

    alt No token
        MW->>Browser: Redirect to /api/auth/login
        Browser->>Next: GET /api/auth/login
        Next->>Browser: Redirect to Keycloak login URL
        Browser->>KC: User enters credentials
        KC->>Browser: Redirect to /api/auth/callback?code=...
        Browser->>Next: GET /api/auth/callback?code=...
        Next->>KC: Exchange code for tokens + UMA exchange
        KC-->>Next: access_token + refresh_token
        Next->>Cookie: Set atmos_access_token (httpOnly)
        Next->>Cookie: Set atmos_refresh_token (httpOnly)
        Next->>Browser: Redirect to /
    end

    alt Has valid token
        Next->>Next: RootLayout renders
        Next->>Cookie: getAccessToken()
        Cookie-->>Next: token string
        Next->>Browser: Render with <AllProviders token={token}>
        Browser->>ZS: AuthProvider hydrates store
        Browser->>Browser: useAuth() → { token, isAuthenticated: true }
    end
```

### Key Points:
- Tokens stored in **httpOnly** cookies — not accessible to JavaScript
- `middleware.ts` silently refreshes expired tokens before the page renders
- Server reads cookie → passes token as prop → client Zustand hydrates
- Zero-latency auth: no `useEffect`, no loading spinner for auth state

---

## 4. tRPC Client/Server Bridge

```mermaid
graph LR
    subgraph Server Side
        SSR["Server Component"]
        GSC["globalThis.$trpcClient<br/>(Direct-Call Link)"]
        Router["tRPC Router"]

        SSR --> GSC
        GSC --> Router
    end

    subgraph Client Side
        CC["Client Component"]
        TRPC["tRPC Client (HTTP)"]
        RPC["/rpc Route Handler"]

        CC --> TRPC
        TRPC -->|HTTP| RPC
        RPC --> Router
    end
```

### Dual Path:
1. **Server Components** → Use `globalThis.$trpcClient` with direct-call link (no HTTP overhead)
2. **Client Components** → Use HTTP tRPC client (httpBatchLink → `/rpc`)
3. Both paths hit the same router & procedures — consistent behavior
4. `lib/trpc.server.ts` sets up the server client; `lib/trpc.ts` picks it up via `globalThis`

---

## 5. State Management Flow

```mermaid
graph TB
    subgraph Server State ["Server State (TanStack Query)"]
        UserList["user.list cache"]
        UserDetail["user.details cache"]
    end

    subgraph UI State ["UI State (Zustand)"]
        AuthStore["Auth Store<br/>(token, user, isLoading)"]
        ModalStore["User Modal Store<br/>(open, mode, data)"]
    end

    subgraph Components
        UsersPage["Users Page"]
        UserCard["User Card"]
        UserModal["User Modal"]
        Header["Header"]
    end

    UserList --> UsersPage
    UserList --> UserCard
    UserDetail --> UserCard
    AuthStore --> Header
    ModalStore --> UserModal
    ModalStore --> UserCard
```

### Separation Rules:
| Data Type | Store | Example |
|---|---|---|
| API responses | TanStack Query | User list, user details |
| Auth session | Zustand (`auth-store`) | Token, user info, loading state |
| UI ephemeral state | Zustand (feature hooks) | Modal open/close, form data |
| Theme | next-themes | Dark/light mode |

---

## 6. Cache Invalidation Strategy

| Action | Invalidated Queries |
|---|---|
| Create User | `trpc.user.list.queryKey()` |
| Update User | `trpc.user.list.queryKey()`, `trpc.user.details.queryKey({ input: { userId } })` |
| Delete User | `trpc.user.list.queryKey()` |

### Cache Configuration:
- **staleTime:** 60 seconds (data considered fresh for 1 minute)
- **refetchOnWindowFocus:** true (default)
- **Hydration:** Pending queries are dehydrated for SSR

---

## 7. WebSocket Flow (Real-Time Data)

```mermaid
sequenceDiagram
    participant CC as Client Component
    participant Hook as useWebSocket()
    participant WS as WebSocketManager
    participant Backend as ATMOS Backend (wss://)

    CC->>Hook: useWebSocket('telemetry/')
    Hook->>WS: new WebSocketManager({ endpoint, token })
    WS->>Backend: WebSocket connect (wss://...?token=xxx)
    Backend-->>WS: Connection accepted
    WS-->>Hook: status → 'connected'
    Hook-->>CC: { status: 'connected', send, on }

    Backend->>WS: message { type: 'telemetry', data: { altitude: 550 } }
    WS->>CC: on('telemetry', handler) fires

    CC->>WS: send('command', { action: 'ping' })
    WS->>Backend: JSON message

    CC-->>Hook: Component unmounts
    Hook->>WS: disconnect()
    WS->>Backend: WebSocket close
```

See [`docs/modules/websocket.md`](../modules/websocket.md) for the full WebSocket module documentation.
