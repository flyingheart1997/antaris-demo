# Feature: Home / Landing Page

## Purpose
The application landing page featuring the Antaris brand identity with a hero section, navigation header, and animated logo. Serves as the entry point for the application.

---

## Key Files

| File | Purpose |
|---|---|
| `app/page.tsx` | Root page — renders HeroSection |
| `features/home/index.ts` | Barrel exports: HeroSection, Logo, HeroHeader |
| `features/home/components/hero-section.tsx` | Landing page hero content with animations |
| `features/home/components/header.tsx` | Navigation header with links |
| `features/home/components/logo.tsx` | Antaris SVG logo component |

---

## Exports

```typescript
export { default as HeroSection } from './components/hero-section'
export * from './components/logo'
export * from './components/header'
```

---

## Flow

```
User visits / → app/page.tsx → HeroSection component
                app/layout.tsx → HeroHeader (currently commented out)
```

---

## State Handling
- No state management — purely presentational
- Uses Framer Motion for animations
- Responsive layout with Tailwind

---

## Edge Cases

### HeroHeader — Intentionally Commented Out

`HeroHeader` is commented out in `app/layout.tsx`:

```typescript
// app/layout.tsx
<AllProviders token={token ?? null}>
    <Toaster />
    {/* <HeroHeader /> */}   ← commented out
    {children}
</AllProviders>
```

**Why:** The header navigation was removed from the global layout while the app is in demo/development mode. The current focus is the `/users` CRUD flow and the component preview system — a persistent nav header adds visual noise without a real multi-page navigation structure to support yet.

**To re-enable:** Uncomment `{/* <HeroHeader /> */}` in [app/layout.tsx](../../app/layout.tsx).

**When to re-enable:** When the real ATMOS navigation structure (missions, ground stations, scheduling, telemetry) is designed and implemented. The header component itself ([features/home/components/header.tsx](../../features/home/components/header.tsx)) is the correct place to build that nav.
