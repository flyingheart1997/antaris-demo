# Antaris ATMOS — Frontend Architecture Reference

> Frontend architecture reference for the **Antaris ATMOS** (Antaris Mission Operations System) platform — a satellite operations suite for scheduling, pre-simulation, telemetry, HWIL, and orbit management.

---

## What This Project Does

A full-stack enterprise web application that serves as:

1. **Design System Engine** — 38 UI components synced from Figma with OKLCH design tokens, CVA variants, and Radix primitives
2. **Component Documentation Portal** — `/component-docs` with live previews, props tables, code examples, and 20 preview pages
3. **User Management CRUD** — Production-grade CRUD at `/users` demonstrating the oRPC + TanStack Query + Zustand data flow
4. **Authentication Reference** — Keycloak OAuth 2.0 + UMA with httpOnly cookie session management
5. **Security Playground** — Arcjet WAF, bot detection, and rate limiting as oRPC middleware
6. **53 Custom Icons** — Satellite-domain SVG icons with automated SVGR build pipeline

---

## Tech Stack

| Layer | Technologies |
|---|---|
| **Framework** | Next.js 16 (App Router), React 19, TypeScript 5 |
| **Styling** | Tailwind CSS v4, CVA (Class Variance Authority), Figma Design Tokens (OKLCH) |
| **UI Components** | Radix UI primitives, Custom CVA components |
| **API** | oRPC (type-safe isomorphic RPC), Zod v4 validation |
| **Data Fetching** | TanStack Query v5 (SSR hydration + client cache) |
| **State** | Zustand v5 (UI/auth state), TanStack Query (server state) |
| **Authentication** | Keycloak (OAuth 2.0 + UMA), httpOnly Cookies |
| **Security** | Arcjet (WAF, Bot Detection, Rate Limiting) |
| **Animation** | Framer Motion |
| **Forms** | React Hook Form + Zod Resolvers (shared schema: server + client) |
| **Icons** | 53 Custom SVGs + Lucide + HugeIcons + Tabler |
| **Package Manager** | pnpm |

---

## Project Structure

```
antaris/
├── app/                        # Next.js App Router
│   ├── (server)/               #   oRPC server (router, middlewares, RPC handler)
│   │   ├── router/             #     Route handlers (user.ts, index.ts)
│   │   ├── middlewares/        #     Arcjet security (standard.ts, ratelimit.ts)
│   │   └── rpc/                #     HTTP catch-all handler
│   ├── api/auth/               #   Keycloak OAuth routes (login, logout, callback)
│   ├── users/                  #   User management pages (list + detail)
│   ├── preview/                #   Component preview pages (20 components)
│   ├── component-docs/         #   Documentation portal (sidebar + detail pages)
│   └── layout.tsx              #   Root layout (providers, fonts, metadata)
│
├── components/ui/              # Design system (38 components)
│   ├── button.tsx              #   CVA: 5 variants x 5 colors x 4 sizes
│   ├── sidebar/                #   Multi-file composite component
│   └── ...                     #   accordion, dialog, drawer, input, tabs, etc.
│
├── features/                   # Feature modules (encapsulated)
│   ├── home/                   #   Landing page (hero, CTA)
│   └── users/                  #   User CRUD (list, card, form, modal, store)
│       ├── components/         #     UI components
│       ├── hooks/              #     useUserModal (Zustand)
│       ├── types/              #     Zod schemas (shared server + client)
│       └── index.ts            #     Barrel exports
│
├── hooks/                      # Global hooks (useAuth, useMobile)
├── lib/                        # Core utilities
│   ├── orpc.ts                 #   Isomorphic oRPC client
│   ├── orpc.server.ts          #   Server-side oRPC bootstrap (globalThis.$client)
│   ├── auth/                   #   Keycloak helpers (session, tokens)
│   ├── query/                  #   TanStack Query (getQueryClient, HydrateClient)
│   └── arcjet.ts               #   Arcjet client instance
│
├── providers/                  # React providers (load-bearing order)
│   ├── theme-provider.tsx      #   next-themes
│   ├── auth-provider.tsx       #   Zustand auth hydration
│   ├── tanstack-query.tsx      #   QueryClient + devtools
│   └── modals-provider.tsx     #   Global modal instances
│
├── store/                      # Zustand stores
│   └── auth-store.ts           #   Token, user, isAuthenticated
│
├── styles/                     # Design token pipeline
│   ├── figma/                  #   Source: global.tokens.json, semantic.tokens.json
│   ├── src/                    #   Generated: index.css, antaris-theme.css, tokens.generated.ts
│   └── build.js                #   Figma JSON -> OKLCH -> CSS vars -> Tailwind
│
├── icons/                      # Custom icon system (53 icons)
│   ├── svg/                    #   Source SVGs
│   ├── src/                    #   Generated React components
│   └── build.js                #   SVG -> SVGR -> TypeScript components
│
├── docs/                       # Project documentation (29 files)
└── .agents/rules/              # AI agent operational rules
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm

### Install & Run

```bash
pnpm install          # Install dependencies
pnpm dev              # Start dev server at http://localhost:3000
pnpm build            # Production build
pnpm start            # Start production server
```

### Build Pipelines

```bash
pnpm build:token      # Figma JSON -> CSS variables + Tailwind theme + TypeScript tokens
pnpm build:icon       # SVG files -> typed React components with currentColor
```

---

## Environment Variables

Create a `.env` file in the root:

```env
# Arcjet Security (required)
ARCJET_KEY=your_arcjet_key

