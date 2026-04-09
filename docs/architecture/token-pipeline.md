# Architecture: Design Token Pipeline

## Overview

Design tokens are the single source of truth for all visual values — colors, typography, spacing, radii, effects. In Antaris they flow from Figma → JSON → CSS variables → Tailwind utilities → components.

```
Figma Design System
        │
        │  Export (JSON)
        ▼
styles/figma/
├── global.tokens.json      ← raw palette (all color scales, primitives)
└── semantic.tokens.json    ← semantic mappings (what uses what)
        │
        │  pnpm build:token → node styles/build.js
        ▼
styles/src/
├── index.css               ← :root { --color-text-primary: oklch(...); ... }
├── antaris-theme.css       ← @theme { --color-text-primary: var(--color-text-primary); ... }
└── tokens.generated.ts     ← export const tokens = { ... } as const
        │
        ▼
app/globals.css
├── @import 'styles/src/index.css'       ← actual values
└── @import 'styles/src/antaris-theme.css'  ← Tailwind mapping
        │
        ▼
Tailwind CSS v4
        │  generates utility classes from @theme block
        ▼
bg-surface-primary, text-text-primary, border-stroke-selected, ...
        │
        ▼
components/ui/*.tsx
```

---

## Source Files — `styles/figma/`

### `global.tokens.json` — Primitive Palette

Contains raw color scales and base values:

```json
{
    "color": {
        "green": {
            "1":  { "$value": { "hex": "#...", "components": [r, g, b], "alpha": 1 }, "$type": "color" },
            "2":  { ... },
            ...
            "12": { ... },
            "alpha": {
                "1": { ... },
                ...
                "12": { ... }
            }
        },
        "gray": { ... },
        "red": { ... },
        "yellow": { ... },
        "blue": { ... }
    },
    "opacity": { "1": 0.02, "2": 0.04, ... },
    "font-family": { "heading": "Space Grotesk", "body": "Montserrat", "code": "Fira Mono" },
    "font-size": { "xxxl": 24, "xxl": 20, "xl": 18, "lg": 16, "md": 14, "sm": 12, "xs": 10 },
    "dim": { "0": 0, "1": 1, "2": 2, ... "100": 100 }
}
```

### `semantic.tokens.json` — Semantic Mappings

Contains references to global tokens using Figma's `{path.to.token}` syntax:

```json
{
    "color": {
        "text": {
            "primary":   { "$value": "{color.gray.12}", "$type": "color" },
            "secondary": { "$value": "{color.gray.10}", "$type": "color" },
            "disabled":  { "$value": "{color.gray.6}",  "$type": "color" }
        },
        "surface": {
            "bg":        { "$value": "{color.gray.1}", "$type": "color" },
            "primary":   { "$value": "{color.gray.2}", "$type": "color" },
            "secondary": { "$value": "{color.gray.3}", "$type": "color" }
        },
        "stroke": {
            "primary":  { "$value": "{color.gray.alpha.4}", "$type": "color" },
            "selected": { "$value": "{color.green.8}",      "$type": "color" }
        }
    }
}
```

---

## Build Script — `styles/build.js`

### Step 1 — Load and Flatten

Both JSON files are loaded and flattened from nested objects into dot/dash-separated paths:

```javascript
// Nested input:
{ color: { text: { primary: { $value: "{color.gray.12}" } } } }

// Flattened output:
{ "color-text-primary": { $value: "{color.gray.12}", $type: "color" } }
```

Paths use `-` as separator. `$`-prefixed keys (`$value`, `$type`) are skipped during flattening.

### Step 2 — Resolve References

Figma reference tokens (`{color.gray.12}`) are resolved to their actual values:

```javascript
function resolveValue(token, path, allFlattened) {
    const val = token.$value

    // Resolve Figma alias: {color.gray.12} → looks up "color-gray-12"
    if (typeof val === 'string' && val.startsWith('{') && val.endsWith('}')) {
        const refPath = val.slice(1, -1).replace(/\./g, '-')
        return allFlattened[refPath] || val
    }

    // Convert color object to OKLCH
    if (type === 'color' && typeof val === 'object' && val.hex) {
        return formatOklch(val)   // oklch(75.2% 0.12345 142.678)
    }
    // ...
}
```

Resolution runs **twice** (deep resolution loop) to handle chained references (semantic → global → value).

### Step 3 — OKLCH Color Conversion

