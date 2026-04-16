# Developer Onboarding — Antaris Demo

Get from zero to running dev server in under 10 minutes.

---

## Prerequisites

| Tool | Version | Check |
|---|---|---|
| Node.js | 20+ | `node --version` |
| pnpm | 8+ | `pnpm --version` |
| Git | any | `git --version` |

> Why pnpm? The project uses `pnpm-workspace.yaml` and lockfile. Using npm or yarn will produce different node_modules resolution and may break builds.

---

## Step 1 — Clone & Install

```bash
git clone <repo-url>
cd antaris-demo
pnpm install
```

---

## Step 2 — Environment Setup

Create a `.env` file in the project root:

```bash
cp .env.example .env   # if template exists
# — OR create manually — see docs/setup/environment.md for all variables
```

Minimum required for local dev:
```env
ARCJET_KEY=ajkey_your_key_here
NEXT_PUBLIC_KEYCLOAK_URL=https://id.antaris-staging.cloud/
NEXT_PUBLIC_KEYCLOAK_REALM=ATMOS
NEXT_PUBLIC_KEYCLOAK_CLIENT_ID=ATMOS-UI-CLIENT
NEXT_PUBLIC_KEYCLOAK_RESOURCE_CLIENT=ATMOS-RESOURCE-SERVER
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Full reference: [docs/setup/environment.md](environment.md)

---

## Step 3 — Start Dev Server

```bash
pnpm dev
```

Open `http://localhost:3000`.

On first load you will see the **splash screen** — an ~7 s animated intro where the Antaris satellite icon enters from the bottom-left on a curved orbital arc, transforms into the full Antaris logo, then departs to the top-right. After it completes, the main hero page is visible underneath.

> The splash screen renders on every full page load. It is not gated behind a "first visit" flag — this is intentional. See [`docs/features/splash-screen.md`](../features/splash-screen.md) for implementation details.

---

## Step 4 — Explore the App

| URL | What you see |
|---|---|
| `http://localhost:3000` | Landing page (hero section) |
| `http://localhost:3000/users` | User management CRUD |
| `http://localhost:3000/component-docs` | Component documentation portal |
| `http://localhost:3000/preview/button` | Button component showcase |
| `http://localhost:3000/preview/card` | Card component showcase |

---

## Step 5 — Understand the Codebase

Read these docs in order:

1. [docs/ai-context/system-overview.md](../ai-context/system-overview.md) — What is this project and why
2. [docs/ai-context/folder-structure.md](../ai-context/folder-structure.md) — Where everything lives
3. [docs/architecture/system-design.md](../architecture/system-design.md) — How the system is designed
4. [docs/modules/trpc-api.md](../modules/trpc-api.md) — How the API layer works (procedures, middleware, client)
5. [docs/architecture/api-architecture.md](../architecture/api-architecture.md) — Endpoint table, data flow, SSR hydration
6. [docs/modules/state-management.md](../modules/state-management.md) — Zustand stores

---

## Optional Build Steps

These are only needed if you've modified source files that require compilation:

```bash
# Rebuild design tokens (after editing styles/figma/*.json or styles/build.js)
pnpm build:token

# Rebuild custom icons (after adding/editing files in icons/svg/)
pnpm build:icon
```

Both are pre-committed — you don't need to run them on a fresh clone.

---

## Key Concepts to Understand Before Coding

### 1. tRPC — Type-Safe RPC (Not REST, not plain fetch)

All API operations go through tRPC. There are no manual `fetch` calls in components. Learn the pattern:

```typescript
import { trpc } from '@/lib/trpc'

// Reading data in a Server Component (no HTTP — direct call)
const queryClient = getQueryClient()
await queryClient.prefetchQuery(trpc.user.list.queryOptions())

// Reading data in a Client Component
const { data } = useSuspenseQuery(trpc.user.list.queryOptions())

// Writing data (mutation)
const mutation = useMutation({ ...trpc.user.create.mutationOptions() })
mutation.mutate(formData)
```

Full detail: [docs/modules/trpc-api.md](../modules/trpc-api.md)

---

### 2. Zustand — Two Stores, Clear Boundaries

- `useAuthStore` — auth token only. Never put API data here.
- `useUserModal` — modal open/close/data. Never call fetch from here.
- TanStack Query — all API data. Never duplicate in Zustand.

Full detail: [docs/modules/state-management.md](../modules/state-management.md)

---

### 3. Styling — Tokens, Not Raw Colors

Never use raw Tailwind colors (`bg-green-500`, `text-gray-300`). Use semantic tokens:

```typescript
// ❌ Don't
className="bg-green-900 text-gray-100 border-gray-700"

// ✅ Do
className="bg-surface-primary text-text-primary border-stroke-primary"
```

Token reference: [docs/features/design-system.md](../features/design-system.md)

---

### 4. Components — CVA Variants

Design system components use Class Variance Authority (CVA) for variants. Don't override with raw classes — use the variant props:

```typescript
// ❌ Don't override with raw Tailwind
<Button className="bg-red-500 text-white border border-red-600">Delete</Button>

// ✅ Use variant props
<Button variant="solid" color="error">Delete</Button>
```

Full detail: [docs/architecture/component-system.md](../architecture/component-system.md)

---

### 5. Adding a New Feature

Follow the existing pattern in `features/users/`:

```
features/your-feature/
├── index.ts                    # barrel exports
├── components/
│   ├── your-list.tsx           # uses DataGrid + trpc query
│   ├── your-card.tsx           # single item display
│   ├── your-form.tsx           # React Hook Form
│   └── your-modal.tsx          # Dialog + useMutation
├── hooks/
│   └── useYourModal.ts         # Zustand store for modal state
└── types/
    └── your-schema.ts          # Zod schema (shared server+client)
```

Add the oRPC routes in `app/(server)/router/your-domain.ts` and register them in `app/(server)/router/index.ts`.

---

## Coding Standards

See [docs/ai-context/coding-rules.md](../ai-context/coding-rules.md) for the full rules. Key points:

- Mark files with `'use client'` only when needed (event handlers, hooks, browser APIs)
- All components in `components/ui/` are client-compatible — they can be used in both RSC and client components
- Form validation always uses Zod — the same schema file is imported by both the server route and the client form
- Error handling: let errors bubble to the error boundary from `DataGrid`; use `try-catch` in route handlers
