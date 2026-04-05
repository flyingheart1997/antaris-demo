# Authentication Implementation Guide

This document describes the high-performance, secure authentication architecture implemented for the Antaris project. It follows modern Next.js patterns typically used in large-scale enterprise environments to bridge server-side security with client-side interactivity.

## 1. Architecture Overview

The system uses a **Hybrid Hydration Pattern**:
1.  **Server-Side Source of Truth**: Authentication tokens are stored in `httpOnly` and `Secure` cookies. This protects the session from XSS attacks.
2.  **Client-Side Integration**: On the initial page load, the server retrieves the token and passes it as a prop to a root-level Provider.
3.  **Zustand Hydration**: A Client Component hydrates a global Zustand store with this token **during the first render pass**. This ensures the token is available instantly (Zero Latency) to all client components without unnecessary network requests or `useEffect` waterfalls.

---

## 2. File Structure

| File Path | Description |
| :--- | :--- |
| [`store/auth-store.ts`](file:///Users/koushikmondal/ANTARIS/antaris-demo/store/auth-store.ts) | The global Zustand store definition. Manages `token`, `user`, and `isLoading`. |
| [`providers/auth-provider.tsx`](file:///Users/koushikmondal/ANTARIS/antaris-demo/providers/auth-provider.tsx) | A Client Component that bridges the server-side prop to the Zustand store. |
| [`providers/index.tsx`](file:///Users/koushikmondal/ANTARIS/antaris-demo/providers/index.tsx) | Integrates `AuthProvider` into the global provider stack. |
| [`hooks/use-auth.ts`](file:///Users/koushikmondal/ANTARIS/antaris-demo/hooks/use-auth.ts) | The **single entry point** for developers to access auth state. |
| [`app/layout.tsx`](file:///Users/koushikmondal/ANTARIS/antaris-demo/app/layout.tsx) | The Root Layout (Server) that fetches the token and initializes the hydration bridge. |

---

## 3. The Hydration Process

The flow is designed for maximum performance (Core Web Vitals):

1.  **Request Phase**: User requests a page.
2.  **Server Phase**: `RootLayout` calls `getAccessToken()` from `lib/auth/session.ts`.
3.  **Bridge Phase**: The token is passed to `AllProviders token={token}`.
4.  **Client Initial Render**: `AuthProvider` (a client component) detects the new token and calls `useAuthStore.setState({ token })` immediately.
5.  **Component Mounting**: By the time any client component (like a header or dashboard) monts, `useAuth().token` is already populated.

---

## 4. Usage Guide

### Accessing Auth Data
Use the `useAuth()` hook in any client component.

```tsx
'use client'

import { useAuth } from '@/hooks/use-auth'

export default function MyComponent() {
  const { token, user, isAuthenticated, isLoading } = useAuth()

  if (isLoading) return <p>Loading session...</p>

  return (
    <div>
      {isAuthenticated ? (
        <p>Logged in as: {user.preferred_username}</p>
      ) : (
        <p>Please log in.</p>
      )}
    </div>
  )
}
```

### Decoded Token Details
The `user` object returned by `useAuth()` is automatically decoded from the JWT payload using a native native base64 decoder. It typically contains:
- `sub`: User ID
- `preferred_username`: Username
- `email`: User email
- `exp`: Expiry timestamp

---

## 5. Security Notes

-   **httpOnly Cookies**: The raw session is managed by the browser via `atmos_access_token` and `atmos_refresh_token` cookies. These cannot be accessed by malicious scripts.
-   **Client-Side Exposure**: By passing the token to the Zustand store, it becomes accessible to JavaScript. This is necessary for client-side API calls but should be handled with care.
-   **Token Expiry**: The `isLoading` and `isError` flags in the store should be used to handle session expiration or refresh failures.
