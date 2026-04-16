# Tech Stack — Antaris

## Core Framework

| Technology | Version | Role |
|---|---|---|
| **Next.js** | 16.1.1 | Full-stack React framework (App Router) |
| **React** | 19.2.3 | UI library (with Server Components) |
| **TypeScript** | ^5 | Type safety |

## Styling & Design System

| Technology | Version | Role |
|---|---|---|
| **Tailwind CSS** | v4 | Utility-first CSS framework |
| **tailwindcss-animate** | ^1.0.7 | Animation utilities for Tailwind |
| **tw-animate-css** | ^1.4.0 | CSS animation integration |
| **class-variance-authority (CVA)** | ^0.7.1 | Component variant management |
| **clsx** | ^2.1.1 | Conditional classname utility |
| **tailwind-merge** | ^3.4.0 | Tailwind class deduplication |
| **Style Dictionary** | ^4 | Design token build pipeline (Figma → CSS → Tailwind) |

## UI Component Libraries

| Technology | Version | Role |
|---|---|---|
| **Radix UI** | Various | Headless accessible primitives (Dialog, Select, Tabs, etc.) |
| **ShadCN UI** | ^3.6.3 (CLI) | Component scaffolding |
| **@base-ui/react** | ^1.0.0 | Base UI primitives |

### Radix UI Packages Used
- `@radix-ui/react-accordion`, `@radix-ui/react-alert-dialog`
- `@radix-ui/react-avatar`, `@radix-ui/react-checkbox`
- `@radix-ui/react-dialog`, `@radix-ui/react-dropdown-menu`
- `@radix-ui/react-label`, `@radix-ui/react-popover`
- `@radix-ui/react-radio-group`, `@radix-ui/react-scroll-area`
- `@radix-ui/react-select`, `@radix-ui/react-separator`
- `@radix-ui/react-slot`, `@radix-ui/react-tabs`
- `@radix-ui/react-tooltip`

## Data & API Layer

| Technology | Version | Role |
|---|---|---|
| **@trpc/server** | ^11 | Type-safe RPC server (procedure definitions, middleware) |
| **@trpc/client** | ^11 | Type-safe RPC client (HTTP batch link + direct-call link) |
| **@tanstack/react-query** | ^5.90.16 | Server-state management & caching |
| **@tanstack/react-query-devtools** | ^5.91.2 | DevTools for debugging queries |
| **Zod** | ^4.3.5 | Schema validation (shared client/server) |

## Real-Time

| Technology | Role |
|---|---|
| **Native WebSocket API** | Real-time telemetry and mission data (via `useWebSocket` hook) |
| **WebSocketManager** (`lib/websocket.ts`) | Reconnection, auth, typed messaging |

## State Management

| Technology | Version | Role |
|---|---|---|
| **Zustand** | ^5.0.9 | Lightweight global state (auth store, user modal store) |

## Forms

| Technology | Version | Role |
|---|---|---|
| **react-hook-form** | ^7.71.0 | Form state management |
| **@hookform/resolvers** | ^5.2.2 | Zod resolver for react-hook-form |

## Authentication

| Technology | Role |
|---|---|
| **Keycloak** | OAuth 2.0 / OpenID Connect identity provider |
| **UMA (User-Managed Access)** | Fine-grained authorization |
| **httpOnly Cookies** | Secure session storage |
| **middleware.ts** | Silent token refresh on every request |

## Security

| Technology | Version | Role |
|---|---|---|
| **@arcjet/next** | 1.0.0-beta.17 | Application security (WAF, bot detection) |
| **@arcjet/inspect** | 1.0.0-beta.17 | Security event inspection |

## Animation

| Technology | Version | Role |
|---|---|---|
| **framer-motion** | ^12.38.0 | Advanced animations |
| **motion** | ^12.25.0 | Lightweight motion library |

## Icons

| Technology | Version | Role |
|---|---|---|
| **lucide-react** | ^0.562.0 | General UI icons (primary icon library) |
| **@tabler/icons-react** | ^3.41.1 | Available, minimal usage |
| **Custom SVG Icons** | via `@svgr/cli` | Domain-specific icons (satellite, subsystems) from `icons/svg/` |

## UI Utilities

| Technology | Version | Role |
|---|---|---|
| **sonner** | ^2.0.7 | Toast notifications |
| **next-themes** | ^0.4.6 | Dark/light theme switching |
| **react-resizable-panels** | ^4.8.0 | Resizable panel layouts |
| **react-markdown** | ^10.1.0 | Markdown rendering |

## Build & Dev Tools

| Technology | Version | Role |
|---|---|---|
| **pnpm** | (workspace) | Package manager |
| **ESLint** | ^9 | Linting |
| **eslint-config-next** | 16.1.1 | Next.js ESLint preset |
| **@tanstack/eslint-plugin-query** | ^5.91.2 | TanStack Query linting |
| **PostCSS** | via `@tailwindcss/postcss` | CSS processing |
| **svgo** | ^4.0.1 | SVG optimization |
| **@svgr/cli** | ^8.1.0 | SVG → React component conversion |

## Fonts

| Font | Usage |
|---|---|
| **Space Grotesk** | Heading font (from Figma tokens) |
| **Montserrat** | Body font (from Figma tokens) |
| **Fira Mono** | Code font (from Figma tokens) |

## External Services

| Service | Purpose |
|---|---|
| **Keycloak (id.antaris-staging.cloud)** | Identity & access management |
| **CrudCrud API** | REST API for user CRUD (temporary/demo) |
| **ATMOS Backend (app-flatsat.antaris-staging.cloud)** | Production REST (`https://`) + WebSocket (`wss://`) |
| **DiceBear** | Avatar generation |
| **Arcjet** | Application security SaaS |

## Environment Variables

| Variable | Purpose |
|---|---|
| `ARCJET_KEY` | Arcjet API key |
| `NEXT_PUBLIC_KEYCLOAK_URL` | Keycloak base URL |
| `NEXT_PUBLIC_KEYCLOAK_REALM` | Keycloak realm (ATMOS) |
| `NEXT_PUBLIC_KEYCLOAK_CLIENT_ID` | OAuth client ID |
| `NEXT_PUBLIC_KEYCLOAK_RESOURCE_CLIENT` | UMA resource server |
| `NEXT_PUBLIC_BACKEND_BASE_URL` | Backend REST API URL (`https://`) |
| `NEXT_PUBLIC_WEBSOCKET_BACKEND_BASE_URL` | WebSocket URL (`wss://`) — used by `lib/websocket.ts` |
| `NEXT_PUBLIC_APP_URL` | Application URL |
