# Module: Providers

## Purpose
The provider tree wraps the entire application, providing theme management, authentication state, data fetching client, and global modal registry. The order of nesting is critical.

---

## Provider Tree

```
<ThemeProvider>              ← next-themes (dark/light mode)
  <AuthProvider>             ← Zustand auth hydration from server
    <TanstackQueryProvider>  ← QueryClient for data fetching
      <ModalsProvider>       ← Global modal instances
        <Toaster />          ← Toast notifications
        {children}           ← App pages
      </ModalsProvider>
    </TanstackQueryProvider>
  </AuthProvider>
</ThemeProvider>
```

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
