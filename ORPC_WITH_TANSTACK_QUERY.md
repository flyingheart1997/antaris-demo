/**
========================================================================
 ORPC + TANSTACK QUERY (LATEST) — NEXT.JS APP ROUTER
========================================================================

This document explains how modern Antaris-style systems use:

• ORPC (typed API layer)
• TanStack Query v5+
• Next.js App Router (Server + Client components)

to build:
• Live dashboards
• Presim / Schedule / Telemetry
• CRUD apps
• Real-time mission UIs

========================================================================
 1. WHY ORPC + TANSTACK QUERY?
========================================================================

ORPC:
• Type-safe backend APIs
• Zod validated
• Auto typed frontend hooks

TanStack Query:
• Server-state cache
• Background refresh
• Mutation tracking
• Error handling
• Live updates

Together:
ORPC = API
TanStack Query = Brain that keeps UI in sync


========================================================================
 2. HOW DATA FLOWS
========================================================================

Backend (ORPC)
    ↓
Server Component (prefetch)
    ↓
HydrationBoundary
    ↓
Client Component (useQuery)
    ↓
Auto cache, refetch, revalidate

No double fetch.
No loading flicker.
Always fresh.


========================================================================
 3. ORPC ROUTE (Backend)
========================================================================

export const listUsers = base.route({
  method: "GET",
  path: "/users",
  summary: "List users"
})
.input(z.void())
.output(z.object({
  success: z.boolean(),
  data: z.array(userSchema)
}))
.handler(async () => {
  const users = await db.users.find()
  return { success: true, data: users }
})


========================================================================
 4. SERVER COMPONENT (Prefetch)
========================================================================

const queryClient = getQueryClient()

await queryClient.prefetchQuery(
  orpc.user.list.queryOptions()
)

return (
  <HydrationBoundary state={dehydrate(queryClient)}>
    <UsersClient />
  </HydrationBoundary>
)


WHY?
• Data is fetched on server
• Sent to browser
• Cached before React renders


========================================================================
 5. CLIENT COMPONENT (Read Data)
========================================================================

const { data } = useQuery(orpc.user.list.queryOptions())

data.success
data.data → users array

No loading
No flicker
Instant render


========================================================================
 6. STALE TIME (How fresh data is)
========================================================================

useQuery(orpc.user.list.queryOptions({
  staleTime: 10_000
}))

Meaning:
• Data is considered fresh for 10 seconds
• No refetch during this time
• After 10s → background refresh


========================================================================
 7. AUTO REFRESH (Live Mode)
========================================================================

useQuery(orpc.telemetry.live.queryOptions({
  refetchInterval: 3000,
  refetchOnWindowFocus: true,
  refetchOnReconnect: true,
  staleTime: 0
}))

This creates:
“Always live data”

Used in:
• Telemetry
• Presim
• HWIL
• Orbits


========================================================================
 8. BACKGROUND REVALIDATION
========================================================================

staleTime: 10_000

User leaves tab  
User comes back  

React Query will:
• Show cached data instantly
• Fetch new data in background
• Update UI when ready


========================================================================
 9. MUTATIONS (Create / Update / Delete)
========================================================================

const createUser = useMutation({
  ...orpc.user.create.mutationOptions(),
  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: orpc.user.list.queryKey()
    })
  }
})

Why invalidate?
Because list cache is now outdated


========================================================================
 10. MULTIPLE INVALIDATIONS
========================================================================

queryClient.invalidateQueries({
  queryKey: orpc.user.list.queryKey()
})

queryClient.invalidateQueries({
  queryKey: orpc.user.details.queryKey({ input: { userId } })
})

Both caches refresh


========================================================================
 11. ERROR HANDLING
========================================================================

const { error } = useQuery(...)

OR

onError(error) {
  toast.error(error.message)
}

ORPC provides:
BAD_REQUEST
FORBIDDEN
NOT_FOUND
INTERNAL_SERVER_ERROR

error.message is safe for UI


========================================================================
 12. RETRY
========================================================================

useQuery({
  retry: true
})

Auto retry on network errors

Used for:
• Satellites
• Cloud APIs
• Telemetry fetch


========================================================================
 13. DEPENDENT QUERIES
========================================================================

useQuery(orpc.user.details.queryOptions({
  input: { userId },
  enabled: !!userId
}))

Query runs only when userId exists


========================================================================
 14. PAGINATION
========================================================================

queryKey:
["users", page]

Each page cached separately


========================================================================
 15. WHY THIS SCALE TO ENTERPRISE
========================================================================

• No duplicate API calls
• Perfect SSR
• Infinite caching
• Real-time dashboards
• Automatic refetch
• Works with WebSockets later


========================================================================
 16. HOW ORPC + TANSTACK QUERY POWERS ANTARIS UI
========================================================================

• Schedule
• Presim
• Faults
• HWIL
• Telemetry
• Orbit Insights

All use:
Same query engine
Same cache
Same invalidation
Same live refresh


========================================================================
 17. MENTAL MODEL
========================================================================

ORPC = API
TanStack Query = Data OS

You don't “fetch”
You “subscribe to data”


========================================================================
 END
========================================================================
