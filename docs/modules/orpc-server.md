# Module: oRPC Server Layer

## What is oRPC?

oRPC is a **type-safe RPC (Remote Procedure Call) framework** for TypeScript. Instead of writing REST endpoints manually, you define typed route handlers on the server — and oRPC automatically generates a fully-typed client that mirrors those definitions. No manual `fetch`, no type casting, no OpenAPI codegen step required.

In Antaris, **all backend operations go through oRPC** (except Keycloak auth callbacks, which use standard Next.js API routes).

---

## High-Level Architecture

```
HTTP Request (/rpc/*)
        │
        ▼
app/(server)/rpc/[[...rest]]/route.ts   ← Next.js catch-all API route
        │
        ▼
    RPCHandler(router)                  ← oRPC dispatches to correct route
        │
        ▼
  router (index.ts)                     ← { user: { list, details, create, update, delete } }
        │
        ▼
  individual route                      ← e.g. createuser
        │
        ▼
  middleware chain                      ← base → arcjet-standard → arcjet-ratelimit
        │
        ▼
  handler function                      ← business logic + fetch to CrudCrud/ATMOS
```

---

## 1. Server Client Bootstrap — `lib/orpc.server.ts`

```typescript
import 'server-only'                       // ← ensures this NEVER runs on client
import { headers } from 'next/headers'
import { createRouterClient } from '@orpc/server'
import { router } from '@/app/(server)/router'

globalThis.$client = createRouterClient(router, {
    context: async () => ({
        request: new Request('http://localhost:3000'),  // placeholder — not a real HTTP request
        headers: await headers(),                        // real Next.js request headers
    }),
})
```

### Why `globalThis.$client`?

When a Server Component calls `orpc.user.list.queryOptions()`, it uses this global client — not the HTTP client. This means:

- **No HTTP round-trip** on the server — the handler is called directly as a function
- The client is **shared across all server requests** (singleton pattern)
- Imported once at the top of `app/layout.tsx` with `import '@/lib/orpc.server'`

> `'server-only'` is a Next.js module guard — importing this file from a client component throws a build-time error.

---

## 2. Base Middleware — `app/(server)/middlewares/base.ts`

```typescript
import { os } from "@orpc/server"

export const base = os.$context<{ request: Request }>().errors({
    RATE_LIMIT_EXCEEDED: { message: "You have been rate limited" },
    FORBIDDEN:           { message: "You do not have access to this resource" },
    NOT_FOUND:           { message: "The requested resource was not found" },
    BAD_REQUEST:         { message: "The request was invalid" },
    INTERNAL_SERVER_ERROR: { message: "Something went wrong on the server" },
    UNAUTHORIZED:        { message: "You are not authorized to access this resource" },
})
```

`base` is the **root of every route chain** in this project. It does two things:

1. **Types the context** — every handler receives `context.request: Request` (the raw HTTP request). This is injected by the RPC handler.
2. **Defines shared errors** — all routes can throw these typed errors via `errors.ERROR_NAME()`. This propagates structured error codes to the client.

---

## 3. Router Registry — `app/(server)/router/index.ts`

```typescript
export const router = {
    user: {
        list:    listusers,
        details: getuser,
        create:  createuser,
        update:  updateuser,
        delete:  deleteuser,
    },
    mission: {}   // placeholder — satellite mission operations (future)
}
```

The router is a **plain TypeScript object**. oRPC reads its shape to:
- Generate the typed client (`RouterClient<typeof router>`)
- Map HTTP method + path to the correct handler
- Expose `orpc.user.list`, `orpc.user.create`, etc. on the client

---

## 4. Route Definition Pattern

Every route is built by **method chaining** on `base`. Here is the full anatomy:

```typescript
export const createuser = base
    .use(requireStandardSequrityMiddleware)     // 1. Attach Arcjet WAF + bot detection
    .use(requireRatelimitSequrityMiddleware)    // 2. Attach Arcjet rate limiter
    .route({
        method: 'POST',                        // 3. HTTP method
        path: '/user',                         // 3. REST-like path
        summary: 'Create user',                // 3. OpenAPI metadata
        tags: ['user'],
    })
    .input(userFormSchema)                     // 4. Zod schema — validates incoming data
    .output(z.void())                          // 5. Zod schema — typed response
    .handler(async ({ input, errors }) => {    // 6. Business logic
        // input is already validated and typed as UserType
        // errors.INTERNAL_SERVER_ERROR() throws a typed ORPCError
    })
```

