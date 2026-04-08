# Architecture: Icon System

## Overview

Antaris uses a **custom SVG icon pipeline** — 53 domain-specific icons for satellite operations, converted from raw SVGs into typed React components via an automated build process.

These icons are in addition to third-party icon libraries (Lucide, HugeIcons, Tabler) used for generic UI icons.

---

## File Structure

```
icons/
├── svg/            # Source SVG files — edit these to update icons
├── src/            # Generated React components — DO NOT edit manually
├── index.ts        # Generated barrel exports — DO NOT edit manually
└── build.js        # Build script (SVG → React)
```

---

## Icon Categories

### Navigation & UI
| Icon | Component Name |
|---|---|
| Chevron Up/Down/Left/Right | `ChevronUpIcon`, `ChevronDownIcon`, etc. |
| Accordion caret open/close | `AccordianCaretOpenIcon`, `AccordianCaretCloseIcon` |
| Add / Add Custom | `AddIcon`, `AddCustomIcon` |
| Edit | `EditIcon` |
| Delete / Cross | `DeleteIcon`, `CrossIcon` |
| Upload / Download | `UploadIcon`, `DownloadIcon` |
| Filter / Search | `FilterIcon`, `SearchIcon` |
| Check | `CheckIcon` |
| Dashboard | `DashboardIcon` |
| Notifications | `NotificationsIcon` |
| Settings | `SettingsIcon` |
| Info | `InfoIcon` |

### Satellite Domain
| Icon | Component Name |
|---|---|
| Satellite | `SatelliteIcon` |
| Satellite Review | `SatelliteReviewIcon` |
| Rocket | `RocketIconIcon` |
| Mission | `MissionIcon` |
| Mission Design | `MissionDesignIcon` |
| Ground Station | `GroundStationIcon` |
| Earth Observation | `EarthObservationIcon` |
| Eclipse | `EclipseIconIcon` |

### Subsystems
| Icon | Component Name |
|---|---|
| ADCS | `ADCSIcon` |
| Payload | `PayloadIcon` |
| Thruster | `ThrusterIcon` |
| Battery | `BatteryIcon` |
| EPS | `EPSIcon` |
| Communications | `CommunicationsIcon` |
| Radio | `RadioIcon` |
| Bus | `BusIcon` |
| GPS | `GPSIcon` |
| Processor | `ProcessorIcon` |

### Measurements
| Icon | Component Name |
|---|---|
| Temperature | `TemperatureIcon` |
| Mass | `MassIcon` |
| Solar Generation | `SolarGenerationIcon` |
| Sunlit | `SunlitIcon` |
| Size | `SizeIcon` |

### Documentation & Special
| Icon | Component Name |
|---|---|
| Docs | `DocsIcon` |
| Catalog | `CatalogIcon` |
| Custom | `CustomIcon` |
| Load Components | `LoadComponentsIcon` |

---

## Usage

```typescript
import { SatelliteIcon, MissionIcon, ADCSIcon } from '@/icons'

// Basic usage
<SatelliteIcon />

// With className for styling
<SatelliteIcon className="h-5 w-5 text-text-primary" />

// With color token
<MissionIcon className="h-6 w-6 text-green-9" />
```

All icons automatically have:
- `className="antaris-icon"` applied by the build — target this for global icon styles
- `currentColor` fill — color is controlled entirely by `text-*` Tailwind class
- `forwardRef` — usable in components that need a DOM ref
- TypeScript types via generated `*.tsx` files

---

## Build Pipeline — Deep Dive

### Run the build

```bash
pnpm build:icon
# → node icons/build.js
```

### Step 1 — Pre-processing (Strip Hardcoded Styles)

```javascript
for (const file of svgFiles) {
    let content = fs.readFileSync(filePath, 'utf8')

    // Remove all inline style attributes — prevents Figma export artifacts
    content = content.replace(/style="[^"]*"/g, '')

    // Remove display-p3 color space fills — not supported everywhere
    content = content.replace(/fill="color\(display-p3[^"]+"\)/g, '')

    fs.writeFileSync(filePath, content)
}
```

