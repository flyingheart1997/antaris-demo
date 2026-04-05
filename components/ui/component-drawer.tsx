"use client";

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  Collapsible,
  CollapsiblePanel,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { IconButton } from "@/components/ui/icon-button"

function Drawer({
  className,
  ...props
}: React.ComponentProps<typeof Collapsible>) {
  return (
    <Collapsible
      className={cn(
        "inline-flex flex-col items-center bg-surface-bg p-4 rounded-lg",
        className
      )}
      {...props}
    />
  )
}
Drawer.displayName = "Drawer"

const DrawerTrigger = React.forwardRef<
  React.ElementRef<typeof CollapsibleTrigger>,
  React.ComponentProps<typeof CollapsibleTrigger>
>(({ className, ...props }, ref) => {
  return (
    <CollapsibleTrigger
      className={cn(
        // Ensure standard hover states and text color for the trigger. 
        // When open, we might want to preserve a particular tint if defined.
        "[&_svg]:text-icon-secondary data-panel-open:[&_svg]:text-icon-primary",
        className
      )}
      {...props}
    />
  )
})
DrawerTrigger.displayName = "DrawerTrigger"

const DrawerContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof CollapsiblePanel>
>(({ className, children, ...props }, ref) => {
  return (
    <CollapsiblePanel
      className={cn(className)}
      {...props}
    >
      {/* Inner wrapper applies the top gap and inter-item gap so that when Panel height is 0, the gap is also hidden */}
      <div ref={ref} className="flex flex-col items-center pt-10 gap-10">
        {children}
      </div>
    </CollapsiblePanel>
  )
})
DrawerContainer.displayName = "DrawerContainer"

interface DrawerItemProps extends React.ComponentProps<typeof IconButton> {
  active?: boolean;
}

const DrawerItem = React.forwardRef<
  React.ElementRef<typeof IconButton>,
  DrawerItemProps
>(({ className, active, ...props }, ref) => {
  return (
    <IconButton
      ref={ref}
      variant={active ? "surface" : "ghost"}
      className={cn(
        active
          ? "border-stroke-selected text-icon-primary"
          : "text-icon-secondary hover:text-icon-primary hover:bg-surface-hover",
        className
      )}
      {...props}
    />
  )
})
DrawerItem.displayName = "DrawerItem"

export {
  Drawer,
  DrawerTrigger,
  DrawerContainer,
  DrawerItem,
}
