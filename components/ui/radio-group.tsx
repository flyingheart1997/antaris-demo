"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const radioGroupItemVariants = cva(
  "group/radio-group-item peer relative aspect-square shrink-0 rounded-full border border-stroke-primary transition-all outline-none focus-visible:ring-3 focus-visible:ring-surface-selected/50 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-5 aria-invalid:border-text-error data-[state=checked]:bg-surface-primary data-[state=checked]:border-transparent",
  {
    variants: {
      size: {
        sm: "size-3.5",
        md: "size-4",
        lg: "size-5",
        xl: "size-6",
      },
    },
    defaultVariants: {
      size: "md",
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
  Prettify<VariantProps<typeof radioGroupItemVariants>> { }

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(({ className, size, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(radioGroupItemVariants({ size, className }))}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        className="flex h-full w-full items-center justify-center"
      >
        <div className={cn(
          "rounded-full bg-white",
          size === "sm" ? "size-1.5" : size === "lg" ? "size-2.5" : size === "xl" ? "size-3" : "size-2"
        )} />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = "RadioGroupItem"

export { RadioGroup, RadioGroupItem }
