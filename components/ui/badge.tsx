import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center gap-1 font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        solid: "border-transparent",
        soft: "border-transparent",
        surface: "border",
        outline: "border bg-transparent",
      },
      intent: {
        accent: "",
        neutral: "",
        success: "",
        warning: "",
        error: "",
        info: "",
      },
      size: {
        sm: "h-(--sizing-16) px-(--spacing-4) py-(--spacing-2) text-[length:var(--text-font-size-sm)] min-w-(--sizing-20) gap-(--spacing-4) rounded-(--radius-md)",
        md: "h-(--sizing-24) px-(--spacing-6) py-(--spacing-4) text-[length:var(--text-font-size-md)] min-w-(--sizing-24) gap-(--spacing-4) rounded-(--radius-md)",
        lg: "h-(--sizing-30) px-(--spacing-8) py-(--spacing-6) text-[length:var(--text-font-size-lg)] min-w-(--sizing-30) gap-(--spacing-4) rounded-(--radius-md)",
      },
      radius: {
        none: "!rounded-none",
        sm: "!rounded-(--radius-sm)",
        md: "!rounded-(--radius-md)",
        lg: "!rounded-(--radius-lg)",
        full: "!rounded-full",
      },
    },
    compoundVariants: [
      // Accent (Primary)
      { variant: "solid", intent: "accent", className: "bg-[var(--color-surface-focus)] text-white" },
      { variant: "soft", intent: "accent", className: "bg-[var(--color-green-alpha-2)] text-[var(--color-text-selected)]" },
      { variant: "surface", intent: "accent", className: "bg-[var(--color-green-alpha-2)] border-[var(--color-stroke-selected)] text-[var(--color-text-selected)]" },
      { variant: "outline", intent: "accent", className: "border-[var(--color-stroke-selected)] text-[var(--color-text-selected)]" },

      // Neutral
      { variant: "solid", intent: "neutral", className: "bg-[var(--color-gray-9)] text-white" },
      { variant: "soft", intent: "neutral", className: "bg-[var(--color-gray-alpha-3)] text-[var(--color-text-secondary)]" },
      { variant: "surface", intent: "neutral", className: "bg-[var(--color-gray-alpha-3)] border-[var(--color-stroke-primary)] text-[var(--color-text-secondary)]" },
      { variant: "outline", intent: "neutral", className: "border-[var(--color-stroke-primary)] text-[var(--color-text-secondary)]" },

      // Success
      { variant: "solid", intent: "success", className: "bg-[var(--color-surface-success)] text-white" },
      { variant: "soft", intent: "success", className: "bg-[var(--color-green-alpha-3)] text-[var(--color-text-selected)]" },
      { variant: "surface", intent: "success", className: "bg-[var(--color-green-alpha-3)] border-[var(--color-stroke-success)] text-[var(--color-text-selected)]" },
      { variant: "outline", intent: "success", className: "border-[var(--color-stroke-success)] text-[var(--color-text-selected)]" },

      // Warning
      { variant: "solid", intent: "warning", className: "bg-[var(--color-surface-warnig-hover)] text-white" },
      { variant: "soft", intent: "warning", className: "bg-[var(--color-yellow-alpha-3)] text-[var(--color-text-warning)]" },
      { variant: "surface", intent: "warning", className: "bg-[var(--color-yellow-alpha-3)] border-[var(--color-stroke-warning)] text-[var(--color-text-warning)]" },
      { variant: "outline", intent: "warning", className: "border-[var(--color-stroke-warning)] text-[var(--color-text-warning)]" },

      // Error
      { variant: "solid", intent: "error", className: "bg-[var(--color-surface-error-hover)] text-white" },
      { variant: "soft", intent: "error", className: "bg-[var(--color-red-alpha-3)] text-[var(--color-text-error)]" },
      { variant: "surface", intent: "error", className: "bg-[var(--color-red-alpha-3)] border-[var(--color-stroke-error)] text-[var(--color-text-error)]" },
      { variant: "outline", intent: "error", className: "border-[var(--color-stroke-error)] text-[var(--color-text-error)]" },

      // Info
      { variant: "solid", intent: "info", className: "bg-[var(--color-surface-info-hover)] text-white" },
      { variant: "soft", intent: "info", className: "bg-[var(--color-blue-alpha-3)] text-[var(--color-text-info)]" },
      { variant: "surface", intent: "info", className: "bg-[var(--color-blue-alpha-3)] border-[var(--color-stroke-info)] text-[var(--color-text-info)]" },
      { variant: "outline", intent: "info", className: "border-[var(--color-stroke-info)] text-[var(--color-text-info)]" },
    ],
    defaultVariants: {
      variant: "solid",
      intent: "accent",
      size: "md",
    },
  }
)

interface BadgeProps
  extends React.ComponentProps<"span">,
  VariantProps<typeof badgeVariants> {
  asChild?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

function Badge({
  className,
  variant,
  intent,
  radius,
  size,
  asChild = false,
  leftIcon,
  rightIcon,
  children,
  ...props
}: BadgeProps) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      data-intent={intent}
      data-size={size}
      data-radius={radius}
      className={cn(badgeVariants({ variant, intent, size, radius }), className)}
      {...props}
    >
      {asChild ? (
        children
      ) : (
        <>
          {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
        </>
      )}
    </Comp>
  )
}

export { Badge, badgeVariants }
