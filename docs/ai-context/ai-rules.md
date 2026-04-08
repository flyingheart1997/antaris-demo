# AI Operating Protocol — Antaris

> This is NOT a style guide. This is an **operating protocol**.
> Every rule below is a mandatory step in a defined sequence.
> An AI that skips any step is operating incorrectly on this codebase.

---

## STEP 0 — Read This First, Every Single Time

Before you write a single line of code or modify a single file, you must answer these three questions:

1. **What exactly is being asked?** — A new feature? A bug fix? A UI change? A data/API change?
2. **What files does this touch?** — Do they exist? Have you read them?
3. **What could break?** — Which other parts of the system depend on what you're changing?

You are not allowed to proceed until you can answer all three.

---

## MANDATORY PRE-FLIGHT — Run Before Any Change

This is not optional. Run this checklist for EVERY task, no matter how small.

### Phase 1 — Load System Context (always)

Read these files before touching anything:

| File | What you learn from it |
|---|---|
| `docs/ai-context/system-overview.md` | What this project is, what it's for, architectural decisions |
| `docs/ai-context/folder-structure.md` | Where everything lives — never assume a location |
| `docs/ai-context/coding-rules.md` | Patterns you MUST follow — styling, components, data fetching |
| `docs/ai-context/feature-map.json` | Which files belong to which feature — before touching any feature file |
| `docs/ai-context/tech-stack.md` | Which libraries are available — never add a new one without checking |

### Phase 2 — Load Task-Specific Context (based on task type)

After identifying the task type, read the relevant docs:

**If touching UI components:**
→ Read `docs/architecture/component-system.md` — CVA patterns, variant props, Radix primitives
→ Read `docs/features/design-system.md` — token reference, known typos, do/don't patterns

**If touching API routes or data fetching:**
→ Read `docs/modules/orpc-server.md` — route definition pattern, middleware chain
→ Read `docs/modules/orpc-client-tanstack.md` — how queries/mutations work on client

**If touching state (Zustand stores, modal logic):**
→ Read `docs/modules/state-management.md` — which store owns what, store/TanStack Query boundary

**If touching providers or root layout:**
→ Read `docs/modules/providers.md` — provider order and WHY it matters

**If touching auth, cookies, session:**
→ Read `docs/features/authentication.md` — token lifecycle, cookie setup

**If touching error handling:**
→ Read `docs/modules/error-handling.md` — 4-level error architecture

**If touching icons:**
→ Read `docs/architecture/icon-system.md` — custom icons vs third-party, build process

**If touching design tokens or styles:**
→ Read `docs/architecture/token-pipeline.md` — Figma → CSS → Tailwind pipeline

### Phase 3 — Read the Actual Code You Will Change

- Read every file you plan to modify BEFORE modifying it
- Read the files that import what you're changing (check usages)
- Never guess at a file's content — read it

---

## TASK PLAYBOOKS

### Playbook A: New Feature

A "new feature" = new page, new domain module, new major capability.

**Pre-flight:** Run mandatory pre-flight above (all phases).

**Before writing code, verify:**
- [ ] Does a similar feature already exist in `features/`? Check `feature-map.json`.
- [ ] Does the feature need a new oRPC route? Check `app/(server)/router/index.ts` for the namespace.
- [ ] Does the feature need a new Zustand store or can it reuse `useUserModal` pattern?
- [ ] Does the feature need new UI components or can it use existing `components/ui/`?

**Structure to follow** (based on `features/users/` pattern):
```
features/your-feature/
├── index.ts                  ← barrel exports, first file you create
├── components/
│   ├── your-list.tsx         ← DataGrid + orpc query
│   ├── your-card.tsx         ← single item display
│   ├── your-form.tsx         ← React Hook Form + Zod
│   └── your-modal.tsx        ← Dialog + useMutation
├── hooks/
│   └── useYourModal.ts       ← Zustand store for modal (open/mode/data)
└── types/
    └── your-schema.ts        ← Zod schema (imported by BOTH server route AND client form)
```

**oRPC route structure:**
```
app/(server)/router/your-domain.ts   ← handlers
app/(server)/router/index.ts         ← register: your: { list, create, update, delete }
```

