# Feature: Authentication

## Purpose
Enterprise-grade authentication system using Keycloak OAuth 2.0 with UMA (User-Managed Access) for fine-grained authorization. Implements the "Hybrid Hydration Pattern" for zero-latency token availability across all client components.

---

## Flow

```mermaid
sequenceDiagram
    actor User
    participant Browser
    participant NextJS as Next.js Server
    participant KC as Keycloak
    participant Cookie as httpOnly Cookies
    participant Zustand as Auth Store

    User->>Browser: Visit protected page
    Browser->>NextJS: GET /any-page
    NextJS->>Cookie: Check atmos_access_token
    
    alt No token exists
        NextJS->>Browser: Redirect to /api/auth/login
        Browser->>NextJS: GET /api/auth/login
        NextJS->>Browser: 302 → Keycloak login URL
        Browser->>KC: User enters credentials
        KC->>Browser: 302 → /api/auth/callback?code=ABC
        Browser->>NextJS: GET /api/auth/callback?code=ABC
        NextJS->>KC: POST token endpoint (code exchange)
        KC-->>NextJS: { access_token, refresh_token }
        NextJS->>KC: POST token endpoint (UMA exchange)
        KC-->>NextJS: { uma_access_token, uma_refresh_token }
        NextJS->>Cookie: Set atmos_access_token (httpOnly, Secure, 7 days)
        NextJS->>Cookie: Set atmos_refresh_token (httpOnly, Secure, 7 days)
        NextJS->>Browser: 302 → /
    end

    alt Token exists
        NextJS->>Cookie: getAccessToken()
        Cookie-->>NextJS: token string
        NextJS->>Browser: Render <AllProviders token={token}>
        Browser->>Zustand: AuthProvider.setState({ token })
        Browser->>Browser: Components use useAuth() hook
    end
```

---

## Key Files

| File | Purpose |
|---|---|
| `lib/auth/keycloak.ts` | Keycloak OAuth helpers: login/logout URLs, token exchange, UMA |
| `lib/auth/session.ts` | Cookie session management: get/set/clear tokens |
| `store/auth-store.ts` | Zustand store: token, user, isLoading, isError |
| `providers/auth-provider.tsx` | Bridges server-side token to Zustand store |
| `hooks/use-auth.ts` | Consumer hook: token, user, isAuthenticated |
| `app/api/auth/[...route]/route.ts` | Auth API routes: login, logout, callback |
| `proxy.ts` | Middleware: route protection based on cookie presence |
| `providers/index.tsx` | Provider composition: places AuthProvider in tree |
| `app/layout.tsx` | Root layout: reads token, passes to providers |

---

## API Usage

### Client Components
```typescript
'use client'
import { useAuth } from '@/hooks/use-auth'

function MyComponent() {
    const { token, user, isAuthenticated, isLoading } = useAuth()
    
    if (isLoading) return <p>Loading...</p>
    if (!isAuthenticated) return <p>Please log in</p>
    
    return <p>Hello, {user.preferred_username}</p>
}
```

### Server Components
```typescript
import { getAccessToken } from '@/lib/auth/session'

async function ServerComponent() {
    const token = await getAccessToken()
    // Use token for authenticated server-side operations
}
```

---

## State Handling

### Auth Store (Zustand)
```typescript
interface AuthState {
    token: string | null      // JWT access token
    user: any | null           // Decoded JWT payload
    isLoading: boolean         // Initial load state
    isError: boolean           // Auth error state
    setToken: (token) => void  // Update token
    setUser: (user) => void    // Update user info
}
```

### Hydration Process
1. `RootLayout` (Server) → calls `getAccessToken()` from cookies
2. Passes `token` to `<AllProviders token={token}>`
3. `AuthProvider` (Client) → calls `useAuthStore.setState({ token, isLoading: false })`
4. This happens **synchronously during render** — not in useEffect
5. All client components get instant access via `useAuth()`

---

## Cookie Configuration

| Cookie | Key | HttpOnly | Secure | SameSite | MaxAge |
|---|---|---|---|---|---|
| Access Token | `atmos_access_token` | ✅ | ✅ (prod) | Lax | 7 days |
| Refresh Token | `atmos_refresh_token` | ✅ | ✅ (prod) | Lax | 7 days |

---

## Keycloak Configuration

| Parameter | Value | Env Variable |
|---|---|---|
| URL | `https://id.antaris-staging.cloud/` | `KEYCLOAK_URL` |
| Realm | `ATMOS` | `KEYCLOAK_REALM` |
| Client ID | `ATMOS-UI-CLIENT` | `KEYCLOAK_CLIENT_ID` |
| Resource Client | `ATMOS-RESOURCE-SERVER` | `KEYCLOAK_RESOURCE_CLIENT` |

---

## Edge Cases

1. **No code in callback**: Redirects to `/login?error=no_code`
2. **Token exchange fails**: Redirects to `/login?error=auth_failed`
3. **UMA exchange fails**: Same error handling as token exchange
4. **Expired token**: `isLoading: false, token: null` — components should handle unauthenticated state
5. **Token decoding error**: `getDecodedToken()` returns `null`, falls back to `user: null`
6. **No KEYCLOAK_CLIENT_SECRET**: Client credential is optional (for public clients)
7. **Proxy bypass**: Public routes (`/_next`, `/api/auth`, `/favicon.ico`, `/login`) skip auth check

---

## Security Notes

- **httpOnly cookies** prevent XSS token theft
- **Token exposure**: The token IS passed to JavaScript via Zustand (necessary for client-side API calls)
- **No localStorage**: Tokens are never stored in localStorage/sessionStorage
- **Proxy protection**: All non-public routes require a valid cookie
