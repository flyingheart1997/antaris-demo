import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center font-medium whitespace-nowrap transition-all outline-none select-none active:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        solid: "border-transparent",
        soft: "border-transparent",
        surface: "border",
        outline: "border bg-transparent",
        ghost: "bg-transparent border-transparent",
        link: "bg-transparent border-transparent underline-offset-4 hover:underline",
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
        xl: "h-(--sizing-48) text-[length:var(--text-font-size-xxl)] gap-(--spacing-8) rounded-(--radius-lg) px-(--spacing-18)",
        lg: "h-(--sizing-40) text-[length:var(--text-font-size-xl)] gap-(--spacing-6) rounded-(--radius-lg) px-(--spacing-14)",
        md: "h-(--sizing-32) text-[length:var(--text-font-size-lg)] gap-(--spacing-4) rounded-(--radius-md) px-(--spacing-12)",
        sm: "h-(--sizing-24) text-[length:var(--text-font-size-md)] gap-(--spacing-2) rounded-(--radius-md) px-(--spacing-10)",
        "icon-sm": "h-(--sizing-24) aspect-square p-0 rounded-(--radius-md)",
        "icon-md": "h-(--sizing-32) aspect-square p-0 rounded-(--radius-md)",
        "icon-lg": "h-(--sizing-40) aspect-square p-0 rounded-(--radius-lg)",
        "icon-xl": "h-(--sizing-48) aspect-square p-0 rounded-(--radius-lg)",
      },
      radius: {
        none: "!rounded-none",
        sm: "!rounded-(--radius-sm)",
        md: "!rounded-(--radius-md)",
        lg: "!rounded-(--radius-lg)",
        xl: "!rounded-(--radius-xl)",
        full: "!rounded-full",
      },
    },
    compoundVariants: [
      // Accent (Primary)
      { variant: "solid", intent: "accent", className: "bg-[var(--color-green-9)] text-white hover:bg-[var(--color-green-10)] active:bg-[var(--color-green-11)]" },
      { variant: "soft", intent: "accent", className: "bg-[var(--color-green-alpha-2)] text-[var(--color-green-11)] hover:bg-[var(--color-green-alpha-3)] active:bg-[var(--color-green-alpha-4)]" },
      { variant: "surface", intent: "accent", className: "bg-[var(--color-green-alpha-2)] border-[var(--color-green-7)] text-[var(--color-green-11)] hover:bg-[var(--color-green-alpha-3)] active:bg-[var(--color-green-alpha-4)]" },
      { variant: "outline", intent: "accent", className: "border-[var(--color-green-7)] text-[var(--color-green-11)] hover:bg-[var(--color-green-alpha-2)] active:bg-[var(--color-green-alpha-3)]" },
      { variant: "ghost", intent: "accent", className: "text-[var(--color-green-11)] hover:bg-[var(--color-green-alpha-2)] active:bg-[var(--color-green-alpha-3)]" },

      // Neutral
      { variant: "solid", intent: "neutral", className: "bg-[var(--color-gray-9)] text-white hover:bg-[var(--color-gray-10)] active:bg-[var(--color-gray-11)]" },
      { variant: "soft", intent: "neutral", className: "bg-[var(--color-gray-alpha-2)] text-[var(--color-gray-11)] hover:bg-[var(--color-gray-alpha-3)] active:bg-[var(--color-gray-alpha-4)]" },
      { variant: "surface", intent: "neutral", className: "bg-[var(--color-gray-alpha-2)] border-[var(--color-gray-7)] text-[var(--color-gray-11)] hover:bg-[var(--color-gray-alpha-3)] active:bg-[var(--color-gray-alpha-4)]" },
      { variant: "outline", intent: "neutral", className: "border-[var(--color-gray-7)] text-[var(--color-gray-11)] hover:bg-[var(--color-gray-alpha-2)] active:bg-[var(--color-gray-alpha-3)]" },
      { variant: "ghost", intent: "neutral", className: "text-[var(--color-gray-11)] hover:bg-[var(--color-gray-alpha-2)] active:bg-[var(--color-gray-alpha-3)]" },

      // Success
      { variant: "solid", intent: "success", className: "bg-[var(--color-green-9)] text-white hover:bg-[var(--color-green-10)] active:bg-[var(--color-green-11)]" },
      { variant: "soft", intent: "success", className: "bg-[var(--color-green-alpha-2)] text-[var(--color-green-11)] hover:bg-[var(--color-green-alpha-3)] active:bg-[var(--color-green-alpha-4)]" },
      { variant: "surface", intent: "success", className: "bg-[var(--color-green-alpha-2)] border-[var(--color-green-7)] text-[var(--color-green-11)] hover:bg-[var(--color-green-alpha-3)] active:bg-[var(--color-green-alpha-4)]" },
      { variant: "outline", intent: "success", className: "border-[var(--color-green-7)] text-[var(--color-green-11)] hover:bg-[var(--color-green-alpha-2)] active:bg-[var(--color-green-alpha-3)]" },
      { variant: "ghost", intent: "success", className: "text-[var(--color-green-11)] hover:bg-[var(--color-green-alpha-2)] active:bg-[var(--color-green-alpha-3)]" },

      // Warning
      { variant: "solid", intent: "warning", className: "bg-[var(--color-yellow-9)] text-white hover:bg-[var(--color-yellow-10)] active:bg-[var(--color-yellow-11)]" },
      { variant: "soft", intent: "warning", className: "bg-[var(--color-yellow-alpha-3)] text-[var(--color-yellow-11)] hover:bg-[var(--color-yellow-alpha-4)] active:bg-[var(--color-yellow-alpha-5)]" },
      { variant: "surface", intent: "warning", className: "bg-[var(--color-yellow-alpha-2)] border-[var(--color-yellow-7)] text-[var(--color-yellow-11)] hover:bg-[var(--color-yellow-alpha-3)] active:bg-[var(--color-yellow-alpha-4)]" },
      { variant: "outline", intent: "warning", className: "border-[var(--color-yellow-7)] text-[var(--color-yellow-11)] hover:bg-[var(--color-yellow-alpha-2)] active:bg-[var(--color-yellow-alpha-3)]" },
      { variant: "ghost", intent: "warning", className: "text-[var(--color-yellow-11)] hover:bg-[var(--color-yellow-alpha-2)] active:bg-[var(--color-yellow-alpha-3)]" },

      // Error
      { variant: "solid", intent: "error", className: "bg-[var(--color-red-9)] text-white hover:bg-[var(--color-red-10)] active:bg-[var(--color-red-11)]" },
      { variant: "soft", intent: "error", className: "bg-[var(--color-red-alpha-3)] text-[var(--color-red-11)] hover:bg-[var(--color-red-alpha-4)] active:bg-[var(--color-red-alpha-5)]" },
      { variant: "surface", intent: "error", className: "bg-[var(--color-red-alpha-2)] border-[var(--color-red-7)] text-[var(--color-red-11)] hover:bg-[var(--color-red-alpha-3)] active:bg-[var(--color-red-alpha-4)]" },
      { variant: "outline", intent: "error", className: "border-[var(--color-red-7)] text-[var(--color-red-11)] hover:bg-[var(--color-red-alpha-2)] active:bg-[var(--color-red-alpha-3)]" },
      { variant: "ghost", intent: "error", className: "text-[var(--color-red-11)] hover:bg-[var(--color-red-alpha-2)] active:bg-[var(--color-red-alpha-3)]" },

      // Info
      { variant: "solid", intent: "info", className: "bg-[var(--color-blue-9)] text-white hover:bg-[var(--color-blue-10)] active:bg-[var(--color-blue-11)]" },
      { variant: "soft", intent: "info", className: "bg-[var(--color-blue-alpha-3)] text-[var(--color-blue-11)] hover:bg-[var(--color-blue-alpha-4)] active:bg-[var(--color-blue-alpha-5)]" },
      { variant: "surface", intent: "info", className: "bg-[var(--color-blue-alpha-2)] border-[var(--color-blue-7)] text-[var(--color-blue-11)] hover:bg-[var(--color-blue-alpha-3)] active:bg-[var(--color-blue-alpha-4)]" },
      { variant: "outline", intent: "info", className: "border-[var(--color-blue-7)] text-[var(--color-blue-11)] hover:bg-[var(--color-blue-alpha-2)] active:bg-[var(--color-blue-alpha-3)]" },
      { variant: "ghost", intent: "info", className: "text-[var(--color-blue-11)] hover:bg-[var(--color-blue-alpha-2)] active:bg-[var(--color-blue-alpha-3)]" },
    ],
    defaultVariants: {
      variant: "solid",
      intent: "neutral",
      size: "md",
    },
  }
)

type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

interface ButtonProps
  extends React.ComponentProps<"button">,
  Prettify<VariantProps<typeof buttonVariants>> {
  asChild?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

function Button({
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
}: ButtonProps) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-intent={intent}
      data-size={size}
      data-radius={radius}
      className={cn(buttonVariants({ variant, intent, size, radius, className }))}
      {...props}
    >
      {asChild ? (
        children
      ) : (
        <>
          {leftIcon && <span className="inline-flex shrink-0 items-center justify-center">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="inline-flex shrink-0 items-center justify-center">{rightIcon}</span>}
        </>
      )}
    </Comp>
  )
}

export { Button, buttonVariants }
