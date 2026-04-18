# Module: State Management

## Overview

Antaris uses a **dual-store pattern** — two completely separate state systems for two fundamentally different types of data:

| System | Library | What it manages |
|---|---|---|
| **Server State** | TanStack Query | API data (users list, user details) — fetched, cached, synced |
| **Client/UI State** | Zustand | Auth token, modal open/close, form data for modals |

**The golden rule:** Never put API data in Zustand. Never use TanStack Query for UI state.

---

## Architecture

```
                    ┌─────────────────────────────────────────┐
                    │              SERVER STATE                │
                    │          (TanStack Query)                │
                    │                                          │
                    │  QueryClient                             │
                    │  ├── user.list      cache (60s stale)   │
                    │  ├── user.details   cache (per userId)   │
                    │  └── (future: mission.*, etc.)           │
                    └──────────────────┬──────────────────────┘
                                       │
                            useSuspenseQuery / useQuery
                                       │
                    ┌──────────────────▼──────────────────────┐
                    │           UI COMPONENTS                  │
                    │  DataGrid, UserDetails, UserCard, etc.   │
                    └──────────────────┬──────────────────────┘
                                       │
                            useUserModal / useAuth
                                       │
                    ┌──────────────────▼──────────────────────┐
                    │              CLIENT STATE                │
                    │                (Zustand)                 │
                    │                                          │
                    │  useAuthStore                            │
                    │  ├── token: string | null                │
                    │  ├── user: any | null                    │
                    │  ├── isLoading: boolean                  │
                    │  └── isError: boolean                    │
                    │                                          │
                    │  useUserModal                            │
                    │  ├── open: boolean                       │
                    │  ├── mode: 'create' | 'update'           │
                    │  ├── data: UserType                      │
                    │  └── userId?: string                     │
                    └─────────────────────────────────────────┘
```

---

## Store 1: Auth Store — `store/auth-store.ts`

### State Shape

```typescript
interface AuthState {
    token: string | null      // JWT access token from Keycloak
    user: any | null          // decoded user info (set manually via setUser)
    isLoading: boolean        // true until first hydration completes
    isError: boolean          // true if auth flow fails
    setToken: (token: string | null) => void
    setUser: (user: any | null) => void
}
```

### Store Definition

```typescript
export const useAuthStore = create<AuthState>((set) => ({
    token: null,
    user: null,
    isLoading: true,     // starts as true — waiting for server hydration
    isError: false,

    setToken: (token) => set({ token, isLoading: false, isError: false }),
    //                                 ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    //                                 Always clears loading + error when token is set

    setUser: (user) => set({ user }),
}))
```

### Initial State Explanation

The store starts with `isLoading: true`. This is intentional — it represents "we haven't received the auth state from the server yet." As soon as `AuthProvider` runs (synchronously during the first render), it calls `setToken(token)` which sets `isLoading: false`.

---

### How the Auth Store Is Hydrated — `providers/auth-provider.tsx`

```typescript
'use client'

export function AuthProvider({ token, children }: { token: string | null, children: React.ReactNode }) {
    const initialized = useRef(false)

    if (!initialized.current) {
        // Called synchronously during render — NOT in useEffect
        // This means the store is updated before the first paint
        useAuthStore.setState({ token, isLoading: false, isError: false })
        initialized.current = true
    }

    return <>{children}</>
}
```

**Why not `useEffect`?** If hydration happened inside `useEffect`, there would be one render cycle where `isLoading: true` — components consuming `useAuth()` would briefly show loading states. By calling `useAuthStore.setState()` synchronously during render (guarded by `useRef` to run only once), the store is updated before the first paint. Zero flicker.

### Where the token comes from:

```typescript
// app/layout.tsx (Server Component)
const token = await getAccessToken()   // reads 'atmos_access_token' httpOnly cookie

return (
    <AllProviders token={token ?? null}>  // ← passes token down to AuthProvider
        {children}
    </AllProviders>
)
```

The server reads the cookie, passes it as a prop to `AllProviders`, which passes it to `AuthProvider`, which hydrates the Zustand store. This is a **server-to-client data bridge** — the token never needs to be fetched client-side.

