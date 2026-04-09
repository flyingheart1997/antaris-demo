---
trigger: always_on
description: AI agent operational rules for Antaris ATMOS frontend
---

# Antaris — AI Agent Rules

> Execution framework for agents on this codebase. Read before touching any code.

## 1. IDENTITY & MISSION

You are an AI agent in the **Antaris ATMOS** frontend — architecture reference for a satellite ops platform. Every pattern you set becomes the standard. **You are setting precedent.**

Mission: implement features / fix bugs preserving architectural integrity. Keep docs in sync. Write code any developer or AI can understand.

## 2. DOCUMENTATION — YOUR KNOWLEDGE BASE

All docs live in [`/docs`](../../docs/). **Read relevant docs before writing any code.**

**Tier 1 — Every task:** `ai-context/system-overview.md` → `folder-structure.md` → `coding-rules.md` → `feature-map.json`

**Tier 2 — By domain:**
- UI/components → `architecture/component-system.md` + `features/design-system.md`
- API/data → `modules/orpc-server.md` + `modules/orpc-client-tanstack.md`
- State → `modules/state-management.md`
- Auth → `features/authentication.md`
- Errors → `modules/error-handling.md`
- Providers → `modules/providers.md` ← order is load-bearing
- Tokens/styles → `architecture/token-pipeline.md`
- Icons → `architecture/icon-system.md`
- Security → `features/security.md`

**Tier 3 — Always read the actual code files you will change before changing them.**

Full doc map: `ai-context/folder-structure.md`

## 3. ARCHITECTURE — MENTAL MODEL

### 3.1 Five-Layer Stack

```
LAYER 5 — PRESENTATION    RSC + Client Components, Zustand, TanStack Query, Tailwind+CVA
LAYER 4 — SSR/HYDRATION   prefetch → dehydrate → HydrateClient | AuthProvider → Zustand
LAYER 3 — API/RPC         oRPC router + handlers → Zod validation → business logic
LAYER 2 — SECURITY        Arcjet: base → WAF+bot → rate limit → handler
LAYER 1 — AUTH/SESSION    Keycloak OAuth2 + UMA → httpOnly cookies → Zustand
```

Diagrams → [`architecture/system-design.md`](../../docs/architecture/system-design.md), [`architecture/data-flow.md`](../../docs/architecture/data-flow.md)

### 3.2 Two Data Paths

**Server Component (no HTTP):** RSC → `getQueryClient()` → `prefetchQuery(orpc.*.*)` → `HydrateClient` → client reads hydrated cache via `useSuspenseQuery`

**Client Component (HTTP):** `useQuery/useMutation` → oRPC client → `RPCLink` → `fetch /rpc/*` → catch-all → Arcjet → handler

### 3.3 State Ownership — Never Mix

| State | Owner |
|---|---|
| API / server data | TanStack Query cache |
| Auth token + user | `useAuthStore` via `useAuth()` hook only |
| Modal open/mode/data | Feature-local Zustand (`features/*/hooks/`) |
| Form fields | React Hook Form (component-local) |
| Toasts | Sonner imperative (`toast.success/error`) |

### 3.4 oRPC Isomorphic Bridge

On the server, `globalThis.$client` is set → handler runs as a direct function call (no HTTP). On the client, it is undefined → falls back to HTTP via RPCLink. **Same interface. Same query keys.** That's how SSR hydration works.

Details → `modules/orpc-server.md`, `modules/orpc-client-tanstack.md`

## 4. TASK ANALYSIS

Before any code: **classify → plan → gate-check → execute.**

**Classify the change:**
- Layer: UI-only / data / state / auth / multi-layer
- Type: new feature / bug fix / modification / refactor (refactor = highest risk)
- Blast radius: `components/ui/` affects all consumers | oRPC schema breaks type contracts | Zustand shape breaks all consumers | Provider order crashes app

**Plan before acting:** which files to read? which to create/modify? which pattern from Section 5? which docs to update after?

**Playbooks by task type** → [`ai-context/ai-rules.md`](../../docs/ai-context/ai-rules.md)

## 5. IMPLEMENTATION PATTERNS

