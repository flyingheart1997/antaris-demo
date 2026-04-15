import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { appRouter } from '@/app/(server)/router'

const handler = (req: Request) =>
    fetchRequestHandler({
        endpoint: '/rpc',
        req,
        router: appRouter,
        createContext: ({ req }) => ({ request: req }),
        onError({ error }) {
            console.error('[tRPC error]', error)
        },
    })

export const GET = handler
export const POST = handler
export const PUT = handler
export const PATCH = handler
export const DELETE = handler
export const HEAD = handler
