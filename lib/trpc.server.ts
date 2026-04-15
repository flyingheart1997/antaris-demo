/**
 * lib/trpc.server.ts — server-side tRPC bootstrap
 *
 * Mirrors the role of the old lib/orpc.server.ts:
 *   • Sets globalThis.$trpcClient to a "direct-call" tRPC client that invokes
 *     router procedures in-process — no HTTP round-trip during SSR prefetch.
 *   • The lazy link reads Next.js headers() per call, providing correct
 *     per-request context (same pattern as oRPC's context: async () => ...).
 *
 * Import this file ONCE in app/layout.tsx (as a side-effect import) so the
 * global is populated before any Server Component calls trpc.*.queryOptions().
 */

import 'server-only'

import { createTRPCClient } from '@trpc/client'
import { observable } from '@trpc/server/observable'
import type { TRPCLink } from '@trpc/client'
import { headers } from 'next/headers'
import { createCallerFactory } from '@/app/(server)/middlewares/base'
import { appRouter } from '@/app/(server)/router'
import type { AppRouter } from '@/app/(server)/router'

// ---------------------------------------------------------------------------
// Direct-call link
// ---------------------------------------------------------------------------

const callerFactory = createCallerFactory(appRouter)

/**
 * A custom tRPC link that bypasses HTTP and invokes procedures directly.
 * Context (request headers) is resolved lazily on each call via Next.js
 * AsyncLocalStorage — identical to how oRPC's `context: async () => ...` worked.
 */
function createDirectCallLink(): TRPCLink<AppRouter> {
    return () =>
        ({ op }) =>
            observable(observer => {
                headers()
                    .then(h => {
                        const ctx = {
                            request: new Request(
                                process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
                                { headers: Object.fromEntries(h.entries()) },
                            ),
                        }

                        const caller = callerFactory(ctx)

                        // Navigate the caller object to the right procedure
                        const parts = op.path.split('.')
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        let fn: any = caller
                        for (const part of parts) {
                            fn = fn[part]
                        }

                        if (typeof fn !== 'function') {
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            observer.error(
                                new Error(`[tRPC direct-call] Procedure not found: ${op.path}`) as any,
                            )
                            return
                        }

                        return Promise.resolve(fn(op.input))
                    })
                    .then(data => {
                        observer.next({ result: { data } })
                        observer.complete()
                    })
                    .catch(cause => {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        observer.error(cause as any)
                    })
            })
}

// ---------------------------------------------------------------------------
// Set the global — lib/trpc.ts will pick this up automatically
// ---------------------------------------------------------------------------

globalThis.$trpcClient = createTRPCClient<AppRouter>({
    links: [createDirectCallLink()],
})
