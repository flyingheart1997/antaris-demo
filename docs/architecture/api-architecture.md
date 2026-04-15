# API Architecture — Antaris

## Overview

The API layer is built on **tRPC v11** — a type-safe RPC framework that generates fully-typed clients directly from server-side router definitions. All API communication goes through the tRPC abstraction layer, except authentication routes which use standard Next.js API routes.

---

## API Endpoint Structure

### tRPC Routes (Type-Safe RPC)

All tRPC routes are served at `/rpc` via the catch-all handler.

| Procedure | Type | Path | Description | Security |
|---|---|---|---|---|
| `user.list` | query | `/rpc` | List all users | None (public read) |
| `user.details` | query | `/rpc` | Get user by ID | None (public read) |
| `user.create` | mutation | `/rpc` | Create a new user | Standard + Rate Limit |
| `user.update` | mutation | `/rpc` | Update user by ID | Standard + Rate Limit |
| `user.delete` | mutation | `/rpc` | Delete user by ID | Standard |

### Auth Routes (Next.js API Routes)

| Endpoint | Method | Description |
|---|---|---|
| `/api/auth/login` | GET | Redirects to Keycloak login page |
| `/api/auth/logout` | GET | Clears cookies, redirects to Keycloak logout |
| `/api/auth/callback` | GET | Handles OAuth callback, exchanges code for tokens |

---

## tRPC Architecture

```
lib/trpc.server.ts              → Sets globalThis.$trpcClient (direct-call, no HTTP) for SSR
lib/trpc.ts                     → Isomorphic client: server=direct-call, client=HTTP batch
lib/query/client.ts             → TanStack Query QueryClient
lib/query/hydration.tsx         → SSR hydration helpers (HydrateClient, getQueryClient)
app/(server)/middlewares/base.ts → initTRPC — context, router, publicProcedure, middleware
app/(server)/middlewares/arcjet/ → Arcjet WAF + rate-limit tRPC middlewares
app/(server)/router/            → Procedure definitions (user.ts, ...)
app/(server)/rpc/[[...rest]]/   → fetchRequestHandler — HTTP bridge to tRPC router
```

### App Router

```typescript
// app/(server)/router/index.ts
export const appRouter = router({
    user: userRouter,
    // mission: missionRouter,
})
export type AppRouter = typeof appRouter
```

### Procedure Definition Pattern

```typescript
// app/(server)/router/user.ts
export const userRouter = router({
    list: publicProcedure
        .query(async () => {
            // Business logic — can call external REST APIs
            const response = await fetch('https://api.example.com/users')
            return { success: true, data: users }
        }),

    create: publicProcedure
        .use(requireStandardSequrityMiddleware) // WAF + bot detection
        .use(requireRatelimitSequrityMiddleware) // sliding window rate limit
        .input(userFormSchema)                  // Zod validation
        .mutation(async ({ input }) => {
            // ...
        }),
})
```

### Context

All procedures receive the raw `Request` object for security middleware inspection:

```typescript
// app/(server)/middlewares/base.ts
export type Context = {
    request: Request
}
const t = initTRPC.context<Context>().create()
```

The HTTP handler injects the context:
```typescript
// app/(server)/rpc/[[...rest]]/route.ts
fetchRequestHandler({
    router: appRouter,
    createContext: ({ req }) => ({ request: req }),
})
```

---

## Security Middleware Stack

### Standard Security (`requireStandardSequrityMiddleware`)

Applied to: `create`, `update`, `delete` operations

Includes:
1. **Shield (WAF)** — Blocks SQL injection, XSS, path traversal
2. **Bot Detection** — Blocks automated requests, allows search engines and monitors

### Rate Limiting (`requireRatelimitSequrityMiddleware`)

Applied to: `create`, `update` operations

Configuration:
- **Algorithm:** Sliding window
- **Limit:** 1 request per minute per user
- **Mode:** LIVE (enforced)

### Middleware Composition

```typescript
// tRPC middleware — same chain as before, different syntax
publicProcedure
    .use(requireStandardSequrityMiddleware) // throws TRPCError on violation
    .use(requireRatelimitSequrityMiddleware)
    .input(schema)
    .mutation(handler)
```

---

## Client-Side Usage

### TanStack Query Integration (via `trpc` proxy)

`lib/trpc.ts` exports a typed `trpc` proxy that mirrors the old oRPC interface:

```typescript
import { trpc } from '@/lib/trpc'

// Query (read) — for useSuspenseQuery / prefetchQuery
const queryOpts = trpc.user.list.queryOptions()
// { queryKey: [['trpc','user','list']], queryFn: () => ... }

// Mutation (write)
const mutOpts = trpc.user.create.mutationOptions()
// { mutationFn: (data) => ... }

// Stable cache key (for invalidation)
const key = trpc.user.list.queryKey()
```

### Hooks in Client Components

```typescript
'use client'
import { useMutation, useSuspenseQuery, useQueryClient } from '@tanstack/react-query'
import { trpc } from '@/lib/trpc'

// Query
const { data } = useSuspenseQuery(trpc.user.list.queryOptions())

// Mutation
const queryClient = useQueryClient()
const mutation = useMutation({
    ...trpc.user.create.mutationOptions(),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: trpc.user.list.queryKey() }),
})
```

### SSR Prefetching

```typescript
// Server Component
import { trpc } from '@/lib/trpc'
import { getQueryClient, HydrateClient } from '@/lib/query/hydration'

const queryClient = getQueryClient()
await queryClient.prefetchQuery(trpc.user.list.queryOptions())
// lib/trpc.server.ts sets globalThis.$trpcClient to a direct-call client
// → no HTTP round-trip during SSR, identical to oRPC's pattern

return (
    <HydrateClient client={queryClient}>
        <Suspense><UsersList /></Suspense>
    </HydrateClient>
)
```

---

## Error Handling

tRPC errors use `TRPCError` with typed error codes:

```typescript
import { TRPCError } from '@trpc/server'

throw new TRPCError({ code: 'NOT_FOUND', message: 'User not found' })
throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Something went wrong' })
throw new TRPCError({ code: 'FORBIDDEN', message: 'Access denied' })
throw new TRPCError({ code: 'TOO_MANY_REQUESTS', message: 'Rate limited' })
```

---

## Adding a New API Route

1. Create the route file `app/(server)/router/<domain>.ts`
2. Define a `router({ ... })` with typed procedures
3. Register it in `app/(server)/router/index.ts` → `appRouter`
4. Add entries to `lib/trpc.ts` → `trpc` proxy (queryOptions, mutationOptions, queryKey)
5. The client is automatically typed — no code generation step

```typescript
// 1. Define in app/(server)/router/mission.ts
export const missionRouter = router({
    list: publicProcedure.query(async () => { /* ... */ }),
    create: publicProcedure
        .use(requireStandardSequrityMiddleware)
        .input(missionSchema)
        .mutation(async ({ input }) => { /* ... */ }),
})

// 2. Register in app/(server)/router/index.ts
export const appRouter = router({
    user: userRouter,
    mission: missionRouter,
})

// 3. Extend lib/trpc.ts proxy
mission: {
    list: {
        queryKey: () => [['trpc', 'mission', 'list']] as const,
        queryOptions: () => ({ queryKey: ..., queryFn: () => trpcClient.mission.list.query() }),
    },
    create: {
        mutationOptions: () => ({ mutationFn: (data) => trpcClient.mission.create.mutate(data) }),
    },
}
```

---

## HTTP Handler

```typescript
// app/(server)/rpc/[[...rest]]/route.ts
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { appRouter } from '@/app/(server)/router'

const handler = (req: Request) =>
    fetchRequestHandler({
        endpoint: '/rpc',
        req,
        router: appRouter,
        createContext: ({ req }) => ({ request: req }),
        onError({ error }) { console.error('[tRPC error]', error) },
    })

export { handler as GET, handler as POST, handler as PUT, handler as DELETE, handler as PATCH }
```

---

## External API

Currently using **CrudCrud** as a demo REST API (called from inside tRPC procedures):

| Method | URL | Purpose |
|---|---|---|
| GET | `https://crudcrud.com/api/{key}/users` | List users |
| GET | `https://crudcrud.com/api/{key}/users/{id}` | Get user |
| POST | `https://crudcrud.com/api/{key}/users` | Create user |
| PUT | `https://crudcrud.com/api/{key}/users/{id}` | Update user |
| DELETE | `https://crudcrud.com/api/{key}/users/{id}` | Delete user |

> **Note:** In production, this will be replaced with the Antaris ATMOS backend at `NEXT_PUBLIC_BACKEND_BASE_URL`.
