"use client";

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  Collapsible,
  CollapsiblePanel,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { IconButton } from "@/components/ui/icon-button"
import { ChevronDown } from "lucide-react";
import { Tooltip } from "./tooltip";

function Drawer({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Collapsible>) {
  return (
    <Collapsible
      className={cn(
        "inline-flex flex-col items-center bg-surface-bg p-4 rounded-lg relative",
        className
      )}
      {...props}
    >
      {children}
      <svg className="absolute -bottom-12" width="38" height="13" viewBox="0 0 38 13" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M5.91596 9.75808L3.73935 3.22826C3.32826 1.99498 2.32794 1.11926 1.16908 0.502781C0.793125 0.302787 0.394663 0.148781 4.3869e-05 0C0.917622 0.345948 2.08157 0.502781 2.51126 0.502781C7.4084 0.502781 18.8206 0.529269 18.8206 0.529269C18.8206 0.529269 30.2398 0.502781 35.137 0.502781C35.5667 0.502781 36.7306 0.345948 37.6482 0C37.2536 0.148781 36.8551 0.302787 36.4792 0.502781C35.3203 1.11926 34.32 1.99498 33.9089 3.22826L31.7323 9.75808C31.1878 11.3914 29.6593 12.4932 27.9375 12.4932H18.8277H9.71069C7.98897 12.4932 6.46042 11.3914 5.91596 9.75808Z" className="fill-surface-bg" />
      </svg>
      <div className="absolute -bottom-10 flex items-center justify-center w-full h-10">
        <CollapsibleTrigger className="group">
          <ChevronDown className="size-12 shrink-0 text-icon-secondary transition-transform duration-300 ease-in-out group-data-panel-open:rotate-180" />
        </CollapsibleTrigger>
      </div>
    </Collapsible>
  )
}
Drawer.displayName = "Drawer"

const DrawerTrigger = React.forwardRef<
  React.ElementRef<typeof CollapsibleTrigger>,
  React.ComponentProps<typeof CollapsibleTrigger>
>(({ className, children, title, ...props }, ref) => {
  return (
    <Tooltip side="right" content={title}>
      <CollapsibleTrigger
        className={cn(
          // Ensure standard hover states and text color for the trigger. 
          // When open, we might want to preserve a particular tint if defined.
          "flex items-center justify-center hover:bg-green-alpha-3 hover:border hover:border-stroke-selected [&_svg]:text-icon-secondary rounded-md p-0 h-40 w-40 [&_svg]:size-20 data-panel-open:[&_svg]:text-icon-primary data-panel-open:bg-green-alpha-2 data-panel-open:border data-panel-open:border-stroke-selected",
          className
        )}
        {...props}
      >
        {children}
      </CollapsibleTrigger>
    </Tooltip>
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
      <div ref={ref} className="flex flex-col items-center pt-10 gap-2 max-h-87 overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {children}
      </div>
    </CollapsiblePanel>
  )
})
DrawerContainer.displayName = "DrawerContainer"

interface DrawerItemProps extends React.ComponentProps<typeof IconButton> {
  active?: boolean;
  title: string;
}

const DrawerItem = React.forwardRef<
  React.ElementRef<typeof IconButton>,
  DrawerItemProps
>(({ className, active, title, ...props }, ref) => {
  return (
    <Tooltip side="right" content={title}>
      <IconButton
        ref={ref}
        variant={active ? "soft" : "ghost"}
        selected={active}
        className={cn(
          'h-40 w-40 [&_svg]:size-20',
          active
            ? "bg-green-alpha-3 hover:bg-green-alpha-3 text-icon-selected hover:text-icon-selected"
            : "hover:text-icon-primary",
          className
        )}
        {...props}
      />
    </Tooltip>
  )
})
DrawerItem.displayName = "DrawerItem"

export {
  Drawer,
  DrawerTrigger,
  DrawerContainer,
  DrawerItem,
}
