import z from 'zod'
import { router, publicProcedure, TRPCError } from '../middlewares/base'
import { userFormSchema } from '@/features/users/types/user-schema'
import { requireStandardSequrityMiddleware } from '../middlewares/arcjet/standard'
import { requireRatelimitSequrityMiddleware } from '../middlewares/arcjet/ratelimit'
import { revalidatePath } from 'next/cache'
import { getAccessToken } from '@/lib/auth/session'

// ---------------------------------------------------------------------------
// Schemas
// ---------------------------------------------------------------------------

const addressSchema = z.object({
    street: z.string(),
    suite: z.string(),
    city: z.string(),
    zipcode: z.string(),
    geo: z.object({
        lat: z.string(),
        lng: z.string(),
    }),
})

const companySchema = z.object({
    name: z.string(),
    catchPhrase: z.string(),
    bs: z.string(),
})

const userSchema = z.object({
    _id: z.string(),
    name: z.string(),
    gender: z.string(),
    username: z.string(),
    email: z.string(),
    address: addressSchema,
    phone: z.string(),
    website: z.string(),
    company: companySchema,
    avatar: z.string(),
})

export type User = z.infer<typeof userSchema>

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const API_BASE = 'https://crudcrud.com/api/2edff70db4f5491fa99c84b95d12331f'

function buildAvatar(user: Record<string, string>) {
    const seed = encodeURIComponent(user.username || user.email || user.name)
    return `https://api.dicebear.com/7.x/personas/svg?seed=${seed}&size=2048`
}

// ---------------------------------------------------------------------------
// User router
// ---------------------------------------------------------------------------

export const userRouter = router({
    list: publicProcedure.query(async () => {
        try {
            const response = await fetch(`${API_BASE}/users`)
            if (!response.ok) {
                return {
                    success: false,
                    data: [] as User[],
                    error: `API ${response.status} ${response.statusText}`,
                }
            }

            const users: Record<string, string>[] = await response.json()
            return {
                success: true,
                data: users.map(u =>
                    userSchema.parse({ ...u, avatar: buildAvatar(u) }),
                ),
            }
        } catch (err) {
            const reason = err instanceof Error ? err.message : 'Unknown error'
            return { success: false, data: [] as User[], error: reason }
        }
    }),

    details: publicProcedure
        .input(z.object({ userId: z.string() }))
        .query(async ({ input }) => {
            const response = await fetch(`${API_BASE}/users/${input.userId}`)
            if (!response.ok) {
                throw new TRPCError({ code: 'NOT_FOUND', message: 'User not found' })
            }
            const user: Record<string, string> = await response.json()
            return userSchema.parse({ ...user, avatar: buildAvatar(user) })
        }),

    create: publicProcedure
        .use(requireStandardSequrityMiddleware)
        .use(requireRatelimitSequrityMiddleware)
        .input(userFormSchema)
        .mutation(async ({ input }) => {
            const token = await getAccessToken()
            const response = await fetch(`${API_BASE}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
                body: JSON.stringify(input),
            })
            if (!response.ok) {
                throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Error creating user' })
            }
        }),

    update: publicProcedure
        .use(requireStandardSequrityMiddleware)
        .use(requireRatelimitSequrityMiddleware)
        .input(z.object({ userId: z.string(), data: userFormSchema }))
        .mutation(async ({ input }) => {
            const token = await getAccessToken()
            const response = await fetch(`${API_BASE}/users/${input.userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
                body: JSON.stringify(input.data),
            })
            if (!response.ok) {
                throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Error updating user' })
            }
            revalidatePath(`/users/${input.userId}`)
        }),

    delete: publicProcedure
        .use(requireStandardSequrityMiddleware)
        .input(z.object({ userId: z.string() }))
        .mutation(async ({ input }) => {
            const token = await getAccessToken()
            const response = await fetch(`${API_BASE}/users/${input.userId}`, {
                method: 'DELETE',
                headers: {
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
            })
            if (!response.ok) {
                throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Error deleting user' })
            }
        }),
})