# Keycloak Authentication (required)
NEXT_PUBLIC_KEYCLOAK_URL=https://id.antaris-staging.cloud/
NEXT_PUBLIC_KEYCLOAK_REALM=ATMOS
NEXT_PUBLIC_KEYCLOAK_CLIENT_ID=ATMOS-UI-CLIENT
NEXT_PUBLIC_KEYCLOAK_RESOURCE_CLIENT=ATMOS-RESOURCE-SERVER

# Backend API (required)
NEXT_PUBLIC_BACKEND_BASE_URL=https://app-flatsat.antaris-staging.cloud/api/
NEXT_PUBLIC_WEBSOCKET_BACKEND_BASE_URL=wss://app-flatsat.antaris-staging.cloud/ws/

# Application (required)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

See `docs/setup/environment.md` for detailed descriptions of each variable.

---

## Architecture

### Five-Layer Stack

```
LAYER 5 — PRESENTATION      React (RSC + Client), Zustand, TanStack Query, Tailwind + CVA
LAYER 4 — SSR / HYDRATION   Server prefetch -> dehydrate -> HydrateClient | AuthProvider -> Zustand
LAYER 3 — API / RPC         oRPC router + handlers -> Zod validation -> business logic
LAYER 2 — SECURITY          Arcjet: WAF + bot detection -> rate limiting -> handler
LAYER 1 — AUTH / SESSION     Keycloak OAuth2 + UMA -> httpOnly cookies -> Zustand
```

### Key Architectural Patterns

| Pattern | What It Does |
|---|---|
| **Isomorphic oRPC Client** | Server calls handlers directly (no HTTP). Client sends HTTP via RPCLink. Same interface, same query keys — enables seamless SSR hydration |
| **Hybrid Auth Hydration** | Server reads httpOnly cookie -> passes token to AuthProvider -> synchronous Zustand hydration (no useEffect, zero-latency) |
| **SSR Data Prefetching** | Server Components `prefetchQuery` via oRPC -> `HydrateClient` dehydrates to HTML -> client `useSuspenseQuery` reads from cache (no loading flicker) |
| **Security Middleware Chain** | `base -> .use(WAF+bot) -> .use(rateLimit) -> .route() -> .handler()` — middleware runs before any business logic |
| **Feature Encapsulation** | Each feature in `features/` is self-contained: components, hooks, types, barrel exports. No cross-feature internal imports |
| **Dual State Model** | Server data in TanStack Query. UI/auth state in Zustand. Never mixed |
| **Shared Zod Schemas** | Same schema validates both oRPC `.input()` on server and React Hook Form `zodResolver` on client |

### Provider Tree (order is load-bearing)

```
ThemeProvider            <- dark/light mode (prevents flash)
  AuthProvider           <- Zustand auth hydration from server cookie
    TanstackQueryProvider  <- QueryClient for all data fetching
      ModalsProvider       <- Global modal instances (always mounted)
        TooltipProvider    <- Radix tooltip context
          {children}
```

