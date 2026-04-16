# Module: Error Handling

## Overview

Antaris uses a layered error handling system. Errors are caught at different levels depending on their type and severity.

```
┌──────────────────────────────────────────────────────────┐
│  Level 4 — Global Error Boundary (app/error.tsx)         │
│  Catches: Unhandled React render errors                   │
│  Shows:   ErrorView with reset + home button             │
├──────────────────────────────────────────────────────────┤
│  Level 3 — DataGrid Error Boundary                        │
│  Catches: oRPC query failures (success: false)            │
│  Throws:  new Error() → bubbles to level 4               │
├──────────────────────────────────────────────────────────┤
│  Level 2 — Component Error Guards (isError check)        │
│  Catches: useQuery failures in client components          │
│  Shows:   Inline ErrorComponent or ProfileSkeleton       │
├──────────────────────────────────────────────────────────┤
│  Level 1 — oRPC Handler (try/catch in handlers)          │
│  Catches: Network failures, external API errors           │
│  Throws:  Typed TRPCError (INTERNAL_SERVER_ERROR, etc.)  │
└──────────────────────────────────────────────────────────┘
```

---

## Level 1 — oRPC Handler Errors

Route handlers in `app/(server)/router/` use `try/catch` and throw typed errors via the `errors` object provided by the base middleware.

### Error Types

```typescript
// Defined in app/(server)/middlewares/base.ts
export const base = os.$context<{ request: Request }>().errors({
    RATE_LIMIT_EXCEEDED: { message: "You have been rate limited" },
    FORBIDDEN:           { message: "You do not have access to this resource" },
    NOT_FOUND:           { message: "The requested resource was not found" },
    BAD_REQUEST:         { message: "The request was invalid" },
    INTERNAL_SERVER_ERROR: { message: "Something went wrong on the server" },
    UNAUTHORIZED:        { message: "You are not authorized to access this resource" },
})
```

### Throwing in Handlers

```typescript
// Pattern 1: Throw typed error with custom message
.handler(async ({ input, errors }) => {
    const response = await fetch(`.../${input.userId}`)
    if (!response.ok) {
        throw errors.INTERNAL_SERVER_ERROR({
            message: 'Error getting user',    // overrides default message
        })
    }
})

// Pattern 2: Return graceful failure (for list operations)
.handler(async () => {
    try {
        const data = await fetch('...')
        return { success: true, data }
    } catch {
        return { success: false, data: [] }   // no throw — caller handles gracefully
    }
})
```

**When to throw vs return failure:**
- **Throw** — for operations where the caller needs a specific item and failure means something is broken (`getuser`, `createuser`, etc.)
- **Return `{ success: false }`** — for list operations where an empty state is acceptable and the UI should show empty state rather than error UI

### Middleware Errors (Arcjet)

Security middleware throws errors before the handler runs:

```typescript
// app/(server)/middlewares/arcjet/standard.ts
if (decisions.isDenied()) {
    if (decisions.reason.isBot())
        throw errors.FORBIDDEN({ message: 'Automated requests are not allowed' })
    if (decisions.reason.isShield())
        throw errors.FORBIDDEN({ message: 'Request blocked by security policy (WAF)' })
    throw errors.FORBIDDEN({ message: 'Request blocked by security policy' })
}

// app/(server)/middlewares/arcjet/ratelimit.ts
if (decisions.reason.isRateLimit())
    throw errors.RATE_LIMIT_EXCEEDED()
```

These propagate to the client as structured `TRPCError` objects — the client receives the error code and message.

---

## Level 2 — Client Component Error Guards

Client components that use `useQuery` (not Suspense) handle errors with explicit state checks:

```typescript
// app/users/[userId]/page.tsx
const { data: user, isLoading, isError } = useQuery(
    trpc.user.details.queryOptions({ input: { userId }, retry: false })
)

if (isError && !user) return <ErrorComponent />   // ← inline error UI
if (isLoading) return <ProfileSkeleton />
```

### `retry: false`

By default, TanStack Query retries failed requests 3 times. For the user details page, `retry: false` shows the error immediately — important for 404s or unauthorized access where retrying won't help.

### Toast Errors (Mutations)

Mutation errors are shown as toast notifications — they don't disrupt the UI:

