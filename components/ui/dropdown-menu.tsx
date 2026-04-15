"use client"

import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { Check, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Tooltip } from "./tooltip"

type DropdownMenuSize = "md" | "lg"

const DropdownMenuSizeContext = React.createContext<{ size: DropdownMenuSize }>({
  size: "md",
})

const DropdownMenu = DropdownMenuPrimitive.Root

const DropdownMenuPortal = DropdownMenuPrimitive.Portal

const DropdownMenuGroup = DropdownMenuPrimitive.Group

const DropdownMenuSub = DropdownMenuPrimitive.Sub

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

const DropdownMenuTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Trigger>
>(({ ...props }, ref) => (
  <DropdownMenuPrimitive.Trigger
    ref={ref}
    data-slot="dropdown-menu-trigger"
    {...props}
  />
))
DropdownMenuTrigger.displayName = DropdownMenuPrimitive.Trigger.displayName

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content> & {
    size?: DropdownMenuSize
  }
>(({ className, align = "start", sideOffset = 4, size = "md", ...props }, ref) => (
  <DropdownMenuSizeContext.Provider value={{ size }}>
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        ref={ref}
        data-slot="dropdown-menu-content"
        data-size={size}
        sideOffset={sideOffset}
        align={align}
        className={cn(
          "flex flex-col gap-2 data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 bg-surface-bg border border-stroke-primary min-w-50 rounded-lg p-6 shadow-xl duration-100 z-50 max-h-(--radix-dropdown-menu-content-available-height) w-(--radix-dropdown-menu-trigger-width) origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto data-[state=closed]:overflow-hidden",
          className
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  </DropdownMenuSizeContext.Provider>
))
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean
    variant?: "default" | "destructive"
    color?: "accent" | "error"
    size?: DropdownMenuSize
  }
>(({ className, inset, variant = "default", color = "accent", size, ...props }, ref) => {
  const context = React.useContext(DropdownMenuSizeContext)
  const effectiveSize = size ?? context.size

  return (
    <DropdownMenuPrimitive.Item
      ref={ref}
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      data-color={color}
      data-size={effectiveSize}
      className={cn(
        "group/dropdown-menu-item relative flex w-full min-w-0 cursor-default select-none items-center rounded-md pl-6 pr-4 outline-hidden transition-colors duration-100",
        "data-[size=md]:h-28 data-[size=md]:text-md gap-4",
        "data-[size=lg]:h-36 data-[size=lg]:text-lg gap-6",
        "data-[color=accent]:text-text-primary focus:bg-surface-hover data-[state=checked]:bg-surface-selected",
        "data-[color=error]:text-text-error focus:bg-surface-error-hover",
        "data-disabled:pointer-events-none data-disabled:opacity-50 data-disabled:text-text-disabled",
        "data-inset:pl-32",
        className
      )}
      {...props}
    />
  )
})
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

const DropdownMenuItemText = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<"span"> & {
    side?: "top" | "bottom" | "left" | "right"
    hideTooltip?: boolean
  }
>(({ className, side = "right", hideTooltip = false, children, ...props }, ref) => {
  return (
    <Tooltip content={children} side={side} hidden={hideTooltip}>
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

DropdownMenuItemText.displayName = "DropdownMenuItemText"

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem> & {
    size?: DropdownMenuSize
  }
>(({ className, children, checked, size, ...props }, ref) => {
  const context = React.useContext(DropdownMenuSizeContext)
  const effectiveSize = size ?? context.size

  return (
    <DropdownMenuPrimitive.CheckboxItem
      ref={ref}
      data-slot="dropdown-menu-checkbox-item"
      data-size={effectiveSize}
      className={cn(
        "group/dropdown-menu-checkbox-item relative flex cursor-default select-none items-center rounded-md pr-4 pl-6 outline-hidden transition-colors duration-100 focus:bg-surface-hover data-[state=checked]:bg-surface-selected",
        "data-[size=md]:h-28 data-[size=md]:text-md gap-4",
        "data-[size=lg]:h-36 data-[size=lg]:text-lg gap-6",
        "data-disabled:pointer-events-none data-disabled:opacity-50 data-disabled:text-text-disabled",
        className
      )}
      checked={checked}
      {...props}
    >
      <span className="flex size-16 items-center justify-center shrink-0 border border-stroke-primary rounded-sm group-data-[state=checked]:border-white/40">
        <DropdownMenuPrimitive.ItemIndicator className="flex items-center justify-center">
          <Check className="size-14" strokeWidth={3} />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      <span className="flex-1 truncate">{children}</span>
    </DropdownMenuPrimitive.CheckboxItem>
  )
})
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem> & {
    size?: DropdownMenuSize
  }
>(({ className, children, size, ...props }, ref) => {
  const context = React.useContext(DropdownMenuSizeContext)
  const effectiveSize = size ?? context.size

  return (
    <DropdownMenuPrimitive.RadioItem
      ref={ref}
      data-slot="dropdown-menu-radio-item"
      data-size={effectiveSize}
      className={cn(
        "group/dropdown-menu-radio-item relative flex cursor-default select-none items-center rounded-md pl-6 pr-4 outline-hidden transition-colors duration-100 focus:bg-surface-hover data-[state=checked]:bg-surface-selected",
        "data-[size=md]:h-28 data-[size=md]:text-md gap-4",
        "data-[size=lg]:h-36 data-[size=lg]:text-lg gap-6",
        "data-disabled:pointer-events-none data-disabled:opacity-50 data-disabled:text-text-disabled",
        className
      )}
      {...props}
    >
      <span className="flex size-16 items-center justify-center shrink-0 border border-stroke-primary rounded-full group-data-[state=checked]:border-white/40">
        <DropdownMenuPrimitive.ItemIndicator className="flex items-center justify-center">
          <div className="size-6 rounded-full" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      <span className="flex-1 truncate">{children}</span>
    </DropdownMenuPrimitive.RadioItem>
  )
})
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    data-slot="dropdown-menu-label"
    data-inset={inset}
    className={cn(
      "text-text-primary opacity-60 px-2 py-0.5 text-sm font-regular font-body",
      "data-inset:pl-8",
      className
    )}
    {...props}
  />
))
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    data-slot="dropdown-menu-separator"
    className={cn("bg-stroke-primary/30 -mx-1 my-1 h-px", className)}
    {...props}
  />
))
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName

