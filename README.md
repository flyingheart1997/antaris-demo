# Antaris Demo: Modern SaaS Dashboard

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app). It features a modern, module-based architecture designed for high scalability and professional-grade performance.

---

## 🏛️ Project Architecture

This application follows a **Feature-Oriented Architecture**. Instead of grouping files by their technical type (e.g., all hooks in one folder), we group them by their **Business Domain** (e.g., Users, Home).

### 1. File Structure
```text
.
├── app/                  # NEXT.JS ROUTING (Pages & Layouts only)
├── features/             # BUSINESS MODULES (The heart of the app)
│   ├── [feature-name]/
│   │   ├── components/   # UI specific to this feature
│   │   ├── hooks/        # Logic specific to this feature
│   │   ├── types/        # Types & Schemas specific to this feature
│   │   └── index.ts      # PUBLIC API (The gatekeeper)
├── components/           # SHARED UI (Stateless Design System atoms)
├── hooks/                # SHARED HOOKS (Generic logic like useDebounce)
├── lib/                  # SHARED LIBRARIES (API clients, complex configs)
├── utils/                # SHARED UTILITIES (Pure functions like formatData)
├── styles/               # DESIGN SYSTEM (Variables & Tailwind mapping)
└── icons/                # AUTOMATED ICON LIBRARY
```

### 2. The "Expert Promotion" Strategy
We follow a strict rule for moving code between the **Feature Layer** and the **Shared Layer**:
-   **Start Local**: Every new hook, type, or component starts its life inside a specific feature folder.
-   **Stay Encapsulated**: Other features should only import from a feature's `index.ts` file.
-   **Promote to Shared**: If a piece of logic starts being used by **more than one feature**, it is "promoted" to the global `components/` or `hooks/` directories.

---

## 🚀 Key Systems

### Design Token Pipeline (`styles/`)
Uses a **CSS-First** architecture. Tokens from Figma are automatically transformed into CSS variables and mapped to Tailwind 4 via `antaris-theme.css`.

### Icon Automation (`icons/`)
Raw SVGs are automatically optimized and transformed into React components with a single build command: `pnpm build:icon`.

### Data Layer (ORPC + TanStack Query)
A fully typed RPC layer ensures that the frontend and backend are always in sync. TanStack Query handles the state, caching, and background synchronization.

---

## 🛠️ Getting Started

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Development Workflow
-   **Adding a Feature**: Create `features/my-new-feature/` with the standard sub-folders.
-   **Updating Styles**: Modify `styles/figma/*.json` and run `node styles/build.js`.
-   **Adding Icons**: Drop SVGs into `icons/svg/` and run `node icons/build.js`.

---

## 🌐 Learn More

To learn more about the stack, take a look at the following resources:
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [TanStack Query](https://tanstack.com/query/latest) - powerful asynchronous state management.
- [ORPC Documentation](https://orpc.sh) - typed RPC for Next.js.