**Reference implementation: `features/users/`** — copy its structure exactly for every new feature.

### 5.1 New Full-Stack Feature — 9 Steps

Full code → `features/user-management.md`. Follow `features/users/` structure exactly.

1. **Schema** — `features/your-feature/types/your-schema.ts` — Zod, shared between oRPC `.input()` and RHF `zodResolver`
2. **oRPC routes** — `app/(server)/router/your-domain.ts` — chain: `base → .use(middleware) → .route() → .input() → .output() → .handler()`. GET: no middleware. POST/PUT: standard+ratelimit. DELETE: standard only.
3. **Register** — `app/(server)/router/index.ts`
4. **Zustand modal store** — `features/your-feature/hooks/useYourModal.ts` — open/mode/data/itemId only
5. **RSC list page** — `app/your-route/page.tsx` — no `'use client'`. `getQueryClient()` → `prefetchQuery` → `<HydrateClient>` → `<Suspense>` → client component
6. **List client component** — `features/your-feature/components/your-list.tsx` — use `<DataGrid>` with `queryOptions` + `renderItem` + `emptyProps`
7. **Modal mutations** — `features/your-feature/components/your-modal.tsx` — create + update mutations. `onSuccess`: invalidate+toast+close. `onError`: `toast.error(error.message)`. `useEffect` resets form on open.
8. **Register modal** — `providers/modals-provider.tsx`
9. **Barrel exports** — `features/your-feature/index.ts`

### 5.2 New UI Component

CVA for variants. Radix primitives for interactive. `cn()` for conditionals. Full patterns → `architecture/component-system.md`

### 5.3 Semantic Tokens Only

Use only semantic tokens: `bg-surface-*`, `text-text-*`, `border-stroke-*`, semantic intent variants (`info/warning/error`), and brand accents (`bg-green-9`, `bg-red-9`) sparingly. **Never** raw Tailwind color classes (`bg-gray-*`, `text-white`) or arbitrary values (`w-[n]`). Full token list → `features/design-system.md`

## 6. DECISION FRAMEWORK

**State:** API data → TanStack Query | Auth → `useAuth()` | Modal → feature Zustand | Form → RHF | Toast → Sonner | Anything else → re-evaluate

**Component:** Generic primitive → `components/ui/` | Feature-specific → `features/*/components/` | Cross-feature layout → `components/` root

**Security:** GET → none | POST/PUT → standard + ratelimit | DELETE → standard only

**RSC vs Client:** Hooks / events / browser APIs / Framer Motion → `'use client'` | Static render or SSR prefetch only → RSC

**Create vs reuse:** Check `features/design-system.md` list → check `components/ui/` → can variant props satisfy need? → only if no: create new

## 7. QUALITY GATES

**Gate 1 — Before any code:** Tier 1 docs loaded? | Tier 2 docs loaded? | Files to modify have been read? | Execution plan clear?

**Gate 2 — During (server):** Chain order correct? | Write ops have middleware? | Handler has try/catch? | Registered in `router/index.ts`?

**Gate 2 — During (client):** RSC has `prefetchQuery` + `HydrateClient`? | Suspense → `useSuspenseQuery`, non-suspense → `useQuery` with isLoading/isError? | Mutations have `onSuccess` (invalidate+toast) + `onError` (toast)? | Correct query keys invalidated?

**Gate 2 — During (UI):** Only semantic tokens? | CVA for variants? | `cn()` for conditionals? | No API data in Zustand?

**Gate 3 — After implementation:** TS compiles? | Dev server works end-to-end? | Error cases tested? | No console errors?

**Gate 4 — Docs:** `feature-map.json` updated? | Feature/module doc created or updated? | `folder-structure.md` updated if new dirs? | `tech-stack.md` updated if new deps? | New doc cross-linked with related docs? | Related existing docs updated to reference the new doc?

## 8. DOCUMENTATION SYNC MATRIX

**Rule:** Every code change that affects behavior, structure, or contracts MUST update the relevant doc. A code change without a doc update is **unfinished work**.

**Cross-linking:** New docs must have `## See Also` links, be in `feature-map.json`, `folder-structure.md`, and referenced from a related doc.

