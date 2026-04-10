import * as React from "react"
import { Fragment } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils"

const iconButtonVariants = cva(
  "inline-flex group/button relative shrink-0 items-center justify-center transition-all outline-none select-none active:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-stroke-error aria-invalid:ring-3 aria-invalid:ring-stroke-error/20 [&_svg]:pointer-events-none [&_svg]:shrink-0",
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
        none: "rounded-none",
        md: "rounded-md",
        full: "rounded-full",
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
)

interface IconButtonProps
  extends Omit<React.ComponentProps<"button">, "color">,
  VariantProps<typeof iconButtonVariants> {
  asChild?: boolean
  selected?: boolean
  advanced?: boolean
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, color, size, radius, asChild = false, selected, advanced = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    return (
      <Comp
        ref={ref}
        data-slot="icon-button"
        data-variant={variant}
        data-selected={selected ? "true" : undefined}
        data-advanced={advanced ? "true" : undefined}
        aria-pressed={selected}
        data-color={color}
        data-size={size}
        data-radius={radius}
        className={cn(iconButtonVariants({ variant, color, size, radius, className }))}
        {...props}
      >
        {asChild ? (
          children
        ) : (
          <Fragment>
            {advanced && (
              <Fragment>
                <span className="absolute -top-[1.5px] -left-[1.5px] size-8 border-t-[1.5px] border-l-[1.5px] border-green-9 rounded-tl-sm transition-all duration-300 ease-out group-hover/button:-top-4 group-hover/button:-left-4" />
                <span className="absolute -top-[1.5px] -right-[1.5px] size-8 border-t-[1.5px] border-r-[1.5px] border-green-9 rounded-tr-sm transition-all duration-300 ease-out group-hover/button:-top-4 group-hover/button:-right-4" />
                <span className="absolute -bottom-[1.5px] -left-[1.5px] size-8 border-b-[1.5px] border-l-[1.5px] border-green-9 rounded-bl-sm transition-all duration-300 ease-out group-hover/button:-bottom-4 group-hover/button:-left-4" />
                <span className="absolute -bottom-[1.5px] -right-[1.5px] size-8 border-b-[1.5px] border-r-[1.5px] border-green-9 rounded-br-sm transition-all duration-300 ease-out group-hover/button:-bottom-4 group-hover/button:-right-4" />
              </Fragment>
            )}
            {children}
          </Fragment>
        )}
      </Comp>
    )
  }
)
IconButton.displayName = "IconButton"

export { IconButton, iconButtonVariants }
