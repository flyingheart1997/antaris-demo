# Architecture: Component System

## Overview

The Antaris component system is built on three layers:

```
Layer 3 — Composite Components      (components/*.tsx)
           page-shell, data-grid, skeletons, error, empty-state

Layer 2 — Design System Primitives  (components/ui/*.tsx)
           49 components built on Radix UI + CVA + Design Tokens

Layer 1 — Foundation                (Radix UI + Tailwind v4 + CVA + CSS Variables)
```

---

## CVA — Class Variance Authority

CVA is the variant system used across all design system components. It replaces manual `cn()` conditionals with a structured, type-safe variant API.

### How CVA Works

```typescript
import { cva, type VariantProps } from 'class-variance-authority'

const buttonVariants = cva(
    // base classes — always applied
    "inline-flex items-center font-medium transition-all ...",
    {
        variants: {
            variant: {
                solid:   "border-transparent",
                soft:    "border-transparent",
                surface: "border",
                outline: "border bg-transparent",
                ghost:   "bg-transparent border-transparent",
            },
            color: {
                accent:  "",   // compound variants handle the actual colors
                neutral: "",
                error:   "",
                warning: "",
                info:    "",
            },
            size: {
                sm: "h-24 px-10 text-md gap-4 rounded-md",
                md: "h-32 px-12 text-lg gap-4 rounded-md",
                lg: "h-40 px-14 text-xl gap-6 rounded-lg",
                xl: "h-48 px-18 text-xxl gap-8 rounded-lg",
            },
        },
        // compoundVariants handle variant × color combinations
        compoundVariants: [
            {
                variant: "solid",
                color: "accent",
                className: "bg-green-9 text-gray-1 hover:bg-green-10 ..."
            },
            {
                variant: "solid",
                color: "error",
                className: "bg-red-9 text-text-primary hover:bg-red-10 ..."
            },
            // ... all 25 combinations (5 variants × 5 colors)
        ],
        defaultVariants: {
            variant: "surface",
            color: "accent",
            size: "md",
        },
    }
)
```

### Using CVA in a Component

```typescript
interface ButtonProps
    extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {     // ← infers variant/color/size as props
    asChild?: boolean
    leadingIcon?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, color, size, ...props }, ref) => (
        <button
            className={cn(buttonVariants({ variant, color, size, className }))}
            ref={ref}
            {...props}
        />
    )
)
```

`VariantProps<typeof buttonVariants>` automatically generates the TypeScript types for `variant`, `color`, `size` from the CVA definition — no manual interface needed.

---

## Radix UI — Headless Primitive Layer

