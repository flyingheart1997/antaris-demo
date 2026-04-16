# Module: tRPC API Layer

## Purpose

Type-safe RPC API system using **tRPC v11** that provides:

> **Deep Dive Docs:**
> - [api-architecture.md](../architecture/api-architecture.md) — Full breakdown: router, procedures, Arcjet middleware, context, HTTP handler, client usage patterns

- Server-side procedure definitions with Zod validation
- Automatic TypeScript client generation (zero codegen step)
- TanStack Query integration via the `trpc` options proxy
- Isomorphic client (direct-call on server, HTTP on client)
- Composable middleware chain

> This module replaces the previous oRPC layer.

---

## Architecture

```
lib/trpc.server.ts              → Sets globalThis.$trpcClient (direct-call, no HTTP)
lib/trpc.ts                     → Exports trpcClient + trpc proxy (isomorphic)
app/(server)/middlewares/base.ts → initTRPC setup (Context, router, publicProcedure)
app/(server)/middlewares/arcjet/ → Security middleware (WAF, rate-limit)
app/(server)/router/            → Procedure definitions per domain
app/(server)/rpc/[[...rest]]/   → fetchRequestHandler (HTTP bridge)
lib/query/client.ts             → QueryClient
lib/query/hydration.tsx         → SSR helpers (HydrateClient, getQueryClient)
```

---

## How It Works

### 1. Server Client (SSR — no HTTP round-trip)

```typescript
// lib/trpc.server.ts — runs on server only (import 'server-only')
// Sets globalThis.$trpcClient to a "direct-call" client using a custom link
// that invokes router procedures in-process, reading Next.js headers() lazily
// per call (same pattern as oRPC's context: async () => ...).
globalThis.$trpcClient = createTRPCClient<AppRouter>({
    links: [createDirectCallLink()],
})
```

Imported once as a side-effect in `app/layout.tsx`:
```typescript
import '@/lib/trpc.server'
```

### 2. Isomorphic Client

```typescript
// lib/trpc.ts — runs on both server and client
export const trpcClient = globalThis.$trpcClient ?? httpBatchLinkClient

// trpc proxy — queryOptions / mutationOptions / queryKey
export const trpc = {
    user: {
        list: {
            queryKey: () => ...,
            queryOptions: () => ({ queryKey, queryFn: () => trpcClient.user.list.query() }),
        },
        create: {
            mutationOptions: () => ({ mutationFn: (data) => trpcClient.user.create.mutate(data) }),
        },
        // ...
    },
}
```

### 3. HTTP Handler

```typescript
// app/(server)/rpc/[[...rest]]/route.ts
// Maps all HTTP methods to fetchRequestHandler → appRouter
```

---

## Usage Examples

### Server Component (SSR prefetch)

```typescript
import { trpc } from '@/lib/trpc'
import { getQueryClient, HydrateClient } from '@/lib/query/hydration'

export default async function UsersPage() {
    const queryClient = getQueryClient()
    await queryClient.prefetchQuery(trpc.user.list.queryOptions())

    return (
        <HydrateClient client={queryClient}>
            <Suspense fallback={<Skeleton />}>
                <UsersList />
            </Suspense>
        </HydrateClient>
    )
}
```

### Client Component (query)

```typescript
'use client'
import { useSuspenseQuery } from '@tanstack/react-query'
import { trpc } from '@/lib/trpc'

function UsersList() {
    const { data } = useSuspenseQuery(trpc.user.list.queryOptions())
    return data.data.map(user => <UserCard key={user._id} user={user} />)
}
```

### Client Component (mutation)

```typescript
'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { trpc } from '@/lib/trpc'

function DeleteButton({ userId }: { userId: string }) {
    const queryClient = useQueryClient()
    const mutation = useMutation({
        ...trpc.user.delete.mutationOptions(),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: trpc.user.list.queryKey() }),
    })
    return <button onClick={() => mutation.mutate({ userId })}>Delete</button>
}
```

---

## Adding a New API Route

1. Create `app/(server)/router/<domain>.ts` with a `router({ ... })` export
2. Register in `app/(server)/router/index.ts` → `appRouter`
3. Extend the `trpc` proxy in `lib/trpc.ts` with matching `queryOptions`/`mutationOptions`/`queryKey`
4. The client is immediately typed — no codegen

```typescript
// Example: adding a "mission" domain
// app/(server)/router/mission.ts
export const missionRouter = router({
    list: publicProcedure.query(async () => { ... }),
})

// app/(server)/router/index.ts
export const appRouter = router({ user: userRouter, mission: missionRouter })

// lib/trpc.ts → trpc proxy
mission: {
    list: {
        queryKey: () => [['trpc', 'mission', 'list']] as const,
        queryOptions: () => ({ queryKey: ..., queryFn: () => trpcClient.mission.list.query() }),
    },
},
```
