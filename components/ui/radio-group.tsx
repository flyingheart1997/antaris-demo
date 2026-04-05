"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { cva, type VariantProps } from "class-variance-authority"

import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

const radioGroupItemVariants = cva(
  "group/radio-item relative inline-flex items-center gap-4 py-4 cursor-pointer outline-none select-none disabled:cursor-not-allowed disabled:pointer-events-none",
  {
    variants: {
      variant: {
        surface: "",
        solid: "",
      },
    },
    defaultVariants: {
      variant: "surface",
    },
  }
)

const radioCircleVariants = cva(
  "relative flex aspect-square size-16 shrink-0 items-center justify-center rounded-full transition-all border",
  {
    variants: {
      variant: {
        surface: [
          "border-stroke-primary bg-transparent",
          "group-hover/radio-item:bg-surface-hover",
          "group-data-[state=checked]/radio-item:border-gray-12",
          "group-disabled/radio-item:border-stroke-disabled group-disabled/radio-item:bg-surface-disabled",
        ],
        solid: [
          "border-stroke-primary bg-transparent",
          "group-hover/radio-item:bg-surface-hover",
          "group-data-[state=checked]/radio-item:bg-surface-bg group-data-[state=checked]/radio-item:border-transparent",
          "group-disabled/radio-item:border-stroke-disabled group-disabled/radio-item:bg-surface-disabled",
        ],
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

interface RadioGroupProps extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> { }

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  )
})
RadioGroup.displayName = "RadioGroup"

interface RadioGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>,
  Prettify<VariantProps<typeof radioGroupItemVariants>> {
  showText?: boolean;
}

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(({ className, variant, showText = true, children, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(radioGroupItemVariants({ variant, className }))}
      {...props}
    >
      <div className={cn(radioCircleVariants({ variant }))}>
        <RadioGroupPrimitive.Indicator
          className="flex items-center justify-center"
        >
          <div className={cn(
            "size-1.75 rounded-full",
            variant === "surface" ? "bg-gray-12" : "bg-white"
          )} />
        </RadioGroupPrimitive.Indicator>
      </div>
      {showText && children && (
        <Label className="cursor-pointer text-text-primary text-md leading-none group-disabled/radio-item:text-text-disabled">
          {children}
        </Label>
      )}
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = "RadioGroupItem"

export { RadioGroup, RadioGroupItem }
