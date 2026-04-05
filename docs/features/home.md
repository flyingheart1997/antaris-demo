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
- HeroHeader is currently **commented out** in `app/layout.tsx` — can be re-enabled by uncommenting `{/* <HeroHeader /> */}`
