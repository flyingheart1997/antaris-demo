# Folder Structure — Antaris

## Root-Level Overview

```
antaris/
├── app/                    # Next.js App Router (pages, layouts, API routes)
├── components/             # Shared UI components (design system)
├── features/               # Feature-based modules (home, users, catalog)
├── hooks/                  # Global custom React hooks
├── icons/                  # Custom SVG icon system
├── lib/                    # Core utilities and configurations
├── providers/              # React context providers (global wrappers)
├── public/                 # Static assets
├── store/                  # Zustand state stores
├── styles/                 # Design tokens (Figma-synced CSS variables)
├── utils/                  # General-purpose utility functions (currently empty)
├── docs/                   # Project documentation
│   ├── ai-context/         # AI context layer: system overview, rules, feature map
│   ├── architecture/       # System design, data flow, API, component system, token pipeline
│   ├── features/           # Feature docs: users, auth, design system, home, security, catalog
│   ├── modules/            # Module docs: oRPC server, oRPC client, state management, providers
│   ├── decisions/          # Architectural decisions and documentation sync rules
│   ├── setup/              # Developer setup: environment variables, onboarding guide
│   └── ai-workflows/       # AI task execution workflows
├── .env                    # Environment variables
├── components.json         # ShadCN UI configuration
├── next.config.ts          # Next.js configuration
├── tailwind.config.ts      # Tailwind CSS v4 configuration
├── tsconfig.json           # TypeScript configuration
├── proxy.ts                # Middleware proxy for auth protection
├── package.json            # Dependencies and scripts
└── pnpm-workspace.yaml     # pnpm workspace configuration
```

---

## Detailed Breakdown

### `app/` — Next.js App Router

The App Router handles page routing, layouts, and API routes.

```
app/
├── layout.tsx              # Root layout: providers, fonts, global CSS
├── page.tsx                # Home page → renders HeroSection
├── globals.css             # Global styles: Tailwind + Antaris design tokens
├── favicon.ico             # Favicon
│
├── (server)/               # Server-side oRPC layer (Route Group — NOT a URL segment)
│   ├── router/             # oRPC route definitions
│   │   ├── index.ts        # Router registry (user, mission namespaces)
│   │   └── user.ts         # User CRUD procedures (list, get, create, update, delete)
│   ├── middlewares/         # oRPC middleware chain
│   │   ├── base.ts         # Base middleware: context types + error definitions
│   │   └── arcjet/         # Security middleware
│   │       ├── standard.ts # Shield + bot detection middleware
│   │       └── ratelimit.ts# Sliding window rate limiter
│   └── rpc/                # oRPC HTTP handler
│       └── [[...rest]]/
│           └── route.ts    # Catch-all route handler: maps HTTP → oRPC
│
├── api/                    # Next.js API routes
│   └── auth/
│       └── [...route]/
│           └── route.ts    # Auth endpoints: login, logout, callback (Keycloak OAuth)
│
├── users/                  # User management pages
│   ├── layout.tsx          # Users layout (BackgroundProvider)
│   ├── page.tsx            # Users list page (SSR prefetch + HydrateClient)
│   └── [userId]/           # Dynamic user detail page
│
├── catalog/                # Satellite component catalog page
│   ├── layout.tsx          # Catalog page layout (full-screen, no scroll)
│   └── page.tsx            # Catalog grid page (uses CatalogCard + mock data, client)
│
├── preview/                # Component preview/showcase pages (used as iframes in component-docs)
│   ├── button/             # Button component preview
│   ├── card/               # Card component preview
│   ├── checkbox/           # Checkbox component preview
│   ├── custom-text/        # Text component preview
│   ├── dialog/             # Dialog component preview
│   ├── drawer/             # Drawer component preview
│   ├── dropdown-menu/      # DropdownMenu component preview
│   ├── icon-button/        # IconButton component preview
│   ├── input/              # Input component preview
│   ├── input-group/        # InputGroup component preview
│   ├── radio/              # RadioGroup component preview
│   ├── select/             # Select component preview
│   ├── separator-test/     # Separator component preview
│   ├── sidebar-test/       # Sidebar component preview
│   ├── skeleton/           # Skeleton/Spinner component preview
│   ├── tabs/               # Tabs component preview
│   ├── textarea/           # Textarea component preview
│   └── tooltip/            # Tooltip component preview
│
└── docs/                   # Documentation pages
    ├── about/
    ├── arcjet/
    ├── input-area/
    ├── orpc-tanstack-query/
    └── tech-stacks/
```

