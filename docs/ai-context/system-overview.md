# System Overview — Antaris

## What This Project Does

**Antaris** is a full-stack enterprise web application built as the frontend foundation for the **Antaris ATMOS** satellite operations platform. It serves as both a **design system showcase** and a **functional CRUD application** demonstrating the architecture patterns used across the Antaris product suite.

## Core Purposes

1. **Design System Engine** — Houses and showcases the Antaris Design System, a Figma-synced component library with design tokens (colors, spacing, typography) extracted from the Antaris Figma source-of-truth.

2. **Component Preview Portal** — Provides interactive preview pages (`/preview/*`) for each UI component (Button, Input, Card, Tabs, etc.) where developers can inspect all variants, states, and props.

3. **User Management CRUD** — A production-grade CRUD application (`/users`) with full Create/Read/Update/Delete operations backed by a REST API, demonstrating the oRPC + TanStack Query data flow pattern.

4. **Authentication Reference** — Implements Keycloak-based OAuth 2.0 + UMA authentication with httpOnly cookie session management, serving as a reference implementation for the broader ATMOS platform.

5. **Security Playground** — Integrates Arcjet for server-side security (WAF, bot detection, rate limiting) applied as oRPC middleware.

## Domain Context

- **ATMOS** = Antaris Mission Operations System
- The platform manages satellite missions: scheduling, pre-simulation, telemetry, HWIL (Hardware-in-the-Loop), orbit insights
- This project is the **frontend architecture reference** that other ATMOS modules follow

## Key Architectural Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Framework | Next.js 16 (App Router) | Server Components + RSC streaming |
| API Layer | oRPC (not tRPC) | Type-safe RPC with REST-like routing |
| Data Fetching | TanStack Query v5 | Server-state cache + SSR hydration |
| State Management | Zustand | Lightweight global state (auth) |
| Component Library | Custom + Radix UI + ShadCN | Figma-synced design system |
| Styling | Tailwind CSS v4 | Design tokens via CSS variables |
| Authentication | Keycloak + httpOnly cookies | Enterprise SSO + security |
| Security | Arcjet | Programmable WAF, bot detection, rate limiting |
| Validation | Zod v4 | Shared schemas between client and server |

## Entry Points

| Path | Purpose |
|---|---|
| `/` | Landing page (HeroSection) |
| `/users` | User management CRUD |
| `/users/[userId]` | User detail page |
| `/preview/*` | Component preview pages (11 components) |
| `/docs/*` | Documentation pages (5 sections) |
| `/api/auth/*` | Authentication API routes |
| `/rpc/*` | oRPC API handler |
