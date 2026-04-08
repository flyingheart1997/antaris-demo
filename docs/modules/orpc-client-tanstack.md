# Module: oRPC Client + TanStack Query

## Overview

The client data layer has two responsibilities:
1. **oRPC client** — provides a typed interface for calling server routes (HTTP on client, direct call on server)
2. **TanStack Query** — manages caching, deduplication, background refetching, and SSR hydration of server data

These two are wired together via `@orpc/tanstack-query`, which generates TanStack Query-compatible `queryOptions()` and `mutationOptions()` from the oRPC router types.

---

## Architecture Diagram

```
Server Component (RSC)
    │
    ├─ getQueryClient()                ← cached QueryClient per request
    ├─ prefetchQuery(orpc.user.list.queryOptions())
    │        │
    │        └─ calls globalThis.$client.user.list()   ← direct function call, no HTTP
    │
    └─ <HydrateClient client={queryClient}>
             │
             └─ Serializes QueryClient state → injects into HTML
                        │
                        ▼
             Client receives hydrated cache
                        │
                        ▼
              <Suspense fallback={<Skeleton />}>
                        │
                        ▼
              <DataGrid queryOptions={orpc.user.list.queryOptions()} />
                        │
                        └─ useSuspenseQuery() → reads from cache → NO re-fetch (< 60s stale)
```

---

## 1. oRPC Client Setup — `lib/orpc.ts`

```typescript
import type { RouterClient } from '@orpc/server'
import { RPCLink } from '@orpc/client/fetch'
import { createORPCClient } from '@orpc/client'
import { router } from '@/app/(server)/router'
import { createTanstackQueryUtils } from '@orpc/tanstack-query'

declare global {
    var $client: RouterClient<typeof router> | undefined
}

const link = new RPCLink({
    url: () => {
        if (typeof window === 'undefined') {
            throw new Error('RPCLink is not allowed on the server side.')
        }
        return `${window.location.origin}/rpc`
    },
})

export const client: RouterClient<typeof router> = globalThis.$client ?? createORPCClient(link)
export const orpc = createTanstackQueryUtils(client)
```

### What each piece does:

**`RPCLink`** — HTTP transport layer. On every client-side call, it sends an HTTP request to `/rpc`. The URL is a function (not a string) so it's evaluated lazily at call time, using `window.location.origin` to work across all environments (localhost, staging, prod).

**`globalThis.$client`** — On the server, `lib/orpc.server.ts` sets `globalThis.$client` to a direct router client (no HTTP). So when this file runs on the server, `client` resolves to the server client. When running on the client, `globalThis.$client` is `undefined` and falls back to `createORPCClient(link)`.

**`createTanstackQueryUtils(client)`** — Wraps the typed client to generate:
- `orpc.user.list.queryOptions()` → `UseSuspenseQueryOptions` / `UseQueryOptions` compatible object
- `orpc.user.create.mutationOptions()` → `UseMutationOptions` compatible object
- `orpc.user.list.queryKey()` → the canonical query key array for cache invalidation

---

## 2. TanStack QueryClient — `lib/query/client.ts`

```typescript
import { defaultShouldDehydrateQuery, QueryClient } from '@tanstack/react-query'
import { serializer } from '../serializer'

export function createQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                queryKeyHashFn(queryKey) {
                    const [json, meta] = serializer.serialize(queryKey)
                    return JSON.stringify({ json, meta })    // oRPC-aware key hashing
                },
                staleTime: 60 * 1000,                        // 60s before data is considered stale
            },
            dehydrate: {
                // Dehydrate even pending queries — so SSR Suspense boundaries work
                shouldDehydrateQuery: query =>
                    defaultShouldDehydrateQuery(query) || query.state.status === 'pending',
                serializeData(data) {
                    const [json, meta] = serializer.serialize(data)
                    return { json, meta }
                },
            },
            hydrate: {
                deserializeData(data) {
                    return serializer.deserialize(data.json, data.meta)
                }
            },
        }
    })
}
```

### Why a custom `queryKeyHashFn`?

oRPC uses complex objects as query keys (containing method, path, and input). The default TanStack Query key hashing (`JSON.stringify`) can fail or produce incorrect results for non-primitive values. The oRPC serializer handles this correctly.

### Why `staleTime: 60 * 1000`?

Without `staleTime > 0`, TanStack Query refetches data **immediately on component mount** — even if data was just prefetched on the server. Setting staleTime to 60 seconds means: if data was prefetched less than 60 seconds ago, serve it from cache without refetching. This prevents a visible loading flash after navigation.

### Why `shouldDehydrateQuery` includes `pending` status?

When the server prefetches data inside a Suspense boundary, the query may be in `pending` state during the initial render. Without this, the dehydrated state would skip pending queries, causing the client to re-fetch unnecessarily.

---

## 3. Hydration Utilities — `lib/query/hydration.tsx`

```typescript
import { createQueryClient } from './client'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { cache } from 'react'

export const getQueryClient = cache(createQueryClient)

export function HydrateClient(props: { children: React.ReactNode, client: QueryClient }) {
    return (
        <HydrationBoundary state={dehydrate(props.client)}>
            {props.children}
        </HydrationBoundary>
    )
}
```

### `getQueryClient = cache(createQueryClient)`

React's `cache()` ensures that **within a single server request**, every call to `getQueryClient()` returns the **same QueryClient instance**. Without this, the server page and a child server component would each get a different QueryClient, making it impossible to share prefetched data.

### `HydrateClient`

This is a **Server Component wrapper** that:
1. Calls `dehydrate(client)` — serializes the QueryClient's cache (all prefetched queries) into a plain object
2. Passes it to `HydrationBoundary` — which injects it into the page HTML as a script tag
3. On the client, TanStack Query reads this script tag and restores the cache — zero re-fetch required

---

## 4. SSR Prefetch Pattern — Server Component

**File:** `app/users/page.tsx`

```typescript
const Users = async () => {
    const queryClient = getQueryClient()   // same instance across this request

    // Prefetch on server — handler runs directly, no HTTP
    await queryClient.prefetchQuery(orpc.user.list.queryOptions())

    return (
        <HydrateClient client={queryClient}>          // ← serializes cache into HTML
            <PageShell title="Operators" ...>
                <Suspense fallback={<CardGridSkeleton count={8} />}>
                    <UsersList />                      // ← client component that reads from cache
                </Suspense>
            </PageShell>
        </HydrateClient>
    )
}
```

**What happens step by step:**
1. `getQueryClient()` — creates (or retrieves cached) QueryClient for this request
2. `prefetchQuery(orpc.user.list.queryOptions())` — calls `listusers()` handler directly on the server, stores result in QueryClient
3. `HydrateClient` — serializes the QueryClient cache and embeds it in the HTML sent to the browser
4. Browser renders the page — TanStack Query deserializes the cache
5. `<UsersList />` (client component) calls `useSuspenseQuery(orpc.user.list.queryOptions())` — finds data in cache, renders immediately — **no loading state shown**

---

## 5. Suspense Query — `DataGrid` Component

**File:** `components/data-grid.tsx`

```typescript
'use client'

export function DataGrid<T>({ queryOptions, renderItem, emptyProps, gridClassName }: DataGridProps<T>) {
    const { data: response } = useSuspenseQuery(queryOptions)

    // oRPC returns { success: boolean, data: T[] }
    if (!response.success) {
        throw new Error("Failed to load data")   // ← caught by closest error boundary
    }

    const items = response.data

    if (!items || items.length === 0) {
        return <EmptyState {...emptyProps} />
    }

    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ...">
            {items.map((item, index) => (
                <div key={index}>{renderItem(item)}</div>
            ))}
        </div>
    )
}
```

### Why `useSuspenseQuery` instead of `useQuery`?

`useSuspenseQuery` integrates with React's `<Suspense>` boundary:
- While loading → the query suspends, React shows the `fallback` (`<CardGridSkeleton />`)
- When data is ready → React renders the component

With SSR prefetch, the data is already in cache before the client renders — so Suspense resolves immediately without showing the skeleton.

### What happens if `success: false`?

DataGrid throws an error, which bubbles up to the nearest **React error boundary**. The global `app/error.tsx` catches this and shows `<ErrorView>`.

### Usage in `UsersList`:

```typescript
// features/users/components/users-list.tsx
const UsersList = () => {
    const { openCreate } = useUserModal()

    return (
        <DataGrid<User>
            queryOptions={orpc.user.list.queryOptions() as any}
            renderItem={(user) => <UserCard user={user} />}
            emptyProps={{
                icon: Users,
                title: "No Operators Found",
                description: "...",
                actionLabel: "Add Operator",
                onAction: openCreate
            }}
        />
    )
}
```

`DataGrid` is generic — `<User>` tells TypeScript the type of each item. `renderItem` receives a typed `User` object. The empty state wires directly to `useUserModal().openCreate` to open the create modal.

---

## 6. Regular Query (No Suspense) — Client Component

**File:** `app/users/[userId]/page.tsx`

```typescript
'use client'

const UserDetails = () => {
    const { userId } = useParams()

    const { data: user, isLoading, isError } = useQuery(
        orpc.user.details.queryOptions({
            input: { userId: userId as string },
            retry: false       // don't retry on failure — show error immediately
        })
    )

    if (isError && !user) return <ErrorComponent />
    if (isLoading) return <ProfileSkeleton />

    return ( /* user profile UI */ )
}
```

### `useQuery` vs `useSuspenseQuery`

| | `useQuery` | `useSuspenseQuery` |
|---|---|---|
| Loading state | `isLoading: boolean` | Suspends component |
| Error state | `isError: boolean` | Throws error to boundary |
| Fallback control | Manual `if (isLoading)` | `<Suspense fallback={...}>` |
| Use when | Client-only navigation | Inside Suspense boundary with SSR prefetch |

The user details page doesn't prefetch on the server (it's a client component), so `useQuery` with explicit loading/error guards is appropriate here.

### Query options with input:

```typescript
orpc.user.details.queryOptions({ input: { userId: userId as string } })
```

When the route has path parameters (like `{userId}`), you pass them as `input` inside `queryOptions`. The oRPC client extracts them and sends them as the correct path parameter in the HTTP request.

---

## 7. Mutations — Create, Update, Delete

**File:** `features/users/components/user-modal.tsx`

### Create mutation:

```typescript
const createUserMutation = useMutation({
    ...orpc.user.create.mutationOptions(),
    onSuccess: async () => {
        await queryClient.invalidateQueries({
            queryKey: orpc.user.list.queryKey()   // ← invalidate the users list cache
        })
        form.reset()
        toast.success('User created successfully')
        close()
    },
    onError: (error) => {
        toast.error(error.message)   // ← error.message comes from the ORPCError on the server
    }
})
```

**Trigger:**
```typescript
createUserMutation.mutate(data)  // data is validated UserType from React Hook Form
```

### Update mutation:

```typescript
const updateUserMutation = useMutation({
    ...orpc.user.update.mutationOptions(),
    onSuccess: async () => {
        // Invalidate the list (so the card shows updated name)
        await queryClient.invalidateQueries({ queryKey: orpc.user.list.queryKey() })

        // Invalidate the specific user details (so the profile page shows updated data)
        await queryClient.invalidateQueries({
            queryKey: orpc.user.details.queryKey({ input: { userId: userId! } }),
            exact: true   // ← only this userId, not all user.details queries
        })

        form.reset()
        toast.success('User updated successfully')
        close()
    },
})
```

**Trigger:**
```typescript
updateUserMutation.mutate({ userId, data })   // userId from useUserModal store, data from form
```

### Delete mutation (from `app/users/[userId]/page.tsx`):

```typescript
const deleteUserMutation = useMutation({
    ...orpc.user?.delete.mutationOptions(),
    onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: orpc.user?.list.queryKey() })
        toast.success('Operator terminated successfully')
        router.push("/users")   // navigate back to the list
    },
    onError: (error: any) => {
        toast.error(error.message)
    }
})
```

**Trigger:**
```typescript
deleteUserMutation.mutate({ userId: userId as string })
```

---

## 8. Cache Invalidation Strategy

When data changes, TanStack Query must be told to mark cached queries as stale. Antaris uses `invalidateQueries`:

```typescript
// After create:
queryClient.invalidateQueries({ queryKey: orpc.user.list.queryKey() })
// → marks user.list cache as stale → triggers background refetch → UI updates

// After update:
queryClient.invalidateQueries({ queryKey: orpc.user.list.queryKey() })
queryClient.invalidateQueries({ queryKey: orpc.user.details.queryKey({ input: { userId } }), exact: true })
// → updates both the list AND the specific user's profile cache

// After delete:
queryClient.invalidateQueries({ queryKey: orpc.user.list.queryKey() })
// → list updates, then navigate away (so no need to invalidate the deleted user's details)
```

### Why `exact: true` on details invalidation?

Without `exact: true`, `invalidateQueries({ queryKey: ['user', 'details'] })` would invalidate **all user detail queries** (all cached user profiles). With `exact: true`, only the specific user being edited is invalidated.

---

## 9. Query Key Reference

| Query | Key accessor | Description |
|---|---|---|
| User list | `orpc.user.list.queryKey()` | All users |
| User details | `orpc.user.details.queryKey({ input: { userId } })` | Specific user by ID |

Query keys are **generated by oRPC** from the router definition — they're stable, type-safe, and consistent between prefetch and client usage. This is how SSR hydration works: the server and client use the same key, so the client finds the prefetched data in cache.

---

## 10. Serializer Role — `lib/serializer.ts`

The `StandardRPCJsonSerializer` handles serialization of:
- **Query keys** — oRPC uses objects with nested data as keys; standard `JSON.stringify` doesn't hash these correctly
- **Dehydrated cache** — when serializing the QueryClient state for SSR transfer, complex objects (Dates, Sets, Maps) need custom handling
- **Hydration** — when the client deserializes the cache from the HTML

The serializer is the glue that makes SSR hydration work reliably with oRPC's complex query key structure.

---

## 11. Summary: Which Hook to Use When

| Scenario | Hook | Example |
|---|---|---|
| Server prefetch + client read | `prefetchQuery` + `useSuspenseQuery` | Users list page |
| Client-only navigation to detail page | `useQuery` with manual loading/error | User profile page |
| Creating/updating/deleting data | `useMutation` + `invalidateQueries` | UserModal, delete button |
| Reading auth token | `useAuth()` (Zustand) | Any component needing the token |
| Opening a modal | `useUserModal()` (Zustand) | CreateUserButton, UserCard |
