import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const inputVariants = cva(
  "group/input relative flex items-center w-full min-w-0 transition-all outline-none disabled:pointer-events-none disabled:opacity-50",
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
        sm: "h-(--sizing-24) px-(--spacing-8) text-(--text-font-size-md) gap-(--spacing-2) rounded-(--radius-md)",
        md: "h-(--sizing-32) px-(--spacing-10) text-(--text-font-size-lg) gap-(--spacing-4) rounded-(--radius-md)",
        lg: "h-(--sizing-40) px-(--spacing-12) text-(--text-font-size-xl) gap-(--spacing-6) rounded-(--radius-md)",
        xl: "h-(--sizing-48) px-(--spacing-14) text-(--text-font-size-xxl) gap-(--spacing-8) rounded-(--radius-md)",
      },
      radius: {
        none: "!rounded-none",
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

interface InputProps
  extends Omit<React.ComponentPropsWithoutRef<"input">, "size">,
  Prettify<VariantProps<typeof inputVariants>> {
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, intent, size, radius, state, leftIcon, rightIcon, type, disabled, ...props }, ref) => {
    const isError = props["aria-invalid"] === "true" || props["aria-invalid"] === true || intent === "error" || state === "error"
    const effectiveState = (state === "default" && isError) ? "error" : state

    return (
      <div
        data-slot="input-wrapper"
        data-variant={variant}
        data-intent={intent}
        data-size={size}
        data-radius={radius}
        data-state={effectiveState}
        data-disabled={disabled}
        className={cn(inputVariants({ variant, intent, size, radius, state: effectiveState, className }))}
      >
        {leftIcon && (
          <span className="flex shrink-0 items-center justify-center pointer-events-none text-(--color-icon-secondary) group-focus-within/input:text-(--color-icon-primary) group-data-[state=error]/input-wrapper:text-(--color-text-error)">
            {leftIcon}
          </span>
        )}
        <input
          ref={ref}
          type={type}
          disabled={disabled}
          data-slot="input"
          className="flex-1 bg-transparent outline-none border-none p-0 h-full w-full placeholder:text-(--color-text-disabled) disabled:cursor-not-allowed selection:bg-(--color-surface-selected)"
          {...props}
        />
        {rightIcon && (
          <span className="flex shrink-0 items-center justify-center pointer-events-none text-(--color-icon-secondary) group-focus-within/input:text-(--color-icon-primary) group-data-[state=error]/input-wrapper:text-(--color-text-error)">
            {rightIcon}
          </span>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input, inputVariants }
