# Data Flow — Antaris

## Overview

Data in Antaris flows through a strict layered pipeline:
**UI → oRPC Client → oRPC Server (with middleware) → External API → Response → Cache → UI**

---

## 1. Read Flow (Query)

```mermaid
sequenceDiagram
    participant Browser as Browser
    participant SC as Server Component
    participant QC as QueryClient
    participant OServer as oRPC Server Client
    participant Router as oRPC Router
    participant API as External API

    Browser->>SC: Request page (e.g., /users)
    SC->>QC: getQueryClient()
    SC->>QC: prefetchQuery(orpc.user.list.queryOptions())
    QC->>OServer: Call via globalThis.$client (direct, no HTTP)
    OServer->>Router: user.list handler
    Router->>API: fetch('https://crudcrud.com/.../users')
    API-->>Router: JSON response
    Router-->>OServer: Zod-validated data
    OServer-->>QC: Cache populated
    SC->>Browser: HydrationBoundary (dehydrated state)
    Browser->>Browser: Client Component: useQuery(orpc.user.list.queryOptions())
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
    participant OClient as oRPC Client (HTTP)
    participant RPC as /rpc/* Handler
    participant MW as Arcjet Middleware
    participant Router as oRPC Router
    participant API as External API
    participant QC as QueryClient

    UI->>OClient: useMutation(orpc.user.create.mutationOptions())
    OClient->>RPC: POST /rpc/user/create
    RPC->>MW: Standard Security (WAF + Bot)
    MW->>MW: Rate Limit Check (1 req/min)
    MW-->>RPC: Allowed
    RPC->>Router: user.create handler
    Router->>API: POST https://crudcrud.com/.../users
    API-->>Router: 201 Created
    Router-->>RPC: Success
    RPC-->>OClient: Response
    OClient-->>UI: onSuccess callback
    UI->>QC: invalidateQueries(orpc.user.list.queryKey())
    QC->>QC: Refetch user list in background
    QC-->>UI: Updated data
```

### Key Points:
- Mutations go through HTTP (not direct call) — client-side oRPC client
- Security middleware runs **before** business logic
- After mutation success, related queries are invalidated
- Cache is automatically refreshed — UI stays in sync

---

## 3. Authentication Flow

```mermaid
sequenceDiagram
    participant Browser as Browser
    participant Next as Next.js Server
    participant KC as Keycloak
    participant Cookie as httpOnly Cookies
    participant ZS as Zustand Auth Store

    Browser->>Next: Visit any page
    Next->>Cookie: Check atmos_access_token
    
    alt No token
        Next->>Browser: Redirect to /api/auth/login
        Browser->>Next: GET /api/auth/login
        Next->>Browser: Redirect to Keycloak login URL
        Browser->>KC: User enters credentials
        KC->>Browser: Redirect to /api/auth/callback?code=...
        Browser->>Next: GET /api/auth/callback?code=...
        Next->>KC: Exchange code for tokens
        KC-->>Next: access_token + refresh_token
        Next->>KC: UMA ticket exchange
        KC-->>Next: UMA access_token + refresh_token
        Next->>Cookie: Set atmos_access_token (httpOnly)
        Next->>Cookie: Set atmos_refresh_token (httpOnly)
        Next->>Browser: Redirect to /
    end

    alt Has token
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
- Server reads cookie → passes token as prop → client Zustand hydrates
- Zero-latency auth: no `useEffect`, no loading spinner
- JWT is decoded client-side for user info (name, email, etc.)

---

## 4. oRPC Client/Server Bridge

```mermaid
graph LR
    subgraph Server Side
        SSR["Server Component"]
        GSC["globalThis.$client"]
        Router["oRPC Router"]
        
        SSR --> GSC
        GSC --> Router
    end

    subgraph Client Side
        CC["Client Component"]
        ORPC["oRPC Client (HTTP)"]
        RPC["/rpc/* Route Handler"]
        
        CC --> ORPC
        ORPC -->|HTTP| RPC
        RPC --> Router
    end
```

### Dual Path:
1. **Server Components** → Use `globalThis.$client` (direct function call, no HTTP overhead)
2. **Client Components** → Use HTTP oRPC client (`RPCLink` → `/rpc/*`)
3. Both paths hit the same router & handlers — consistent behavior

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
| Create User | `orpc.user.list.queryKey()` |
| Update User | `orpc.user.list.queryKey()`, `orpc.user.details.queryKey({ input: { userId } })` |
| Delete User | `orpc.user.list.queryKey()` |

### Cache Configuration:
- **staleTime:** 60 seconds (data considered fresh for 1 minute)
- **refetchOnWindowFocus:** true (default)
- **Hydration:** Pending queries are dehydrated for SSR
- **Serialization:** Custom `StandardRPCJsonSerializer` for oRPC compatibility