The chain always follows: `base → .use(middleware) → .route() → .input() → .output() → .handler()`

---

## 5. All User Routes — Detailed Breakdown

### `listusers` — GET /users

```typescript
export const listusers = base
    .route({ method: 'GET', path: '/users', summary: 'List all users', tags: ['user'] })
    .input(z.void())                                        // no input needed
    .output(z.object({ success: z.boolean(), data: z.array(userSchema) }))
    .handler(async () => {
        const response = await fetch('https://crudcrud.com/api/{key}/users')
        
        if (!response.ok) return { success: false, data: [] }  // graceful failure

        const users = await response.json()
        return {
            success: true,
            data: users.map((user: any) => {
                const seed = encodeURIComponent(user.username || user.email || user.name)
                return userSchema.parse({
                    ...user,
                    avatar: `https://api.dicebear.com/7.x/personas/svg?seed=${seed}&size=2048`
                })
            })
        }
    })
```

**Key notes:**
- No security middleware — list is a public read operation
- Avatar URL is **generated on the fly** from DiceBear using `username` as seed — not stored in DB
- Returns `{ success: boolean, data: User[] }` so client can distinguish between "no users" and "fetch failed"
- `userSchema.parse()` validates and strips unknown fields from the external API response

---

### `getuser` — GET /user/{userId}

```typescript
export const getuser = base
    .route({ method: 'GET', path: '/user/{userId}', ... })
    .input(z.object({ userId: z.string() }))    // path param as typed input
    .output(userSchema)
    .handler(async ({ input, errors }) => {
        const response = await fetch(`https://crudcrud.com/.../users/${input.userId}`)
        
        if (!response.ok) throw errors.INTERNAL_SERVER_ERROR({ message: 'Error getting user' })
        
        const user = await response.json()
        return userSchema.parse({ ...user, avatar: `...dicebear?seed=${seed}` })
    })
```

**Key notes:**
- `input.userId` is typed `string` — oRPC extracts it from the path parameter
- Uses `throw errors.INTERNAL_SERVER_ERROR()` to return a structured ORPCError — this propagates to the client's `catch` block or `onError` callback
- Unlike `listusers`, this throws on failure rather than returning `{ success: false }` because the client expects a single user, not a list

---

### `createuser` — POST /user

```typescript
export const createuser = base
    .use(requireStandardSequrityMiddleware)    // WAF + bot detection FIRST
    .use(requireRatelimitSequrityMiddleware)   // rate limit SECOND
    .route({ method: 'POST', path: '/user', ... })
    .input(userFormSchema)                     // same Zod schema as the client form
    .output(z.void())                          // returns nothing on success
    .handler(async ({ input, errors }) => {
        const token = await getAccessToken()   // reads httpOnly cookie on server
        
        await fetch('https://crudcrud.com/.../users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { 'Authorization': `Bearer ${token}` } : {})
            },
            body: JSON.stringify(input),       // input is already Zod-validated
        })
    })
```

**Key notes:**
- Middleware runs **before the handler** — request is blocked by Arcjet if it fails
- `userFormSchema` is imported directly from `features/users/types/user-schema.ts` — the **same schema** used by the React Hook Form on the client. Single source of truth.
- Auth token is attached to the outgoing request to the backend (for when ATMOS backend replaces CrudCrud)
- Returns `z.void()` — the client mutation's `onSuccess` callback receives nothing

---

### `updateuser` — PUT /user/{userId}

```typescript
export const updateuser = base
    .use(requireStandardSequrityMiddleware)
    .use(requireRatelimitSequrityMiddleware)
    .route({ method: 'PUT', path: '/user/{userId}', ... })
    .input(z.object({ userId: z.string(), data: userFormSchema }))   // userId + form data
    .output(z.void())
    .handler(async ({ input, errors }) => {
        const token = await getAccessToken()
        await fetch(`https://crudcrud.com/.../users/${input.userId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', ... },
            body: JSON.stringify(input.data),
        })

        revalidatePath(`/users/${input.userId}`)   // ← Next.js cache invalidation
    })
```

**Key notes:**
- Input is `{ userId, data: UserType }` — userId comes from the client, data is the validated form
- `revalidatePath()` tells Next.js to invalidate the RSC cache for the user's profile page. This ensures a fresh SSR render if the user navigates directly to the URL.

---

### `deleteuser` — DELETE /user/{userId}

```typescript
export const deleteuser = base
    .use(requireStandardSequrityMiddleware)    // WAF + bot detection only — no rate limit
    .route({ method: 'DELETE', path: '/user/{userId}', ... })
    .input(z.object({ userId: z.string() }))
    .output(z.void())
    .handler(async ({ input, errors }) => {
        const token = await getAccessToken()
        await fetch(`https://crudcrud.com/.../users/${input.userId}`, {
            method: 'DELETE',
            headers: { ...(token ? { 'Authorization': `Bearer ${token}` } : {}) }
        })
    })
