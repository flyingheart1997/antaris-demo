import * as React from "react"
import { cn } from "@/lib/utils"

function Kbd({
  className,
  size = "md",
  ...props
}: React.ComponentProps<"kbd"> & { size?: "sm" | "md" | "lg" }) {
  const sizeStyles = {
    sm: "rounded-sm gap-4 text-text-primary text-sm font-regular",
    md: "rounded-md gap-4 text-text-primary text-md font-regular",
    lg: "rounded-lg gap-4 text-text-primary text-lg font-regular",
  }

  return (
    <kbd
      data-slot="kbd"
      className={cn(
        "pointer-events-none inline-flex w-fit min-w-5 select-none items-center justify-center",
        sizeStyles[size],
        className
      )}
      {...props}
    />
  )
}

function KbdGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <kbd
      data-slot="kbd-group"
      className={cn("inline-flex items-center gap-4", className)}
      {...props}
    />
  )
}

export { Kbd, KbdGroup }
