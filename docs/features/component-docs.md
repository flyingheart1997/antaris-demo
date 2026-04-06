# Component Documentation Library

## Feature Overview

The Antaris Component Documentation Library is a **config-driven, production-ready documentation portal** built directly inside the `antaris-demo` Next.js application. It provides a browsable, searchable catalog of every UI component in the Antaris design system — with live previews, props tables, code examples, and copy buttons — without duplicating any component code.

It lives at `/component-docs` and is inspired by shadcn/ui and Aceternity UI, but built entirely on the Antaris design token system.

---

## Architecture

```
app/
  component-docs/
    layout.tsx          ← Nested layout: sticky sidebar + scrollable main
    page.tsx            ← Index page: category-grouped component cards
    [slug]/
      page.tsx          ← Dynamic page per component (generated from registry)
    config/
      components.ts     ← Component registry — single source of truth
    _components/
      DocsSidebar.tsx   ← Search-enabled, category-grouped nav sidebar
      ComponentPreview.tsx  ← <iframe> embedding /preview/[slug]
      CodeBlock.tsx     ← Syntax-highlighted code + copy button
      PropsTable.tsx    ← API reference table (reuses ui/table)
      DocsTabs.tsx      ← Preview/Code tab switcher (reuses ui/tabs)

docs/
  features/
    component-docs.md  ← This file
```

### Design Principles

1. **Zero duplication** — all live previews are iframes pointing to the existing `/preview/[slug]/page.tsx` routes. No component is rendered twice.
2. **Config-driven** — everything derives from `config/components.ts`. Adding an entry there automatically propagates to the sidebar, index grid, and generates a full doc page.
3. **Design-system aligned** — all styling uses Antaris CSS tokens (`bg-surface-*`, `text-text-*`, `border-stroke-*`, color scales). No arbitrary values.
4. **Reuse first** — `DocsTabs` reuses `ui/tabs`, `PropsTable` reuses `ui/table`, `DocsSidebar` reuses `ui/sidebar` primitives, `CodeBlock` uses `ui/button`.

---

## Folder Structure Explanation

| Path | Purpose |
|------|---------|
| `config/components.ts` | Registry of all documented components. Exports `COMPONENT_REGISTRY`, `getComponentsByCategory()`, `getComponentDoc(slug)`, `getAllSlugs()`. |
| `layout.tsx` | Wraps all `/component-docs/*` routes. Provides the fixed sidebar + main area shell. Uses `SidebarProvider` context. |
| `page.tsx` | Server component. Index page listing all components grouped by category. |
| `[slug]/page.tsx` | Server component. Dynamic doc page. Calls `getComponentDoc(slug)` from the registry. Returns `notFound()` for unknown slugs. |
| `_components/DocsSidebar.tsx` | Client component. Reads registry, groups by category, filters on search input. Uses `usePathname()` for active state. |
| `_components/ComponentPreview.tsx` | Client component. Wraps an `<iframe src="/preview/[slug]">` with browser chrome, viewport switcher, and loading state. |
| `_components/CodeBlock.tsx` | Client component. Pure CSS syntax highlighter (green = strings, blue = keywords, yellow = JSX tags). Copy button via `navigator.clipboard`. |
| `_components/PropsTable.tsx` | Server/Client component. Renders `PropDef[]` using `ui/table`. Prop names green, types blue, defaults yellow — matches CodeBlock coloring. |
| `_components/DocsTabs.tsx` | Client component. Composes `ComponentPreview` + `CodeBlock` into a `Tabs` (underline variant) container. |

---

## How Components Are Rendered from `/preview/components`

Each component's live preview is rendered via a standard HTML `<iframe>`:

```tsx
// ComponentPreview.tsx
<iframe src={`/preview/${slug}`} title={`${slug} preview`} />
```

The `slug` in the registry **must match** the directory name under `/app/preview/`. For example:

| Registry slug | Preview route | Preview file |
|---|---|---|
| `button` | `/preview/button` | `app/preview/button/page.tsx` |
| `card` | `/preview/card` | `app/preview/card/page.tsx` |
| `separator-test` | `/preview/separator-test` | `app/preview/separator-test/page.tsx` |

