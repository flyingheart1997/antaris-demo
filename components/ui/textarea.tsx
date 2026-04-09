import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

const textareaVariants = cva(
  [
    "flex min-h-15.5 w-full transition-all outline-none rounded-md p-6",
    "border-[0.5px] focus-visible:outline-none disabled:opacity-40 disabled:pointer-events-none",
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
          "read-only:bg-gray-2 read-only:border-gray-10 read-only:cursor-not-allowed read-only:hover:border-gray-10",

          // Error states
          "aria-invalid:border-stroke-error aria-invalid:ring-3 aria-invalid:ring-stroke-error/20",
          "group-data-[invalid=true]/field:border-stroke-error group-data-[invalid=true]/field:ring-3 group-data-[invalid=true]/field:ring-stroke-error/20",

          // Group contexts
          "group-data-[readonly=true]/field:bg-gray-2 group-data-[readonly=true]/field:border-gray-10 group-data-[readonly=true]/field:cursor-default",
        ].join(" "),
      },
    },
    defaultVariants: {
      variant: "solid",
    },
  }
)

interface TextareaProps
  extends React.ComponentPropsWithoutRef<"textarea">,
  VariantProps<typeof textareaVariants> { }

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({
    className,
    variant,
    disabled,
    readOnly,
    ...props
  }, ref) => {
    return (
      <textarea
        ref={ref}
        data-slot="textarea"
        data-variant={variant}
        disabled={disabled}
        readOnly={readOnly}
        className={textareaVariants({ variant, className })}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea, textareaVariants }
