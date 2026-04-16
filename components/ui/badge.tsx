import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center gap-4 font-medium transition-all whitespace-nowrap select-none",
  {
    variants: {
      variant: {
        solid: "border-transparent",
        soft: "border-transparent",
        surface: "border-[0.5px]",
        outline: "border-[0.5px] bg-transparent",
      },
      color: {
        accent: "",
        neutral: "",
        success: "",
        warning: "",
        error: "",
        info: "",
      },
      size: {
        sm: "px-4 py-2 text-sm rounded-md gap-4",
        md: "px-6 py-4 text-md rounded-md gap-4",
        lg: "px-8 py-6 text-lg rounded-md gap-4",
      },
    },
    compoundVariants: [
      // Accent (Primary/Green)
      { variant: "solid", color: "accent", className: "bg-surface-focus text-text-primary" },
      { variant: "soft", color: "accent", className: "bg-surface-selected text-text-primary" },
      { variant: "surface", color: "accent", className: "border-stroke-selected text-text-primary" },
      { variant: "outline", color: "accent", className: "bg-surface-selected border-stroke-selected text-text-primary" },

      // Success (Primary/Green)
      { variant: "solid", color: "success", className: "bg-surface-success text-text-focus-subtle" },
      { variant: "soft", color: "success", className: "bg-surface-selected text-text-focus-subtle" },
      { variant: "surface", color: "success", className: "border-stroke-success text-text-focus-subtle" },
      { variant: "outline", color: "success", className: "bg-surface-selected border-stroke-success text-text-focus-subtle" },

      // Neutral (Gray)
      { variant: "solid", color: "neutral", className: "bg-gray-3 text-text-secondary" },
      { variant: "soft", color: "neutral", className: "bg-surface-tertiary text-text-secondary" },
      { variant: "surface", color: "neutral", className: "border-stroke-primary text-text-secondary" },
      { variant: "outline", color: "neutral", className: "border-stroke-primary bg-surface-bg text-text-secondary" },

      // Error (Red)
      { variant: "solid", color: "error", className: "bg-surface-error-hover text-text-error" },
      { variant: "soft", color: "error", className: "bg-surface-error text-text-error" },
      { variant: "surface", color: "error", className: "border-stroke-error text-text-error" },
      { variant: "outline", color: "error", className: "border-stroke-error bg-surface-error text-text-error" },

      // Warning (Yellow/Orange)
      { variant: "solid", color: "warning", className: "bg-surface-warning-hover text-text-warning" },
      { variant: "soft", color: "warning", className: "bg-surface-warning text-text-warning" },
      { variant: "surface", color: "warning", className: "border-stroke-warning text-text-warning" },
      { variant: "outline", color: "warning", className: "border-stroke-warning bg-surface-warning-hover text-text-warning" },

      // Info (Blue)
      { variant: "solid", color: "info", className: "bg-surface-info-hover text-text-info" },
      { variant: "soft", color: "info", className: "bg-surface-info text-text-info" },
      { variant: "surface", color: "info", className: "border-stroke-info text-text-info" },
      { variant: "outline", color: "info", className: "border-stroke-info bg-surface-info text-text-info" },

    ],
    defaultVariants: {
      variant: "soft",
      color: "accent",
      size: "md",
    },
  }
)

interface BadgeProps
  extends Omit<React.ComponentProps<"span">, "color">,
  VariantProps<typeof badgeVariants> {
  asChild?: boolean
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({
    className,
    variant,
    color,
    size,
    children,
    asChild = false,
    ...props
  }, ref) => {
    const Comp = asChild ? Slot : "span"

    return (
      <Comp
        ref={ref}
        data-slot="badge"
        data-variant={variant}
        data-color={color}
        data-size={size}
        className={cn(badgeVariants({ variant, color, size }), className)}
        {...props}
      >
        {children}
      </Comp>
    )
  }
)
Badge.displayName = "Badge"

export { Badge, badgeVariants }
