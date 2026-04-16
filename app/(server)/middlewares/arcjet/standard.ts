import arcjet, { detectBot, shield } from '@/lib/arcjet'
import { middleware, TRPCError } from '../base'

const buildStandardAj = () =>
    arcjet
        .withRule(shield({ mode: 'LIVE' }))
        .withRule(
            detectBot({
                mode: 'LIVE',
                allow: [
                    'CATEGORY:SEARCH_ENGINE',
                    'CATEGORY:MONITOR',
                    'CATEGORY:PREVIEW',
                ],
            }),
        )

export const requireStandardSequrityMiddleware = middleware(async ({ ctx, next }) => {
    const decisions = await buildStandardAj().protect(ctx.request, {
        userId: 'use676fuyg9r123764897hj87tig',
    })

    if (decisions.isDenied()) {
        if (decisions.reason.isBot()) {
            throw new TRPCError({
                code: 'FORBIDDEN',
                message: 'Automated requests are not allowed',
            })
        }
        if (decisions.reason.isShield()) {
            throw new TRPCError({
                code: 'FORBIDDEN',
                message: 'Request blocked by security policy (WAF)',
            })
        }
        throw new TRPCError({
            code: 'FORBIDDEN',
            message: 'Request blocked by security policy',
        })
    }

    return next()
})
