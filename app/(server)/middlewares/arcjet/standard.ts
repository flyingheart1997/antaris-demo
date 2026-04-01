import arcjet, { detectBot, shield } from "@/lib/arcjet"
import { base } from "../base"

const buildStandardAj = () => (
    arcjet.withRule(
        // Shield protects your app from common attacks e.g. SQL injection
        shield({ mode: "LIVE" }), // Blocks requests. Use "DRY_RUN" to log only
    ).withRule(
        detectBot({
            mode: "LIVE", // Blocks requests. Use "DRY_RUN" to log only
            // Block all bots except the following
            allow: [
                "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc
                "CATEGORY:MONITOR", // Uptime monitoring services
                "CATEGORY:PREVIEW", // Link previews e.g. Slack, Discord
            ],
            // Allow all other bots except the following
            // deny: [
            //     "CATEGORY:UNKNOWN", // Generic bots
            //     "CATEGORY:AI", // Generic spammers
            // ],
        }),
    )
)

export const requireStandardSequrityMiddleware = base
    .$context<{ request: Request }>()
    .middleware(async ({ context, next, errors }) => {
        const decisions = await buildStandardAj().protect(context.request, {
            userId: "use676fuyg9r123764897hj87tig", // This is a unique identifier for the user
        })

        if (decisions.isDenied()) {
            if (decisions.reason.isBot()) {
                throw errors.FORBIDDEN({
                    message: 'Automated requests are not allowed',
                })
            }
            if (decisions.reason.isShield()) {
                throw errors.FORBIDDEN({
                    message: 'Request blocked by security policy (WAF)',
                })
            }
            throw errors.FORBIDDEN({
                message: 'Request blocked by security policy',
            })
        }

        return next()
    })