**After writing code:**
- [ ] Update `docs/ai-context/feature-map.json` — add new feature entry
- [ ] Create `docs/features/your-feature.md` — document the feature
- [ ] Update `docs/ai-context/folder-structure.md` if new directories added
- [ ] Update `docs/modules/orpc-api.md` if new routes added

---

### Playbook B: Bug Fix

**Pre-flight:** Run mandatory pre-flight Phase 1 + read the specific files involved in the bug.

**Before writing any fix:**
- [ ] Reproduce the bug mentally — what exact code path causes it?
- [ ] Read the file(s) involved — understand the current (broken) behavior
- [ ] Identify the root cause — not just the symptom
- [ ] Check if fixing this breaks anything downstream

**Rules:**
- Fix the root cause, not the symptom
- Never add a workaround that hides the real problem
- If the fix changes behavior that other code depends on, check all callers

**After fixing:**
- [ ] If the bug was caused by a missing pattern in `coding-rules.md` — add the rule
- [ ] If docs described wrong behavior — update the relevant doc
- [ ] If the bug was a known issue in docs — remove/update the "known issue" note

---

### Playbook C: UI Component Change

Changes to files in `components/ui/` or feature-specific components.

**Pre-flight:** Run mandatory pre-flight Phase 1 + Phase 2 (UI section).

**Before writing any style or component change:**
- [ ] Read the component file completely — understand all existing variants and props
- [ ] Check `docs/architecture/component-system.md` for the pattern
- [ ] Identify which design tokens apply — check `docs/features/design-system.md`
- [ ] If the component uses CVA — understand the existing variant matrix before adding to it

**Style rules (hard):**
```typescript
// ✅ Always — semantic tokens
className="bg-surface-primary text-text-primary border-stroke-primary"

// ❌ Never — raw Tailwind colors
className="bg-gray-900 text-white border-gray-700"

// ❌ Never — arbitrary values
className="w-85.5 h-[56px]"

// ✅ Always — cn() for conditionals
className={cn("base-class", isActive && "active-class", className)}
```

**CVA rule:**
- Adding a new variant → must add `compoundVariants` for ALL color × variant combinations
- Never add one-off classes to a CVA component outside the variant system

**After changing:**
- [ ] Does the change affect the component docs at `/component-docs`? If yes, update the config at `app/component-docs/config/components.ts`
- [ ] If adding a new component to `components/ui/`, add it to the component list in `docs/features/design-system.md`

---

### Playbook D: API / Data Layer Change

Changes to oRPC routes, handlers, or data fetching logic.

**Pre-flight:** Run mandatory pre-flight Phase 1 + Phase 2 (API section).

**Before writing any route or query change:**
- [ ] Read `docs/modules/orpc-server.md` in full — understand the exact chain
- [ ] Read `docs/modules/orpc-client-tanstack.md` — understand how the client consumes this route
- [ ] Check the existing route in `app/(server)/router/` — read the full handler
- [ ] Check if security middleware is required — ALL write operations (create/update/delete) need Arcjet

**Security middleware rules (HARD — no exceptions):**
```typescript
// ✅ Correct for write operations
export const createItem = base
    .use(requireStandardSequrityMiddleware)    // WAF + bot detection
    .use(requireRatelimitSequrityMiddleware)   // rate limit
    .route(...)

// ✅ Correct for delete
export const deleteItem = base
    .use(requireStandardSequrityMiddleware)    // WAF + bot only (no rate limit on delete)
    .route(...)

// ❌ NEVER — write operation without security middleware
export const createItem = base
    .route(...)   // missing middleware — this is a security hole
```

**Query key rules:**
- After any mutation → invalidate ALL affected query keys
- Use `orpc.namespace.operation.queryKey()` — never hardcode query key arrays
- If update changes a list item AND a detail view → invalidate BOTH

**After changing:**
- [ ] Update `docs/architecture/api-architecture.md` if routes changed
- [ ] Update `docs/ai-context/feature-map.json` → `orpc-api.namespaces`
- [ ] Update `docs/modules/orpc-api.md` if new routes added

---

### Playbook E: State Management Change

Changes to Zustand stores or how state flows between components.

