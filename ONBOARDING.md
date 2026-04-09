# 🚀 Project Onboarding — Antaris

Welcome to the **Antaris** frontend project. This document is your technical entry point to the system.

## 1. What This Project Is

**Antaris** is a specialized mission operations platform for satellite management. This repository serves as the **frontend architecture reference** for the entire platform.

- **Architecture-First**: The system is designed for scalability, security, and high performance.
- **Reference Implementation**: It demonstrates how to build modular, type-safe features in the Antaris ecosystem.
- **Design System Showcase**: It integrates a high-fidelity design system synced directly from Figma.

👉 **Deep Dive**: [docs/ai-context/system-overview.md](docs/ai-context/system-overview.md)

---

## 2. ⚠️ Important: Current State of the Project

> [!IMPORTANT]
> This project is currently under **active development**.
>
> Many existing features (like `/users`, `/home`, and the various `/preview` pages) are built primarily for **architecture validation, testing, and pattern demonstration**. They are **NOT** the final product features.
>
> **When working on this codebase:**
> - Focus on the **architectural patterns**, not the specific business logic of demo features.
> - Treat existing modules as **reference implementations** for how to use the stack.
> - Do not blindly copy-paste logic; understand the *pattern* being demonstrated.

---

## 3. Tech Stack (What & Why)

| Technology | Why We Use It |
|---|---|
| **Next.js 16 (App Router)** | For Server Components (RSC), streaming, and modern routing. |
| **TypeScript** | For end-to-end type safety across the stack. |
| **Tailwind CSS v4** | Utility-first styling with deep design token integration. |
| **TanStack Query v5** | For managing server state, caching, and SSR hydration. |
| **Zustand** | Lightweight global state for UI-only data (auth, modals). |
| **oRPC** | Type-safe, isomorphic RPC layer (No manual `fetch` calls). |
| **Zod** | Schema validation shared between client, server, and forms. |
| **Keycloak** | Enterprise-grade identity management (OAuth 2.0 + UMA). |
| **Arcjet** | Built-in security: WAF, bot detection, and rate limiting. |

👉 **Full Stack Details**: [docs/ai-context/tech-stack.md](docs/ai-context/tech-stack.md)

---

## 4. Project Structure (Where Things Live)

```text
/app         → Pages, layouts, and the (server) oRPC router
/features    → Domain-specific modules (The heart of the app)
/components  → Shared UI primitives (The Design System)
/store       → Global Zustand stores (Auth)
/docs        → Comprehensive technical documentation
/styles      → Design tokens and Tailwind configuration
```

👉 **Folder Map**: [docs/ai-context/folder-structure.md](docs/ai-context/folder-structure.md)

---

## 5. Core Concepts

### Data Flow: Server-to-Client
We use the **Hybrid Hydration Pattern**:
1. **Server**: Data is prefetched using `getQueryClient().prefetchQuery`.
2. **Hydration**: Data is dehydrated and sent to the client via `<HydrateClient>`.
3. **Client**: Components consume data via `useSuspenseQuery` with zero loading flicker.

### State Ownership
- **TanStack Query**: Owns all **Server State** (API data).
- **Zustand**: Owns **UI State** (Auth tokens, Modal states).
- **React Hook Form**: Owns **Local Form State**.

👉 **Data Flow Docs**: [docs/architecture/data-flow.md](docs/architecture/system-design.md)

---

## 6. Authentication System

Antaris utilizes **Keycloak OAuth 2.0 + UMA** with a secure cookie-based session strategy.

- **Secure Storage**: Tokens (`atmos_access_token`) are stored in `httpOnly` cookies.
- **Hydration**: The `AuthProvider` bridges the server-side cookie to the client-side Zustand store during the initial render (Zero-latency auth).
- **Hooks**:
    - **Client**: Use `useAuth()` to access user info and isAuthenticated status.
    - **Server**: Use `getAccessToken()` to retrieve the token for server-side API calls.
- **Protection**: Routes are protected at the middleware level in `proxy.ts`.