The preview pages are fully self-contained Next.js pages — they inherit the root layout's design tokens and render the component in isolation.

---

## How to Add a New Component

Adding a new component to the docs system is a **4-step process**:

### Step 1: Create the Preview Page

```
app/preview/[your-component]/page.tsx
```

This page should showcase all variants and states of the component. Follow the pattern of existing previews (e.g., `app/preview/button/page.tsx`).

### Step 2: Register in the Config

Open `app/component-docs/config/components.ts` and add an entry to `COMPONENT_REGISTRY`:

```ts
{
  slug: "your-component",         // ← must match /preview/[slug] directory
  name: "Your Component",
  category: "UI",                 // "UI" | "Forms" | "Layout" | "Feedback"
  summary: "One-line description shown in the index card.",
  description: "Full paragraph description for the component page header.",
  variants: [
    { label: "Default", description: "..." },
    { label: "With Icon", description: "..." },
  ],
  props: [
    {
      name: "size",
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      description: "Size of the component.",
    },
  ],
  codeExample: `import { YourComponent } from "@/components/ui/your-component"\n\n<YourComponent />`,
}
```

### Step 3: Done!

That's it. The component will now appear:
- ✅ In the sidebar (grouped under its category)
- ✅ In the index page grid card
- ✅ As a generated dynamic route at `/component-docs/your-component`
- ✅ In the search results

### Step 4 (Optional): Create the actual UI component

If the component doesn't exist yet, build it in `components/ui/your-component.tsx`, then create the preview page in Step 1.

---

## How the Config-Driven System Works

```
COMPONENT_REGISTRY (array of ComponentDoc)
       │
       ├─── getComponentsByCategory()
       │         │
       │         └─→ DocsSidebar (nav groups)
       │         └─→ Index page (section grids)
       │
       ├─── getComponentDoc(slug)
       │         │
       │         └─→ [slug]/page.tsx (individual doc page)
       │
       └─── getAllSlugs()
                 │
                 └─→ generateStaticParams() (SSG)
```

At build time, `generateStaticParams` calls `getAllSlugs()` and Next.js pre-renders a static HTML page for every slug. At runtime, `getComponentDoc(slug)` looks up the registry and passes metadata to the page.

The sidebar uses `getComponentsByCategory()` to build the grouped nav, filtered client-side by the search query.

---

## Best Practices for Maintaining This System

### ✅ Do

- **Keep slugs stable** — changing a slug is a breaking URL change. Use redirects if needed.
- **Write complete prop tables** — even if a prop is obvious, document it. Users paste prop tables into AI tools.
- **Write real code examples** — the `codeExample` string should be copy-pasteable and work out of the box.
- **Keep preview pages isolated** — preview pages should not import layout wrappers or auth guards. They render in an iframe.
- **Group by semantics** — use `Forms` for input components, `UI` for visual atoms, `Layout` for structural components, `Feedback` for alerts/toasts.

### ❌ Don't

- **Don't hardcode component lists** — always add to `COMPONENT_REGISTRY`, never to JSX directly.
- **Don't duplicate components** — never re-implement a component in a doc page. Always iframe from `/preview/*`.
- **Don't introduce new color values** — use only Antaris CSS tokens (e.g., `text-green-11`, `bg-blue-alpha-3`).
- **Don't use `any` in the registry** — the `ComponentDoc` type enforces correctness. Use proper TypeScript.
- **Don't skip the `summary`** — the summary appears in hover cards and search results. Keep it under 120 chars.

### 📁 File Naming Convention

| File | Convention |
|---|---|
| Preview pages | `app/preview/[kebab-case]/page.tsx` |
| UI components | `components/ui/[kebab-case].tsx` |
| Doc components | `app/component-docs/_components/[PascalCase].tsx` |
| Config | `app/component-docs/config/components.ts` |

---

## Future Enhancements

- **MDX support** — swap `description` strings for `.mdx` files in `app/component-docs/content/[slug].mdx`
- **Theme toggle** — add a `useTheme()` hook to preview the component in both light and dark mode
- **Component search** — Cmd+K command palette using `cmdk` library
- **Version tagging** — add `addedInVersion` to `ComponentDoc` for changelog tracking
- **A11y panel** — tab into the iframe and show accessibility attributes
