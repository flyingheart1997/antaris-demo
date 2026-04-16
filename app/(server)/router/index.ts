import { router } from '../middlewares/base'
import { userRouter } from './user'

export const appRouter = router({
    user: userRouter,
    // mission: missionRouter,  ← add future feature routers here
})

export type AppRouter = typeof appRouter
