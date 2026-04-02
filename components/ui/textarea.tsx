import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const textareaVariants = cva(
  "flex min-h-20 w-full transition-all outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        surface: "bg-(--color-surface-bg) border border-(--color-stroke-primary)",
        solid: "bg-(--color-gray-alpha-3) border border-transparent",
      },
      intent: {
        neutral: "",
        accent: "aria-selected:border-(--color-stroke-selected) aria-selected:ring-3 aria-selected:ring-(--color-surface-selected)",
        success: "border-(--color-stroke-success) aria-selected:ring-3 aria-selected:ring-(--color-stroke-success)/20",
        error: "border-(--color-stroke-error) !ring-3 !ring-(--color-stroke-error)/20",
        warning: "border-(--color-stroke-warning) aria-selected:ring-3 aria-selected:ring-(--color-stroke-warning)/20",
        info: "border-(--color-stroke-info) aria-selected:ring-3 aria-selected:ring-(--color-stroke-info)/20",
      },
      size: {
        sm: "px-(--spacing-8) py-(--spacing-4) text-(--text-font-size-md) rounded-(--radius-md)",
        md: "px-(--spacing-10) py-(--spacing-6) text-(--text-font-size-lg) rounded-(--radius-md)",
        lg: "px-(--spacing-12) py-(--spacing-8) text-(--text-font-size-xl) rounded-(--radius-md)",
        xl: "px-(--spacing-14) py-(--spacing-10) text-(--text-font-size-xxl) rounded-(--radius-md)",
      },
      radius: {
        none: "rounded-none",
        sm: "!rounded-(--radius-sm)",
        md: "!rounded-(--radius-md)",
        lg: "!rounded-(--radius-lg)",
        full: "!rounded-full",
      },
      state: {
        default: "",
        hover: "border-(--color-stroke-primary) bg-(--color-surface-hover)",
        select: "border-(--color-stroke-selected) ring-3 ring-(--color-surface-selected)",
        error: "border-(--color-stroke-error) ring-3 ring-(--color-stroke-error)/20",
      }
    },
    compoundVariants: [
      {
        variant: "surface",
        state: "default",
        className: "hover:bg-(--color-surface-hover) focus-within:border-(--color-stroke-selected) focus-within:ring-3 focus-within:ring-(--color-surface-selected)"
      },
      {
        variant: "solid",
        state: "default",
        className: "hover:bg-(--color-gray-alpha-4) focus-within:bg-(--color-surface-bg) focus-within:border-(--color-stroke-selected) focus-within:ring-3 focus-within:ring-(--color-surface-selected)"
      }
    ],
    defaultVariants: {
      variant: "surface",
      intent: "neutral",
      size: "md",
      state: "default",
    },
  }
)

type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

interface TextareaProps
  extends Omit<React.ComponentPropsWithoutRef<"textarea">, "size">,
  Prettify<VariantProps<typeof textareaVariants>> { }

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, intent, size, radius, state, ...props }, ref) => {
    const isError = props["aria-invalid"] === "true" || props["aria-invalid"] === true || intent === "error" || state === "error"
    const effectiveState = (state === "default" && isError) ? "error" : state

    return (
      <textarea
        ref={ref}
        data-slot="textarea"
        data-variant={variant}
        data-intent={intent}
        data-size={size}
        data-radius={radius}
        data-state={effectiveState}
        className={cn(
          textareaVariants({ variant, intent, size, radius, state: effectiveState, className }),
          "placeholder:text-(--color-text-disabled) selection:bg-(--color-surface-selected)"
        )}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea, textareaVariants }