All colors are converted from sRGB (Figma's format) to OKLCH:

```javascript
function srgbToLinear(c) {
    return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
}

function rgbToOklab(r, g, b) {
    // Convert to Oklab color space (perceptual uniformity)
    // ...
}

function formatOklch(color) {
    const { L, a, b } = rgbToOklab(...color.components)
    const C = Math.sqrt(a*a + b*b)          // chroma
    const H = Math.atan2(b, a) * 180 / Math.PI  // hue angle
    return `oklch(${L*100}% ${C} ${H})`
}
```

**Why OKLCH?**
- Perceptually uniform — equal numeric steps produce equal perceived lightness changes
- Better for generating color scales and transparent variants
- Supported in all modern browsers
- More predictable than HSL for dark UI themes

### Step 4 — Generate `index.css`

```css
:root {
  --color-green-1: oklch(98.432% 0.00312 152.672);
  --color-green-2: oklch(96.812% 0.00845 152.672);
  /* ... all palette tokens ... */
  --color-text-primary: oklch(97.832% 0.00189 152.672);
  --color-surface-bg: oklch(10.234% 0.00312 152.672);
  --color-stroke-primary: oklch(30.123% 0.00415 152.672 / 0.16);
  /* ... all semantic tokens ... */
  --font-family-heading: Space Grotesk;
  --font-size-xxxl: 1.5rem;
  /* ... typography, spacing, radii ... */
}
```

This file declares the actual resolved values. It's the bottom of the cascade.

### Step 5 — Generate `antaris-theme.css`

```css
@theme {
  --color-green-1: var(--color-green-1);
  --color-text-primary: var(--color-text-primary);
  --color-surface-bg: var(--color-surface-bg);
  --text-xxxl: var(--font-size-xxxl);
  --font-heading: var(--font-family-heading);
  --spacing-1: var(--dim-1);
  /* ... */
}
```

The `@theme` block is Tailwind v4's mechanism for registering custom tokens as utility classes. Each entry here becomes a Tailwind utility:
- `--color-text-primary` → `text-text-primary`, `bg-text-primary`, `border-text-primary`
- `--text-xxxl` → `text-xxxl`
- `--font-heading` → `font-heading`

### Step 6 — Generate `tokens.generated.ts`

```typescript
export const tokens = {
  color: {
    green: {
      '1': 'oklch(98.432% 0.00312 152.672)',
      // ...
    },
    text: {
      primary: 'oklch(97.832% 0.00189 152.672)',
      // ...
    }
  },
  // ...
} as const

export type DesignTokens = typeof tokens
```

Used for programmatic access to token values in TypeScript — e.g., passing colors to Framer Motion animations where CSS classes can't be used:

```typescript
import { tokens } from '@/styles/src/tokens.generated'

animate={{ color: tokens.color.text.primary }}
```

---

## How Tailwind v4 Uses the Tokens

Tailwind v4 replaces the `tailwind.config.ts` theme extension with the `@theme` block in CSS. The flow:

```
antaris-theme.css (@theme block)
    → Tailwind reads --color-* entries
    → Generates: text-*, bg-*, border-*, fill-*, stroke-*
    → Generates: text-* (sizes from --text-*)
    → Generates: font-* (families from --font-*)
    → Generates: rounded-* (radii from --radius-*)
    → Generates: opacity-* (from --opacity-*)
```

This means `bg-surface-primary` compiles to `background-color: var(--color-surface-primary)` — which resolves at runtime to the OKLCH value in `:root`.

---

## Token Naming Convention

All tokens follow a strict hierarchy: `category-group-variant`

| Category | Example tokens |
|---|---|
| `color-{palette}-{scale}` | `color-green-9`, `color-gray-alpha-4` |
| `color-text-{role}` | `color-text-primary`, `color-text-disabled` |
| `color-surface-{role}` | `color-surface-bg`, `color-surface-hover` |
| `color-stroke-{role}` | `color-stroke-primary`, `color-stroke-selected` |
| `color-icon-{role}` | `color-icon-primary`, `color-icon-info` |
| `font-family-{type}` | `font-family-heading`, `font-family-body` |
| `font-size-{scale}` | `font-size-xxxl`, `font-size-md` |
| `font-weight-{name}` | `font-weight-bold`, `font-weight-regular` |
| `dim-{n}` | `dim-0` through `dim-100` (spacing) |
| `radius-{name}` | `radius-sm`, `radius-md`, `radius-lg`, `radius-rounded` |
| `opacity-{n}` | `opacity-1` through `opacity-100` |

---

## Re-running the Build

Any time `styles/figma/*.json` is updated (from a Figma export), regenerate:

```bash
pnpm build:token
```

This overwrites `styles/src/index.css`, `antaris-theme.css`, and `tokens.generated.ts`. The generated files are committed to the repo — you don't need to run the build to use the tokens.

---

## Optimized Font Generation Bridge

While standard tokens (colors, spacing) resolve at runtime via CSS variables, **Font Families** require the browser to download external font files. Antaris uses an enterprise-grade "Code Generation" bridge to ensure fonts are both dynamic and high-performance.

### How it works:

1. **Meta-Programming Build Step (`build.js`)**: When tokens are processed, the build script identifies font-family and weight tokens. It then **writes a React component** to [styles/src/fonts.generated.tsx](file:///Users/koushikmondal/ANTARIS_PROJECTS/antaris-demo/styles/src/fonts.generated.tsx).
2. **Next.js Optimization**: The generated file uses `next/font/google` to configure the families discovered in Figma. This enables Next.js to:
   - **Self-host** the font files (faster, no external requests).
   - **Prevent Layout Shift (CLS)** by providing optimized fallback fonts.
3. **Automatic Injection**: The `FontVars` component is imported and rendered in the `RootLayout`, injecting the font variables into the global CSS scope.

This architecture ensures your design remains dynamic (syncs with Figma) while maintaining the highest possible web performance standards.

---

## Known Issues

See [docs/features/design-system.md → Known Issues](../features/design-system.md) for:
- Token typos (`surface-warnig`, `icon-focus-subltle`) inherited from Figma
- Dark-mode only token set
- Separator gradient token edge case