```

**Key notes:**
- No rate limit middleware — deletes are less abuse-prone than creates/updates
- No `revalidatePath` — the client-side mutation's `onSuccess` handles navigation to `/users` and invalidates the list cache

---

## 6. Arcjet Security Middleware — Deep Dive

### Base Arcjet Instance — `lib/arcjet.ts`

```typescript
import arcjet, { detectBot, fixedWindow, protectSignup, sensitiveInfo, shield, slidingWindow } from "@arcjet/next"

export default arcjet({
    key: process.env.ARCJET_KEY!,       // site key from Arcjet dashboard
    characteristics: ["userId"],         // fingerprint requests by userId
    rules: [],                           // no global rules — applied per-middleware
})

// Re-export rule builders for use in middleware files
export { detectBot, fixedWindow, protectSignup, sensitiveInfo, shield, slidingWindow }
```

`arcjet` creates a **base instance** with no rules. Rules are added per-middleware using `.withRule()`. This allows fine-grained control — different endpoints get different security profiles.

---

### Standard Security Middleware — `app/(server)/middlewares/arcjet/standard.ts`

```typescript
const buildStandardAj = () =>
    arcjet
        .withRule(shield({ mode: "LIVE" }))         // WAF: blocks SQL injection, XSS, path traversal
        .withRule(detectBot({
            mode: "LIVE",
            allow: [
                "CATEGORY:SEARCH_ENGINE",           // Google, Bing — OK
                "CATEGORY:MONITOR",                 // Uptime services — OK
                "CATEGORY:PREVIEW",                 // Slack/Discord link previews — OK
            ],
        }))

export const requireStandardSequrityMiddleware = base
    .$context<{ request: Request }>()
    .middleware(async ({ context, next, errors }) => {
        const decisions = await buildStandardAj().protect(context.request, {
            userId: "use676fuyg9r123764897hj87tig",   // ⚠️ hardcoded — replace with real user ID
        })

        if (decisions.isDenied()) {
            if (decisions.reason.isBot())    throw errors.FORBIDDEN({ message: 'Automated requests are not allowed' })
            if (decisions.reason.isShield()) throw errors.FORBIDDEN({ message: 'Request blocked by security policy (WAF)' })
            throw errors.FORBIDDEN({ message: 'Request blocked by security policy' })
        }

        return next()   // ← passes control to next middleware or handler
    })
```

**How it works:**
1. Arcjet evaluates the request against WAF rules + bot detection rules
2. `decisions.isDenied()` returns `true` if any rule triggered
3. The middleware throws a typed `FORBIDDEN` error — oRPC serializes this and sends it back to the client
4. If request is clean, `next()` passes control to the next `.use()` middleware or the `.handler()`

> **Known issue:** `userId` is hardcoded as a placeholder. In production, this must be extracted from the auth token via `getAccessToken()`.

---

### Rate Limit Middleware — `app/(server)/middlewares/arcjet/ratelimit.ts`

```typescript
const buildRatelimitAj = () =>
    arcjet.withRule(
        slidingWindow({
            mode: 'LIVE',
            interval: '1m',     // 1-minute window
            max: 1              // max 1 request per window per userId
        })
    )

export const requireRatelimitSequrityMiddleware = base
    .$context<{ request: Request }>()
    .middleware(async ({ context, next, errors }) => {
        const decisions = await buildRatelimitAj().protect(context.request, {
            userId: "use676fuyg9r123764897hj87tig",
        })

        if (decisions.isDenied()) {
            if (decisions.reason.isRateLimit()) throw errors.RATE_LIMIT_EXCEEDED()
            throw errors.FORBIDDEN({ message: 'Request blocked by security policy' })
        }

        return next()
    })