```typescript
const createUserMutation = useMutation({
    ...trpc.user.create.mutationOptions(),
    onError: (error) => {
        toast.error(error.message)   // ← sonner toast, non-blocking
    }
})
```

`error.message` is the message from the thrown `TRPCError` on the server — e.g. `"You have been rate limited"` or `"Error creating user"`.

---

## Level 3 — DataGrid Suspense Error

`DataGrid` uses `useSuspenseQuery` and checks the `success` flag:

```typescript
// components/data-grid.tsx
const { data: response } = useSuspenseQuery(queryOptions)

if (!response.success) {
    throw new Error("Failed to load data")   // ← throws to error boundary
}
```

This throw is caught by the nearest React error boundary. In the users page, there's no local error boundary — it bubbles up to `app/error.tsx`.

---

## Level 4 — Global Error Boundary (`app/error.tsx`)

Next.js App Router automatically uses `app/error.tsx` as the error boundary for the entire app:

```typescript
// app/error.tsx
'use client'

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error('Global Error Captured:', error)
    }, [error])

    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <ErrorView error={error} reset={reset} />
        </div>
    )
}
```

### `ErrorView` Component

```typescript
// components/error.tsx
<ErrorView
    error={error}                           // Error object (shows digest if present)
    reset={reset}                           // "Try Again" button calls reset()
    title="Something went wrong"            // default
    description="We encountered..."        // default
/>
```

`reset()` is provided by Next.js — it re-renders the segment that threw the error. If the error was a transient network failure, clicking "Try Again" re-triggers the query.

### Error Digest

When `error.digest` exists (Next.js server error ID), it's displayed:

```
Error ID: abc123xyz
```

This matches server-side logs for debugging production errors.

---

## Error Flow: Complete Example

**Scenario:** User creates a new operator but hits the rate limit.

```
User submits form
    │
    ▼
createUserMutation.mutate(data)
    │
    ▼
HTTP POST /rpc/user
    │
    ▼
requireStandardSequrityMiddleware → passes (not a bot)
    │
    ▼
requireRatelimitSequrityMiddleware → DENIED (rate limit)
    │  throws errors.RATE_LIMIT_EXCEEDED()
    ▼
oRPC serializes as HTTP 429 with:
    { code: "RATE_LIMIT_EXCEEDED", message: "You have been rate limited" }
    │
    ▼
TanStack Query mutation → onError(error) fires
    │  error.message = "You have been rate limited"
    ▼
toast.error("You have been rate limited")
    │  → red toast appears bottom-right
    ▼
Modal stays open (user can retry after 1 minute)
```

**Scenario:** User visits a profile page for a deleted user.

```
UserDetails renders
    │
    ▼
useQuery(trpc.user.details.queryOptions({ input: { userId }, retry: false }))
    │
    ▼
HTTP GET /rpc/user/{userId}
    │
    ▼
getuser handler → fetch from CrudCrud → 404 response
    │  throws errors.INTERNAL_SERVER_ERROR({ message: 'Error getting user' })
    ▼
TanStack Query → isError: true
    │
    ▼
if (isError && !user) return <ErrorComponent />
    │
    ▼
ErrorView renders with "Try Again" and "Back Home" buttons
```

---

## Error Boundary Placement Strategy

| Route / Component | Error boundary | Reason |
|---|---|---|
| `app/error.tsx` | Global | Catches all unhandled errors across all routes |
| `app/users/page.tsx` → `<Suspense>` | Suspense fallback | Shows skeleton during load; throws to global on failure |
| `app/users/[userId]/page.tsx` | Manual `isError` check | Inline error UI, no disruption to page layout |
| `UserModal` mutations | `onError` toast | Non-blocking, user stays in modal context |

There is currently **no per-route error boundary** between global and component level. If needed in the future, add `error.tsx` files in specific route directories (e.g., `app/users/error.tsx`).

---

## Console Logging

All errors are logged to the console:

- **Server:** `onError((error) => console.error(error))` interceptor in `app/(server)/rpc/[[...rest]]/route.ts`
- **Client:** `console.error('Global Error Captured:', error)` in `app/error.tsx`

In production, replace `console.error` with a real error reporting service (Sentry, Datadog, etc.).
