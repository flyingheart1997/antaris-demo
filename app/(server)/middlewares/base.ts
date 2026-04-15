import { initTRPC, TRPCError } from '@trpc/server'

/**
 * Request context passed to every tRPC procedure.
 * The HTTP handler injects the raw Request object so that
 * security middlewares (Arcjet) can inspect headers/IP.
 */
export type Context = {
    request: Request
}

const t = initTRPC.context<Context>().create()

export const router = t.router
export const publicProcedure = t.procedure
export const middleware = t.middleware
export const createCallerFactory = t.createCallerFactory

/**
 * Re-export TRPCError so domain modules don't need a direct import from @trpc/server.
 */
export { TRPCError }
