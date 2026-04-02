"use client"
import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const tooltipContentVariants = cva(
  "z-50 inline-flex items-center animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  {
    variants: {
      intent: {
        accent: "bg-surface-focus text-gray-12 [--tooltip-bg:var(--color-surface-focus)]",
        neutral: "bg-surface-overlay text-text-primary [--tooltip-bg:var(--color-surface-overlay)]",
        success: "bg-surface-success text-gray-12 [--tooltip-bg:var(--color-surface-success)]",
        warning: "bg-surface-warnig-hover text-gray-12 [--tooltip-bg:var(--color-surface-warnig-hover)]",
        error: "bg-surface-error-hover text-gray-12 [--tooltip-bg:var(--color-surface-error-hover)]",
        info: "bg-surface-info-hover text-gray-12 [--tooltip-bg:var(--color-surface-info-hover)]",
      },
      size: {
        sm: "px-8 py-4 gap-4 text-xs rounded-sm",
        md: "px-10 py-6 gap-6 text-sm rounded-md",
        lg: "px-12 py-8 gap-8 text-md rounded-lg",
      },
      radius: {
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
      }
    },
    defaultVariants: {
      intent: "neutral",
      size: "md",
    },
  }
)

function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      delayDuration={delayDuration}
      {...props}
    />
  )
}

function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return <TooltipPrimitive.Root {...props} />
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger {...props} />
}

interface TooltipContentProps
  extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>,
  VariantProps<typeof tooltipContentVariants> { }

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  TooltipContentProps
>(({ className, sideOffset = 4, size, intent, radius, children, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      data-slot="tooltip-content"
      data-size={size}
      data-radius={radius}
      data-intent={intent}
      sideOffset={sideOffset}
      className={cn(tooltipContentVariants({ size, intent, radius, className }))}
      {...props}
    >
      {children}
      <TooltipPrimitive.Arrow
        className="z-50 fill-(--tooltip-bg)"
        width={10}
        height={5}
      />
    </TooltipPrimitive.Content>
  </TooltipPrimitive.Portal>
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger }
