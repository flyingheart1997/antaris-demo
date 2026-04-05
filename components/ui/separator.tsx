"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const separatorVariants = cva(
  "shrink-0",
  {
    variants: {
      orientation: {
        horizontal: "h-[1px] w-full bg-stroke-separator",
        vertical: "h-full w-[1px] [background:linear-gradient(180deg,rgba(240,240,240,0.10)_0%,rgba(240,240,240,0.40)_50%,rgba(240,240,240,0.10)_100%)]",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  }
)

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> &
    VariantProps<typeof separatorVariants>
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(separatorVariants({ orientation }), className)}
      {...props}
    />
  )
)
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }
