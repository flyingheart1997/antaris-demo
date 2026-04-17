"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"
import { Tooltip } from "./tooltip"

// ---------------------------------------------------------------------------
// Context — propagates variant + size down from TabsList → TabsTrigger
// ---------------------------------------------------------------------------
function Tabs({
  size = "md",
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> & {
  size?: "md" | "lg"
}) {
  return (
    <TabsPrimitive.Root
      data-size={size}
      className={cn("group/tabs flex flex-col", className)}
      {...props}
    />
  )
}
Tabs.displayName = "Tabs"

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex items-center justify-start gap-4 p-0 bg-transparent rounded-none",
      className
    )}
    {...props}
  />
))
TabsList.displayName = "TabsList"

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "relative inline-flex shrink-0 items-center justify-center whitespace-nowrap transition-all duration-200 outline-none select-none cursor-pointer rounded-md max-w-50",
      "disabled:pointer-events-none disabled:opacity-40",
      "hover:bg-gray-alpha-2 data-[state=active]:bg-green-alpha-2",
      "font-heading text-md font-regular text-text-primary",
      "group-data-[size=md]/tabs:h-32 group-data-[size=md]/tabs:px-12 group-data-[size=md]/tabs:gap-4 group-data-[size=md]/tabs:min-w-24.5 [&_svg]:size-16",
      "group-data-[size=lg]/tabs:h-40 group-data-[size=lg]/tabs:hover:min-w-27.75 group-data-[size=lg]/tabs:px-14 group-data-[size=lg]/tabs:gap-6 [&_svg]:size-18",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = "TabsTrigger"

const TabTriggerText = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<"span"> & {
    title?: string
    side?: "top" | "bottom" | "left" | "right"
    hideTooltip?: boolean
  }
>(({ className, side = "bottom", hideTooltip = false, title, children, ...props }, ref) => {
  return (
    <Tooltip content={title} side={side} hidden={hideTooltip}>
      <span
        ref={ref}
        data-slot="dropdown-menu-item-text"
        className={cn(
          "min-w-0 flex-1 truncate",
          className
        )}
        {...props}
      >
        {children}
      </span>
    </Tooltip>
  )
})
TabTriggerText.displayName = "TabTriggerText"

const TabTriggerCloseButton = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(className)}
    {...props}
  />
))
TabTriggerCloseButton.displayName = "TabTriggerCloseButton"

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-8 outline-none",
      "focus-visible:ring-2 focus-visible:ring-stroke-selected focus-visible:ring-offset-1 rounded-md",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = "TabsContent"

export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabTriggerText,
  TabTriggerCloseButton,
  TabsContent,
}
