"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { IconButton, iconButtonVariants } from "./icon-button"

const inputGroupVariants = cva(
  "group/input-group relative flex w-full min-w-0 items-center transition-all outline-none rounded-md border-[0.5px] focus-within:outline-none",
  {
    variants: {
      variant: {
        surface: [
          // Base
          "bg-surface-bg border-stroke-primary",
          "hover:border-gray-11",

          // Focus (via has control)
          "has-[[data-slot=input-group-control]:focus-visible]:border-green-8",
          "has-[[data-slot=input-group-control]:focus-visible]:ring-3",
          "has-[[data-slot=input-group-control]:focus-visible]:ring-green-8/20",

          // Error (via has control or aria-invalid)
          "has-[[aria-invalid=true]]:border-stroke-error",
          "has-[[aria-invalid=true]]:ring-3",
          "has-[[aria-invalid=true]]:ring-stroke-error/20",

          // Disabled
          "group-disabled/field:bg-gray-alpha-2 group-disabled/field:border-gray-8 group-disabled/field:opacity-40",
          "group-disabled/field:pointer-events-none",
        ],
        solid: [
          // Base
          "bg-surface-bg border-gray-8",
          "hover:border-gray-11",

          // Focus
          "has-[[data-slot=input-group-control]:focus-visible]:border-green-8",
          "has-[[data-slot=input-group-control]:focus-visible]:ring-3",
          "has-[[data-slot=input-group-control]:focus-visible]:ring-green-8/20",

          // Error
          "has-[[aria-invalid=true]]:border-stroke-error",
          "has-[[aria-invalid=true]]:ring-3",
          "has-[[aria-invalid=true]]:ring-stroke-error/20",

          // Disabled
          "group-disabled/field:bg-gray-2 group-disabled/field:border-gray-8 group-disabled/field:opacity-40",
          "group-disabled/field:pointer-events-none",
        ],
      },
      size: {
        md: "h-24",
        lg: "h-28",
      },
    },
    defaultVariants: {
      variant: "solid",
      size: "lg",
    },
  }
)

interface InputGroupProps
  extends React.ComponentProps<"div">,
  VariantProps<typeof inputGroupVariants> { }

function InputGroup({
  className,
  variant,
  size,
  ...props
}: InputGroupProps) {
  return (
    <div
      data-slot="input-group"
      role="group"
      className={cn(inputGroupVariants({ variant, size, className }))}
      {...props}
    />
  )
}

const inputGroupAddonVariants = cva(
  "text-text-secondary [&_svg]:opacity-60 h-auto gap-1 py-4 text-xs/relaxed font-medium group-data-[disabled=true]/input-group:opacity-50 group-disabled/field:opacity-50 [&>svg:not([class*='size-'])]:size-12 flex cursor-text items-center justify-center select-none",
  {
    variants: {
      align: {
        "inline-start": "pl-4 has-[>button]:ml-[-0.275rem] has-[>kbd]:ml-[-0.275rem] order-first",
        "inline-end": "pr-4 has-[>button]:mr-[-0.275rem] has-[>kbd]:mr-[-0.275rem] order-last",
        "block-start":
          "px-4 pt-4 group-has-[>input]/input-group:pt-4 [.border-b]:pb-4 order-first w-full justify-start",
        "block-end":
          "px-4 pb-4 group-has-[>input]/input-group:pb-4 [.border-t]:pt-4 order-last w-full justify-start",
      },
    },
    defaultVariants: {
      align: "inline-start",
    },
  }
)

function InputGroupAddon({
  className,
  align = "inline-start",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof inputGroupAddonVariants>) {
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({ align }), className)}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("button")) {
          return
        }
        e.currentTarget.parentElement?.querySelector("input")?.focus()
      }}
      {...props}
    />
  )
}

function InputGroupButton({
  className,
  type = "button",
  variant = "ghost",
  size = "sm",
  ...props
}: Omit<React.ComponentProps<typeof Button>, "size"> &
  VariantProps<typeof iconButtonVariants>) {
  return (
    <IconButton
      type={type}
      data-size={size}
      variant={variant}
      size="sm"
      className={cn(iconButtonVariants({ size, variant }), 'hover:bg-transparent opacity-60 hover:opacity-100', className)}
      {...props}
    />
  )
}

function InputGroupText({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "text-text-secondary [&_svg]:text-icon-secondary gap-4 pr-4 text-xs/relaxed [&_svg:not([class*='size-'])]:size-12 flex items-center [&_svg]:pointer-events-none",
        className
      )}
      {...props}
    />
  )
}

function InputGroupInput({
  className,
  ...props
}: Omit<React.ComponentProps<typeof Input>, "size">) {
  return (
    <Input
      data-slot="input-group-control"
      className={cn("rounded-none border-none hover:border-none focus:border-none hover:ring-0 border-0 bg-transparent shadow-none ring-0 focus-within:ring-0 focus:ring-0 aria-selected:ring-0 dark:bg-transparent flex-1", className)}
      {...props}
    />
  )
}

function InputGroupTextarea({
  className,
  ...props
}: React.ComponentProps<typeof Textarea>) {
  return (
    <Textarea
      data-slot="input-group-control"
      className={cn("rounded-none border-none hover:border-none focus:border-none hover:ring-0 border-0 bg-transparent py-4 shadow-none ring-0 focus-visible:ring-0 aria-invalid:ring-0 dark:bg-transparent flex-1 resize-none", className)}
      {...props}
    />
  )
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
  inputGroupVariants,
}