Most interactive components are built on [Radix UI](https://radix-ui.com) primitives. Radix provides:
- **Accessibility** — ARIA attributes, keyboard navigation, focus management
- **Behavior** — open/close state, portal rendering, animation hooks
- **No styles** — we own 100% of the visual design

### Pattern: Radix → Styled Wrapper

```typescript
// components/ui/dialog.tsx
import * as DialogPrimitive from '@radix-ui/react-dialog'

// Re-export root as-is
const Dialog = DialogPrimitive.Root

// Style the overlay
const DialogOverlay = React.forwardRef<...>(({ className, ...props }, ref) => (
    <DialogPrimitive.Overlay
        ref={ref}
        className={cn(
            "fixed inset-0 z-50 bg-surface-overlay/80 backdrop-blur-sm",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            className
        )}
        {...props}
    />
))

// Style the content panel
const DialogContent = React.forwardRef<...>(({ className, children, ...props }, ref) => (
    <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Content
            ref={ref}
            className={cn(
                "fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]",
                "bg-surface-bg border border-stroke-primary rounded-2xl shadow-2xl",
                className
            )}
            {...props}
        >
            {children}
        </DialogPrimitive.Content>
    </DialogPortal>
))
```

All Radix state attributes (`data-state`, `data-open`, `data-disabled`) are available for styling via Tailwind's `data-*` variant system.

---

## Component Categories

### 1. Primitive Inputs

| Component | File | Radix Base | CVA |
|---|---|---|---|
| Button | `button.tsx` | Radix Slot | Yes — variant, color, size, radius |
| Icon Button | `icon-button.tsx` | Custom | Yes |
| Input | `input.tsx` | Custom | Yes — variant (surface, solid), size (md, lg) |
| Textarea | `textarea.tsx` | Custom | Yes — variant (surface, solid) |
| Checkbox | `checkbox.tsx` | Radix Checkbox | Yes — variant (surface, solid) |
| Radio Group | `radio-group.tsx` | Radix Radio | Yes — variant (surface, solid) |
| Select | `select.tsx` | Radix Select | Yes — variant, color, size on root |
| Tabs | `tabs.tsx` | Radix Tabs | Yes — size on root |
| Drawer | `drawer.tsx` | Collapsible | Yes — active selection on root |

### 2. Overlay Components

| Component | File | Radix Base | Notes |
|---|---|---|---|
| Dialog | `dialog.tsx` | Radix Dialog | Full-screen modal |
| Alert Dialog | `alert-dialog.tsx` | Radix AlertDialog | Confirmation modal |
| Sheet | `sheet.tsx` | Radix Dialog | Side drawer |
| Drawer | `drawer.tsx` | Collapsible | Sidebar navigation icon drawer. Uses root `active` prop for CSS-driven selection highlight. Structure: `Drawer` → `DrawerTrigger`, `DrawerContainer`, `DrawerItem`. |
| Dropdown Menu | `dropdown-menu.tsx` | Radix DropdownMenu | Context menus |
| Tooltip | `tooltip.tsx` | Radix Tooltip | Hover hints |

### 3. Display Components

| Component | File | CVA | Notes |
|---|---|---|---|
| Avatar | `avatar.tsx` | Yes — size, color | With AvatarIndicator status dot |
| Badge | `badge.tsx` | Yes | Small status label |
| Card | `card/index.tsx` | Yes — size (1-4), state (default/emphasis/disabled), selected | Content container with Figma selected-state mask overlay |
| Text | `text.tsx` | Yes — type, size, weight, color | Typography |
| Skeleton | `skeleton.tsx` | No | Loading placeholder shimmer |
| Separator | `separator.tsx` | Radix Separator | Visual divider |

### 4. Navigation & Layout

| Component | File | Notes |
|---|---|---|
| Tabs | `tabs.tsx` | Radix Tabs |
| Accordion | `accordion.tsx` | Radix Accordion |
| Collapsible | `collapsible.tsx` | Radix Collapsible |
| Sidebar | `sidebar/index.tsx` | Complex — ~600 lines, animated, mobile-aware |
| Scroll Area | `scroll-area.tsx` | Radix ScrollArea — custom scrollbars |
| Resizable | `resizable.tsx` | react-resizable-panels |

### 5. Animation Components

| Component | File | Library | Usage |
|---|---|---|---|
| TextEffect | `text-effect.tsx` | Framer Motion | Letter/word reveal animations |
| AnimatedGroup | `animated-group.tsx` | Framer Motion | Stagger animation container |

### 6. Form Integration

| Component | File | Notes |
|---|---|---|
| Form | `form.tsx` | React Hook Form wrapper — FormField, FormItem, FormLabel, FormControl, FormMessage |
| Label | `label.tsx` | Radix Label — tied to input via `htmlFor` |
| Field | `field.tsx` | Custom field wrapper. Recommended pattern: Use **FieldInput**, **FieldArea**, or **InputGroup** inside `FieldContent` for full state propagation (focus, error, disabled). |

---

## Button — Full Variant Reference

The Button is the most complex CVA component. Full variant matrix:

### Variants

| `variant` | Visual style |
|---|---|
| `solid` | Filled background — primary actions |
| `soft` | Low-opacity tinted background — secondary actions |
| `surface` | Tinted background + border — emphasized secondary |
| `outline` | Transparent + border — tertiary |
| `ghost` | Transparent, no border — toolbar/icon-adjacent |

### Colors

| `color` | Semantic meaning | Token base |
|---|---|---|
| `accent` | Primary brand action | `green-*` palette |
| `neutral` | Default/secondary | `gray-*` palette |
| `error` | Destructive action | `red-*` palette |
| `warning` | Caution | `yellow-*` palette |
| `info` | Informational | `blue-*` palette |

### Sizes

| `size` | Height | Usage |
|---|---|---|
| `sm` | 24px | Compact toolbars |
| `md` | 32px | Default |
| `lg` | 40px | Prominent CTA |
| `xl` | 48px | Hero CTA |

### Extra Props

```typescript
// Icons are passed as children — no leadingIcon/trailingIcon props
<Button
    variant="solid"
    color="accent"
    size="lg"
    radius="full"       // none | md | lg | xl | full
    asChild             // renders as child element (e.g., <Link>)
    selected            // sets aria-pressed + data-selected
    advanced            // adds animated corner accent borders on hover
>
    <PlusIcon />        {/* leading icon — first child */}
    Create Operator
    <ChevronRightIcon />{/* trailing icon — last child */}
</Button>
```

### `asChild` Pattern

```typescript
// Renders as <a> — no nested <a><button> invalid HTML
<Button asChild variant="outline" color="neutral">
    <Link href="/users">View Operators</Link>
</Button>
```

---

## Avatar — Variant Reference

```typescript
<Avatar size="4" color="blue">   {/* color: green | blue | yellow | white | red */}
    <AvatarImage src={user.avatar} alt={user.name} />
    <AvatarFallback size="4">{user.name.substring(0, 2)}</AvatarFallback>
    <AvatarIndicator
        color="green"             // green | blue | yellow | white | red
        size="4"                  // must match parent Avatar size
        position="bottom-right"   // top-right | bottom-right
    />
</Avatar>
```

Sizes 1–6 map to: 16px / 24px / 32px / 40px / 48px / 56px.

---

## Composite Components (`components/*.tsx`)

These are application-level components that compose UI primitives with data-loading patterns.

### `PageShell` (`components/page-shell.tsx`)

Page layout wrapper for all content pages.

```typescript
<PageShell
    title="Operators"
    description="Manage all system operators and their profiles."
    actions={<CreateUserButton />}      // rendered top-right
>
    {children}
</PageShell>
```

### `DataGrid` (`components/data-grid.tsx`)

Generic list renderer wired to `useSuspenseQuery`. Must be inside a `<Suspense>` boundary.

```typescript
<DataGrid<User>
    queryOptions={trpc.user.list.queryOptions() as any}
    renderItem={(user) => <UserCard user={user} />}
    emptyProps={{
        icon: Users,
        title: "No Operators Found",
        description: "...",
        actionLabel: "Add Operator",
        onAction: openCreate,
    }}
/>
```

- Throws an error if `response.success === false` → caught by error boundary
- Shows `EmptyState` if `response.data.length === 0`
- Renders a 4-column responsive grid otherwise

### `EmptyState` (`components/empty-state.tsx`)

```typescript
<EmptyState
    icon={Users}
    title="No Operators Found"
    description="Start by creating your first team member."
    actionLabel="Add Operator"
    onAction={openCreate}
/>
```

### `ErrorView` (`components/error.tsx`)

```typescript
<ErrorView
    error={error}           // optional Error object (shows digest if present)
    reset={reset}           // optional reset function (shows "Try Again" button)
    title="Custom title"    // default: "Something went wrong"
    description="..."       // default: generic error message
/>
```

Used by: `app/error.tsx` (global error boundary), `app/users/[userId]/page.tsx` (inline error).

---

## `cn()` Utility

All components use `cn()` for className composition:

```typescript
import { cn } from '@/lib/utils'

// cn = clsx + tailwind-merge
// clsx: handles conditional classes, arrays, objects
// tailwind-merge: resolves Tailwind conflicts (bg-red-500 wins over bg-green-500)

cn("base-class", conditional && "conditional-class", className)
// className prop always wins — allows safe overrides from consumers
```

---

---

## Pattern: CSS-Driven Selection State

For composite components like `Select` or `Drawer`, we follow a "Root-Prop" pattern. This centralizes state and styling logic at the root, using CSS data attributes and Tailwind `group` modifiers to drive the design of child components.

### Key Principles

1. **Root-Level Props**: Move configuration props (`variant`, `color`, `size`, `active`) to the parent component.
2. **Data Attributes**: The root component applies these props as `data-*` attributes (e.g., `data-active={active}`).
3. **Group Modifiers**: Use `group/name` on the root and `group-data-[active=true]/name:` on children.
4. **Context-Free Propagation**: For portal components (like `SelectContent`), use lightweight prop propagation (`React.Children.map`) to pass size/variant info, keeping the DOM tree clean.

### Example: Drawer

```typescript
// Root level
<Drawer active={isCurrent}>
  <DrawerTrigger>...</DrawerTrigger>
</Drawer>

// Internal Trigger
<CollapsibleTrigger 
  className="group-data-[active=true]/drawer:bg-green-alpha-2 ..."
/>
```

### Example: Select

```typescript
// Root level
<Select size="lg" variant="solid">
  <SelectTrigger />
  <SelectContent>...</SelectContent>
</Select>
```

### Example: Tabs

```typescript
// Root level
<Tabs size="lg">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
  </TabsList>
</Tabs>
```

---

## Adding a New Component

1. Create `components/ui/your-component.tsx`
2. Define CVA variants if the component has visual states
3. Build on Radix if it has interactive/overlay behavior
4. Use design tokens (never raw colors)
5. Export from the file — no barrel `index.ts` in `components/ui/`
6. Document in `docs/features/design-system.md` component list
7. Add a preview page at `app/preview/your-component/page.tsx`