**Pre-flight:** Run mandatory pre-flight Phase 1 + Phase 2 (state section).

**Before any state change:**
- [ ] Read `docs/modules/state-management.md` — understand the dual-store boundary
- [ ] Identify which store the change belongs to: auth store, feature modal store, or new store?
- [ ] Is this state truly UI state (Zustand) or is it server/API data (TanStack Query)?

**State boundary rules (HARD):**
```typescript
// ✅ Zustand — UI state, auth state, modal open/close
const useUserModal = create(...)    // open, mode, form data for modal
const useAuthStore = create(...)    // token, isLoading — hydrated from server

// ✅ TanStack Query — API data
const { data } = useQuery(orpc.user.list.queryOptions())

// ❌ Never — storing API response in Zustand
const useUsersStore = create((set) => ({
    users: [],
    fetchUsers: async () => { /* fetch and set */ }  // this is what TanStack Query is for
}))

// ❌ Never — reading token from TanStack Query
const { data: token } = useQuery(['token'], getToken)  // token belongs in Zustand
```

**New Zustand store rules:**
- Feature-level stores → in `features/your-feature/hooks/useYourStore.ts`
- Global stores → in `store/`
- Every store must have clear ownership of what state it holds

**After changing:**
- [ ] Update `docs/modules/state-management.md`

---

## ABSOLUTE CONSTRAINTS — Never Violate

These are architectural rules. Violating any of them will break the system.

### 1. Never call `fetch()` from a client component
```typescript
// ❌ NEVER
const [users, setUsers] = useState([])
useEffect(() => { fetch('/api/users').then(...).then(setUsers) }, [])

// ✅ Always use oRPC + TanStack Query
const { data } = useQuery(orpc.user.list.queryOptions())
```

**Why:** oRPC provides type safety, automatic caching, deduplication, and SSR hydration. Raw fetch bypasses all of this.

---

### 2. Never create API routes outside oRPC (except auth)
```typescript
// ❌ NEVER — custom Next.js API route for data
// app/api/users/route.ts → GET/POST handlers

// ✅ Always — oRPC route in app/(server)/router/
export const listUsers = base.route(...).input(...).output(...).handler(...)
```

**Why:** All data routes must go through oRPC so they get type safety, middleware, and the isomorphic client.

**Exception:** Auth routes at `app/api/auth/` use Next.js API routes because Keycloak OAuth flow requires standard HTTP redirect handling.

---

### 3. Never modify the provider tree order without reading providers.md first
```typescript
// The order is load-bearing — read docs/modules/providers.md before touching this
ThemeProvider → AuthProvider → TanstackQueryProvider → ModalsProvider
```

**Why:** Each provider depends on the one wrapping it. Wrong order = runtime errors or silent failures.

---

### 4. Never store server data in Zustand

API responses → TanStack Query only. Zustand is for UI/auth state only.

---

### 5. Never skip Arcjet middleware on write operations

Every `create`, `update`, `delete` route MUST have `requireStandardSequrityMiddleware`. Rate limiting on `create` and `update`. See Playbook D above.

---

### 6. Never import from a feature's internal files outside the feature
```typescript
// ❌ NEVER — direct internal import
import UserCard from '@/features/users/components/user-card'

// ✅ Always — through barrel export
import { UserCard } from '@/features/users'
```

---

### 7. Never hardcode colors or use raw Tailwind color classes in components

Use semantic tokens always. See Playbook C.

---

### 8. Never add a new npm dependency without checking if a solution exists in the codebase

Check `docs/ai-context/tech-stack.md` before installing anything new. The existing stack covers most use cases.

---

## DECISION GATES — Before Writing Specific Code

These are "stop and check" moments. Hit each gate before the relevant code.

**Before creating a new component:**
→ Gate: Does a similar component exist in `components/ui/`? Check the list in `docs/features/design-system.md`.
→ Gate: Is this a domain component (feature-specific) or a design system primitive (reusable)? Domain components go in `features/*/components/`, not `components/ui/`.

**Before adding a new Zod schema:**
→ Gate: Can the existing `userFormSchema` or similar schema be extended or reused?
→ Gate: Is this schema going to be shared between server (oRPC route) and client (React Hook Form)? If yes, put it in `features/your-feature/types/your-schema.ts`.

