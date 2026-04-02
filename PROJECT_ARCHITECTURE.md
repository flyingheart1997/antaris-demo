# Project Architecture: Antaris Demo

This document outlines the professional, module-based architecture of the Antaris application. This structure is designed for high scalability, maintainability, and clear separation of concerns.

---

## 1. Core Architectural Principle: Module-Based (Feature-Oriented)

The project follows a **Feature-Oriented Architecture**. Instead of grouping files by their technical type (e.g., all hooks in one folder, all components in another), we group them by their **Business Domain** (e.g., Users, Home, Payments).

### Why are we doing this?
1.  **High Cohesion**: Related code is kept together. If you are working on "Users," you don't need to hunt for its hooks or types in the root directory.
2.  **Low Coupling**: Features are encapsulated. Changing the internal structure of the `Users` feature won't break the rest of the application.
3.  **Scalability**: Adding a new feature is as simple as creating a new folder in `features/` without cluttering global directories.
4.  **Developer Experience**: New developers can understand a single feature deeply without needing to know the entire codebase.

---

## 2. Directory Structure

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

---

## 3. The "Expert Promotion" Strategy

To keep the architecture clean, we follow a strict rule for moving code between the **Feature Layer** and the **Shared Layer**:

1.  **Start Local**: Every new hook, type, or component starts its life inside a specific feature folder.
2.  **Stay Encapsulated**: Other features should only import from a feature's `index.ts` file.
3.  **Promote to Shared**: If a piece of logic (e.g., a "UserCard" or a "useUser" hook) starts being used by **more than one feature**, it is "promoted" to the global `components/` or `hooks/` directories.

This prevents the global folders from becoming a "junk drawer" of unused code.

---

## 4. Key Systems

### Design Token Pipeline (`styles/`)
Uses a "CSS-First" architecture. Tokens from Figma are automatically transformed into CSS variables and mapped to Tailwind 4 via `antaris-theme.css`.

### Icon Automation (`icons/`)
Raw SVGs are automatically optimized and transformed into React components with a single build command: `pnpm build:icon`.

### Data Layer (ORPC + TanStack Query)
A fully typed RPC layer ensures that the frontend and backend are always in sync. TanStack Query handles the state, caching, and background synchronization.

---

## 5. Development Workflow

-   **Adding a Feature**: Create `features/my-new-feature/` with the standard sub-folders.
-   **Updating Styles**: Modify `styles/figma/*.json` and run `node styles/build.js`.
-   **Adding Icons**: Drop SVGs into `icons/svg/` and run `node icons/build.js`.
