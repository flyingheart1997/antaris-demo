/**
 * lib/trpc.ts — isomorphic tRPC client
 *
 * Architecture mirrors the previous lib/orpc.ts:
 *   • On the server, lib/trpc.server.ts sets globalThis.$trpcClient to a
 *     direct-call client (no HTTP round-trip).
 *   • On the client, this module creates an HTTP batch-link client lazily
 *     (so window.location.origin is safe to access).
 *
 * The exported `trpc` proxy exposes the same interface that oRPC's
 * createTanstackQueryUtils produced — `.queryOptions()`, `.mutationOptions()`,
 * `.queryKey()` — so existing call sites change only their import path.
 */

import { createTRPCClient, httpBatchLink } from '@trpc/client'
import type { AppRouter } from '@/app/(server)/router'
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server'
import type { UseSuspenseQueryOptions } from '@tanstack/react-query'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type RouterInputs = inferRouterInputs<AppRouter>
type RouterOutputs = inferRouterOutputs<AppRouter>

type QueryKey = readonly unknown[]

// ---------------------------------------------------------------------------
// Client setup (lazy — safe on both server and client)
// ---------------------------------------------------------------------------

declare global {
    // eslint-disable-next-line no-var
    var $trpcClient: ReturnType<typeof createTRPCClient<AppRouter>> | undefined
}

// Lazy HTTP client — only instantiated when first accessed on the browser.
// On the server, globalThis.$trpcClient (set by lib/trpc.server.ts) is used instead.
let _httpClient: ReturnType<typeof createTRPCClient<AppRouter>> | undefined

function getClient(): ReturnType<typeof createTRPCClient<AppRouter>> {
    // Prefer the direct-call server client (set by lib/trpc.server.ts)
    if (globalThis.$trpcClient) return globalThis.$trpcClient
    // Browser: create the HTTP client lazily so window.location is available
    _httpClient ??= createTRPCClient<AppRouter>({
        links: [
            httpBatchLink({
                url: `${window.location.origin}/rpc`,
            }),
        ],
    })
    return _httpClient
}

/**
 * The active tRPC client — resolves to the direct-call server client on the
 * server, and the HTTP batch-link client on the browser.
 */
export const trpcClient = new Proxy({} as ReturnType<typeof createTRPCClient<AppRouter>>, {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    get: (_, prop) => (getClient() as any)[prop],
})

// ---------------------------------------------------------------------------
// Query key namespace  (stable, deterministic — safe for cache invalidation)
// ---------------------------------------------------------------------------

const KEYS = {
    user: {
        list: (): QueryKey => [['trpc', 'user', 'list']],
        details: (userId: string): QueryKey => [['trpc', 'user', 'details'], { input: { userId } }],
    },
}

// ---------------------------------------------------------------------------
// `trpc` proxy — same interface as oRPC's createTanstackQueryUtils
// Call sites only need to change their import from lib/orpc → lib/trpc.
// ---------------------------------------------------------------------------

export const trpc = {
    user: {
        list: {
            /** Stable cache key for this query. */
            queryKey: (): QueryKey => KEYS.user.list(),

            /** TanStack Query-compatible options for useQuery / prefetchQuery. */
            queryOptions: (): UseSuspenseQueryOptions<RouterOutputs['user']['list']> => ({
                queryKey: KEYS.user.list(),
                queryFn: () => trpcClient.user.list.query(),
            }),
        },

        details: {
            queryKey: (opts: { input: RouterInputs['user']['details'] }): QueryKey =>
                KEYS.user.details(opts.input.userId),

            queryOptions: (opts: {
                input: RouterInputs['user']['details']
                retry?: boolean
            }): UseSuspenseQueryOptions<RouterOutputs['user']['details']> => ({
                queryKey: KEYS.user.details(opts.input.userId),
                queryFn: () => trpcClient.user.details.query(opts.input),
                retry: opts.retry,
            }),
        },

        create: {
            mutationOptions: () => ({
                mutationFn: (data: RouterInputs['user']['create']) =>
                    trpcClient.user.create.mutate(data),
            }),
        },

        update: {
            mutationOptions: () => ({
                mutationFn: (data: RouterInputs['user']['update']) =>
                    trpcClient.user.update.mutate(data),
            }),
        },

        delete: {
            mutationOptions: () => ({
                mutationFn: (data: RouterInputs['user']['delete']) =>
                    trpcClient.user.delete.mutate(data),
            }),
        },
    },
} as const
