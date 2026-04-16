# Feature: Catalog

## Purpose

The Catalog feature lets operators browse and select satellite hardware components for a mission. It renders a searchable, filterable grid of component cards, each showing key specs and supporting selection state.

**Current status:** UI-only. Uses static mock data. oRPC routes and Zustand store not yet implemented.

---

## Routes

| Route | Component | Description |
|---|---|---|
| `/catalog` | `app/(antaris)/catalog/page.tsx` | Catalog workspace with sidepanel selection and stats detail panel |
| `/catalog` layout | `app/(antaris)/catalog/layout.tsx` | Full-screen container, `bg-surface-bg` |

---

## File Structure

```
features/catalog/
├── index.ts                          # Barrel exports
├── components/
│   ├── catalog-card.tsx              # Satellite component card (uses Card selected state)
│   ├── catalog-category-group.tsx    # Collapsible category group (WIP — mostly commented out)
│   ├── catalog-list.tsx              # Left-side grouped catalog list with item selection
│   ├── catalog-sidepanel.tsx         # Filter + grouped list + create custom action
│   └── catalog-stats.tsx             # Figma-style stats panel for the selected item
├── hooks/                            # Reserved for future Zustand store
├── types/
│   └── catalog.ts                    # CatalogItem, CatalogCategoryGroup interfaces
└── utils/
    └── mock-data.ts                  # Static mock catalog items
```

---

## Data Types

```typescript
// features/catalog/types/catalog.ts

interface CatalogItem {
  id: string
  name: string
  subtitle?: string
  category?: string
  specs: {
    size?: string
    mass?: string
    power?: string
    gsd?: string
    swath?: string
    [key: string]: string | undefined
  }
  tags: string[]
}

interface CatalogCategoryGroup {
  category: string
  count: number
  items: CatalogItem[]
}
```

---

## CatalogCard Component

`features/catalog/components/catalog-card.tsx`

Wraps the `Card` component with catalog-specific layout:
- Uses `Card` with `selected` prop for the Figma selected-state mask overlay
- Uses `state="emphasis"` when selected (green-alpha-2 tint)
- Displays: name, category label, 4 spec slots (size/mass/power/swath), tags as badges
- Content children use `relative z-10` to render above the mask SVG

```tsx
<CatalogCard
  item={catalogItem}
  selected={selectedId === item.id}
  onClick={() => setSelectedId(item.id)}
/>
```

**Important:** The `selected` prop on `Card` triggers the `CardMask` SVG overlay — dark green gradient background + right-side bump with lime-green glow (source: Figma node 2895:297).

## CatalogStats Component

`features/catalog/components/catalog-stats.tsx`

Renders the selected catalog item in the right-hand panel using the Figma "Stats" composition:
- Header with selected component name and category
- Five specification rows: size, mass, power, GSD, swath
- Angled segmented meters with a green guide line and right-aligned value labels
- Lightweight normalization so each spec can map to a useful fill amount without backend metadata

The panel is wired into `app/(antaris)/catalog/page.tsx`, and selection is controlled at the page level so clicking a list card updates the detail panel.

---

## Page Pattern

The catalog page is a `'use client'` component (no SSR prefetch yet — no oRPC routes):

```tsx
// app/(antaris)/catalog/page.tsx
'use client'

export default function CatalogPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-24">
      {mockCatalogItems.map((item) => (
        <CatalogCard
          key={item.id}
          item={item}
          selected={selectedId === item.id}
          onClick={() => setSelectedId(item.id)}
        />
      ))}
    </div>
  )
}
```

---

## What's Not Yet Implemented

| Item | Status | Future plan |
|---|---|---|
| oRPC routes | ❌ Not built | `app/(server)/router/catalog.ts` — list, get, filter |
| Zustand store | ❌ Not built | `features/catalog/hooks/useCatalogStore.ts` — selected items, filters |
| `CatalogCategoryGroup` | ⚠️ Placeholder | Collapsible group with `useCatalogStore` — currently returns empty div |
| Search/filter | ❌ Not built | Filter by category, specs, tags |
| Sidebar layout | ❌ Not built | Category tree sidebar + main grid |

---

## See Also

- [`docs/architecture/component-system.md`](../architecture/component-system.md) — Card component + selected state mask
- [`docs/modules/trpc-api.md`](../modules/trpc-api.md) — Pattern to follow when adding catalog tRPC procedures
- [`docs/features/user-management.md`](./user-management.md) — Reference implementation for the full feature pattern
