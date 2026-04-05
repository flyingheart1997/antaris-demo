import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const cardVariants = cva(
  "inline-flex flex-col relative overflow-hidden backdrop-blur-60 bg-surface-primary transition-all duration-200",
  {
    variants: {
      size: {
        "1": "p-4 rounded-sm",
        "2": "p-8 rounded-md",
        "3": "p-12 rounded-lg",
        "4": "p-16 rounded-lg",
        "5": "p-24 rounded-lg",
        "6": "p-32 rounded-lg",
      },
      state: {
        default: "",
        hover: "hover:bg-green-alpha-2",
        emphasis: "border-(--color-green-7) ring-1 ring-(--color-green-7)",
        disabled: "opacity-50 pointer-events-none",
      },
      stroke: {
        true: "border-[0.5px] border-stroke-primary",
        false: "border-none",
      },
      insetContent: {
        true: "p-0",
        false: "",
      },
    },
    defaultVariants: {
      size: "2",
      state: "default",
      stroke: false,
      insetContent: false,
    },
  }
)

interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, size, state, stroke, insetContent, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="card"
      data-size={size}
      data-state={state}
      className={cn(cardVariants({ size, state, stroke, insetContent, className }))}
      {...props}
    />
  )
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="card-header"
    className={cn("flex flex-col space-y-1.5", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="card-title"
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="card-description"
    className={cn("text-sm text-text-secondary", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} data-slot="card-content" className={cn("", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="card-footer"
    className={cn("flex items-center mt-auto", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