---

## Application Routes

| Route | Description |
|---|---|
| `/` | Landing page with hero section |
| `/users` | User management — list with DataGrid, SSR prefetched |
| `/users/[userId]` | User detail page with profile view |
| `/component-docs` | Component documentation portal — sidebar + cards grid |
| `/component-docs/[slug]` | Individual component docs — preview, variants, props, code |
| `/preview/[slug]` | Isolated component previews (20 pages, used in iframes) |
| `/api/auth/login` | Keycloak OAuth login redirect |
| `/api/auth/callback` | OAuth callback + token exchange |
| `/api/auth/logout` | Session cleanup + Keycloak logout |

---

## Design System

### Token Pipeline

```
Figma Design System
    |  Export (JSON)
    v
styles/figma/global.tokens.json + semantic.tokens.json
    |  pnpm build:token
    v
styles/src/index.css          <- :root { --color-text-primary: oklch(...); }
styles/src/antaris-theme.css   <- @theme { --color-text-primary: var(...); }
styles/src/tokens.generated.ts <- export const tokens = { ... } as const
    |
    v
Tailwind v4 utilities: bg-surface-primary, text-text-primary, border-stroke-selected, ...
```

### Semantic Token Categories

| Category | Examples |
|---|---|
| **Surface** | `bg-surface-bg`, `bg-surface-primary`, `bg-surface-hover`, `bg-surface-selected` |
| **Text** | `text-text-primary`, `text-text-secondary`, `text-text-disabled` |
| **Stroke** | `border-stroke-primary`, `border-stroke-selected`, `border-stroke-error` |
| **Intent** | `text-text-info`, `bg-surface-warning`, `text-text-error` |
| **Palette** | `bg-green-9` (brand), `bg-red-9` (destructive) — use sparingly |

### Component Architecture

- **38 components** in `components/ui/` built on Radix UI + CVA
- **CVA (Class Variance Authority)** manages variant/size/color combinations
- **`cn()` utility** for conditional className merging
- All components use **semantic tokens only** — no raw Tailwind color classes

---

## Icon System

- **53 custom SVG icons** for satellite-domain concepts (ADCS, payload, thruster, ground station, etc.)
- **Automated pipeline**: `icons/svg/*.svg` -> `pnpm build:icon` -> typed React components at `icons/src/`
- All icons use `currentColor` fill — color controlled via `text-*` Tailwind classes
- Import from `@/icons`: `import { SatelliteIcon, MissionIcon } from '@/icons'`

---

## oRPC API

### Current Routes

| Route | Method | Middleware | Purpose |
|---|---|---|---|
| `/rpc/users` | GET | None | List all users |
| `/rpc/user/{userId}` | GET | None | Get single user |
| `/rpc/user` | POST | WAF + Bot + Rate Limit | Create user |
| `/rpc/user/{userId}` | PUT | WAF + Bot + Rate Limit | Update user |
| `/rpc/user/{userId}` | DELETE | WAF + Bot | Delete user |

### Data Flow: Server Component (Read)

```
RSC page.tsx
  -> getQueryClient()              (React cache() — one per request)
  -> prefetchQuery(orpc.user.list) (calls handler directly — no HTTP)
  -> <HydrateClient>               (serializes cache to HTML)
  -> <Suspense>
  -> ClientComponent               (useSuspenseQuery reads from hydrated cache)
```

### Data Flow: Client Component (Write)

```
Form submit
  -> useMutation(orpc.user.create)
  -> RPCLink -> fetch POST /rpc/user
  -> Arcjet middleware (WAF -> bot -> rate limit)
  -> handler (validates input, calls external API)
  -> onSuccess: invalidateQueries + toast
```

---

## Authentication

1. User visits protected page -> redirected to Keycloak login
2. Keycloak returns OAuth code -> exchanged for access + refresh tokens
3. UMA ticket exchange for fine-grained authorization
4. Tokens stored in httpOnly cookies (7-day expiry)
5. On every page load: server reads cookie -> passes token to `AuthProvider` -> synchronous Zustand hydration
6. Client components: `const { token, user, isAuthenticated } = useAuth()`

---

## Security (Arcjet)

| Rule | Applied To | Mode |
|---|---|---|
| Shield (WAF) | POST, PUT, DELETE routes | LIVE |
| Bot Detection | POST, PUT, DELETE routes | LIVE |
| Rate Limiting (1 req/min, sliding window) | POST, PUT routes | LIVE |

Middleware is applied via `.use()` in the oRPC chain — runs before `.route()` and `.handler()`.

---

## Error Handling

Four-level error architecture:

| Level | Catches | Shows |
|---|---|---|
| **Level 1** — oRPC Handler | Network failures, external API errors | Typed `ORPCError` (throws to client) |
| **Level 2** — Client Component | `useQuery` failures | Inline `<ErrorComponent />` |
| **Level 3** — DataGrid Suspense | `success: false` response | Throws to error boundary |
| **Level 4** — Global Boundary | Unhandled React errors | `app/error.tsx` with `ErrorView` |

Mutations show errors as non-blocking toast notifications via Sonner.

---

## Documentation System

29 documentation files across 7 directories:

### AI Context (`docs/ai-context/`)

| File | Purpose |
|---|---|
| `system-overview.md` | What this project is and why it exists |
| `folder-structure.md` | Where every file lives |
| `coding-rules.md` | Patterns to follow for every line of code |
| `tech-stack.md` | Available libraries — check before adding new ones |
| `feature-map.json` | Feature -> file mapping (source of truth for structure) |
| `ai-rules.md` | AI operating protocol — pre-flight, playbooks, constraints |

### Architecture (`docs/architecture/`)

| File | Purpose |
|---|---|
| `system-design.md` | Layer-by-layer architecture, provider tree |
| `data-flow.md` | Sequence diagrams for read, write, auth, state flows |
| `api-architecture.md` | All oRPC routes, schemas, security middleware |
| `component-system.md` | CVA patterns, Radix layer, composite components |
| `icon-system.md` | 53 custom icons, build pipeline, usage guide |
| `token-pipeline.md` | Figma -> OKLCH -> CSS vars -> Tailwind v4 |
| `design-system.md` | Visual system architecture overview |

### Features (`docs/features/`)

| File | Purpose |
|---|---|
| `user-management.md` | Users CRUD — the reference implementation |
| `authentication.md` | Keycloak + UMA + httpOnly cookies |
| `security.md` | Arcjet WAF + bot detection + rate limiting |
| `design-system.md` | Token reference, component list, known issues |
| `home.md` | Landing page feature |
| `component-docs.md` | Component documentation portal feature |

### Modules (`docs/modules/`)

| File | Purpose |
|---|---|
| `orpc-server.md` | Server-side oRPC: router, handlers, Arcjet wiring |
| `orpc-client-tanstack.md` | Client: queries, mutations, SSR hydration patterns |
| `orpc-api.md` | High-level oRPC overview + how to add routes |
| `state-management.md` | Zustand stores deep dive (auth + modal stores) |
| `providers.md` | Provider tree, ordering rationale |
| `error-handling.md` | 4-level error architecture |

### Setup (`docs/setup/`)

| File | Purpose |
|---|---|
| `environment.md` | All .env variables with descriptions |
| `onboarding.md` | Developer getting started guide |

### Other

| File | Purpose |
|---|---|
| `docs/decisions/documentation-sync-rules.md` | When to update which doc |
| `docs/ai-workflows/run-task.md` | AI task execution workflow |
| `.agents/rules/agent-rules.md` | Advanced AI agent operational intelligence |

---

## AI Agent Support

This project includes comprehensive AI agent support:

- **`docs/ai-context/ai-rules.md`** — Operating protocol with mandatory pre-flight checklist, 5 task playbooks (new feature, bug fix, UI change, API change, state change), absolute constraints, and documentation sync matrix
- **`.agents/rules/agent-rules.md`** — Advanced operational intelligence with mental model, implementation patterns, decision framework, quality gates, and quick cheat sheet
- **`docs/ai-context/feature-map.json`** — Machine-readable feature-to-file mapping
- **29 documentation files** — Complete coverage of every layer, pattern, and convention

Any AI agent can orient itself by reading `docs/ai-context/system-overview.md` first.

---

## License

Private — Antaris Inc.
