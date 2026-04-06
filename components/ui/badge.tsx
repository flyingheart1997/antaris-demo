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
      color: {
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
      // Accent (Primary/Green)
      { variant: "solid", color: "accent", className: "bg-green-9 text-gray-1 hover:bg-green-10 active:bg-green-11 shadow-sm" },
      { variant: "soft", color: "accent", className: "bg-green-alpha-3 text-green-11 hover:bg-green-alpha-4 active:bg-green-alpha-5" },
      { variant: "surface", color: "accent", className: "bg-green-alpha-2 border-green-7 text-green-11 hover:bg-green-alpha-3 active:bg-green-alpha-4" },
      { variant: "outline", color: "accent", className: "border-green-7 text-green-11 hover:bg-green-alpha-2 active:bg-green-alpha-3" },

      // Neutral (Gray)
      { variant: "solid", color: "neutral", className: "bg-gray-12 text-gray-1 hover:bg-gray-11 active:bg-gray-10 shadow-sm" },
      { variant: "soft", color: "neutral", className: "bg-gray-alpha-3 text-gray-12 hover:bg-gray-alpha-4 active:bg-gray-alpha-5" },
      { variant: "surface", color: "neutral", className: "bg-gray-alpha-2 border-gray-7 text-gray-12 hover:bg-gray-alpha-3 active:bg-gray-alpha-4" },
      { variant: "outline", color: "neutral", className: "border-gray-7 text-gray-12 hover:bg-gray-alpha-2 active:bg-gray-alpha-3" },

      // Error (Red)
      { variant: "solid", color: "error", className: "bg-red-9 text-gray-1 hover:bg-red-10 active:bg-red-11 shadow-sm" },
      { variant: "soft", color: "error", className: "bg-red-alpha-3 text-red-11 hover:bg-red-alpha-4 active:bg-red-alpha-5" },
      { variant: "surface", color: "error", className: "bg-red-alpha-2 border-red-7 text-red-11 hover:bg-red-alpha-3 active:bg-red-alpha-4" },
      { variant: "outline", color: "error", className: "border-red-7 text-red-11 hover:bg-red-alpha-2 active:bg-red-alpha-3" },

      // Warning (Yellow/Orange)
      { variant: "solid", color: "warning", className: "bg-yellow-9 text-gray-1 hover:bg-yellow-10 active:bg-yellow-11 shadow-sm" },
      { variant: "soft", color: "warning", className: "bg-yellow-alpha-3 text-yellow-11 hover:bg-yellow-alpha-4 active:bg-yellow-alpha-5" },
      { variant: "surface", color: "warning", className: "bg-yellow-alpha-2 border-yellow-7 text-yellow-11 hover:bg-yellow-alpha-3 active:bg-yellow-alpha-4" },
      { variant: "outline", color: "warning", className: "border-yellow-7 text-yellow-11 hover:bg-yellow-alpha-2 active:bg-yellow-alpha-3" },

      // Info (Blue)
      { variant: "solid", color: "info", className: "bg-blue-9 text-gray-1 hover:bg-blue-10 active:bg-blue-11 shadow-sm" },
      { variant: "soft", color: "info", className: "bg-blue-alpha-3 text-blue-11 hover:bg-blue-alpha-4 active:bg-blue-alpha-5" },
      { variant: "surface", color: "info", className: "bg-blue-alpha-2 border-blue-7 text-blue-11 hover:bg-blue-alpha-3 active:bg-blue-alpha-4" },
      { variant: "outline", color: "info", className: "border-blue-7 text-blue-11 hover:bg-blue-alpha-2 active:bg-blue-alpha-3" },

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
  iconStart?: React.ReactNode
  iconEnd?: React.ReactNode
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({
    className,
    variant,
    color,
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
        data-color={color}
        data-size={size}
        className={cn(badgeVariants({ variant, color, size }), className)}
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
