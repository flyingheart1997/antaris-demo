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
        │  pnpm build:token → node styles/sd.config.mjs  (Style Dictionary v4)
        ▼
styles/src/
├── index.css               ← :root { --color-text-primary: oklch(...); ... }
├── antaris-theme.css       ← @theme { --color-text-primary: var(--color-text-primary); ... }
├── tokens.generated.ts     ← export const tokens = { ... } as const
└── fonts.generated.tsx     ← Next.js Google Font loader (auto-generated)
        │
        ▼
app/globals.css
├── @import 'styles/src/index.css'          ← actual values
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

## Build System — Style Dictionary v4

The pipeline is powered by [Style Dictionary v4](https://styledictionary.com/) via `styles/sd.config.mjs`.
Style Dictionary is a battle-tested, community-maintained tool with a rich plugin ecosystem — it replaces the previous custom Node.js script (`styles/build.js`, kept as `build:token:legacy`).

### Run the build
```bash
pnpm build:token
# internally runs: node styles/sd.config.mjs
```

### Config file: `styles/sd.config.mjs`

The config registers four custom **transforms**, one custom **format**, and one **action**:

| Plugin | Name | What it does |
|---|---|---|
| Transform | `color/figma-oklch` | Converts Figma color objects `{ hex, components, alpha }` → `oklch(...)` |
| Transform | `size/figma-rem` | Converts numeric px dimension values → `rem` |
| Transform | `opacity/figma-decimal` | Converts Figma 0-100 opacity → CSS 0-1 |
| Transform | `fontFamily/css-var-wrap` | Wraps font families with `var(--font-*, fallback)` |
| Format | `css/tailwind-v4-theme` | Generates Tailwind v4 `@theme {}` block from all tokens |
| Action | `generate-fonts-tsx` | Writes `fonts.generated.tsx` (Next.js Google Font loader) |

### Platforms (outputs)

| Platform | Transform Group | Output |
|---|---|---|
| `css` | All transforms | `styles/src/index.css` — `:root {}` CSS custom properties |
| `tailwind` | All transforms | `styles/src/antaris-theme.css` — `@theme {}` Tailwind block |
| `typescript` | All transforms | `styles/src/tokens.generated.ts` — typed JS object |
| `fonts` | All transforms | `styles/src/fonts.generated.tsx` via action |

---

## Source Files — `styles/figma/`

Both files use the **W3C Design Token Community Group (DTCG)** format (`$value` / `$type`), which is what Figma Tokens Studio exports. Style Dictionary v4 reads these natively with `usesDtcg: true`.

### `global.tokens.json` — Primitive Palette

Contains raw color scales and base values:

```json
{
    "color": {
        "green": {
            "1":  { "$value": { "hex": "#...", "components": [r, g, b], "alpha": 1 }, "$type": "color" },
            "2":  { ... },
            "12": { ... },
            "alpha": {
                "1": { ... },
                "12": { ... }
            }
        },
        "gray": { ... },
        "red": { ... }
    },
    "opacity": { "1": 2, "2": 4, ... },
    "font-family": { "heading": "Space Grotesk", "body": "Montserrat" },
    "font-size": { "xxxl": 24, "xxl": 20, "xl": 18, "lg": 16 },
    "dim": { "0": 0, "1": 1, "2": 2, ... "100": 100 }
}
```

### `semantic.tokens.json` — Semantic Mappings

Contains references to global tokens using the `{path.to.token}` syntax. Style Dictionary resolves these references automatically:

```json
{
    "color": {
        "text": {
            "primary":   { "$value": "{color.gray.12}", "$type": "color" },
            "secondary": { "$value": "{color.gray.10}", "$type": "color" }
        },
        "surface": {
            "bg":        { "$value": "{color.gray.1}", "$type": "color" },
            "primary":   { "$value": "{color.gray.2}", "$type": "color" }
        },
        "stroke": {
            "primary":  { "$value": "{color.gray.alpha.4}", "$type": "color" },
            "selected": { "$value": "{color.green.8}",      "$type": "color" }
        }
    }
}
```

---

## OKLCH Color Conversion

All Figma color objects are converted to OKLCH at build time by the `color/figma-oklch` transform.
**Why OKLCH?**
- Perceptually uniform — equal numeric steps produce equal perceived lightness changes
- Better for generating color scales and transparent variants
- Supported in all modern browsers (Chrome, Safari, Firefox, Edge)
- More predictable than HSL for dark UI themes

```
Figma: { hex: "#22C55E", components: [0.133, 0.773, 0.369], alpha: 1 }
           ↓  color/figma-oklch transform
CSS:   oklch(73.5% 0.19234 142.495)
```

---

## Generated Outputs

### `styles/src/index.css` — CSS Custom Properties
```css
:root {
  --color-green-1: oklch(98.432% 0.00312 152.672);
  --color-text-primary: oklch(97.832% 0.00189 152.672);
  --color-surface-bg: oklch(10.234% 0.00312 152.672);
  --color-stroke-separator: linear-gradient(270deg, ...);
  --font-family-heading: var(--font-space-grotesk, Space Grotesk);
  --font-size-xxxl: 1.5rem;
  --dim-1: 0.0625rem;
  /* ... all tokens ... */
}
```

### `styles/src/antaris-theme.css` — Tailwind v4 @theme
```css
@theme {
  --color-green-1: var(--color-green-1);
  --color-text-primary: var(--color-text-primary);
  --text-xxxl: var(--font-size-xxxl);
  --font-heading: var(--font-family-heading);
  --spacing-1: var(--dim-1);
  --radius-sm: var(--radius-sm);
  /* ... */
}
```
Each entry becomes Tailwind utilities: `text-text-primary`, `bg-surface-bg`, `border-stroke-primary`, etc.

### `styles/src/tokens.generated.ts` — TypeScript Object
Used for programmatic access in TypeScript — e.g., passing colors to Framer Motion animations where CSS classes can't be used:
```typescript
import { tokens } from '@/styles/src/tokens.generated'

animate={{ color: tokens.color.text.primary }}
```

### `styles/src/fonts.generated.tsx` — Next.js Font Loader
Auto-generated by the `generate-fonts-tsx` action. Uses `next/font/google` to self-host fonts discovered in Figma tokens, preventing layout shift (CLS) and external font requests.

---

## Token Naming Convention

All tokens follow a strict `category-group-variant` hierarchy:

| Category | Example tokens |
|---|---|
| `color-{palette}-{scale}` | `color-green-9`, `color-gray-alpha-4` |
| `color-text-{role}` | `color-text-primary`, `color-text-disabled` |
| `color-surface-{role}` | `color-surface-bg`, `color-surface-hover` |
| `color-stroke-{role}` | `color-stroke-primary`, `color-stroke-selected` |
| `font-family-{type}` | `font-family-heading`, `font-family-body` |
| `font-size-{scale}` | `font-size-xxxl`, `font-size-md` |
| `font-weight-{name}` | `font-weight-bold`, `font-weight-regular` |
| `dim-{n}` | `dim-0` through `dim-100` (spacing) |
| `radius-{name}` | `radius-sm`, `radius-md`, `radius-lg` |
| `opacity-{n}` | `opacity-1` through `opacity-100` |

---

## Manual Token

The `color-stroke-separator` token (a gradient) is injected directly in the SD config via a preprocessor hook, as it can't be expressed as a standard Figma color object:

```javascript
// styles/sd.config.mjs — preprocessors hook
dictionary.color.stroke.separator = {
    $value: 'linear-gradient(270deg, rgba(240,240,240,0.10) 0%, rgba(240,240,240,0.40) 50%, rgba(240,240,240,0.10) 100%)',
    $type: 'color',
}
```

---

## Re-running the Build

Any time `styles/figma/*.json` is updated (from a Figma export), regenerate:

```bash
pnpm build:token
```

This overwrites `styles/src/index.css`, `antaris-theme.css`, `tokens.generated.ts`, and `fonts.generated.tsx`. The generated files are committed to the repo.

To fall back to the old custom script:
```bash
pnpm build:token:legacy
```

---

## Known Issues

See [docs/features/design-system.md → Known Issues](../features/design-system.md) for:
- Token typos (`surface-warnig`, `icon-focus-subltle`) inherited from Figma
- Dark-mode only token set
- Separator gradient token edge case (handled via manual injection)
