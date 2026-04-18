# Feature: Satellite Catalog Workspace

The Catalog feature is an enterprise-grade hardware registry designed for satellite operators to discover, compare, and select mission-critical components for satellite construction.

## Architecture

The Catalog uses a **Hybrid Responsive State** model for zero-flicker performance:

1.  **URL-Driven Navigation**: All layout states are deep-linkable via `category`, `subSystem`, and `componentId`.
2.  **Modular Logic Separation**:
    -   `useCatalogNavigation`: Managed URL synchronization and context-switching.
    -   `useCatalogGroups`: Encapsulates high-performance filtering and grouping logic.
    -   `useCatalogStats`: Resolves and normalizes technical metrics for visualization.
    -   `useCatalogSelection`: The enrichment bridge that map workspace IDs back to full hardware objects.
3.  **Context-Locked Workspace**: Navigating between categories or subsystems automatically purges selected components and URL IDs to prevent data contamination across different hardware contexts.

## Enterprise Data Model

The Catalog implements a nested hardware schema aligned with the ATMOS backend:

-   **Common Attributes**: Shared metrics like Mass, Dimensions, and Vendor.
-   **Registry Specifics**:
    -   `component_specific_attributes`: Technical data for payload modules (GSD, Swath, etc.).
    -   `bus_specific_attributes`: Performance metrics for satellite platforms (Power Output, Mission Life).

### UI Implementation Patterns

#### Truncation & Tooltips
To maintain layout integrity with high-precision technical data, use the following pattern:
- Enforce `block w-full truncate` on text elements.
- Wrap content in the `Tooltip` component for hover-based reveal.
- Use `minmax(0, 1fr)` grid tracks to allow containers to shrink and trigger truncation.

## File Structure

-   `features/catalog/`
    -   `components/` — Radix-based UI components (Layout, Cards, Preview).
    -   `hooks/`
        -   `use-catalog-navigation.ts` — Engine for URL state management.
        -   `use-catalog-selection.ts` — The Enrichment Bridge (IDs -> Full Objects).
        -   `use-catalog-groups.ts` — Data-agnostic logic for filtering and grouping.
    -   `utils/`
        -   `mock-data.ts` — High-fidelity enterprise hardware registry.
        -   `drawer-configs.ts` — Domain configuration (Icons, Accents).

## Implementation Patterns

Always use the `useCatalogSelection` hook to interact with the catalog. It abstracts away the complexity of URL management and store persistence:

```typescript
const { 
  category, 
  subSystem, 
  selectedComponents, 
  selectComponent,
  setCategory 
} = useCatalogSelection();
```

### Automated UI Truncation
All technical specifications in the catalog cards utilize the `Tooltip` component and CSS truncation to handle high-precision technical values without breaking the layout.

## Logic Overview

| Interaction | Trigger | Resulting URL |
| :--- | :--- | :--- |
| **Category Switch** | Top Icon Click | `?drawer=true&category=bus` (Purges workspace) |
| **Drawer Toggle** | Chevron Click | `?drawer=false...` (Preserves workspace) |
| **Reset Bus** | Bus Icon | `?category=bus&subSystem=null` (Purges workspace) |
| **Deep Link** | Component Tab | `?componentId=8f3c...` |