```

**Sliding window vs fixed window:**
- **Sliding window** — rate counted over the last N seconds from the current request time. Smoother protection.
- **Fixed window** — rate counted within hard time buckets (0:00–1:00, 1:00–2:00). Allows bursting at window edges.

The current config allows **1 create or update per minute per user** — aggressive, clearly intentional for demo/security showcase.

---

### Middleware Chain Execution Order

When `createuser` receives a request:

```
Request arrives
    │
    ▼
base context is applied                     (context.request = raw HTTP Request)
    │
    ▼
requireStandardSequrityMiddleware           (WAF + bot check)
    │ if denied → throw FORBIDDEN
    │ if allowed → next()
    ▼
requireRatelimitSequrityMiddleware          (sliding window rate limit)
    │ if denied → throw RATE_LIMIT_EXCEEDED
    │ if allowed → next()
    ▼
.handler()                                  (business logic executes)
    │
    ▼
Response returned to client
```

---

## 7. HTTP Handler — `app/(server)/rpc/[[...rest]]/route.ts`

```typescript
const handler = new RPCHandler(router, {
    interceptors: [
        onError((error) => console.error(error)),   // logs all errors server-side
    ],
})

async function handleRequest(request: Request) {
    const { response } = await handler.handle(request, {
        prefix: '/rpc',              // strips /rpc prefix before matching paths
        context: { request },        // injects the raw Request into context
    })
    return response ?? new Response('Not found', { status: 404 })
}

// All HTTP methods mapped to same handler
export const { GET, POST, PUT, PATCH, DELETE, HEAD } = {
    GET: handleRequest, POST: handleRequest, PUT: handleRequest,
    PATCH: handleRequest, DELETE: handleRequest, HEAD: handleRequest
}
```

This is the **single entry point** for all RPC traffic from clients. The `[[...rest]]` catch-all captures any path under `/rpc/*` and oRPC's `RPCHandler` dispatches to the correct route based on method + path.

---

## 8. Server Component vs Client Component — Who Calls What?

### Server Component (RSC) → Direct function call

```typescript
// app/users/page.tsx — Server Component
const queryClient = getQueryClient()
await queryClient.prefetchQuery(orpc.user.list.queryOptions())
```

Here `orpc` is imported from `lib/orpc.ts`. But because `lib/orpc.server.ts` has set `globalThis.$client` to the **direct router client**, this resolves to:

```
orpc.user.list → client.user.list → globalThis.$client.user.list → listusers() called directly
```

**No HTTP request is made.** The server handler runs as a plain function call. This is the key performance benefit — zero network overhead for server-side data loading.

---

### Client Component → HTTP RPC call

```typescript
// features/users/components/users-list.tsx — Client Component ('use client')
const { data } = useSuspenseQuery(orpc.user.list.queryOptions())
```

On the client, `globalThis.$client` is undefined. So `lib/orpc.ts` falls back to:

```typescript
export const client = globalThis.$client ?? createORPCClient(link)
```

Where `link` is:

```typescript
const link = new RPCLink({
    url: () => `${window.location.origin}/rpc`
})
```

This means the client sends: `GET http://localhost:3000/rpc/users` → hits the catch-all route handler → dispatches to `listusers`.

**HTTP round-trip happens here.** But because the server prefetched the data into the QueryClient and it was hydrated to the client, TanStack Query serves the result from cache — the HTTP request is skipped unless the cache is stale (> 60 seconds).

---

## 9. Auth Token Flow in Handlers

```typescript
import { getAccessToken } from '@/lib/auth/session'

const token = await getAccessToken()
// → reads 'atmos_access_token' from the httpOnly cookie
// → available in server context because handlers run server-side
// → attached as Authorization: Bearer <token> header to outgoing requests
```

On the server, cookies are readable via Next.js cookie APIs. The auth token from Keycloak is forwarded to the backend (CrudCrud now, ATMOS later) so the backend can identify the authenticated user.

---

## 10. Error Flow

When a handler throws:

```typescript
throw errors.INTERNAL_SERVER_ERROR({ message: 'Error creating user' })
```

oRPC serializes this as a structured error response. On the client, this surfaces as:

- `useMutation` → `onError: (error) => { error.message === 'Error creating user' }`
- `useQuery` → `isError: true`, `error.message === '...'`

The error codes (`FORBIDDEN`, `RATE_LIMIT_EXCEEDED`, etc.) are typed — the client can check the specific error code if needed, not just the message.
