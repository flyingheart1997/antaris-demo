import * as React from "react"
import { Fragment } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button relative inline-flex shrink-0 items-center justify-center font-medium whitespace-nowrap transition-all outline-none select-none active:translate-y-px disabled:pointer-events-none aria-invalid:border-stroke-error aria-invalid:ring-3 aria-invalid:ring-stroke-error/20 [&_svg]:pointer-events-none [&_svg]:shrink-0",
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
        sm: "h-24 px-10 text-md gap-4 rounded-md",
        md: "h-32 px-12 text-lg gap-4 rounded-md",
        lg: "h-40 px-14 text-xl gap-6 rounded-lg",
        xl: "h-48 px-18 text-xxl gap-8 rounded-lg",
      },
      radius: {
        none: "rounded-none",
        md: "rounded-md",
        full: "rounded-rounded",
        lg: "rounded-lg",
        xl: "rounded-xl",
      },
    },
    compoundVariants: [
      // Accent (Primary/Green)
      { variant: "solid", color: "accent", className: "bg-green-9 text-gray-1 hover:bg-green-10 active:bg-green-5 active:text-text-selected disabled:bg-gray-3 disabled:text-text-disabled" },
      { variant: "soft", color: "accent", className: "bg-green-alpha-2 text-text-primary hover:bg-green-alpha-4 hover:text-text-selected active:bg-green-alpha-3 active:text-text-selected disabled:bg-gray-alpha-3 disabled:text-text-disabled" },
      { variant: "surface", color: "accent", className: "bg-green-alpha-2 text-text-primary border border-stroke-selected hover:bg-green-alpha-4 hover:text-text-selected active:border-stroke-primary active:bg-green-alpha-3 active:text-text-selected disabled:bg-gray-alpha-3 disabled:text-text-disabled disabled:border-stroke-primary" },
      { variant: "outline", color: "accent", className: "border border-stroke-selected text-text-secondary hover:bg-green-alpha-3 hover:text-text-selected active:border-stroke-primary active:bg-green-alpha-2 active:text-text-selected disabled:bg-gray-alpha-2 disabled:text-text-disabled disabled:border-stroke-primary" },
      { variant: "ghost", color: "accent", className: "text-text-secondary hover:bg-green-alpha-4 hover:text-text-primary active:bg-green-alpha-3 active:text-text-selected disabled:bg-gray-alpha-2 disabled:text-text-disabled" },

      // Neutral (Gray)
      { variant: "solid", color: "neutral", className: "bg-gray-11 text-gray-1 hover:bg-gray-10 active:bg-gray-6 active:text-text-primary disabled:bg-gray-3 disabled:text-text-disabled" },
      { variant: "soft", color: "neutral", className: "bg-gray-alpha-2 text-text-primary hover:bg-gray-alpha-4 active:bg-gray-alpha-3 disabled:bg-gray-alpha-3 disabled:text-text-disabled" },
      { variant: "surface", color: "neutral", className: "bg-gray-alpha-2 text-text-primary border border-stroke-primary hover:bg-gray-alpha-6 active:bg-gray-alpha-4 disabled:bg-gray-alpha-3 disabled:text-text-disabled" },
      { variant: "outline", color: "neutral", className: "border border-stroke-primary text-text-secondary hover:bg-gray-alpha-4 hover:text-text-primary active:bg-gray-alpha-3 active:text-text-primary disabled:bg-gray-alpha-2 disabled:text-text-disabled" },
      { variant: "ghost", color: "neutral", className: "text-text-secondary hover:bg-gray-alpha-5 hover:text-text-primary active:bg-gray-alpha-3 active:text-text-primary disabled:bg-gray-alpha-2 disabled:text-text-disabled" },

      // Error (Red)
      { variant: "solid", color: "error", className: "bg-red-9 text-text-primary hover:bg-red-10 active:bg-red-4 active:text-text-error-subtle disabled:bg-gray-3 disabled:text-text-disabled" },
      { variant: "soft", color: "error", className: "bg-red-alpha-2 text-text-primary hover:bg-red-alpha-4 hover:text-text-error active:bg-red-alpha-3 active:text-text-error disabled:bg-gray-alpha-3 disabled:text-text-disabled" },
      { variant: "surface", color: "error", className: "bg-red-alpha-2 text-text-primary border border-stroke-error hover:bg-red-alpha-4 hover:text-text-error active:bg-red-alpha-3 active:text-text-error disabled:bg-gray-alpha-3 disabled:text-text-disabled disabled:border-stroke-primary" },
      { variant: "outline", color: "error", className: "border border-stroke-error text-text-secondary hover:bg-red-alpha-3 hover:text-text-error active:bg-red-alpha-2 active:text-text-error disabled:bg-gray-alpha-2 disabled:text-text-disabled disabled:border-stroke-primary" },
      { variant: "ghost", color: "error", className: "text-text-secondary hover:bg-red-alpha-4 hover:text-text-primary active:bg-red-alpha-3 active:text-text-error disabled:bg-gray-alpha-2 disabled:text-text-disabled" },

      // Warning (Yellow/Orange)
      { variant: "solid", color: "warning", className: "bg-yellow-9 text-gray-1 hover:bg-yellow-10 active:bg-yellow-5 active:text-text-warning disabled:bg-gray-3 disabled:text-text-disabled" },
      { variant: "soft", color: "warning", className: "bg-yellow-alpha-2 text-text-primary hover:bg-yellow-alpha-4 hover:text-text-warning active:bg-yellow-alpha-3 active:text-text-warning disabled:bg-gray-alpha-3 disabled:text-text-disabled" },
      { variant: "surface", color: "warning", className: "bg-yellow-alpha-2 text-text-primary border border-stroke-warning hover:bg-yellow-alpha-4 hover:text-text-warning active:bg-yellow-alpha-3 active:text-text-warning disabled:bg-gray-alpha-3 disabled:text-text-disabled disabled:border-stroke-primary" },
      { variant: "outline", color: "warning", className: "border border-stroke-warning text-text-secondary hover:bg-yellow-alpha-3 hover:text-text-warning active:bg-yellow-alpha-2 active:text-text-warning disabled:bg-gray-alpha-2 disabled:text-text-disabled disabled:border-stroke-primary" },
      { variant: "ghost", color: "warning", className: "text-text-secondary hover:bg-yellow-alpha-4 hover:text-text-primary active:bg-yellow-alpha-3 active:text-text-warning disabled:bg-gray-alpha-2 disabled:text-text-disabled" },

      // Info (Blue)
      { variant: "solid", color: "info", className: "bg-blue-9 text-gray-1 hover:bg-blue-10 active:bg-blue-5 active:text-text-info disabled:bg-gray-3 disabled:text-text-disabled" },
      { variant: "soft", color: "info", className: "bg-blue-alpha-2 text-text-primary hover:bg-blue-alpha-4 hover:text-text-info active:bg-blue-alpha-3 active:text-text-info disabled:bg-gray-alpha-3 disabled:text-text-disabled" },
      { variant: "surface", color: "info", className: "bg-blue-alpha-2 text-text-primary border border-stroke-info hover:bg-blue-alpha-4 hover:text-text-info active:bg-blue-alpha-3 active:text-text-info disabled:bg-gray-alpha-3 disabled:text-text-disabled disabled:border-stroke-primary" },
      { variant: "outline", color: "info", className: "border border-stroke-info text-text-secondary hover:bg-blue-alpha-3 hover:text-text-info active:bg-blue-alpha-2 active:text-text-info disabled:bg-gray-alpha-2 disabled:text-text-disabled disabled:border-stroke-primary" },
      { variant: "ghost", color: "info", className: "text-text-secondary hover:bg-blue-alpha-4 hover:text-text-primary active:bg-blue-alpha-3 active:text-text-info disabled:bg-gray-alpha-2 disabled:text-text-disabled" },
    ],
    defaultVariants: {
      variant: "surface",
      color: "accent",
      size: "md",
      radius: "md",
    },
  }
);


interface ButtonProps
  extends Omit<React.ComponentProps<"button">, "color">,
  VariantProps<typeof buttonVariants> {
  selected?: boolean
  advanced?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className,
    variant,
    color,
    radius,
    size,
    selected = false,
    advanced = false,
    children,
    ...props
  }, ref) => {

    return (
      <button
        ref={ref}
        data-slot="button"
        data-variant={variant}
        data-color={color}
        data-size={size}
        data-radius={radius}
        data-selected={selected ? "true" : undefined}
        data-advanced={advanced ? "true" : undefined}
        aria-pressed={selected}
        className={cn(buttonVariants({ variant, color, size, radius, className }))}
        {...props}
      >
        {children}
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
