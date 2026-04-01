import arcjet, { slidingWindow } from "@/lib/arcjet"
import { base } from "../base"

const buildRatelimitAj = () => (
    arcjet.withRule(
        slidingWindow({
            mode: 'LIVE',
            interval: '1m',
            max: 1
        })
    )
)

export const requireRatelimitSequrityMiddleware = base
    .$context<{ request: Request }>()
    .middleware(async ({ context, next, errors }) => {
        const decisions = await buildRatelimitAj().protect(context.request, {
            userId: "use676fuyg9r123764897hj87tig", // This is a unique identifier for the user
        })

        if (decisions.isDenied()) {
            if (decisions.reason.isRateLimit()) {
                throw errors.RATE_LIMIT_EXCEEDED()
            }
            throw errors.FORBIDDEN({
                message: 'Request blocked by security policy',
            })
        }

        return next()
    })