### `components/` — Shared UI Components

The design system component library. All reusable UI primitives live here.

```
components/
├── error.tsx               # Global error display component
├── loader.tsx              # Global loading spinner
└── ui/                     # UI primitives (38 components)
    ├── accordion.tsx        # Collapsible content sections
    ├── alert-dialog.tsx     # Confirmation dialogs
    ├── animated-group.tsx   # Staggered animation containers
    ├── avatar.tsx           # User avatars with status
    ├── badge.tsx            # Status/label badges
    ├── button.tsx           # Primary button (CVA variants: size, color, variant)
    ├── card/                # Content cards (folder — selected state mask)
    │   ├── index.tsx        #   Card component (CVA variants + selected prop)
    │   ├── card-mask.tsx    #   Selected-state SVG overlay (React, unique gradient IDs)
    │   └── card-mask.svg    #   Source SVG from Figma (node 2895:297)
    ├── checkbox.tsx         # Checkbox inputs
    ├── collapsible.tsx      # Collapsible sections
    ├── drawer.tsx # Side drawer for component docs
    ├── dialog.tsx           # Modal dialogs
    ├── dropdown-menu.tsx    # Dropdown menus
    ├── field.tsx            # Form field wrapper
    ├── form.tsx             # Form component (react-hook-form integration)
    ├── frame.tsx            # Layout frame
    ├── icon-button.tsx      # Icon-only buttons
    ├── input-group.tsx      # Input with addons
    ├── input.tsx            # Text inputs (CVA variants)
    ├── kbd.tsx              # Keyboard shortcut display
    ├── label.tsx            # Form labels
    ├── radio-group.tsx      # Radio button groups
    ├── resizable.tsx        # Resizable panels
    ├── scroll-area.tsx      # Custom scrollbar areas
    ├── select.tsx           # Select dropdowns
    ├── separator.tsx        # Visual separators
    ├── sheet.tsx            # Slide-out panels
    ├── sidebar.tsx          # Application sidebar (complex, ~21KB)
    ├── skeleton.tsx         # Loading skeletons
    ├── sonner.tsx           # Toast notification config
    ├── spinner.tsx          # Loading spinner
    ├── table.tsx            # Data tables
    ├── tabs.tsx             # Tab navigation
    ├── text-effect.tsx      # Text animation effects
    ├── text.tsx             # Typography component (CVA variants)
    ├── textarea.tsx         # Multi-line text inputs
    ├── toaster.tsx          # Toast container
    └── tooltip.tsx          # Tooltip popups
```

### `features/` — Feature Modules

Business logic organized by domain feature. Each feature is self-contained with components, hooks, types, and barrel exports.

