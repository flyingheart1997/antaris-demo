import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const inputVariants = cva(
  "group/input-field relative flex items-center w-full min-w-0 transition-all outline-none disabled:pointer-events-none rounded-[6px]",
  {
    variants: {
      variant: {
        surface: "bg-surface-bg border border-stroke-primary hover:bg-surface-secondary focus-within:border-stroke-selected focus-within:ring-3 focus-within:ring-stroke-selected/20",
        solid: "bg-surface-tertiary border border-transparent hover:bg-surface-secondary focus-within:bg-surface-bg focus-within:border-stroke-selected focus-within:ring-3 focus-within:ring-stroke-selected/20",
      },
      size: {
        md: "h-40 px-12 text-md gap-8",
        lg: "h-48 px-12 text-lg gap-8",
      },
      state: {
        default: "",
        error: "border-stroke-error !ring-3 !ring-stroke-error/20",
        disabled: "opacity-50 cursor-not-allowed",
        readonly: "cursor-default",
      }
    },
    defaultVariants: {
      variant: "surface",
      size: "md",
      state: "default",
    },
  }
)

interface InputProps
  extends Omit<React.ComponentPropsWithoutRef<"input">, "size">,
  VariantProps<typeof inputVariants> {
  leadingIcon?: React.ReactNode
  trailingIcon?: React.ReactNode
  helperText?: string
  hintText?: string
  counter?: boolean
  units?: boolean
  unitsText?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({
    className,
    variant,
    size,
    state,
    leadingIcon,
    trailingIcon,
    helperText,
    hintText,
    counter,
    units,
    unitsText,
    type,
    disabled,
    readOnly,
    maxLength,
    onChange,
    value,
    defaultValue,
    ...props
  }, ref) => {
    const [inputValue, setInputValue] = React.useState<string | number | readonly string[]>(value ?? defaultValue ?? "")

    React.useEffect(() => {
      if (value !== undefined) {
        setInputValue(value)
      }
    }, [value])

    const isError = props["aria-invalid"] === "true" || props["aria-invalid"] === true || state === "error"
    const effectiveState = state === "error" ? "error" : (disabled ? "disabled" : (readOnly ? "readonly" : "default"))

    const count = String(inputValue ?? "").length
    const max = maxLength || 0

    return (
      <div
        className={cn(
          "flex w-full min-w-0 transition-all",
          className
        )}
        data-slot="input-container"
      >
        <div className="flex flex-col gap-4 flex-1 min-w-0">
          <div
            data-slot="input-field-wrapper"
            data-variant={variant}
            data-size={size}
            data-state={isError ? "error" : effectiveState}
            data-disabled={disabled}
            className={cn(inputVariants({ variant, size, state: isError ? "error" : effectiveState }))}
          >
            {leadingIcon && (
              <span className="flex shrink-0 items-center justify-center pointer-events-none text-icon-secondary group-focus-within/input-field:text-icon-primary group-data-[state=error]/input-field:text-text-error">
                {leadingIcon}
              </span>
            )}

            <input
              ref={ref}
              type={type}
              disabled={disabled}
              readOnly={readOnly}
              maxLength={maxLength}
              data-slot="input"
              className={cn(
                "flex-1 bg-transparent outline-none border-none p-0 h-full w-full placeholder:text-text-disabled selection:bg-surface-selected text-text-secondary focus:text-text-primary",
                effectiveState === "readonly" && "cursor-default",
                effectiveState === "disabled" && "cursor-not-allowed",
                inputValue && "text-text-primary"
              )}
              onChange={(e) => {
                setInputValue(e.target.value)
                onChange?.(e)
              }}
              value={value}
              defaultValue={defaultValue}
              {...props}
            />

            {units && unitsText && (
              <span className="text-md text-text-secondary pointer-events-none shrink-0 pr-4">
                {unitsText}
              </span>
            )}

            {trailingIcon && (
              <span className="flex shrink-0 items-center justify-center pointer-events-none text-icon-secondary group-focus-within/input-field:text-icon-primary group-data-[state=error]/input-field:text-text-error">
                {trailingIcon}
              </span>
            )}
          </div>

          {(helperText || hintText || counter) && (
            <div className="flex justify-between items-start text-xs leading-tight min-h-16" data-slot="input-assistive-container">
              <div
                className={cn(
                  "flex-1",
                  isError ? "text-text-error" : "text-text-secondary"
                )}
                data-slot="input-helper-text"
              >
                {helperText}
              </div>
              <div className="flex gap-8 items-center shrink-0 ml-4" data-slot="input-hint-counter">
                {hintText && <span className="text-text-disabled">{hintText}</span>}
                {counter && (
                  <span className={cn(
                    "tabular-nums text-xs",
                    max > 0 && count >= max ? "text-text-error" : "text-text-disabled"
                  )}>
                    {count}{max > 0 ? `/${max}` : ""}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input, inputVariants }
