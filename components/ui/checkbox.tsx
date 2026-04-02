"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { cva, type VariantProps } from "class-variance-authority"
import { Check, Minus } from "lucide-react"

import { cn } from "@/lib/utils"

const checkboxVariants = cva(
  "peer relative shrink-0 transition-all outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        surface: "bg-(--color-surface-bg) border border-(--color-stroke-primary) hover:bg-(--color-surface-hover) data-[state=checked]:border-transparent data-[state=indeterminate]:border-transparent",
        solid: "bg-(--color-gray-alpha-3) border border-transparent hover:bg-(--color-gray-alpha-4) data-[state=checked]:bg-transparent data-[state=indeterminate]:bg-transparent",
      },
      intent: {
        neutral: "data-[state=checked]:bg-(--color-gray-12) data-[state=checked]:text-(--color-gray-1) data-[state=indeterminate]:bg-(--color-gray-12) data-[state=indeterminate]:text-(--color-gray-1)",
        accent: "data-[state=checked]:bg-(--color-accent-9) data-[state=checked]:text-white data-[state=indeterminate]:bg-(--color-accent-9) data-[state=indeterminate]:text-white focus-visible:ring-3 focus-visible:ring-(--color-accent-9)/20",
        success: "data-[state=checked]:bg-(--color-success-9) data-[state=checked]:text-white data-[state=indeterminate]:bg-(--color-success-9) data-[state=indeterminate]:text-white focus-visible:ring-3 focus-visible:ring-(--color-success-9)/20",
        error: "data-[state=checked]:bg-(--color-error-9) data-[state=checked]:text-white data-[state=indeterminate]:bg-(--color-error-9) data-[state=indeterminate]:text-white focus-visible:ring-3 focus-visible:ring-(--color-error-9)/20",
        warning: "data-[state=checked]:bg-(--color-warning-9) data-[state=checked]:text-white data-[state=indeterminate]:bg-(--color-warning-9) data-[state=indeterminate]:text-white focus-visible:ring-3 focus-visible:ring-(--color-warning-9)/20",
        info: "data-[state=checked]:bg-(--color-info-9) data-[state=checked]:text-white data-[state=indeterminate]:bg-(--color-info-9) data-[state=indeterminate]:text-white focus-visible:ring-3 focus-visible:ring-(--color-info-9)/20",
      },
      size: {
        sm: "size-3.5 rounded-(--radius-sm)",
        md: "size-4 rounded-(--radius-sm)",
        lg: "size-5 rounded-(--radius-md)",
        xl: "size-6 rounded-(--radius-md)",
      },
      radius: {
        none: "rounded-none",
        sm: "!rounded-(--radius-sm)",
        md: "!rounded-(--radius-md)",
        lg: "!rounded-(--radius-lg)",
        full: "!rounded-full",
      },
    },
    defaultVariants: {
      variant: "surface",
      intent: "accent",
      size: "md",
    },
  }
)

type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
  Prettify<VariantProps<typeof checkboxVariants>> { }

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, variant, intent, size, radius, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(checkboxVariants({ variant, intent, size, radius, className }))}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      {props.checked === "indeterminate" ? (
        <Minus className={cn(
          size === "sm" ? "size-2.5" : size === "lg" ? "size-4" : size === "xl" ? "size-5" : "size-3"
        )} />
      ) : (
        <Check className={cn(
          size === "sm" ? "size-2.5" : size === "lg" ? "size-4" : size === "xl" ? "size-5" : "size-3"
        )} />
      )}
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
