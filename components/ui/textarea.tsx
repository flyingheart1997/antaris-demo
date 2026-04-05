import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Info } from "lucide-react"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

const textareaVariants = cva(
  "flex min-h-15.5 w-full transition-all outline-none disabled:pointer-events-none rounded-lg",
  {
    variants: {
      variant: {
        surface: "bg-surface-bg border border-stroke-primary",
        solid: "bg-gray-alpha-3 border border-transparent",
      },
      state: {
        default: "",
        hover: "",
        active: "ring-3 ring-surface-selected border-stroke-selected",
        filled: "",
        disabled: "opacity-60 cursor-not-allowed",
        error: "border-stroke-error bg-surface-error-subtle ring-3 ring-stroke-error/20",
        "read-only": "border-dashed border-stroke-disabled cursor-default",
      }
    },
    compoundVariants: [
      {
        variant: "surface",
        state: "default",
        className: "hover:bg-surface-hover hover:border-stroke-secondary focus:border-stroke-selected focus:ring-3 focus:ring-surface-selected"
      },
      {
        variant: "solid",
        state: "default",
        className: "hover:bg-gray-alpha-4 focus:bg-surface-bg focus:border-stroke-selected focus:ring-3 focus:ring-surface-selected"
      },
      {
        variant: "surface",
        state: "filled",
        className: "bg-surface-primary"
      }
    ],
    defaultVariants: {
      variant: "surface",
      state: "default",
    },
  }
)

interface TextareaProps
  extends Omit<React.ComponentPropsWithoutRef<"textarea">, "state">,
  VariantProps<typeof textareaVariants> {
  label?: boolean
  labelText?: string
  labelIcon?: boolean | React.ReactNode
  helper?: boolean
  helperText?: string
  units?: boolean
  unitsText?: string
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({
    className,
    variant = "surface",
    state = "default",
    label = true,
    labelText = "Label",
    labelIcon = false,
    helper = false,
    helperText = "Helper",
    units = false,
    unitsText,
    onChange,
    value,
    defaultValue,
    maxLength,
    ...props
  }, ref) => {
    const [internalValue, setInternalValue] = React.useState<string | number | readonly string[]>(value ?? defaultValue ?? "")

    React.useEffect(() => {
      if (value !== undefined) {
        setInternalValue(value)
      }
    }, [value])

    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setInternalValue(e.target.value)
      onChange?.(e)
    }

    const currentLength = String(internalValue).length
    const isError = props["aria-invalid"] === "true" || props["aria-invalid"] === true || state === "error"
    const isFilled = currentLength > 0
    const isDisabled = props.disabled || state === "disabled"
    const isReadOnly = props.readOnly || state === "read-only"

    // Derive the effective state for CVA
    let effectiveState = state
    if (state === "default") {
      if (isError) effectiveState = "error"
      else if (isDisabled) effectiveState = "disabled"
      else if (isReadOnly) effectiveState = "read-only"
      else if (isFilled) effectiveState = "filled"
    }

    return (
      <div className="flex w-full flex-col gap-4">
        {label && (
          <div className="flex items-center py-4">
            <Label className="text-text-secondary text-sm font-medium" icon={labelIcon ? (typeof labelIcon === 'boolean' ? <Info size={14} /> : labelIcon) : undefined}>
              {labelText}
            </Label>
          </div>
        )}

        <textarea
          ref={ref}
          data-slot="textarea"
          data-variant={variant}
          data-state={effectiveState}
          disabled={isDisabled}
          readOnly={isReadOnly}
          value={value}
          defaultValue={defaultValue}
          onChange={handleTextareaChange}
          maxLength={maxLength}
          className={cn(
            textareaVariants({ variant, state: effectiveState }),
            "px-16 py-12 text-sm text-text-primary placeholder:text-text-secondary selection:bg-surface-selected resize-none",
            className
          )}
          {...props}
        />

        {(helper || units) && (
          <div className="flex items-start justify-between gap-4 mt-1">
            {helper && (
              <span
                className={cn(
                  "text-xs leading-tight",
                  isError ? "text-text-error" : "text-text-secondary"
                )}
              >
                {helperText}
              </span>
            )}
            {units && (
              <span className="text-text-secondary ml-auto text-xs whitespace-nowrap tabular-nums">
                {unitsText || `${currentLength}${maxLength ? `/${maxLength}` : ""}`}
              </span>
            )}
          </div>
        )}
      </div>
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea, textareaVariants }
