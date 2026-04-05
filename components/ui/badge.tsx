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
        surface: "border",
        outline: "border bg-transparent",
      },
      state: {
        accent: "",
        neutral: "",
        success: "",
        warning: "",
        error: "",
        info: "",
      },
      size: {
        sm: "h-20 px-5 py-1 text-[11px] rounded-sm",
        md: "h-24 px-6 py-1 text-xs rounded-sm",
        lg: "h-28 px-8 py-1 text-xs rounded-md",
      },
    },
    compoundVariants: [
      // Accent
      { variant: "solid", state: "accent", className: "bg-green-9 text-white shadow-xs" },
      { variant: "soft", state: "accent", className: "bg-green-alpha-2 text-green-11" },
      { variant: "surface", state: "accent", className: "bg-green-alpha-2 border-green-7 text-green-11" },
      { variant: "outline", state: "accent", className: "border-green-7 text-green-11" },

      // Neutral
      { variant: "solid", state: "neutral", className: "bg-gray-9 text-white shadow-xs" },
      { variant: "soft", state: "neutral", className: "bg-gray-alpha-2 text-gray-11" },
      { variant: "surface", state: "neutral", className: "bg-gray-alpha-2 border-gray-7 text-gray-11" },
      { variant: "outline", state: "neutral", className: "border-gray-7 text-gray-11" },

      // Success
      { variant: "solid", state: "success", className: "bg-green-9 text-white shadow-xs" },
      { variant: "soft", state: "success", className: "bg-green-alpha-3 text-green-11" },
      { variant: "surface", state: "success", className: "bg-green-alpha-3 border-green-7 text-green-11" },
      { variant: "outline", state: "success", className: "border-green-7 text-green-11" },

      // Warning
      { variant: "solid", state: "warning", className: "bg-yellow-9 text-black shadow-xs" },
      { variant: "soft", state: "warning", className: "bg-yellow-alpha-3 text-yellow-11" },
      { variant: "surface", state: "warning", className: "bg-yellow-alpha-3 border-yellow-7 text-yellow-11" },
      { variant: "outline", state: "warning", className: "border-yellow-7 text-yellow-11" },

      // Error
      { variant: "solid", state: "error", className: "bg-red-9 text-white shadow-xs" },
      { variant: "soft", state: "error", className: "bg-red-alpha-3 text-red-11" },
      { variant: "surface", state: "error", className: "bg-red-alpha-3 border-red-7 text-red-11" },
      { variant: "outline", state: "error", className: "border-red-7 text-red-11" },

      // Info
      { variant: "solid", state: "info", className: "bg-blue-9 text-white shadow-xs" },
      { variant: "soft", state: "info", className: "bg-blue-alpha-3 text-blue-11" },
      { variant: "surface", state: "info", className: "bg-blue-alpha-3 border-blue-7 text-blue-11" },
      { variant: "outline", state: "info", className: "border-blue-7 text-blue-11" },
    ],
    defaultVariants: {
      variant: "soft",
      state: "accent",
      size: "md",
    },
  }
)

interface BadgeProps
  extends Omit<React.ComponentProps<"span">, "color">,
  VariantProps<typeof badgeVariants> {
  asChild?: boolean
  iconStart?: React.ReactNode
  iconEnd?: React.ReactNode
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({
    className,
    variant,
    state,
    size,
    asChild = false,
    iconStart,
    iconEnd,
    children,
    ...props
  }, ref) => {
    const Comp = asChild ? Slot : "span"

    return (
      <Comp
        ref={ref}
        data-slot="badge"
        data-variant={variant}
        data-state={state}
        data-size={size}
        className={cn(badgeVariants({ variant, state, size }), className)}
        {...props}
      >
        {asChild ? (
          children
        ) : (
          <>
            {iconStart && (
              <span className="inline-flex shrink-0 leading-none" data-slot="badge-icon-start">
                {iconStart}
              </span>
            )}
            <span className="truncate" data-slot="badge-text">
              {children}
            </span>
            {iconEnd && (
              <span className="inline-flex shrink-0 leading-none" data-slot="badge-icon-end">
                {iconEnd}
              </span>
            )}
          </>
        )}
      </Comp>
    )
  }
)
Badge.displayName = "Badge"

export { Badge, badgeVariants }
