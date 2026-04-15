# Coding Rules — Antaris

## 1. Component Architecture

### DO ✅
- Place all shared UI components in `components/ui/`
- Use **CVA (class-variance-authority)** for managing component variants (size, color, variant)
- Use **forwardRef** for all components that render native HTML elements
- Create barrel exports (`index.ts`) in each feature module
- Use TypeScript `interface` for component props
- Extend native HTML element props: `React.ComponentPropsWithoutRef<"button">`

### DON'T ❌
- Never create UI components outside `components/ui/`
- Never duplicate a component — check existing ones first
- Never use inline styles — always use Tailwind utilities
- Never create ad-hoc CSS files for individual components
- Never use `any` type in props interfaces

### Pattern Reference
```tsx
// components/ui/example.tsx
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const exampleVariants = cva("base-classes", {
  variants: {
    size: { sm: "...", md: "...", lg: "..." },
    color: { default: "...", primary: "...", destructive: "..." },
  },
  defaultVariants: { size: "md", color: "default" },
})

interface ExampleProps
  extends React.ComponentPropsWithoutRef<"div">,
    VariantProps<typeof exampleVariants> {}

const Example = React.forwardRef<HTMLDivElement, ExampleProps>(
  ({ className, size, color, ...props }, ref) => (
    <div ref={ref} className={cn(exampleVariants({ size, color }), className)} {...props} />
  )
)
Example.displayName = "Example"
export { Example, exampleVariants }
```

---

## 2. Feature Module Structure

### DO ✅
- Organize business logic by domain in `features/<feature-name>/`
- Each feature MUST contain:
  - `index.ts` — barrel exports
  - `components/` — feature-specific components
  - `hooks/` — feature-specific hooks (if needed)
  - `types/` — feature-specific types/schemas (if needed)
- Import from barrel: `import { UserCard } from '@/features/users'`

### DON'T ❌
- Never import directly from a feature's internal files outside the feature
- Never put feature-specific logic in `components/ui/`
- Never mix features — each feature is self-contained

---

## 3. Styling Rules

### DO ✅
- Use **Tailwind CSS v4 utilities** exclusively
- Use **semantic design tokens** from the Antaris Design System:
  - Backgrounds: `bg-surface-bg`, `bg-surface-primary`, `bg-surface-secondary`
  - Borders: `border-stroke-primary`, `border-stroke-secondary`
  - Text: `text-text-primary`, `text-text-secondary`, `text-text-disabled`
  - Icons: `text-icon-primary`, `text-icon-secondary`
- Use `cn()` from `@/lib/utils` for conditional classes
- Follow the spacing scale from `styles/src/index.css`

### DON'T ❌
- Never use arbitrary values (`w-[342px]`) — use design token values
- Never use `h-spacing-32` — use `h-32` (Tailwind v4 resolves automatically)
- Never use `text-font-size-md` — use `text-md`
- Never use `rounded-radius-md` — use `rounded-md`
- Never hardcode colors — always use semantic tokens

---

## 4. Data Fetching

### Server Components (SSR)
```tsx
// Prefetch data on the server, hydrate to client
const queryClient = getQueryClient()
await queryClient.prefetchQuery(trpc.user.list.queryOptions())

return (
  <HydrateClient client={queryClient}>
    <ClientComponent />
  </HydrateClient>
)
```

### Client Components
```tsx
// Read from hydrated cache — no loading flicker
const { data } = useQuery(trpc.user.list.queryOptions())
```

### Mutations
```tsx
const mutation = useMutation({
  ...trpc.user.create.mutationOptions(),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: trpc.user.list.queryKey() })
  },
})
```

### Rules
- **ALWAYS** prefetch in Server Components, consume in Client Components
- **ALWAYS** invalidate related queries after mutations
- **NEVER** call `fetch()` directly from client components — use oRPC
- **NEVER** bypass the oRPC layer for API calls

---

## 5. oRPC Route Definitions

### DO ✅
- Define routes in `app/(server)/router/<domain>.ts`
- Register all routes in `app/(server)/router/index.ts`
- Use Zod schemas for input/output validation
- Apply security middleware (Arcjet) on mutating operations
- Use the `base` middleware from `app/(server)/middlewares/base.ts`

### Pattern
```tsx
export const listItems = base
  .route({ method: 'GET', path: '/items', summary: 'List items', tags: ['item'] })
  .input(z.void())
  .output(z.object({ success: z.boolean(), data: z.array(itemSchema) }))
  .handler(async () => { /* ... */ })
```

### DON'T ❌
- Never create API routes outside the oRPC system (except auth)
- Never skip Zod validation on inputs/outputs
- Never access the database without middleware protection on write operations

---

## 6. State Management

### Global State (Zustand)
- Auth state: `store/auth-store.ts` → consumed via `hooks/use-auth.ts`
- Feature-level modals: `features/<name>/hooks/` (e.g., `useUserModal.ts`)

### Server State (TanStack Query)
- All API data is managed by TanStack Query — NOT Zustand
- Never store server-fetched data in Zustand

### Rules
- **Zustand** = UI state, auth state, modal state
- **TanStack Query** = server data, API responses, cache management
- Never mix the two

---

## 7. Authentication

### DO ✅
- Use `useAuth()` hook from `@/hooks/use-auth` in client components
- Use `getAccessToken()` from `@/lib/auth/session` in server-side code
- Auth cookies are `httpOnly` — never try to access them from client JS

### DON'T ❌
- Never store tokens in localStorage or sessionStorage
- Never pass tokens via URL parameters
- Never import from `store/auth-store.ts` directly — use the `useAuth()` hook

---

## 8. File Naming Conventions

| Type | Convention | Example |
|---|---|---|
| Components | kebab-case `.tsx` | `user-card.tsx` |
| Hooks | camelCase with `use` prefix `.ts` | `useUserModal.ts` |
| Types/Schemas | kebab-case `.ts` | `user-schema.ts` |
| Utilities | kebab-case `.ts` | `mock-data.ts` |
| Pages | `page.tsx` (Next.js convention) | `app/users/page.tsx` |
| Layouts | `layout.tsx` (Next.js convention) | `app/users/layout.tsx` |

---

## 9. Import Alias Rules

Always use path aliases:

| Alias | Resolves to |
|---|---|
| `@/components` | `components/` |
| `@/features` | `features/` |
| `@/hooks` | `hooks/` |
| `@/lib` | `lib/` |
| `@/store` | `store/` |
| `@/providers` | `providers/` |

---

## 10. Validation

- **ALWAYS** use Zod for schema definitions
- Share schemas between client and server when possible
- Form validation: Zod schema → `@hookform/resolvers/zod` → react-hook-form
- API validation: Zod schema in oRPC `.input()` / `.output()`

---

## 11. Error Handling

- oRPC provides typed errors: `RATE_LIMIT_EXCEEDED`, `FORBIDDEN`, `NOT_FOUND`, `BAD_REQUEST`, `INTERNAL_SERVER_ERROR`, `UNAUTHORIZED`
- Use Sonner toast (`sonner`) for user-facing error messages
- Always wrap async operations in try/catch in handlers
- Log errors server-side, show user-friendly messages client-side

---

## 12. Theme Support

- Dark mode is the **default** theme
- Managed by `next-themes` via `ThemeProvider`
- Theme toggling uses `class` strategy (`.dark` class on `<html>`)
- All design tokens support dark mode automatically via CSS variables
