"use client"

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { cva, type VariantProps } from "class-variance-authority"
import { Check, ChevronDown, ChevronUp } from "lucide-react"

import { cn } from "@/lib/utils"

const selectTriggerVariants = cva(
  "group/select relative flex items-center justify-between w-full min-w-0 transition-all outline-none disabled:pointer-events-none disabled:opacity-50 rounded-md select-none",
  {
    variants: {
      variant: {
        surface: "bg-surface-bg border border-stroke-primary text-text-secondary data-[placeholder]:text-text-secondary/70",
        solid: "bg-surface-secondary border border-transparent text-text-secondary",
      },
      color: {
        primary: "data-[state=open]:border-stroke-selected data-[state=open]:ring-3 data-[state=open]:ring-surface-selected",
        info: "border-stroke-info data-[state=open]:ring-3 data-[state=open]:ring-stroke-info/20",
        success: "border-stroke-success data-[state=open]:ring-3 data-[state=open]:ring-stroke-success/20",
        warning: "border-stroke-warning data-[state=open]:ring-3 data-[state=open]:ring-stroke-warning/20",
        error: "border-stroke-error !ring-3 !ring-stroke-error/20",
      },
      size: {
        md: "h-32 px-10 gap-4 text-md",
        lg: "h-40 px-12 gap-6 text-lg",
      },
    },
    compoundVariants: [
      {
        variant: "surface",
        className: "hover:bg-surface-hover"
      },
      {
        variant: "solid",
        className: "hover:bg-surface-secondary/80 data-[state=open]:bg-surface-bg"
      }
    ],
    defaultVariants: {
      variant: "surface",
      color: "primary",
      size: "md",
    },
  }
)

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

interface SelectTriggerProps
  extends Omit<React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>, "color">,
  VariantProps<typeof selectTriggerVariants> {
  leadingIcon?: React.ReactNode
  trailingIcon?: React.ReactNode | boolean
}

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  SelectTriggerProps
>(({ className, variant, color, size, leadingIcon, trailingIcon = true, children, ...props }, ref) => {
  const isError = props["aria-invalid"] === "true" || props["aria-invalid"] === true || color === "error"
  const effectiveColor = (isError ? "error" : (color ?? "primary")) as "primary" | "info" | "success" | "warning" | "error"

  return (
    <SelectPrimitive.Trigger
      ref={ref}
      className={cn(selectTriggerVariants({ variant, color: effectiveColor, size, className }))}
      {...props}
    >
      <div className="flex items-center gap-[inherit] min-w-0">
        {leadingIcon && (
          <span className="flex shrink-0 items-center justify-center pointer-events-none text-icon-secondary group-data-[state=open]/select:text-icon-primary group-data-[color=error]/select:text-text-error">
            {leadingIcon}
          </span>
        )}
        <span className="truncate text-text-primary group-data-placeholder/select:text-text-secondary group-data-[state=open]/select:text-text-primary">
          {children}
        </span>
      </div>
      {trailingIcon !== false && (
        <SelectPrimitive.Icon asChild>
          {trailingIcon === true ? (
            <ChevronDown className="size-14 shrink-0 text-icon-secondary group-data-[state=open]/select:text-icon-primary group-data-[color=error]/select:text-text-error" />
          ) : (
            <span className="flex shrink-0 items-center justify-center pointer-events-none">
              {trailingIcon}
            </span>
          )}
        </SelectPrimitive.Icon>
      )}
    </SelectPrimitive.Trigger>
  )
})
SelectTrigger.displayName = "SelectTrigger"

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronUp className="size-4" />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = "SelectScrollUpButton"

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronDown className="size-4" />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName = "SelectScrollDownButton"

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-96 min-w-32 overflow-hidden rounded-md border border-stroke-primary bg-surface-bg text-text-primary shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        position === "popper" &&
        "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
          "h-(--radix-select-trigger-height) w-full min-w-(--radix-select-trigger-width)"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = "SelectContent"

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("py-6 px-10 text-sm font-semibold text-text-secondary uppercase tracking-wider", className)}
    {...props}
  />
))
SelectLabel.displayName = "SelectLabel"

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-md py-8 pl-32 pr-8 text-md outline-none hover:bg-surface-hover focus:bg-surface-hover focus:text-text-primary data-disabled:pointer-events-none data-disabled:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-10 flex h-16 w-16 items-center justify-center text-text-selected">
      <SelectPrimitive.ItemIndicator>
        <Check className="size-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = "SelectItem"

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-4 my-4 h-px bg-stroke-primary/30", className)}
    {...props}
  />
))
SelectSeparator.displayName = "SelectSeparator"

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}
