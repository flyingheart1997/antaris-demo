# Feature: Satellite Catalog Workspace

The Catalog feature is a high-performance hardware browser designed for satellite operators to discover, compare, and select mission-critical components.

## Architecture

We use a **Hybrid State Management** model to ensure zero-flicker performance and persistence:

1. **Navigation & UI State (URL)**: `category`, `subSystem`, `componentId`, and **`drawer`** (open/close) are stored in the URL search parameters. This makes the entire workspace state deep-linkable and shareable.
2. **Workspace Persistence (Zustand)**: `selectedComponents` stores the list of persistent **IDs** in LocalStorage.
3. **Enrichment Layer**: The `useCatalogSelection` hook bridges the URL and LocalStorage, mapping IDs to full objects for UI consumption.

## Terminology

| Term | Scope | Values |
| :--- | :--- | :--- |
| `category` | URL Parameter | `payload`, `bus` |
| `subSystem` | URL Parameter | `eps`, `adcs`, `comms`, etc. |
| `componentId` | URL Parameter | The active component being viewed |
| `drawer` | URL Parameter | `true` (open) \| `false` (closed) |
| `selectedComponents` | Zustand Store | Array of item IDs in the user's workspace |

## File Structure

- `features/catalog/`
  - `components/` — UI components (Layout, Sidebar, Preview)
  - `hooks/`
    - `use-catalog-navigation.ts` — Manages URL state and toggle logic
    - `use-catalog-selection.ts` — The Enrichment Bridge
  - `store/`
    - `catalog-store.ts` — Persistent Thin Store (IDs only)
  - `types/` — Shared Zod schemas and TypeScript interfaces
  - `utils/`
    - `drawer-configs.ts` — Domain configuration (Icons, Labels)

## Implementation Pattern

To access the catalog state, always use the `useCatalogSelection` hook. The toggle logic for drawers is encapsulated within `setCategory`:

```typescript
const { 
  category, 
  subSystem, 
  drawer,
  setCategory 
} = useCatalogSelection();

// setCategory handles differentiated toggle logic for Payload and Bus
<Button onClick={() => setCategory('payload')}>Toggle Payload</Button>
```

> [!TIP]
> **Zero-Flicker Toggle**: By moving the `drawer` state to the URL, we eliminate hydration flicker. The server knows whether to render the drawer as open or closed before the page even reaches the user.
