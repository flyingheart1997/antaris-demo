"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { cva, type VariantProps } from "class-variance-authority"
import { Check, Minus } from "lucide-react"
import { Label } from "@/components/ui/label"

import { cn } from "@/lib/utils"

const checkboxVariants = cva(
  "peer relative shrink-0 transition-all outline-none disabled:pointer-events-none disabled:opacity-50 size-16 rounded-md border",
  {
    variants: {
      variant: {
        surface: "bg-surface-primary/10 backdrop-blur-40 border-gray-10 data-[state=checked]:border-gray-10 data-[state=indeterminate]:border-gray-10 hover:bg-surface-primary/20",
        solid: "bg-surface-secondary border-gray-10 data-[state=checked]:border-gray-10 data-[state=indeterminate]:border-gray-10 hover:bg-surface-hover",
      },
    },
    defaultVariants: {
      variant: "surface",
    },
  }
)

type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
  Prettify<VariantProps<typeof checkboxVariants>> {
  label?: string | number | React.ReactNode
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, variant, label, ...props }, ref) => {
  const checkbox = (
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(checkboxVariants({ variant, className }))}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className={cn("flex items-center justify-center text-text-primary")}
      >
        {props.checked === "indeterminate" ? (
          <Minus className="size-10" strokeWidth={3} />
        ) : (
          <Check className="size-10" strokeWidth={3} />
        )}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )

  if (!label) {
    return checkbox
  }

  return (
    <label
      data-disabled={props.disabled}
      className="flex items-center gap-4 cursor-pointer group data-[disabled=true]:opacity-50 data-[disabled=true]:pointer-events-none"
    >
      {checkbox}
      {label &&
        <Label className="text-md font-regular text-text-primary leading-none select-none">
          {label}
        </Label>
      }
    </label>
  )
})
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
