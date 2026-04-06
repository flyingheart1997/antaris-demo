"use client"

import * as React from "react"
import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"

const DropdownMenuContext = React.createContext<{
  size?: "md" | "lg"
  type?: "default" | "checkbox" | "radio"
}>({
  size: "md",
  type: "default",
})

function DropdownMenu({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />
}

function DropdownMenuPortal({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>) {
  return (
    <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
  )
}

function DropdownMenuTrigger({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
  return (
    <DropdownMenuPrimitive.Trigger
      data-slot="dropdown-menu-trigger"
      {...props}
    />
  )
}

function DropdownMenuContent({
  className,
  align = "start",
  sideOffset = 4,
  size = "md",
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content> & {
  size?: "md" | "lg"
}) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuContext.Provider value={{ size }}>
        <DropdownMenuPrimitive.Content
          data-slot="dropdown-menu-content"
          sideOffset={sideOffset}
          align={align}
          className={cn(
            "data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 bg-surface-bg border border-stroke-primary min-w-50 rounded-lg p-6 shadow-xl duration-100 z-50 max-h-(--radix-dropdown-menu-content-available-height) w-(--radix-dropdown-menu-trigger-width) origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto data-[state=closed]:overflow-hidden",
            className
          )}
          {...props}
        />
      </DropdownMenuContext.Provider>
    </DropdownMenuPrimitive.Portal>
  )
}

function DropdownMenuGroup({
  className,
  size,
  type = "default",
  groupLabel,
  topSeparator,
  bottomSeparator,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Group> & {
  size?: "md" | "lg"
  type?: "default" | "checkbox" | "radio"
  groupLabel?: string
  topSeparator?: boolean
  bottomSeparator?: boolean
}) {
  const context = React.useContext(DropdownMenuContext)
  const effectiveSize = size || context.size

  return (
    <DropdownMenuContext.Provider value={{ size: effectiveSize, type }}>
      <div className={cn("flex flex-col gap-2", className)}>
        {topSeparator && <DropdownMenuSeparator />}
        {groupLabel && (
          <DropdownMenuLabel inset={type !== "default"}>
            {groupLabel}
          </DropdownMenuLabel>
        )}
        <DropdownMenuPrimitive.Group
          data-slot="dropdown-menu-group"
          {...props}
        />
        {bottomSeparator && <DropdownMenuSeparator />}
      </div>
    </DropdownMenuContext.Provider>
  )
}

function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  size,
  color = "accent",
  leadingIcon,
  hotkey,
  subTrigger,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean
  variant?: "default" | "destructive"
  size?: "md" | "lg"
  color?: "accent" | "error"
  leadingIcon?: React.ReactNode
  hotkey?: string
  subTrigger?: boolean
}) {
  const context = React.useContext(DropdownMenuContext)
  const effectiveSize = size || context.size

  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      data-size={effectiveSize}
      data-color={color}
      className={cn(
        "group/dropdown-menu-item relative flex cursor-default select-none items-center rounded-md px-12 outline-hidden transition-colors duration-100 gap-8",
        "data-[size=md]:h-28 data-[size=md]:text-md",
        "data-[size=lg]:h-36 data-[size=lg]:text-lg",
        "data-[color=accent]:text-text-primary focus:bg-surface-hover data-[state=checked]:bg-surface-selected",
        "data-[color=error]:text-text-error focus:bg-surface-error-hover",
        "data-disabled:pointer-events-none data-disabled:opacity-50 data-disabled:text-text-disabled",
        "data-inset:pl-32",
        className
      )}
      {...props}
    >
      {leadingIcon && (
        <span className="flex size-16 items-center justify-center shrink-0">
          {leadingIcon}
        </span>
      )}
      <span className="flex-1 truncate">{children}</span>
      {hotkey && <DropdownMenuShortcut>{hotkey}</DropdownMenuShortcut>}
      {subTrigger && (
        <HugeiconsIcon
          icon={ArrowRight01Icon}
          className="ml-auto size-14 shrink-0 opacity-60"
        />
      )}
    </DropdownMenuPrimitive.Item>
  )
}

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  size,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem> & {
  size?: "md" | "lg"
}) {
  const context = React.useContext(DropdownMenuContext)
  const effectiveSize = size || context.size

  return (
    <DropdownMenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      data-size={effectiveSize}
      className={cn(
        "group/dropdown-menu-checkbox-item relative flex cursor-default select-none items-center rounded-md px-12 outline-hidden transition-colors duration-100 focus:bg-surface-hover data-[state=checked]:bg-surface-selected gap-8",
        "data-[size=md]:h-28 data-[size=md]:text-md",
        "data-[size=lg]:h-36 data-[size=lg]:text-lg",
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
}

function DropdownMenuRadioGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>) {
  return (
    <DropdownMenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      className={cn("flex flex-col gap-2", props.className)}
      {...props}
    />
  )
}

function DropdownMenuRadioItem({
  className,
  children,
  size,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem> & {
  size?: "md" | "lg"
}) {
  const context = React.useContext(DropdownMenuContext)
  const effectiveSize = size || context.size

  return (
    <DropdownMenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      data-size={effectiveSize}
      className={cn(
        "group/dropdown-menu-radio-item relative flex cursor-default select-none items-center rounded-md px-12 outline-hidden transition-colors duration-100 focus:bg-surface-hover data-[state=checked]:bg-surface-selected gap-8",
        "data-[size=md]:h-28 data-[size=md]:text-md",
        "data-[size=lg]:h-36 data-[size=lg]:text-lg",
        "data-disabled:pointer-events-none data-disabled:opacity-50 data-disabled:text-text-disabled",
        className
      )}
      {...props}
    >
      <span className="flex size-16 items-center justify-center shrink-0 border border-stroke-primary rounded-full group-data-[state=checked]:border-white/40">
        <DropdownMenuPrimitive.ItemIndicator className="flex items-center justify-center">
          <div className="size-6 rounded-full bg-white" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      <span className="flex-1 truncate">{children}</span>
    </DropdownMenuPrimitive.RadioItem>
  )
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuPrimitive.Label
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn(
        "text-text-secondary px-2 py-0.5 text-xs font-medium",
        "data-inset:pl-8",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn("bg-stroke-primary/30 -mx-1 my-1 h-px", className)}
      {...props}
    />
  )
}

function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        "text-text-secondary ml-auto text-[0.625rem] font-medium tracking-widest",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuSub({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Sub>) {
  return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  size,
  leadingIcon,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
  inset?: boolean
  size?: "md" | "lg"
  leadingIcon?: React.ReactNode
}) {
  const context = React.useContext(DropdownMenuContext)
  const effectiveSize = size || context.size

  return (
    <DropdownMenuPrimitive.SubTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      data-size={effectiveSize}
      className={cn(
        "group/dropdown-menu-sub-trigger relative flex cursor-default select-none items-center rounded-md px-12 outline-hidden transition-colors duration-100 data-open:bg-surface-hover focus:bg-surface-hover gap-8",
        "data-[size=md]:h-28 data-[size=md]:text-md",
        "data-[size=lg]:h-36 data-[size=lg]:text-lg",
        "data-inset:pl-32 text-text-primary",
        className
      )}
      {...props}
    >
      {leadingIcon && (
        <span className="flex size-16 items-center justify-center shrink-0">
          {leadingIcon}
        </span>
      )}
      <span className="flex-1 truncate">{children}</span>
      <HugeiconsIcon
        icon={ArrowRight01Icon}
        className="ml-auto size-14 shrink-0 opacity-60"
      />
    </DropdownMenuPrimitive.SubTrigger>
  )
}

function DropdownMenuSubContent({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>) {
  const { size } = React.useContext(DropdownMenuContext)
  return (
    <DropdownMenuContext.Provider value={{ size }}>
      <DropdownMenuPrimitive.SubContent
        data-slot="dropdown-menu-sub-content"
        className={cn(
          "data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 bg-surface-bg border border-stroke-primary min-w-50 rounded-lg p-6 shadow-xl duration-100 z-50 origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden",
          className
        )}
        {...props}
      />
    </DropdownMenuContext.Provider>
  )
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
}