---

### Consuming the Auth Store — `hooks/use-auth.ts`

```typescript
export function useAuth() {
    const { token, isLoading, isError, user, setToken, setUser } = useAuthStore()

    // Decode JWT payload without a library
    const decodedUser = useMemo(() => {
        if (!token) return null
        try {
            const payload = token.split('.')[1]
            return JSON.parse(atob(payload))   // base64 decode the JWT payload
        } catch {
            return null
        }
    }, [token])

    return {
        token,
        isLoading,
        isError,
        user: user ?? decodedUser,          // prefer explicitly set user, fallback to decoded token
        isAuthenticated: !!token && !isLoading,
        setToken,
        setUser,
    }
}
```

**How to use it:**

```typescript
// In any client component:
const { token, isAuthenticated, user } = useAuth()

if (!isAuthenticated) return <LoginPrompt />
// user.sub → Keycloak user ID
// user.email → user email
// user.preferred_username → username
```

---

## Store 2: User Modal Store — `features/users/hooks/useUserModal.ts`

This is a **feature-local Zustand store** — it lives inside the `features/users` module, not in the global `store/` directory. It manages everything about the create/update user modal: whether it's open, which mode, and the current form data.

### State Shape

```typescript
type UserModalStore = {
    open: boolean                               // is the dialog visible
    mode: 'create' | 'update'                  // which form variant
    data: UserType                              // current form data (pre-filled for update)
    userId?: string                             // the ID of the user being edited (update only)

    setOpen: (value: boolean) => void
    openCreate: () => void                      // opens modal in create mode
    openUpdate: (data: UserType & { _id: string }) => void  // opens modal pre-filled
    close: () => void
    updateData: (data: Partial<UserType>) => void   // partial update to form data
    validate: () => { success: boolean; errors?: any }  // Zod validation on-demand
}
```

### Store Definition

```typescript
export const useUserModal = create<UserModalStore>((set, get) => ({
    open: false,
    mode: 'create',
    data: {
        name: '', username: '', email: '', gender: '',
        address: {
            street: '', city: '', zipcode: '',
            suite: `Suite ${Math.floor(1000 + Math.random() * 9000)}`,   // random default
            geo: { lat: '', lng: '' },
        },
        phone: '', website: '',
        company: {
            name: '',
            catchPhrase: getRandomShortDescription(),   // random marketing copy as default
            bs: getRandomShortDescription(),
        },
    } as UserType,
    userId: undefined,
```

### Actions

```typescript
    openCreate: () => {
        set((state) => ({
            open: true,
            mode: 'create',
            data: state.data,   // keeps existing data — useful if user partially filled form, closed, then reopened
        }))
    },

    openUpdate: (data) =>
        set({
            open: true,
            mode: 'update',
            data: data as UserType,   // pre-fills form with the user's existing data
            userId: data._id,         // remembers which user is being edited
        }),

    close: () =>
        set((state) => ({
            open: false,
            data: state.data,   // keeps data — doesn't reset (intentional)
            userId: undefined,  // clears userId
        })),

    updateData: (newData) =>
        set((state) => ({
            data: { ...state.data, ...newData } as UserType,   // partial merge
        })),

    validate: () => {
        const data = get().data
        if (!data) return { success: false }
        const result = userFormSchema.safeParse(data)   // Zod validation
        return result.success ? { success: true } : { success: false, errors: result.error.format() }
    },
}))
```

---

### How `openUpdate` Pre-fills the Form

When user clicks "Edit" on a `UserCard`:

```typescript
// features/users/components/user-card.tsx
const { openUpdate } = useUserModal()

<DropdownMenuItem onClick={() => openUpdate(user)}>
    Edit
</DropdownMenuItem>
```

`openUpdate(user)` sets `mode: 'update'`, `data: user` (all user fields), and `userId: user._id`.

Then in `UserModal`:

```typescript
// features/users/components/user-modal.tsx
const { open, mode, data, userId, close } = useUserModal()

const form = useForm<UserType>({
    resolver: zodResolver(userFormSchema),
    defaultValues: data,   // ← form is initialized with store data
})

// Re-sync form when modal opens (handles case where data changed between opens)
useEffect(() => {
    if (!open) return
    form.reset(data)       // ← resets form with latest store data every time modal opens
}, [data, open])
```

This means:
1. `openUpdate(user)` sets store data = user's current values
2. `form.reset(data)` copies store data into React Hook Form's internal state
3. Form renders pre-filled with user's current values
4. User edits fields (React Hook Form manages field state from this point)
5. On submit, `form.handleSubmit(onSubmit)` fires with validated `UserType`

---

### Modal → Mutation → Cache Invalidation Flow

Complete flow for updating a user:

```
User clicks "Edit" on UserCard
    │
    ▼
useUserModal.openUpdate(user)
    │  sets: open=true, mode='update', data=user, userId=user._id
    ▼
UserModal renders (open=true)
    │  form.reset(data) → form pre-filled with user data
    ▼
User edits fields in UserForm
    │  React Hook Form manages field state
    ▼
User clicks "Update" button
    │
    ▼
form.handleSubmit(onSubmit)
    │  Zod validation via zodResolver → if invalid, shows field errors
    │  if valid → calls onSubmit(validatedData)
    ▼
onSubmit(data: UserType)
    │  mode === 'update' → updateUserMutation.mutate({ userId, data })
    ▼
HTTP PUT /rpc/user/{userId}
    │  → requireStandardSequrityMiddleware (WAF + bot check)
    │  → requireRatelimitSequrityMiddleware (1 req/min)
    │  → updateuser handler → fetch to CrudCrud → revalidatePath()
    ▼
onSuccess callback
    │  queryClient.invalidateQueries(trpc.user.list.queryKey())
    │  queryClient.invalidateQueries(trpc.user.details.queryKey({ input: { userId } }))
    │  form.reset()
    │  toast.success('User updated successfully')
    │  close() → sets open=false in store
    ▼
TanStack Query refetches in background
    │  UsersList re-renders with updated user
    │  UserDetails re-renders (if visited) with updated profile
```

---

## State Persistence (Zustand)

For UI state that must survive page refreshes (e.g., Catalog selections, user preferences), we use a **Persistent Thin Store** architecture.

### Persistence Principles

1. **Storage**: Always use `localStorage` for workspace data.
2. **Thin Store Pattern**: Only persist **serializable IDs** or primitive values. Never persist full objects or non-serializable data (React icons, functions).
3. **Hybrid State (Gold Standard)**: 
   - **URL Search Params (探索 Navigation)**: `category`, `subSystem`, and `componentId` are stored in the URL. This enables instant SSR rendering and zero-flicker transitions.
   - **LocalStorage (Workspace Persistence)**: For personal workspace state (e.g., `selectedComponents` as ID list).
4. **Zero-Boilerplate Hydration**: By putting critical navigation state in the URL, we avoid the need for complex `isHydrated` flags for navigation items. The workspace list is enriched client-side, ensuring a smooth, flicker-free experience.

---

## State Separation Rules

| Data type | Where it lives | Why |
|---|---|---|
| API responses | TanStack Query | Fetched from API, needs caching, refetching, invalidation |
| Auth session | Zustand (auth-store) | Synchronous access needed, SSR hydration |
| Catalog Selection | Zustand + URL | Persistent IDs (Local) + Navigation & Drawer (URL) |
| UI ephemeral state | Zustand (feature hooks) | Modal open/close, form data |

---

## Provider Tree Context

The stores are available globally — no need for prop drilling. But the auth store is **pre-hydrated** via `AuthProvider`. The order in the provider tree matters:

```
AllProviders (providers/index.tsx)
    │
    ├─ ThemeProvider          (next-themes — dark/light mode)
    │
    ├─ AuthProvider           (hydrates useAuthStore with server token)
    │
    ├─ TanstackQueryProvider  (QueryClientProvider)
    │
    └─ ModalsProvider         (renders dynamic feature modals)
```
