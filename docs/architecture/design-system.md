# Antaris Design System: Scaling & Tokens

This document outlines the core principles of the Antaris Design System implementation to ensure pixel-perfect fidelity across the platform.

## 📌 Theme Convention: Scaling & Sizing Logic

The Antaris Design System uses a **1:1 mapping** between Figma pixels and Tailwind units for spacing, sizing, and typography. This ensures pixel-perfect fidelity while leveraging Tailwind's utility-first workflow.

### 📐 Scaling Rule
> [!IMPORTANT]
> **1 Tailwind Unit = 1 Figma Pixel**
> For example: `h-24` = 24px, `gap-4` = 4px, `p-8` = 8px.

### 🧠 The Mapping Strategy
To maintain absolute consistency, we follow a strict lookup hierarchy for all styling utilities:

1.  **Antaris Theme (Priority)**: Always check [antaris-theme.css](file:styles/src/antaris-theme.css) and [index.css](file:styles/src/index.css). If a value is mapped to a standard Tailwind key (like `24` or `md`), Tailwind will automatically use the Antaris Design Token.
2.  **Tailwind Defaults (Fallback)**: If a specific value is **not** explicitly defined in our theme configuration, Tailwind will fall back to its own internal default scale.
3.  **Illustrative Examples (Non-Exhaustive)**:
    The following table provides common mappings. This logic applies to **all** CSS properties including width, height, padding, margins, gaps, and border-radius.

| Property | Figma Value | CORRECT Class | INCORRECT Class |
| :--- | :--- | :--- | :--- |
| **Height** | 24px | `h-24` | `h-spacing-24` |
| **Height** | 28px | `h-28` | `h-spacing-28` |
| **Radius** | 4px | `rounded-md` | `rounded-radius-md` |
| **Padding/Gap** | 4px | `p-4` / `gap-4` | `p-spacing-4` |
| **Icon Size** | 12px | `size-12` | `size-spacing-12` |

## 🔤 Typography Scale

The font scale is mapped specifically to handle relative sizing while maintaining pixel precision.

| Token | Pixel Value | Tailwind Class |
| :--- | :--- | :--- |
| `xs` | 10px | `text-sm` |
| `sm` | 11px? (Check `antaris-theme.css`) | `text-sm` |
| `md` | 12px | `text-md` |
| `lg` | 14px | `text-lg` |
| `xl` | 16px | `text-xl` |

## 🎨 Color Tokens

Always use the semantic color tokens provided in `antaris-theme.css`. Do not use hardcoded hex values or generic Tailwind colors (like `blue-500`).

- **Surface**: `bg-surface-bg`, `bg-surface-hover`, `bg-surface-selected`.
- **Text**: `text-text-primary`, `text-text-secondary`, `text-text-disabled`, `text-text-error`.
- **Stroke**: `border-stroke-primary`, `border-stroke-secondary`.

## 🛠 Best Practices

1. **Check the Theme**: Before using a utility class, verify its value in `styles/src/antaris-theme.css` and `styles/src/index.css`.
2. **Avoid Assumptions**: Never assume standard Tailwind spacing. If Figma says 4px, use `-4`.
3. **Use Context**: For components like Context Menus, use React Context to propagate sizing logic (like `md` vs `lg`) to nested children.

## 🔗 Related Documents
- [System Design](file:docs/architecture/system-design.md)
- [API Architecture](file:docs/architecture/api-architecture.md)
- [Data Flow](file:docs/architecture/data-flow.md)
