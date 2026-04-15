import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

const inputVariants = cva(
  [
    "group/input-field relative flex items-center w-full min-w-0 transition-all outline-none rounded-md px-6",
    "border focus-visible:outline-none disabled:opacity-40 disabled:pointer-events-none",
  ].join(" "),
  {
    variants: {
      variant: {
        surface: [
          // Base Colors
          "bg-surface-bg border-stroke-primary",
          "hover:border-gray-11",

          // Focus state
          "focus-visible:border-green-8 focus-visible:ring-3 focus-visible:ring-green-8/20",
          "read-only:focus-visible:ring-0 read-only:focus-visible:border-stroke-primary",
          "disabled:focus-visible:ring-0",

          // States (Disabled / Readonly)
          "disabled:bg-gray-alpha-2 disabled:border-gray-8",
          "read-only:bg-gray-alpha-2 read-only:cursor-default read-only:hover:border-gray-10",

          // Error states
          "aria-invalid:border-stroke-error aria-invalid:ring-3 aria-invalid:ring-stroke-error/20",
          "group-data-[invalid=true]/field:border-stroke-error group-data-[invalid=true]/field:ring-3 group-data-[invalid=true]/field:ring-stroke-error/20",

          // Group contexts
          "group-data-[readonly=true]/field:bg-gray-alpha-2 group-data-[readonly=true]/field:border-gray-10 group-data-[readonly=true]/field:cursor-default",
        ].join(" "),

        solid: [
          // Base Colors
          "bg-surface-bg border-gray-8",
          "hover:border-gray-11",

          // Focus state
          "focus-visible:border-green-8 focus-visible:ring-3 focus-visible:ring-green-8/20",
          "read-only:focus-visible:ring-0 read-only:focus-visible:border-gray-8",
          "disabled:focus-visible:ring-0",

          // States (Disabled / Readonly)
          "disabled:bg-gray-2 disabled:border-gray-8",
          "read-only:bg-gray-2 read-only:border-gray-10 read-only:cursor-default read-only:hover:border-gray-10",

          // Error states
          "aria-invalid:border-stroke-error aria-invalid:ring-3 aria-invalid:ring-stroke-error/20",
          "group-data-[invalid=true]/field:border-stroke-error group-data-[invalid=true]/field:ring-3 group-data-[invalid=true]/field:ring-stroke-error/20",

          // Group contexts
          "group-data-[readonly=true]/field:bg-gray-2 group-data-[readonly=true]/field:border-gray-10 group-data-[readonly=true]/field:cursor-default",
        ].join(" "),
      },

      size: {
        md: "h-24 text-md",
        lg: "h-28 text-lg",
      },
    },

    defaultVariants: {
      variant: "solid",
      size: "lg",
    },
  }
)

interface InputProps
  extends Omit<React.ComponentPropsWithoutRef<"input">, "size">,
  VariantProps<typeof inputVariants> { }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({
    className,
    variant,
    size,
    type,
    disabled,
    readOnly,
    maxLength,
    onChange,
    value,
    defaultValue,
    ...props
  }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        data-variant={variant}
        data-size={size}
        disabled={disabled}
        readOnly={readOnly}
        maxLength={maxLength}
        data-slot="input"
        className={inputVariants({ variant, size, className })}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input, inputVariants }