👉 **Auth Deep Dive**: [docs/features/authentication.md](docs/features/authentication.md)

---

## 7. How to Add a New Feature

### Option A: Using AI (Recommended)
Our AI workflows are designed to enforce architectural integrity.
1. Read the relevant `/docs` first.
2. Provide the AI with your requirements and refer to `docs/ai-context/ai-rules.md`.
3. Let the AI generate the boilerplate following the `features/users/` pattern.

### Option B: Manual Development
1. **Schema**: Define your domain logic with Zod in `features/your-feature/types/`.
2. **oRPC**: Create routes in `app/(server)/router/` and register them.
3. **UI**: Build components in `features/your-feature/components/`.
4. **State**: Add a feature-local Zustand store in `features/your-feature/hooks/` if needed.
5. **Barrel**: Export the public API via `features/your-feature/index.ts`.

⚠️ **Reference**: Always look at `features/users/` as the "Gold Standard" implementation.

---

## 8. Design System Rules

> [!WARNING]
> Never use raw Tailwind color classes like `bg-blue-500` or `text-gray-900`.

- **Semantic Tokens ONLY**: Use tokens like `bg-surface-primary`, `text-text-secondary`, or `border-stroke-primary`.
- **CVA Pattern**: Use `class-variance-authority` for all component variants.
- **Dark Mode First**: The system is designed dark-first; ensure your components work in the primary theme.

👉 **Tokens & Styling**: [docs/features/design-system.md](docs/features/design-system.md)

---

## 9. Component Guidelines

- **Primitive UI**: Place in `components/ui/`. These should be pure and reusable.
- **Feature Components**: Place in `features/*/components/`. These contain domain logic.
- **Shared Layouts**: Place in `components/` if they span multiple features.

👉 **Component System**: [docs/architecture/component-system.md](docs/architecture/component-system.md)

---

## 10. Data Fetching Rules

- **Strict oRPC**: Peer-to-peer `fetch()` inside components is **forbidden**. All data must flow through oRPC.
- **SSR Prefetch**: Always prefetch data in Server Components to ensure SEO and performance.
- **Cache Management**: Use `invalidateQueries` after mutations to keep the UI in sync.

👉 **oRPC Client**: [docs/modules/orpc-client-tanstack.md](docs/modules/orpc-client-tanstack.md)

---

## 11. API Rules

- All API routes live in `app/(server)/router/`.
- **Middleware**: Write operations (POST/PUT/DELETE) **must** use the Arcjet security middleware chain.
- **Validation**: Every route must have Zod `.input()` and `.output()` definitions.

👉 **oRPC Server**: [docs/modules/orpc-server.md](docs/modules/orpc-server.md)

---

## 12. State Management Rules

- **Zustand**: Used only for UI state (e.g., `isModalOpen`) and global Auth.
- **No API Data in Zustand**: Never store fetched data in Zustand; it belongs in the TanStack Query cache.
- **Local State**: Use standard `useState` for simple, component-level UI state.

👉 **State Docs**: [docs/modules/state-management.md](docs/modules/state-management.md)

---

## 13. Absolute Do’s & Don’ts

- ❌ **DON'T** use `fetch()` directly on the client.
- ❌ **DON'T** use raw Tailwind colors (`bg-red-500`).
- ❌ **DON'T** store API responses in Zustand.
- ❌ **DON'T** skip Arcjet security middleware for mutations.
- ❌ **DON'T** import from a feature's internal folders directly from another feature (Use the barrel export).
- ✅ **DO** use path aliases (`@/features/...`).
- ✅ **DO** write comprehensive documentation for new features.
- ✅ **DO** prefetch data on the server whenever possible.

---

## 14. Where to Go Next

1. **Browse the Docs**: Explore the `/docs` folder to understand the "Why" behind the "How".
2. **Study the Reference**: Open `features/users/` and trace the data from the Zod schema to the UI.
3. **Check the Rules**: Read `docs/ai-context/ai-rules.md` for execution guidelines.

Welcome aboard, Operator. 🛰️
