import arcjet, { slidingWindow } from '@/lib/arcjet'
import { middleware, TRPCError } from '../base'

const buildRatelimitAj = () =>
    arcjet.withRule(
        slidingWindow({
            mode: 'LIVE',
            interval: '1m',
            max: 1,
        }),
    )

export const requireRatelimitSequrityMiddleware = middleware(async ({ ctx, next }) => {
    const decisions = await buildRatelimitAj().protect(ctx.request, {
        userId: 'use676fuyg9r123764897hj87tig',
    })

    if (decisions.isDenied()) {
        if (decisions.reason.isRateLimit()) {
            throw new TRPCError({
                code: 'TOO_MANY_REQUESTS',
                message: 'You have been rate limited',
            })
        }
        throw new TRPCError({
            code: 'FORBIDDEN',
            message: 'Request blocked by security policy',
        })
    }

    return next()
})