```
features/
├── home/                   # Landing page feature
│   ├── index.ts            # Barrel exports: HeroSection, Logo, HeroHeader
│   └── components/
│       ├── header.tsx       # Navigation header
│       ├── hero-section.tsx # Landing page hero
│       └── logo.tsx         # Antaris logo component
│
├── catalog/                # Catalog feature (satellite component browser)
│   ├── index.ts            # Barrel exports: CatalogCard, CatalogCategoryGroup
│   ├── components/
│   │   ├── catalog-card.tsx          # Satellite component card (uses Card selected state)
│   │   └── catalog-category-group.tsx # Collapsible category group (WIP)
│   ├── hooks/              # (reserved for future Zustand store)
│   ├── types/
│   │   └── catalog.ts      # CatalogItem, CatalogCategoryGroup interfaces
│   └── utils/
│       └── mock-data.ts    # Static mock catalog items (replaces API until backend ready)
│
└── users/                  # User management feature
    ├── index.ts             # Barrel exports: UsersList, UserCard, UserModal, etc.
    ├── components/
    │   ├── create-user-button.tsx # "Create User" trigger button
    │   ├── user-card.tsx          # User card display
    │   ├── user-form.tsx          # User create/edit form (react-hook-form + Zod)
    │   ├── user-modal.tsx         # User create/edit modal dialog
    │   └── users-list.tsx         # Users grid list
    ├── hooks/
    │   └── useUserModal.ts        # Zustand store for modal state (open/close/mode)
    └── types/
        └── user-schema.ts         # Zod validation schema for user forms
│
└── splash-screen/          # Animated splash screen entry
    ├── index.ts            # Barrel exports: SplashScreen
    ├── constants.ts        # SVG paths + scatter vectors + animation timings
    └── components/
        └── splash-screen.tsx # Main orchestrated animation component
```

### `hooks/` — Global Hooks

```
hooks/
├── use-auth.ts             # Authentication hook: token, user, isAuthenticated
└── use-mobile.ts           # Mobile viewport detection hook
```

### `lib/` — Core Libraries

```
lib/
├── utils.ts                # `cn()` — Tailwind classname merge utility
├── arcjet.ts               # Arcjet security client initialization
├── mock-data.ts            # Seed data for sample users (POSTs to CrudCrud)
├── orpc.ts                 # oRPC client (browser-side) + TanStack Query utils
├── orpc.server.ts          # oRPC server client (SSR-side, sets globalThis.$client)
├── serializer.ts           # oRPC JSON serializer for hydration
├── auth/                   # Authentication utilities
│   ├── keycloak.ts         # Keycloak OAuth helpers (login URL, token exchange, UMA)
│   └── session.ts          # Cookie session management (get/set/clear tokens)
└── query/                  # TanStack Query setup
    ├── client.ts           # QueryClient factory with custom serialization
    └── hydration.tsx       # SSR hydration helpers (getQueryClient, HydrateClient)
```

### `providers/` — React Providers

Wraps the app in a provider tree: Theme → Auth → TanStack Query → Modals.

```
providers/
├── index.tsx                # AllProviders composition (Theme → Auth → Query → Modals)
├── auth-provider.tsx        # Hydrates Zustand auth store from server-side token
├── tanstack-query-provider.tsx # QueryClientProvider wrapper
├── theme-provider.tsx       # next-themes ThemeProvider (dark mode default)
├── modals-provider.tsx      # Global modal registry (UserModal)
└── background-provider.tsx  # Background effects (cyber grid + glow blobs)
```

### `store/` — Zustand Stores

```
store/
└── auth-store.ts            # Auth state: token, user, isLoading, isError, actions
```

### `styles/` — Design Token System

```
styles/
├── build.js                 # Token build script (Figma JSON → CSS variables + fonts.generated.tsx)
├── figma/                   # Raw Figma token exports (JSON)
└── src/
    ├── index.css            # Generated CSS variables (:root) — all design tokens
    ├── antaris-theme.css    # Tailwind @theme mapping — tokens → Tailwind utilities
    ├── tokens.generated.ts  # TypeScript token exports (for programmatic access)
    └── fonts.generated.tsx  # Auto-generated next/font/google loader (do not edit manually)
```

### `icons/` — Custom Icon System

```
icons/
├── build.js                 # SVG → React component build script
├── index.ts                 # Barrel exports for all icon components
├── src/                     # Generated React icon components
└── svg/                     # Source SVG files
```

### `public/` — Static Assets

```
public/
├── file.svg, globe.svg, next.svg, vercel.svg, window.svg  # Default Next.js assets
├── mail2.webp, mail2-light.webp                            # Email illustrations
└── night-background.webp                                   # Background image
```
