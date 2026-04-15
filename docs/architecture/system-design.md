# System Design — Antaris

## High-Level Architecture

```mermaid
graph TB
    subgraph Browser["Browser (Client)"]
        UI["React UI Components"]
        ZS["Zustand Stores<br/>(Auth, Modals)"]
        TQ["TanStack Query Cache"]
        TRPC_C["tRPC Client"]
        WS["WebSocket Client"]
    end

    subgraph NextJS["Next.js Server"]
        subgraph SSR["Server Components"]
            RSC["React Server Components"]
            Prefetch["Query Prefetching"]
        end

        subgraph MW["Middleware Layer"]
            NMW["middleware.ts<br/>(Token Refresh + Route Guard)"]
        end

        subgraph API["API Layer"]
            RPC["tRPC fetchRequestHandler<br/>/rpc"]
            AUTH["Auth API<br/>/api/auth/*"]
        end

        subgraph Security["Security Layer"]
            Arcjet["Arcjet<br/>(WAF + Bot + Rate Limit)"]
        end

        subgraph Router["tRPC Router"]
            UserRouter["User Router<br/>(CRUD)"]
            MissionRouter["Mission Router<br/>(Future)"]
        end
    end

    subgraph External["External Services"]
        KC["Keycloak<br/>Identity Provider"]
        CRUD["CrudCrud API<br/>User Data"]
        AJ["Arcjet Cloud<br/>Security"]
        ATMOS["ATMOS Backend<br/>(wss:// + https://)"]
    end

    UI --> TRPC_C
    UI --> WS
    TRPC_C --> RPC
    RPC --> Arcjet
    Arcjet --> Router
    UserRouter --> CRUD
    AUTH --> KC
    RSC --> Prefetch
    Prefetch --> TQ
    NMW --> AUTH
    WS --> ATMOS
```

## Architecture Layers

### Layer 1: Presentation (Browser)

| Component | Technology | Purpose |
|---|---|---|
| React Components | React 19 + RSC | Render UI |
| Design System | Radix + CVA + Tailwind | Component variants |
| State (UI) | Zustand | Auth state, modal state |
| State (Server) | TanStack Query v5 | API data cache |
| Animations | Framer Motion | Motion effects |
| Real-time | WebSocketManager + useWebSocket | Live telemetry/mission data |

### Layer 2: Server-Side Rendering (Next.js)

| Component | Technology | Purpose |
|---|---|---|
| Server Components | React RSC | Pre-render on server |
| Query Prefetching | TanStack HydrationBoundary | SSR → client cache transfer |
| Route Handlers | Next.js App Router | HTTP endpoint handling |
| Middleware | `middleware.ts` | Token refresh + route protection on every request |

### Layer 3: API (tRPC v11)

| Component | Technology | Purpose |
|---|---|---|
| HTTP Handler | `@trpc/server/adapters/fetch` | Maps HTTP → procedures |
| Router | tRPC router | Namespace-based procedure tree |
| Validation | Zod v4 | Input/output schema enforcement |
| Middleware | tRPC middleware | Security, context injection |
| Isomorphic Client | `lib/trpc.ts` + `lib/trpc.server.ts` | Same interface on server (direct) and client (HTTP) |

### Layer 4: Security (Arcjet)

| Component | Technology | Purpose |
|---|---|---|
| WAF | Arcjet Shield | SQL injection, XSS protection |
| Bot Detection | Arcjet detectBot | Block scrapers, allow search engines |
| Rate Limiting | Arcjet slidingWindow | 1 request/minute on mutations |

### Layer 5: Authentication (Keycloak + middleware.ts)

| Component | Technology | Purpose |
|---|---|---|
| OAuth Flow | Keycloak OpenID Connect | User login/logout |
| UMA Exchange | Keycloak UMA 2.0 | Fine-grained authorization |
| Session | httpOnly Cookies | Secure token storage |
| Token Refresh | `middleware.ts` | Silent refresh of expired access tokens |
| Client Hydration | Zustand + AuthProvider | SSR → client token bridge |

---

## Key Design Patterns

### 1. Hybrid Hydration Pattern (Authentication)

```
Server (RootLayout)
  → getAccessToken() from cookies
  → Pass token as prop to AllProviders
  → AuthProvider immediately hydrates Zustand store
  → All client components have instant token access
```

**Why:** Zero-latency token availability. No `useEffect` waterfall. No loading state for auth.

### 2. SSR Data Prefetching (TanStack Query)

```
Server Component (page.tsx)
  → getQueryClient()
  → prefetchQuery(trpc.user.list.queryOptions())
  → dehydrate(queryClient) → HydrationBoundary
  → Client Component reads from pre-populated cache
```

**Why:** No loading flicker. Data is available on first render. SEO-friendly.

### 3. tRPC Isomorphic Client

```
Server Side: globalThis.$trpcClient = createTRPCClient({ links: [createDirectCallLink()] })
Client Side: trpcClient = globalThis.$trpcClient ?? createTRPCClient({ links: [httpBatchLink()] })
```

**Why:** Same `trpc` proxy interface works both on server (direct call) and client (HTTP RPC).

### 4. Silent Token Refresh (middleware.ts)

```
Every request → middleware.ts
  → isTokenExpired(accessToken)?
    → YES + refreshToken exists → refreshAccessToken() → set new cookies → continue
    → YES + refreshToken expired → clear cookies → redirect to login
    → NO → continue normally
```

**Why:** Sessions stay alive transparently. No user interruption when JWT expires (typically every 5-15 min).

### 5. Middleware Chain (Security)

```
Request → tRPC context (request injection) → arcjet/standard (WAF + bot) → arcjet/ratelimit → procedure
```

**Why:** Attackers blocked before reaching business logic. Composable security layers.

### 6. Feature Module Encapsulation

```
features/<name>/
  ├── index.ts          → Public API (barrel exports)
  ├── components/       → UI components
  ├── hooks/            → State management
  └── types/            → Type definitions
```

**Why:** Domain isolation. Clear boundaries. Easy to add/remove features.

---

## Provider Tree (Nesting Order)

```
<html>
  <body>
    <ThemeProvider>           ← Dark/light mode
      <AuthProvider>          ← Zustand auth hydration
        <TanstackQueryProvider>  ← QueryClient instance
          <ModalsProvider>    ← Global modal registry
            <Toaster />      ← Toast notifications
            {children}       ← Page content
          </ModalsProvider>
        </TanstackQueryProvider>
      </AuthProvider>
    </ThemeProvider>
  </body>
</html>
```

**Order matters:** Theme must wrap Auth (for themed login), Auth must wrap Query (for authenticated API calls).

---

## Deployment Architecture

```
Browser  →  Next.js Server  →  Keycloak (SSO)
                             →  CrudCrud API (Data, temporary)
                             →  ATMOS Backend (wss:// real-time + https:// REST)
                             →  Arcjet Cloud (Security)
```

The application is designed to run as a single Next.js deployment with external dependencies for auth, data, security, and real-time telemetry.
