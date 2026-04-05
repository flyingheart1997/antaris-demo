# Antaris Design System - Styling Guide

This guide ensures that all future components align with the Antaris Design System and use Tailwind v4 utilities correctly.

## 🚀 Tailwind v4 Theme Rules

The project uses Tailwind v4 with theme tokens mapped directly in `styles/src/antaris-theme.css`. To ensure utilities work correctly, follow these naming conventions:

### 1. Spacing & Sizing
**NEVER** use `h-spacing-32` or `px-spacing-10`.
**ALWAYS** use the numeric suffix or the functional notation.

| Value | Correct Utility | Description |
| :--- | :--- | :--- |
| `dim-32` | `h-32` / `w-32` | Height/Width of 32px |
| `dim-10` | `px-10` / `m-10` | Spacing of 10px |
| `dim-4` | `gap-4` | Gap of 4px |

*Note: In Tailwind v4, if `--spacing-32` is defined in `@theme`, then `h-32` automatically uses that value.*

### 2. Typography
**NEVER** use `text-font-size-md`.
**ALWAYS** use the clean utility names.

| Token | Correct Utility |
| :--- | :--- |
| `font-size-xs` | `text-xs` |
| `font-size-sm` | `text-sm` |
| `font-size-md` | `text-md` |
| `font-size-lg` | `text-lg` |
| `font-size-xl` | `text-xl` |
| `font-size-xxl` | `text-xxl` |

### 3. Border Radius
**NEVER** use `rounded-radius-md`.
**ALWAYS** use standard radius utilities.

| Token | Correct Utility |
| :--- | :--- |
| `radius-sm` | `rounded-sm` |
| `radius-md` | `rounded-md` |
| `radius-lg` | `rounded-lg` |
| `radius-rounded` | `rounded-full` / `rounded-rounded` |

---

## 🎨 Color System
Use semantic tokens whenever possible.

- **Backgrounds**: `bg-surface-bg`, `bg-surface-primary`, `bg-surface-secondary`, `bg-surface-hover`.
- **Borders**: `border-stroke-primary`, `border-stroke-secondary`, `border-stroke-selected`.
- **Text**: `text-text-primary`, `text-text-secondary`, `text-text-disabled`, `text-text-selected`.
- **Icons**: `text-icon-primary`, `text-icon-secondary`.

---

## 💡 Best Practices
1.  **Check existing components**: Before building a new component, check `components/ui/button.tsx` or `components/ui/input.tsx` for usage patterns.
2.  **Use CVA for variants**: Always use `class-variance-authority` (CVA) to manage component variants (size, color, weight).
3.  **Renaming `intent` to `color`**: For consistency with Antaris/Figma naming, use `color` for variants unless it specifically refers to a semantic purpose better described by another name.
