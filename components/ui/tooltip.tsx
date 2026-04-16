"use client"
import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const tooltipContentVariants = cva(
  "z-50 inline-flex items-center animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 text-text-primary border-[0.5px] border-stroke-primary px-8 py-6 rounded-md text-md font-regular backdrop-blur-40 bg-surface-bg",
  {
    variants: {},
    defaultVariants: {},
  }
)

function TooltipProvider({
  delayDuration = 200,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      delayDuration={delayDuration}
      {...props}
    />
  )
}

function CustomTooltip({
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
  VariantProps<typeof tooltipContentVariants> {
  showArrow?: boolean
}

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  TooltipContentProps
>(({ className, sideOffset = 6, children, showArrow = true, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      data-slot="tooltip-content"
      sideOffset={sideOffset}
      className={cn(tooltipContentVariants({ className }))}
      {...props}
    >
      {children}
      {showArrow && (
        <TooltipPrimitive.Arrow className="fill-surface-bg drop-shadow-[0_0.5px_0_var(--color-stroke-primary)]" />
      )}
    </TooltipPrimitive.Content>
  </TooltipPrimitive.Portal>
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

function Tooltip({
  children,
  content,
  side = "top",
  align = "center",
  hidden = false,
  showArrow = true,
  contentClassName,
  delayDuration,
  sideOffset
}: {
  children: React.ReactNode,
  content?: React.ReactNode | string,
  side?: "top" | "bottom" | "left" | "right",
  align?: "start" | "center" | "end",
  hidden?: boolean,
  showArrow?: boolean,
  contentClassName?: string,
  delayDuration?: number,
  sideOffset?: number
}) {
  const hide = hidden || !content
  return (
    <CustomTooltip delayDuration={delayDuration}>
      <TooltipTrigger asChild>
        {children}
      </TooltipTrigger>
      <TooltipContent
        side={side}
        align={align}
        hidden={hide}
        sideOffset={sideOffset}
        className={contentClassName}
        showArrow={showArrow}
      >
        {typeof content === "string" ? <p>{content}</p> : content}
      </TooltipContent>
    </CustomTooltip>
  )
}

export { TooltipProvider, Tooltip }
