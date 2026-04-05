# Antaris

> Frontend architecture reference for the **Antaris ATMOS** (Antaris Mission Operations System) platform — a satellite operations suite for scheduling, pre-simulation, telemetry, HWIL, and orbit management.

---

## 🎯 What This Project Does

This is a full-stack enterprise web application that serves as:

1. **Design System Engine** — Houses the Antaris Design System: a Figma-synced component library with 38 UI components and design tokens extracted from the Antaris Figma source-of-truth.
2. **Component Preview Portal** — Interactive preview pages (`/preview/*`) for each UI component where developers can inspect all variants, states, and props.
3. **User Management CRUD** — Production-grade CRUD application (`/users`) demonstrating the oRPC + TanStack Query data flow pattern.
4. **Authentication Reference** — Keycloak-based OAuth 2.0 + UMA authentication with httpOnly cookie session management.
5. **Security Playground** — Arcjet integration for server-side WAF, bot detection, and rate limiting applied as oRPC middleware.

---

## 🛠 Tech Stack

| Layer | Technologies |
|---|---|
| **Framework** | Next.js 16 (App Router), React 19, TypeScript 5 |
| **Styling** | Tailwind CSS v4, CVA, Figma Design Tokens (OKLCH) |
| **UI Components** | Radix UI, ShadCN (radix-mira), Custom Components |
| **API** | oRPC (type-safe RPC), Zod v4 validation |
| **Data Fetching** | TanStack Query v5 (SSR hydration + client cache) |
| **State** | Zustand (UI/auth state), TanStack Query (server state) |
| **Authentication** | Keycloak (OAuth 2.0 + UMA), httpOnly Cookies |
| **Security** | Arcjet (WAF, Bot Detection, Rate Limiting) |
| **Animation** | Framer Motion |
| **Forms** | React Hook Form + Zod Resolvers |
| **Icons** | HugeIcons, Lucide, Tabler, Custom SVG Pipeline |
| **Package Manager** | pnpm |

---

## 📁 Project Structure

```
antaris/
├── app/                    # Next.js App Router (pages, layouts, API routes)
│   ├── (server)/           # oRPC server layer (router, middlewares, RPC handler)
│   ├── api/auth/           # Keycloak OAuth routes (login, logout, callback)
│   ├── users/              # User management pages
│   ├── preview/            # Component preview pages (11 components)
│   └── docs/               # Documentation pages
├── components/ui/          # Design system components (38 components)
├── features/               # Feature modules (home, users)
├── hooks/                  # Global hooks (useAuth, useMobile)
├── lib/                    # Core utilities (oRPC, auth, query, arcjet)
├── providers/              # React providers (Theme, Auth, Query, Modals)
├── store/                  # Zustand stores (auth)
├── styles/                 # Design tokens (Figma → CSS variables → Tailwind)
├── icons/                  # Custom SVG icon system with build pipeline
├── docs/                   # Project documentation (AI-context, architecture, features)
└── public/                 # Static assets
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- pnpm

### Install & Run

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

### Build Scripts

```bash
# Build design tokens (Figma JSON → CSS/TS)
pnpm build:token

# Build custom SVG icons (SVG → React components)
pnpm build:icon
```

---

## 🔑 Environment Variables

Create a `.env` file in the root:

```env
# Arcjet Security
ARCJET_KEY=your_arcjet_key

# Keycloak Authentication
NEXT_PUBLIC_KEYCLOAK_URL=https://id.antaris-staging.cloud/
NEXT_PUBLIC_KEYCLOAK_REALM=ATMOS
NEXT_PUBLIC_KEYCLOAK_CLIENT_ID=ATMOS-UI-CLIENT
NEXT_PUBLIC_KEYCLOAK_RESOURCE_CLIENT=ATMOS-RESOURCE-SERVER

# Backend
NEXT_PUBLIC_BACKEND_BASE_URL=https://app-flatsat.antaris-staging.cloud/api/
NEXT_PUBLIC_WEBSOCKET_BACKEND_BASE_URL=wss://app-flatsat.antaris-staging.cloud/ws/

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 🏗 Architecture Overview

```
Browser → Next.js Server → Keycloak (SSO)
                         → CrudCrud API (Data)
                         → Arcjet Cloud (Security)
```

### Key Patterns

- **Hybrid Hydration** — Server reads auth cookie → passes to client Zustand store → zero-latency token access
- **SSR Data Prefetching** — Server Components prefetch via oRPC → hydrate TanStack Query cache → no loading flicker
- **Isomorphic oRPC Client** — Same interface works on server (direct call) and client (HTTP RPC)
- **Middleware Chain** — Security (WAF → Bot → Rate Limit) runs before any business logic
- **Feature Module Encapsulation** — Each feature is self-contained with components, hooks, types, and barrel exports

### Provider Tree

```
ThemeProvider → AuthProvider → TanstackQueryProvider → ModalsProvider → {pages}
```

---

## 📚 Documentation

All project documentation lives in the `/docs` directory:

| Directory | Purpose |
|---|---|
| `docs/ai-context/` | AI context layer: system overview, tech stack, folder structure, coding rules, feature map, AI rules |
| `docs/architecture/` | System design, data flow diagrams, API architecture |
| `docs/features/` | Feature-level docs: user management, authentication, design system, security, home |
| `docs/modules/` | Module docs: oRPC API, state management, providers |
| `docs/decisions/` | Architectural decisions and documentation sync rules |

---

## 🎨 Design System

The Antaris Design System is synced from Figma and includes:

- **38 UI components** in `components/ui/` (Button, Input, Tabs, Sidebar, etc.)
- **Design tokens** via CSS variables (OKLCH colors, spacing, typography, radii)
- **Token pipeline**: Figma JSON → `styles/build.js` → CSS variables → Tailwind utilities
- **CVA variants** for component size, color, and variant management

### Key Commands
```bash
# Preview components
open http://localhost:3000/preview/button
open http://localhost:3000/preview/input
open http://localhost:3000/preview/tabs
```

---

## 🔐 Authentication Flow

1. User visits protected page → redirected to Keycloak login
2. Keycloak returns OAuth code → exchanged for tokens
3. UMA ticket exchange for fine-grained authorization
4. Tokens stored in httpOnly cookies (7-day expiry)
5. Server reads cookie → hydrates Zustand auth store on every page load
6. Client components access via `useAuth()` hook

---

## 🛡 Security

Arcjet provides application-level security as oRPC middleware:

| Rule | Applied To | Mode |
|---|---|---|
| Shield (WAF) | Create, Update, Delete | LIVE |
| Bot Detection | Create, Update, Delete | LIVE |
| Rate Limiting (1 req/min) | Create, Update | LIVE |

---

## 📄 License

Private — Antaris Inc.
