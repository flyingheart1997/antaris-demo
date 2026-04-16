"use client"

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { cva, type VariantProps } from "class-variance-authority"
import { ChevronDown, ChevronUp } from "lucide-react"

import { cn } from "@/lib/utils"
import { Tooltip } from "./tooltip"

const SelectContext = React.createContext<{ size?: "md" | "lg"; readOnly?: boolean }>({
  size: "md",
  readOnly: false,
})

const selectTriggerVariants = cva(
  "group/select relative flex items-center justify-between w-auto min-w-0 transition-all outline-none disabled:pointer-events-none disabled:opacity-50 rounded-md select-none border-[0.5px] border-solid px-6 gap-6 font-regular font-body",
  {
    variants: {
      variant: {
        surface: "bg-surface-primary backdrop-blur-40 border-gray-11 data-[placeholder]:text-text-secondary data-[placeholder]:border-gray-8 hover:!border-gray-11 hover:!text-text-primary group-hover/select:!text-text-primary group-hover/select:!border-gray-11 data-[state=open]:border-stroke-selected data-[read-only=true]:bg-gray-2 data-[read-only=true]:text-text-primary data-[read-only=true]:border-gray-11",
        solid: "bg-surface-bg border-gray-11 data-[placeholder]:text-text-secondary data-[placeholder]:border-gray-8 hover:!border-gray-11 hover:!text-text-primary group-hover/select:!text-text-primary group-hover/select:!border-gray-11 data-[state=open]:border-stroke-selected data-[read-only=true]:bg-gray-2 data-[read-only=true]:text-text-primary data-[read-only=true]:border-gray-11",
        neutral: "bg-surface-primary border-gray-8 data-[placeholder]:text-text-secondary text-text-secondary ",
      },
      color: {
        primary: "",
        error: "border-stroke-error! text-text-error-subtle data-[placeholder]:text-text-error-subtle",
      },
      size: {
        md: "h-24 text-md",
        lg: "h-28 text-lg",
      },
    },
    defaultVariants: {
      variant: "surface",
      color: "primary",
      size: "lg",
    },
  }
)

function Select({
  size = "md",
  readOnly = false,
  ...props
}: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root> & {
  size?: "md" | "lg"
  readOnly?: boolean
}) {
  return (
    <SelectContext.Provider value={{ size, readOnly }}>
      <SelectPrimitive.Root {...props} />
    </SelectContext.Provider>
  )
}

const SelectGroup = SelectPrimitive.Group
const SelectValue = SelectPrimitive.Value

interface SelectTriggerProps
  extends Omit<React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>, "color">,
  VariantProps<typeof selectTriggerVariants> { }

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  SelectTriggerProps
>(({ className, variant, color, size, children, ...props }, ref) => {
  const context = React.useContext(SelectContext)
  const effectiveSize = size || context.size
  const isReadOnly = context.readOnly
  const isError = props["aria-invalid"] === "true" || props["aria-invalid"] === true || color === "error"
  const effectiveColor = (isError ? "error" : (color ?? "primary")) as "primary" | "error"

  return (
    <SelectPrimitive.Trigger
      ref={ref}
      disabled={isReadOnly || props.disabled}
      className={cn(selectTriggerVariants({ variant, color: effectiveColor, size: effectiveSize, className }))}
      data-size={effectiveSize}
      data-color={effectiveColor}
      data-read-only={isReadOnly}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDown className="pointer-events-none size-12 font-[inherit] text-icon-secondary transition-transform duration-300 ease-in-out group-data-[state=open]/select:rotate-180 group-data-[state=open]/select:text-icon-primary" />
      </SelectPrimitive.Icon>
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
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> & { size?: "md" | "lg" }
>(({ className, children, position = "popper", size, ...props }, ref) => {
  const context = React.useContext(SelectContext)
  const effectiveSize = size || context.size

  return (
    <SelectPrimitive.Portal>
      <SelectContext.Provider value={{ size: effectiveSize }}>
        <SelectPrimitive.Content
          ref={ref}
          className={cn(
            "relative z-50 max-h-96 w-(--radix-select-trigger-width) overflow-hidden rounded-md border-[0.5px] border-stroke-selected bg-surface-primary/0 backdrop-blur-60 text-text-primary shadow-xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 duration-100 p-4",
            position === "popper" &&
            "data-[side=bottom]:translate-y-4 data-[side=left]:-translate-x-4 data-[side=right]:translate-x-4 data-[side=top]:-translate-y-4",
            className
          )}
          position={position}
          {...props}
        >
          <SelectScrollUpButton />
          <SelectPrimitive.Viewport
            className={cn(
              "p-0 font-[inherit]",
              position === "popper" &&
              "h-(--radix-select-content-available-height) w-full min-w-[inherit]"
            )}
          >
            <div className="flex flex-col gap-4 font-[inherit]">
              {children}
            </div>
          </SelectPrimitive.Viewport>
          <SelectScrollDownButton />
        </SelectPrimitive.Content>
      </SelectContext.Provider>
    </SelectPrimitive.Portal>
  )
})
SelectContent.displayName = "SelectContent"

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("text-text-primary opacity-60 px-2 py-0.5 text-sm font-regular font-body", className)}
    {...props}
  />
))
SelectLabel.displayName = "SelectLabel"

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> & { size?: "md" | "lg" }
>(({ className, size, children, ...props }, ref) => {
  const context = React.useContext(SelectContext)
  const effectiveSize = size || context.size

  return (
    <SelectPrimitive.Item
      ref={ref}
      className={cn(
        "group/select-item relative flex w-full h-24 cursor-default select-none items-center rounded-md pr-4 pl-6 outline-none transition-colors duration-100 hover:bg-surface-hover focus:bg-surface-hover focus:text-text-primary data-disabled:pointer-events-none data-disabled:opacity-50 font-[inherit] gap-6",
        size === "lg" ? "text-lg" : "text-md",
        className
      )}
      data-size={effectiveSize}
      {...props}
    >
      {children}
    </SelectPrimitive.Item>
  )
})
SelectItem.displayName = "SelectItem"

const SelectItemText = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ItemText>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ItemText> & {
    side?: "top" | "bottom" | "left" | "right"
    hideTooltip?: boolean
  }
>(({ className, side = "right", hideTooltip = false, children, ...props }, ref) => {
  return (
    <Tooltip content={children} side={side} hidden={hideTooltip}>
      <SelectPrimitive.ItemText
        ref={ref}
        data-slot="dropdown-menu-item-text"
        {...props}
        className="flex-1"
        asChild
      >
        <span className={cn(
          "min-w-0 flex-1 truncate",
          className
        )}>{children}</span>
      </SelectPrimitive.ItemText>
    </Tooltip>
  )
})
SelectItemText.displayName = "SelectItemText"

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-stroke-primary/30", className)}
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
  SelectItemText,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}
