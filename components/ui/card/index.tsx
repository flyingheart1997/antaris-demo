import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { CardMask } from "./card-mask"

/**
 * Card variant styles.
 *
 * state.default  — Figma: gray-3 bg + primary surface shadow + blur(30px)
 * state.emphasis — Figma: green-alpha-2 bg + primary surface shadow + blur(30px)
 * state.hover    — green-alpha-2 bg + green-alpha-4 border on hover
 * state.disabled — 50% opacity, non-interactive
 *
 * Shadow spec (Figma: effects/shadow/surface/primary):
 *   box-shadow: 2px 0 20px 0 rgba(9, 9, 9, 0.25)
 *
 * Backdrop blur spec (Figma: effects/bg_blur-60 / 2 = 30px)
 */
const cardVariants = cva(
  "inline-flex flex-col relative transition-all duration-300 backdrop-blur-60",
  {
    variants: {
      size: {
        "1": "p-4 rounded-sm",
        "2": "p-8 rounded-md",
        "3": "p-12 rounded-lg",
        "4": "p-20 rounded-lg",
      },
      state: {
        default: "border-stroke-primary hover:border-gray-10 bg-surface-primary shadow-[2px_0_20px_0_rgba(9,9,9,0.25)]",
        emphasis: "border-green-alpha-2 bg-green-alpha-2 shadow-[2px_0_20px_0_rgba(9,9,9,0.25)]",
        disabled: "opacity-60 pointer-events-none border-stroke-primary bg-surface-primary",
      },
      stroke: {
        true: "border-[0.5px]",
        false: "border-none",
      },
      insetContent: {
        true: "p-0",
        false: "",
      },
    },
    defaultVariants: {
      size: "3",
      state: "default",
      stroke: false,
      insetContent: false,
    },
  }
)

interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof cardVariants> {
  /**
   * When true, overlays the Figma selected-state mask (dark green gradient
   * background + right-side bump with lime-green glow) and applies the
   * selected-state border. The card uses overflow-hidden to clip the mask.
   */
  selected?: boolean
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, size, state, stroke, insetContent, selected, children, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="card"
      data-size={size}
      data-state={state}
      data-selected={selected || undefined}
      className={cn(
        cardVariants({ size, state, stroke, insetContent }),
        selected && [
          // isolate: creates a stacking context so the -z-10 mask stays
          // inside the card and doesn't bleed behind the page background.
          "isolate",
          // Override the state's background color — the mask SVG provides
          // the gradient background; we don't want bg-gray-3 blocking it.
          "bg-transparent!",
          // Allow the right-side bump to protrude beyond the card's border.
          "overflow-visible",
        ],
        className,
      )}
      {...props}
    >
      {selected && <CardMask />}
      {children}
    </div>
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
    className={cn("text-md text-text-secondary", className)}
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