const DropdownMenuShortcut = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<"span">
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    data-slot="dropdown-menu-shortcut"
    className={cn(
      "text-text-secondary ml-auto shrink-0 text-[0.625rem] font-medium tracking-widest",
      className
    )}
    {...props}
  />
))
DropdownMenuShortcut.displayName = "DropdownMenuShortcut"

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean
    size?: DropdownMenuSize
  }
>(({ className, inset, children, size, ...props }, ref) => {
  const context = React.useContext(DropdownMenuSizeContext)
  const effectiveSize = size ?? context.size

  return (
    <DropdownMenuPrimitive.SubTrigger
      ref={ref}
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      data-size={effectiveSize}
      className={cn(
        "group/dropdown-menu-sub-trigger relative flex cursor-default select-none items-center rounded-md pl-6 pr-4 outline-hidden transition-colors duration-100 data-open:bg-surface-hover focus:bg-surface-hover",
        "data-[size=md]:h-28 data-[size=md]:text-md gap-4",
        "data-[size=lg]:h-36 data-[size=lg]:text-lg gap-6",
        "data-inset:pl-32 text-text-primary",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRight className="ml-auto size-14 shrink-0 opacity-60" />
    </DropdownMenuPrimitive.SubTrigger>
  )
})
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent> & {
    size?: DropdownMenuSize
  }
>(({ className, children, size, sideOffset = 6, ...props }, ref) => {
  const context = React.useContext(DropdownMenuSizeContext)
  const effectiveSize = size ?? context.size

  return (
    <DropdownMenuSizeContext.Provider value={{ size: effectiveSize }}>
      <DropdownMenuPrimitive.SubContent
        ref={ref}
        data-slot="dropdown-menu-sub-content"
        data-size={effectiveSize}
        sideOffset={sideOffset}
        className={cn(
          "data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 bg-surface-bg border border-stroke-primary min-w-50 rounded-lg p-6 shadow-xl duration-100 z-50 origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden",
          className
        )}
        {...props}
      >
        {children}
      </DropdownMenuPrimitive.SubContent>
    </DropdownMenuSizeContext.Provider>
  )
})
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuItemText,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
}