| Changed | Update |
|---|---|
| New `components/ui/` | `features/design-system.md` |
| CVA variants | `architecture/component-system.md` |
| New feature | `feature-map.json` + `features/your-feature.md` |
| New/changed oRPC route | `feature-map.json` + `architecture/api-architecture.md` |
| Arcjet middleware | `features/security.md` |
| Zustand store | `modules/state-management.md` |
| Provider changes | `modules/providers.md` + `feature-map.json` |
| Auth flow | `features/authentication.md` |
| New env var | `setup/environment.md` |
| New dependency | `ai-context/tech-stack.md` |
| New directory | `ai-context/folder-structure.md` |
| Coding convention | `ai-context/coding-rules.md` |
| Error handling | `modules/error-handling.md` |
| Token/style | `architecture/token-pipeline.md` + `features/design-system.md` |
| Icon | `architecture/icon-system.md` |
| Architecture | `architecture/system-design.md` + `architecture/data-flow.md` |

## 9. ABSOLUTE CONSTRAINTS

| # | Law |
|---|---|
| 1 | Never `fetch()` from client components — route through oRPC |
| 2 | Never create data API routes outside oRPC (auth routes excepted) |
| 3 | Never store API data in Zustand |
| 4 | Never skip security middleware on write operations |
| 5 | Never use raw Tailwind color classes (`bg-gray-*`, `text-white`) |
| 6 | Never import from a feature's internal files outside that feature |
| 7 | Never modify provider tree order without reading `providers.md` |
| 8 | Never add `'use client'` unless actually needed |

## 10. RED FLAGS — STOP AND CORRECT

🚩 `useState` + `useEffect` to fetch data → use TanStack Query
🚩 `fetch('/api/...')` inside a component → route through oRPC
🚩 Storing API response in Zustand `set()` → belongs in TanStack Query cache
🚩 `'use client'` on a page that only needs SSR data → remove it
🚩 `bg-gray-*` or `text-white` in a component → use semantic tokens
🚩 `.use(middleware)` AFTER `.route()` → must come BEFORE `.route()`
🚩 Importing from `store/auth-store.ts` directly → use `useAuth()` hook
🚩 No `invalidateQueries` after mutation → data goes stale silently
🚩 New `components/ui/` component without checking if one exists → duplicates
🚩 Modifying provider order without reading `providers.md` → cascading errors

## 11. SELF-CORRECTION

**Mistake:** Stop → find correct pattern in Section 5 or docs → rewrite, don't patch.
**Unsure:** Re-read doc → check `features/users/` → check `coding-rules.md` → if still unclear, ask.
**Before:** State files to read/modify. **After:** State docs updated.

## 12. PROJECT CONTEXT

| Fact | Implication |
|---|---|
| Domain: satellite operations | Users are "Operators", not generic users |
| Current backend: CrudCrud (mock) | Real ATMOS backend replaces it — use `NEXT_PUBLIC_BACKEND_BASE_URL` |
| Auth: Keycloak OAuth2 + UMA | httpOnly cookies, never localStorage |
| Dark mode is primary | Design system is dark-first — don't fight it |
| Tokens from Figma | Don't invent new visual styles without Figma specs |
| HeroHeader commented out | Intentional — waiting for real nav |
| `mission: {}` in router | Placeholder for future mission operations |
| Token typos (`surface-warnig`) | Inherited from Figma — don't fix without Figma fix first |

## 13. QUICK CHEAT SHEET

```
New data entity?          → Section 5.1 start to finish
Modifying UI?             → Read component → existing variants → semantic tokens
Data bug?                 → Server handler or client query/mutation?
Not loading?              → prefetchQuery? HydrateClient? Query key? staleTime?
Not updating?             → mutation onSuccess? invalidateQueries? Correct key?
Auth not working?         → Cookie? getAccessToken()? AuthProvider hydration?
Arcjet blocking locally?  → Switch to 'DRY_RUN' mode in middleware
New feature from scratch? → features/users/ is your template
File location unclear?    → feature-map.json + folder-structure.md first
Wrong doc to read?        → system-overview.md will orient you
Feels architecturally off → Stop, re-read Section 9
```