**Why:** Figma exports often include `style="fill: #000; display: none"` or `fill="color(display-p3 0.1 0.2 0.3)"` attributes that override CSS classes. These are stripped so that `currentColor` can control the fill via CSS.

### Step 2 — SVGR Transformation

```bash
npx @svgr/cli \
    --out-dir "icons/src" \
    --icon \                              # sets width/height to "1em" (scales with font-size)
    --typescript \                        # generates .tsx not .jsx
    --ref \                               # wraps in React.forwardRef
    --svg-props className="antaris-icon" \  # adds default className
    --replace-attr-values "#000=currentColor" \  # replaces black fills
    --replace-attr-values "black=currentColor" \
    --replace-attr-values "#EEEEEE=currentColor" \  # replaces light fills too
    "icons/svg"
```

This converts each `my-icon.svg` into `icons/src/MyIcon.tsx`:

```typescript
// Generated output (simplified)
import * as React from 'react'

const SvgSatellite = (props: React.SVGProps<SVGSVGElement>, ref: React.Ref<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        className="antaris-icon"
        ref={ref}
        {...props}
    >
        <path fill="currentColor" d="..." />
    </svg>
)

const SatelliteIcon = React.forwardRef(SvgSatellite) as any
export default SatelliteIcon
```

### Step 3 — Post-processing (Icon Suffix + Index Generation)

```javascript
for (const file of componentFiles) {
    const componentName = file.replace('.tsx', '')

    // Add "Icon" suffix if not already present
    const newComponentName = componentName.endsWith('Icon')
        ? componentName
        : `${componentName}Icon`

    // Rename file and update internal references
    // ...

    exports.push(`export { default as ${newComponentName} } from "./src/${newComponentName}"`)
}

// Write icons/index.ts
fs.writeFileSync('icons/index.ts', exports.join('\n') + '\n')
```

This ensures all icons:
- Have consistent `Icon` suffix (`SatelliteIcon`, not `Satellite`)
- Are exported from the root `icons/index.ts` barrel

---

## Adding a New Icon

1. Export the icon as SVG from Figma (or any design tool)
2. Place the `.svg` file in `icons/svg/`
3. Run `pnpm build:icon`
4. Import from `@/icons`:

```typescript
import { YourNewIcon } from '@/icons'
```

### Naming Convention

SVG filename → component name:
- `my-icon.svg` → `MyIconIcon` (SVGR converts to PascalCase, build adds `Icon`)
- `satellite.svg` → `SatelliteIcon`
- `ground-station.svg` → `GroundStationIcon`

### Troubleshooting

**Icon renders as black filled blob:**
- The SVG has hardcoded `fill` colors that weren't caught by the pre-processor
- Open the SVG, find `fill="#somecolor"` attributes, and replace with `fill="currentColor"` manually
- Re-run `pnpm build:icon`

**Icon renders blank:**
- The SVG may use `display-p3` color space which was stripped
- Check the SVG source for strokes or fills that were removed
- Use the Figma "Export as SVG" with standard sRGB color space

**Icon not found in index.ts:**
- Confirm the file is in `icons/svg/` with `.svg` extension
- Re-run `pnpm build:icon` — the index is fully regenerated each build

---

## Third-Party Icon Libraries

In addition to custom icons, the codebase uses:

| Library | Import | Usage |
|---|---|---|
| Lucide | `import { SomeIcon } from 'lucide-react'` | General UI icons (Mail, Globe, Phone, etc.) |
| HugeIcons | `import { Cancel01Icon } from '@hugeicons/core-free-icons'` | Specific UI icons (close button, etc.) |
| Tabler | `import { ... } from '@tabler/icons-react'` | Available, minimal usage |

**Rule:** Use custom icons from `@/icons` for satellite/domain-specific concepts. Use Lucide for generic UI actions (close, edit, delete, settings, etc.).
