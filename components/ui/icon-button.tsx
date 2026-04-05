import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils"

const iconButtonVariants = cva(
  "inline-flex shrink-0 items-center justify-center transition-all outline-none select-none active:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-stroke-error aria-invalid:ring-3 aria-invalid:ring-stroke-error/20 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        solid: "border-transparent",
        soft: "border-transparent",
        surface: "border",
        outline: "border bg-transparent",
        ghost: "bg-transparent border-transparent",
      },
      color: {
        accent: "",
        neutral: "",
        error: "",
        warning: "",
        info: "",
      },
      size: {
        sm: "h-24 w-24 rounded-md",
        md: "h-32 w-32 rounded-md",
        lg: "h-40 w-40 rounded-lg",
        xl: "h-48 w-48 rounded-lg",
      },
      radius: {
        md: "rounded-md",
        lg: "rounded-lg",
      },
    },
    compoundVariants: [
      // Accent (Primary)
      { variant: "solid", color: "accent", className: "bg-green-9 text-white hover:bg-green-10 active:bg-green-11 shadow-sm" },
      { variant: "soft", color: "accent", className: "bg-green-alpha-2 text-green-11 hover:bg-green-alpha-3 active:bg-green-alpha-4" },
      { variant: "surface", color: "accent", className: "bg-green-alpha-2 border-green-7 text-green-11 hover:bg-green-alpha-3 active:bg-green-alpha-4" },
      { variant: "outline", color: "accent", className: "border-green-7 text-green-11 hover:bg-green-alpha-2 active:bg-green-alpha-3" },
      { variant: "ghost", color: "accent", className: "text-green-11 hover:bg-green-alpha-2 active:bg-green-alpha-3" },

      // Neutral
      { variant: "solid", color: "neutral", className: "bg-gray-9 text-white hover:bg-gray-10 active:bg-gray-11 shadow-sm" },
      { variant: "soft", color: "neutral", className: "bg-gray-alpha-2 text-gray-11 hover:bg-gray-alpha-3 active:bg-gray-alpha-4" },
      { variant: "surface", color: "neutral", className: "bg-gray-alpha-2 border-gray-7 text-gray-11 hover:bg-gray-alpha-3 active:bg-gray-alpha-4" },
      { variant: "outline", color: "neutral", className: "border-gray-7 text-gray-11 hover:bg-gray-alpha-2 active:bg-gray-alpha-3" },
      { variant: "ghost", color: "neutral", className: "text-gray-11 hover:bg-gray-alpha-2 active:bg-gray-alpha-3" },

      // Error
      { variant: "solid", color: "error", className: "bg-red-9 text-white hover:bg-red-10 active:bg-red-11 shadow-sm" },
      { variant: "soft", color: "error", className: "bg-red-alpha-3 text-red-11 hover:bg-red-alpha-4 active:bg-red-alpha-5" },
      { variant: "surface", color: "error", className: "bg-red-alpha-2 border-red-7 text-red-11 hover:bg-red-alpha-3 active:bg-red-alpha-4" },
      { variant: "outline", color: "error", className: "border-red-7 text-red-11 hover:bg-red-alpha-2 active:bg-red-alpha-3" },
      { variant: "ghost", color: "error", className: "text-red-11 hover:bg-red-alpha-2 active:bg-red-alpha-3" },

      // Warning
      { variant: "solid", color: "warning", className: "bg-yellow-9 text-white hover:bg-yellow-10 active:bg-yellow-11 shadow-sm" },
      { variant: "soft", color: "warning", className: "bg-yellow-alpha-3 text-yellow-11 hover:bg-yellow-alpha-4 active:bg-yellow-alpha-5" },
      { variant: "surface", color: "warning", className: "bg-yellow-alpha-2 border-yellow-7 text-yellow-11 hover:bg-yellow-alpha-3 active:bg-yellow-alpha-4" },
      { variant: "outline", color: "warning", className: "border-yellow-7 text-yellow-11 hover:bg-yellow-alpha-2 active:bg-yellow-alpha-3" },
      { variant: "ghost", color: "warning", className: "text-yellow-11 hover:bg-yellow-alpha-2 active:bg-yellow-alpha-3" },

      // Info
      { variant: "solid", color: "info", className: "bg-blue-9 text-white hover:bg-blue-10 active:bg-blue-11 shadow-sm" },
      { variant: "soft", color: "info", className: "bg-blue-alpha-3 text-blue-11 hover:bg-blue-alpha-4 active:bg-blue-alpha-5" },
      { variant: "surface", color: "info", className: "bg-blue-alpha-2 border-blue-7 text-blue-11 hover:bg-blue-alpha-3 active:bg-blue-alpha-4" },
      { variant: "outline", color: "info", className: "border-blue-7 text-blue-11 hover:bg-blue-alpha-2 active:bg-blue-alpha-3" },
      { variant: "ghost", color: "info", className: "text-blue-11 hover:bg-blue-alpha-2 active:bg-blue-alpha-3" },
    ],
    defaultVariants: {
      variant: "surface",
      color: "accent",
      size: "md",
      radius: "md",
    },
  }
)

interface IconButtonProps
  extends Omit<React.ComponentProps<"button">, "color">,
  VariantProps<typeof iconButtonVariants> {
  asChild?: boolean
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, color, size, radius, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    return (
      <Comp
        ref={ref}
        data-slot="icon-button"
        data-variant={variant}
        data-color={color}
        data-size={size}
        data-radius={radius}
        className={cn(iconButtonVariants({ variant, color, size, radius, className }))}
        {...props}
      />
    )
  }
)
IconButton.displayName = "IconButton"

export { IconButton, iconButtonVariants }
