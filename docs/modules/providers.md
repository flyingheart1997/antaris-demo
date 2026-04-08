# Module: Providers

## Purpose
The provider tree wraps the entire application, providing theme management, authentication state, data fetching client, and global modal registry. The order of nesting is critical.

---

## Provider Tree

```
// app/layout.tsx
<AllProviders token={token}>     ← wraps everything
  <Toaster />                    ← Sonner toast (sibling to children, not inside AllProviders)
  {children}                     ← App pages
</AllProviders>

// providers/index.tsx — AllProviders internals:
<ThemeProvider>              ← next-themes (dark/light mode)
  <AuthProvider>             ← Zustand auth hydration from server cookie
    <TanstackQueryProvider>  ← QueryClient for data fetching
      <ModalsProvider>       ← Global modal instances (always-mounted portals)
        <TooltipProvider>    ← Radix tooltip context (global — no per-component wrapper needed)
          {children}
        </TooltipProvider>
      </ModalsProvider>
    </TanstackQueryProvider>
  </AuthProvider>
</ThemeProvider>
```

### Why This Order Is Non-Negotiable

**ThemeProvider must be outermost:**
- `next-themes` writes a `class` attribute to `<html>` on mount to prevent flash-of-wrong-theme
- It must wrap everything so that no component renders before the theme class is applied
- If moved inward, components rendered above it (e.g., `AuthProvider`) would briefly render without theme

**AuthProvider must wrap TanstackQueryProvider:**
- `AuthProvider` hydrates `useAuthStore` with the JWT token synchronously during first render
- Future queries may need the token in request headers (Bearer auth to ATMOS backend)
- If `TanstackQueryProvider` ran first, it would create the QueryClient before auth state exists — any immediate queries would run without auth context
- Keeps the dependency chain clear: auth is available before any data fetching starts

**TanstackQueryProvider must wrap ModalsProvider:**
- `ModalsProvider` renders `<UserModal />` which uses `useMutation` and `useQueryClient`
- TanStack Query hooks require `QueryClientProvider` to be an ancestor
- If `ModalsProvider` were outside `TanstackQueryProvider`, all mutation calls inside modals would throw "No QueryClient set" error

**ModalsProvider must be inside everything:**
- It renders global modal components that need access to auth state, query client, and theme
- Modals are intentionally always-mounted (not lazy) so their state persists even when closed

---

## Provider Details

### ThemeProvider (`providers/theme-provider.tsx`)
- Wraps `next-themes` `ThemeProvider`
- Default theme: `dark`
- Strategy: `class` attribute on `<html>`
- Disables transition on theme change

### AuthProvider (`providers/auth-provider.tsx`)
- Receives `token` prop from server-side `RootLayout`
- Hydrates `useAuthStore` immediately during first render (not useEffect)
- Uses `useRef` to ensure single hydration

### TanstackQueryProvider (`providers/tanstack-query-provider.tsx`)
- Creates `QueryClient` instance via `useState` (stable across re-renders)
- Wraps children in `QueryClientProvider`

### ModalsProvider (`providers/modals-provider.tsx`)
- Renders global modal components (currently: `UserModal`)
- Modals are controlled by their Zustand stores
- Add new global modals here

### BackgroundProvider (`providers/background-provider.tsx`)
- NOT in the global tree — used per-layout
- Provides premium dark background: cyber grid + glow blobs
- Used by `/users` layout

---

## Adding a New Provider

1. Create the provider component in `providers/`
2. Add it to `providers/index.tsx` in the correct position
3. Document the rationale for its position in the tree
