# API Architecture — Antaris

## Overview

The API layer is built on **oRPC** — a type-safe RPC framework that generates fully-typed clients from server-side route definitions. All API communication goes through the oRPC abstraction layer, with the exception of authentication routes which use standard Next.js API routes.

---

## API Endpoint Structure

### oRPC Routes (Type-Safe RPC)

| Endpoint | Method | Path | Description | Security |
|---|---|---|---|---|
| `user.list` | GET | `/rpc/users` | List all users | None (public read) |
| `user.details` | GET | `/rpc/user/{userId}` | Get user by ID | None (public read) |
| `user.create` | POST | `/rpc/user` | Create a new user | Standard + Rate Limit |
| `user.update` | PUT | `/rpc/user/{userId}` | Update user by ID | Standard + Rate Limit |
| `user.delete` | DELETE | `/rpc/user/{userId}` | Delete user by ID | Standard |

### Auth Routes (Next.js API Routes)

| Endpoint | Method | Description |
|---|---|---|
| `/api/auth/login` | GET | Redirects to Keycloak login page |
| `/api/auth/logout` | GET | Clears cookies, redirects to Keycloak logout |
| `/api/auth/callback` | GET | Handles OAuth callback, exchanges code for tokens |

---

## oRPC Architecture

### Router Registry

```typescript
// app/(server)/router/index.ts
export const router = {
    user: {
        list: listusers,
        details: getuser,
        create: createuser,
        update: updateuser,
        delete: deleteuser
    },
    mission: {}  // Future: satellite mission operations
}
```

### Route Definition Pattern

Every oRPC route follows this structure:

```typescript
export const listusers = base
    .use(optionalSecurityMiddleware)   // Security layer
    .route({
        method: 'GET',                // HTTP method
        path: '/users',               // REST-like path
        summary: 'List all users',    // OpenAPI summary
        tags: ['user'],               // OpenAPI tags
    })
    .input(z.void())                  // Zod input schema
    .output(z.object({                // Zod output schema
        success: z.boolean(),
        data: z.array(userSchema)
    }))
    .handler(async () => {            // Business logic
        // ...
    })
```

### Base Middleware

All routes extend from the base middleware which provides:
- Request context typing (`{ request: Request }`)
- Standard error definitions:

```typescript
{
    RATE_LIMIT_EXCEEDED: "You have been rate limited",
    FORBIDDEN: "You do not have access to this resource",
    NOT_FOUND: "The requested resource was not found",
    BAD_REQUEST: "The request was invalid",
    INTERNAL_SERVER_ERROR: "Something went wrong on the server",
    UNAUTHORIZED: "You are not authorized to access this resource"
}
```

---

## Security Middleware Stack

### Standard Security (`requireStandardSequrityMiddleware`)

Applied to: `create`, `update`, `delete` operations

Includes:
1. **Shield (WAF)** — Blocks SQL injection, XSS, path traversal
2. **Bot Detection** — Blocks automated requests, allows search engines and monitors

```typescript
// Allowed bot categories
allow: ["CATEGORY:SEARCH_ENGINE", "CATEGORY:MONITOR", "CATEGORY:PREVIEW"]
```

### Rate Limiting (`requireRatelimitSequrityMiddleware`)

Applied to: `create`, `update` operations

Configuration:
- **Algorithm:** Sliding window
- **Limit:** 1 request per minute per user
- **Mode:** LIVE (enforced)

### Middleware Chain Example

```
create user request
  → base (context + error types)
  → standard security (WAF + bot detection)
  → rate limit (1 req/min)
  → handler (business logic)
```

---

## Client-Side Usage

### TanStack Query Integration

oRPC automatically generates TanStack Query options:

```typescript
// Query (read)
const { data } = useQuery(orpc.user.list.queryOptions())

// Mutation (write)
const mutation = useMutation({
    ...orpc.user.create.mutationOptions(),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: orpc.user.list.queryKey() })
    }
})
```

### SSR Prefetching

```typescript
// Server Component
const queryClient = getQueryClient()
await queryClient.prefetchQuery(orpc.user.list.queryOptions())
// Data is hydrated to client — no loading state
```

---

## Request/Response Schemas

### User Schema (Output)

```typescript
{
    _id: string,
    name: string,
    gender: string,
    username: string,
    email: string,
    address: {
        street: string,
        suite: string,
        city: string,
        zipcode: string,
        geo: { lat: string, lng: string }
    },
    phone: string,
    website: string,
    company: {
        name: string,
        catchPhrase: string,
        bs: string
    },
    avatar: string  // Auto-generated DiceBear URL
}
```

### User Form Schema (Input for Create/Update)

```typescript
{
    name: string (3-50 chars),
    username: string (3-20 chars, alphanumeric + underscore),
    email: string (valid email),
    gender: string (min 4 chars),
    address: {
        street: string (min 2),
        city: string (min 2),
        suite: string (min 2),
        zipcode: string (5-6 digits),
        geo: { lat: string (number), lng: string (number) }
    },
    phone: string (7-20 chars, digits + special),
    website: string,
    company: {
        name: string (min 2),
        catchPhrase: string (min 2),
        bs: string (min 2)
    }
}
```

---

## External API

Currently using **CrudCrud** as a REST API:

| Method | URL | Purpose |
|---|---|---|
| GET | `https://crudcrud.com/api/{key}/users` | List users |
| GET | `https://crudcrud.com/api/{key}/users/{id}` | Get user |
| POST | `https://crudcrud.com/api/{key}/users` | Create user |
| PUT | `https://crudcrud.com/api/{key}/users/{id}` | Update user |
| DELETE | `https://crudcrud.com/api/{key}/users/{id}` | Delete user |

> **Note:** In production, this will be replaced with the Antaris ATMOS backend at `NEXT_PUBLIC_BACKEND_BASE_URL`.

---

## HTTP Handler

The catch-all route handler at `app/(server)/rpc/[[...rest]]/route.ts` maps all HTTP methods to the oRPC handler:

```typescript
const handler = new RPCHandler(router, {
    interceptors: [
        onError((error) => console.error(error)),
    ],
})

// Maps: GET, POST, PUT, PATCH, DELETE, HEAD → handleRequest
async function handleRequest(request: Request) {
    const { response } = await handler.handle(request, {
        prefix: '/rpc',
        context: { request },
    })
    return response ?? new Response('Not found', { status: 404 })
}
```