**Before adding a Zustand store:**
→ Gate: Is this really UI state, or is it server data that belongs in TanStack Query?
→ Gate: Is this feature-local (goes in `features/*/hooks/`) or global (goes in `store/`)?

**Before adding a new provider:**
→ Gate: Read `docs/modules/providers.md`. Where in the order does this belong and why?

**Before using a design token:**
→ Gate: Does the token you need actually exist? Check `styles/src/index.css` for the `--variable-name`. Known typos exist — see `docs/features/design-system.md#known-issues`.

**Before writing an error handler:**
→ Gate: Which level handles this error? Read `docs/modules/error-handling.md` for the 4-level architecture.

---

## POST-CHANGE PROTOCOL — After Every Change

Run this after completing any code change.

### 1. Verify the Change Works
- [ ] Dev server starts without errors (`pnpm dev`)
- [ ] TypeScript compiles without errors
- [ ] The changed behavior works as expected in the browser
- [ ] Browser console has no new errors or warnings
- [ ] If a mutation was changed — test the full flow (open modal → submit → cache updates → UI reflects change)

### 2. Verify Nothing Broke
- [ ] Navigate to pages that use what you changed
- [ ] If you changed a shared component — check all its usages
- [ ] If you changed an oRPC route — verify both list and detail pages work

### 3. Update Documentation

Use this matrix — find your change type and update the corresponding docs:

| What you changed | Docs to update |
|---|---|
| New component in `components/ui/` | `docs/features/design-system.md` (component list), `docs/architecture/component-system.md` |
| Modified component variant/props | `docs/architecture/component-system.md`, `app/component-docs/config/components.ts` |
| New feature module in `features/` | `docs/ai-context/feature-map.json`, create `docs/features/your-feature.md` |
| New oRPC route | `docs/ai-context/feature-map.json` (namespaces), `docs/architecture/api-architecture.md`, `docs/modules/orpc-api.md` |
| Changed oRPC route (input/output) | `docs/architecture/api-architecture.md` (schemas section) |
| New/changed Zustand store | `docs/modules/state-management.md` |
| New/changed provider | `docs/modules/providers.md`, `docs/ai-context/feature-map.json` (providers section) |
| New/changed auth logic | `docs/features/authentication.md` |
| New/changed error handling | `docs/modules/error-handling.md` |
| New folder or file pattern | `docs/ai-context/folder-structure.md` |
| New npm dependency | `docs/ai-context/tech-stack.md` |
| New env variable | `docs/setup/environment.md` |
| Changed a coding convention | `docs/ai-context/coding-rules.md` |
| Architecture-level change | `docs/architecture/system-design.md`, `docs/architecture/data-flow.md` |

**Rule:** If your change is not reflected in docs → the change is incomplete. Code change without doc update = unfinished work.

---

### 4. Cross-link the Documentation

Docs that exist in isolation are useless. Every new or updated doc **must be linked to and from** related docs.

**When you CREATE a new doc file (e.g., `docs/features/missions.md`):**
- Add a `## See Also` section at the bottom of the new doc linking to related docs
  - Example: new feature doc → link to `orpc-server.md` (route pattern), `state-management.md` (store pattern), `api-architecture.md` (routes)
- Update `docs/ai-context/feature-map.json` → add the doc path in the feature's `"doc"` field
- Update `docs/ai-context/folder-structure.md` → add the new file to the `/docs` section
- Update any existing doc that covers related concepts to mention the new doc
  - Example: if you created `docs/features/missions.md`, update `docs/modules/orpc-api.md` to mention the missions routes section

**When you UPDATE an existing doc:**
- Verify all existing links in the file still point to valid paths/sections
- If you added a new major section, check if other docs should reference it

**Checklist before finishing:**
- [ ] New doc has a `## See Also` section with links to related docs
- [ ] `feature-map.json` has the doc path in the correct feature entry
- [ ] `folder-structure.md` lists the new file
- [ ] At least one existing related doc links back to the new doc
- [ ] All links use relative paths from the `/docs` root (e.g., `../modules/orpc-server.md`)

---

## RED FLAGS — You Are Doing Something Wrong

If you catch yourself doing any of these, stop immediately and re-read the relevant doc.

🚩 Writing `fetch('/api/...')` inside a React component
→ You are bypassing oRPC. Read `docs/modules/orpc-client-tanstack.md`.

🚩 Using `useState` + `useEffect` to fetch data
→ You are reinventing TanStack Query. Read `docs/modules/orpc-client-tanstack.md`.

🚩 Adding `create(...)` in Zustand to store users, missions, or any server data
→ Server data belongs in TanStack Query. Read `docs/modules/state-management.md`.

🚩 Writing `bg-gray-900` or `text-white` in a component
→ You are using raw colors. Use semantic tokens. Read `docs/features/design-system.md`.

🚩 Creating a new `.tsx` file directly under `app/` that's not a Next.js convention file
→ Pages go in route directories. Components go in `features/` or `components/`. Read `docs/ai-context/folder-structure.md`.

🚩 Writing a `create` or `update` route handler without `.use(requireStandardSequrityMiddleware)`
→ Security middleware is mandatory on write operations. Read `docs/modules/orpc-server.md`.

🚩 Importing from `@/features/users/components/user-card` (internal path)
→ Import from the barrel: `@/features/users`. Read `docs/ai-context/coding-rules.md`.

🚩 Modifying the provider order in `providers/index.tsx` without reading why it's that way
→ Read `docs/modules/providers.md` — the order is load-bearing.

🚩 Adding a `useEffect` inside `AuthProvider` to hydrate the auth store
→ Hydration is synchronous on purpose (zero-latency). Read `docs/modules/state-management.md`.

🚩 Making a change in `components/ui/` without reading the existing component first
→ You may break existing consumers or create variant conflicts. Always read first.

---

## QUICK REFERENCE — Correct Patterns at a Glance

### Add data to a page (SSR + Client)
```typescript
// Server Component (page.tsx)
const queryClient = getQueryClient()
await queryClient.prefetchQuery(orpc.your.route.queryOptions())
return <HydrateClient client={queryClient}><YourClientComponent /></HydrateClient>

// Client Component — reads from hydrated cache
const { data } = useSuspenseQuery(orpc.your.route.queryOptions())
```

### Mutation with cache update
```typescript
const mutation = useMutation({
    ...orpc.your.create.mutationOptions(),
    onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: orpc.your.list.queryKey() })
        toast.success('Created successfully')
    },
    onError: (error) => toast.error(error.message),
})
```

### New oRPC route
```typescript
export const yourRoute = base
    .use(requireStandardSequrityMiddleware)    // required for write ops
    .use(requireRatelimitSequrityMiddleware)   // required for create/update
    .route({ method: 'POST', path: '/your-path', summary: '...', tags: ['your-tag'] })
    .input(yourZodSchema)
    .output(z.void())
    .handler(async ({ input, errors }) => {
        try { /* business logic */ }
        catch { throw errors.INTERNAL_SERVER_ERROR({ message: '...' }) }
    })
```

### Styling
```typescript
// Backgrounds: bg-surface-bg | bg-surface-primary | bg-surface-secondary | bg-surface-hover
// Text:        text-text-primary | text-text-secondary | text-text-disabled
// Borders:     border-stroke-primary | border-stroke-selected | border-stroke-error
// Tokens:      text-text-info | text-text-warning | text-text-error
```

### New Zustand store (feature-level)
```typescript
// features/your-feature/hooks/useYourModal.ts
export const useYourModal = create<YourModalStore>((set, get) => ({
    open: false,
    mode: 'create' as 'create' | 'update',
    data: defaultData,
    openCreate: () => set({ open: true, mode: 'create' }),
    openUpdate: (data) => set({ open: true, mode: 'update', data }),
    close: () => set({ open: false }),
}))
```

---

## DOCUMENTATION SYNC RULE (One-Line Summary)

> **Every code change that changes behavior, structure, or contracts MUST update the relevant doc before the task is considered complete.**

If you are unsure which doc to update, search the `/docs` folder for the relevant concept. If no doc exists for what you changed, create one.
