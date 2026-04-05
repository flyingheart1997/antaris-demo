"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// ---------------------------------------------------------------------------
// Context — propagates variant + size down from TabsList → TabsTrigger
// ---------------------------------------------------------------------------
type TabsContextValue = {
  variant: "surface" | "underline" | "soft"
  size: "sm" | "md" | "lg"
}

const TabsContext = React.createContext<TabsContextValue>({
  variant: "surface",
  size: "md",
})

// ---------------------------------------------------------------------------
// Variant systems
// ---------------------------------------------------------------------------

const tabsListVariants = cva(
  "group/tabs-list relative inline-flex items-center shrink-0 select-none",
  {
    variants: {
      variant: {
        surface:
          "bg-surface-tertiary border border-stroke-primary rounded-lg p-1 gap-0",
        underline:
          "bg-transparent border-b border-stroke-primary rounded-none p-0 gap-0",
        soft:
          "bg-transparent border-none rounded-none p-0 gap-1",
      },
      size: {
        sm: "h-28",
        md: "h-36",
        lg: "h-44",
      },
    },
    compoundVariants: [
      { variant: "underline", size: "sm", className: "h-auto" },
      { variant: "underline", size: "md", className: "h-auto" },
      { variant: "underline", size: "lg", className: "h-auto" },
      { variant: "soft", size: "sm", className: "h-auto" },
      { variant: "soft", size: "md", className: "h-auto" },
      { variant: "soft", size: "lg", className: "h-auto" },
    ],
    defaultVariants: {
      variant: "surface",
      size: "md",
    },
  }
)

const tabsTriggerVariants = cva(
  [
    "group/tabs-trigger relative inline-flex items-center justify-center gap-4 whitespace-nowrap font-medium",
    "transition-all duration-150 outline-none select-none cursor-pointer",
    "disabled:pointer-events-none disabled:opacity-40",
    "focus-visible:ring-2 focus-visible:ring-stroke-selected focus-visible:ring-offset-1",
  ],
  {
    variants: {
      variant: {
        surface: [
          "rounded-md border border-transparent text-text-secondary",
          "hover:text-text-primary hover:bg-surface-hover",
          "data-[state=active]:bg-surface-bg data-[state=active]:text-text-primary data-[state=active]:border-stroke-primary data-[state=active]:shadow-sm",
        ],
        underline: [
          "rounded-none border-none border-b-2 border-b-transparent text-text-secondary",
          "-mb-px",
          "hover:text-text-primary",
          "data-[state=active]:text-text-primary data-[state=active]:border-b-stroke-selected",
        ],
        soft: [
          "rounded-md border border-transparent text-text-secondary",
          "hover:bg-surface-hover hover:text-text-primary",
          "data-[state=active]:bg-green-alpha-3 data-[state=active]:text-green-11 data-[state=active]:border-green-7",
        ],
      },
      size: {
        sm: "h-24 px-8 text-xs gap-2",
        md: "h-32 px-10 text-md gap-4",
        lg: "h-40 px-12 text-lg gap-4",
      },
    },
    defaultVariants: {
      variant: "surface",
      size: "md",
    },
  }
)

// ---------------------------------------------------------------------------
// Tabs Root
// ---------------------------------------------------------------------------
const Tabs = TabsPrimitive.Root
Tabs.displayName = "Tabs"

// ---------------------------------------------------------------------------
// TabsList
// ---------------------------------------------------------------------------
interface TabsListProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>,
  VariantProps<typeof tabsListVariants> { }

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className, variant = "surface", size = "md", ...props }, ref) => (
  <TabsContext.Provider value={{ variant: variant ?? "surface", size: size ?? "md" }}>
    <TabsPrimitive.List
      ref={ref}
      data-slot="tabs-list"
      data-variant={variant}
      data-size={size}
      className={cn(tabsListVariants({ variant, size }), className)}
      {...props}
    />
  </TabsContext.Provider>
))
TabsList.displayName = "TabsList"

// ---------------------------------------------------------------------------
// TabsTrigger
// ---------------------------------------------------------------------------
interface TabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>,
  Partial<VariantProps<typeof tabsTriggerVariants>> {
  /** Optional icon placed before the label */
  iconStart?: React.ReactNode
  /** Optional icon placed after the label */
  iconEnd?: React.ReactNode
  /** Optional badge/count indicator */
  badge?: React.ReactNode
}

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, variant, size, iconStart, iconEnd, badge, children, ...props }, ref) => {
  const ctx = React.useContext(TabsContext)
  const resolvedVariant = variant ?? ctx.variant
  const resolvedSize = size ?? ctx.size

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      data-slot="tabs-trigger"
      data-variant={resolvedVariant}
      data-size={resolvedSize}
      className={cn(
        tabsTriggerVariants({ variant: resolvedVariant, size: resolvedSize }),
        className
      )}
      {...props}
    >
      {iconStart && (
        <span
          className="inline-flex shrink-0 items-center justify-center leading-none text-icon-secondary group-data-[state=active]/tabs-trigger:text-icon-primary"
          data-slot="tabs-trigger-icon-start"
        >
          {iconStart}
        </span>
      )}

      {children && (
        <span className="truncate leading-none" data-slot="tabs-trigger-text">
          {children}
        </span>
      )}

      {badge !== undefined && (
        <span
          className={cn(
            "inline-flex items-center justify-center shrink-0 rounded-sm px-4 py-0 font-medium",
            "bg-gray-alpha-3 text-text-secondary text-xs h-16 min-w-16",
            "group-data-[state=active]/tabs-trigger:bg-green-alpha-3 group-data-[state=active]/tabs-trigger:text-green-11",
          )}
          data-slot="tabs-trigger-badge"
        >
          {badge}
        </span>
      )}

      {iconEnd && (
        <span
          className="inline-flex shrink-0 items-center justify-center leading-none text-icon-secondary group-data-[state=active]/tabs-trigger:text-icon-primary"
          data-slot="tabs-trigger-icon-end"
        >
          {iconEnd}
        </span>
      )}
    </TabsPrimitive.Trigger>
  )
})
TabsTrigger.displayName = "TabsTrigger"

// ---------------------------------------------------------------------------
// TabsContent
// ---------------------------------------------------------------------------
const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    data-slot="tabs-content"
    className={cn(
      "mt-8 outline-none",
      "focus-visible:ring-2 focus-visible:ring-stroke-selected focus-visible:ring-offset-1 rounded-md",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = "TabsContent"

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------
export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  tabsListVariants,
  tabsTriggerVariants,
}
export type { TabsListProps, TabsTriggerProps }
