# Antaris Design System: Scaling & Tokens

This document outlines the core principles of the Antaris Design System implementation to ensure pixel-perfect fidelity across the platform.

## 📐 Scaling Logic: 1:1 Mapping

Unlike standard Tailwind CSS (where `1 unit = 0.25rem = 4px`), the Antaris Design System uses a **1:1 mapping** between Figma pixels and Tailwind units for spacing, sizing, and typography.

> [!IMPORTANT]
> **1 Tailwind Unit = 1 Figma Pixel**

### Examples:
| Attribute | Figma Value | Antaris Tailwind Class |
| :--- | :--- | :--- |
| **Gap** | 4px | `gap-4` |
| **Padding** | 8px | `p-8` |
| **Height** | 24px | `h-24` |
| **Width** | 100px | `w-100` |
| **Radius** | 4px | `rounded-md` (maps to `--radius-md`) |

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
