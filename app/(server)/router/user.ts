import z from 'zod'
import { base } from '../middlewares/base'
import { userFormSchema } from '@/features/users/types/user-schema'
import { requireStandardSequrityMiddleware } from '../middlewares/arcjet/standard'
import { requireRatelimitSequrityMiddleware } from '../middlewares/arcjet/ratelimit'
import { revalidatePath } from 'next/cache'

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

export const listusers = base
    .route({
        method: 'GET',
        path: '/users',
        summary: 'List all users',
        tags: ['user'],
    })
    .input(z.void())
    .output(z.object({ success: z.boolean(), data: z.array(userSchema) }))
    .handler(async () => {
        try {
            const response = await fetch('https://crudcrud.com/api/7e2ede8841214aed8d9746878123f394/users')
            if (!response.ok) {
                return {
                    success: false,
                    data: []
                }
            }
            const users = await response.json()
            return {
                success: true,
                data: users.map((user: any) => {
                    const seed = encodeURIComponent(user.username || user.email || user.name)

                    return userSchema.parse({
                        ...user,
                        avatar: `https://api.dicebear.com/7.x/personas/svg?seed=${seed}&size=2048`,
                    })
                })
            }
        } catch (error) {
            return {
                success: false,
                data: []
            }
        }
    })

export const getuser = base
    .route({
        method: 'GET',
        path: '/user/{userId}',
        summary: 'Get user by ID',
        tags: ['user'],
    })
    .input(z.object({ userId: z.string() }))
    .output(userSchema)
    .handler(async ({ input, errors }) => {
        try {
            const response = await fetch(`https://crudcrud.com/api/7e2ede8841214aed8d9746878123f394/users/${input.userId}`)
            if (!response.ok) {
                throw errors.INTERNAL_SERVER_ERROR({
                    message: 'Error getting user',
                })
            }

            const user = await response.json()
            const seed = encodeURIComponent(user.username || user.email || user.name)
            return userSchema.parse({
                ...user,
                avatar: `https://api.dicebear.com/7.x/personas/svg?seed=${seed}&size=2048`,
            })
        } catch (error) {
            throw errors.INTERNAL_SERVER_ERROR({
                message: 'Error getting user',
            })
        }
    })


export const createuser = base
    .use(requireStandardSequrityMiddleware)
    .use(requireRatelimitSequrityMiddleware)
    .route({
        method: 'POST',
        path: '/user',
        summary: 'Create user',
        tags: ['user'],
    })
    .input(userFormSchema)
    .output(z.void())
    .handler(async ({ input, errors }) => {
        try {
            const response = await fetch('https://crudcrud.com/api/7e2ede8841214aed8d9746878123f394/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(input),
            })
            if (!response.ok) {
                throw errors.INTERNAL_SERVER_ERROR({
                    message: 'Error creating user',
                })
            }
        } catch (error) {
            throw errors.INTERNAL_SERVER_ERROR({
                message: 'Error creating user',
            })
        }
    })

export const updateuser = base
    .use(requireStandardSequrityMiddleware)
    .use(requireRatelimitSequrityMiddleware)
    .route({
        method: 'PUT',
        path: '/user/{userId}',
        summary: 'Update user by ID',
        tags: ['user'],
    })
    .input(z.object({ userId: z.string(), data: userFormSchema }))
    .output(z.void())
    .handler(async ({ input, errors }) => {
        try {
            const response = await fetch(`https://crudcrud.com/api/7e2ede8841214aed8d9746878123f394/users/${input.userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(input.data),
            })
            if (!response.ok) {
                throw errors.INTERNAL_SERVER_ERROR({
                    message: 'Error updating user',
                })
            }

            revalidatePath(`/users/${input.userId}`)
        } catch (error) {
            throw errors.INTERNAL_SERVER_ERROR({
                message: 'Error updating user',
            })
        }
    })

export const deleteuser = base
    .use(requireStandardSequrityMiddleware)
    .route({
        method: 'DELETE',
        path: '/user/{userId}',
        summary: 'Delete user by ID',
        tags: ['user'],
    })
    .input(z.object({ userId: z.string() }))
    .output(z.void())
    .handler(async ({ input, errors }) => {
        try {
            const response = await fetch(`https://crudcrud.com/api/7e2ede8841214aed8d9746878123f394/users/${input.userId}`, {
                method: 'DELETE',
            })
            if (!response.ok) {
                throw errors.INTERNAL_SERVER_ERROR({
                    message: 'Error deleting user',
                })
            }
        } catch (error) {
            throw errors.INTERNAL_SERVER_ERROR({
                message: 'Error deleting user',
            })
        }
    })


