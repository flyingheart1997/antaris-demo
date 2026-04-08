# Module: oRPC API Layer

## Purpose
Type-safe RPC API system using @orpc that provides:

> **Deep Dive Docs:**
> - [orpc-server.md](orpc-server.md) — Full server-side breakdown: router, handlers, Arcjet middleware, auth token flow
> - [orpc-client-tanstack.md](orpc-client-tanstack.md) — Full client-side breakdown: oRPC client, TanStack Query, SSR hydration, queries, mutations
- Server-side route definitions with Zod validation
- Automatic TypeScript client generation
- TanStack Query integration for caching
- Isomorphic client (works on both server and client)
- Composable middleware chain

---

## Architecture

```
lib/orpc.server.ts          → Creates server-side client (globalThis.$client)
lib/orpc.ts                 → Creates browser-side client (HTTP fallback)
lib/serializer.ts           → JSON serializer for hydration
app/(server)/router/        → Route definitions
app/(server)/middlewares/   → Middleware chain
app/(server)/rpc/           → HTTP handler
lib/query/client.ts         → QueryClient with serialization
lib/query/hydration.tsx     → SSR hydration helpers
```

---

## How It Works

### 1. Server Client (SSR)
```typescript
// lib/orpc.server.ts — runs on server only
globalThis.$client = createRouterClient(router, {
    context: async () => ({
        request: new Request('http://localhost:3000'),
        headers: await headers(),
    }),
})
```
- Set on `globalThis` so it's available to the browser client module
- Used by Server Components for direct function calls (no HTTP)

### 2. Browser Client
```typescript
// lib/orpc.ts — runs on client
const link = new RPCLink({
    url: () => `${window.location.origin}/rpc`,
})
export const client = globalThis.$client ?? createORPCClient(link)
export const orpc = createTanstackQueryUtils(client)
```
- Falls back to HTTP RPC if server client not available
- `orpc` provides `.queryOptions()`, `.mutationOptions()`, `.queryKey()`

### 3. HTTP Handler
```typescript
// app/(server)/rpc/[[...rest]]/route.ts
const handler = new RPCHandler(router, { interceptors: [onError(console.error)] })
// Maps all HTTP methods to the handler
```

---

## Adding a New API Route

1. Create the route handler in `app/(server)/router/<domain>.ts`
2. Register it in `app/(server)/router/index.ts`
3. Use `base` middleware and apply security middleware as needed
4. Define Zod input/output schemas
5. The client is automatically typed — no code generation step

```typescript
// 1. Define in app/(server)/router/mission.ts
export const listMissions = base
    .route({ method: 'GET', path: '/missions', summary: 'List missions', tags: ['mission'] })
    .input(z.void())
    .output(z.array(missionSchema))
    .handler(async () => { /* ... */ })

// 2. Register in app/(server)/router/index.ts
export const router = {
    user: { /* ... */ },
    mission: { list: listMissions }
}

// 3. Use in Server Component
await queryClient.prefetchQuery(orpc.mission.list.queryOptions())

// 4. Use in Client Component
const { data } = useQuery(orpc.mission.list.queryOptions())
```
