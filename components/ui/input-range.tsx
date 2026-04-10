"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { InputGroup, InputGroupInput, InputGroupAddon, InputGroupText } from "./input-group"
import { type VariantProps } from "class-variance-authority"
import { inputGroupVariants } from "./input-group"
import { Field, FieldDescription } from "./field"

export interface InputRangeProps
  extends React.ComponentPropsWithoutRef<"div">,
  VariantProps<typeof inputGroupVariants> {
  minPlaceholder?: string
  maxPlaceholder?: string
  unit?: string
  minLabel?: string
  minLimit?: string | number
  maxLabel?: string
  maxLimit?: string | number
  minValue?: string
  maxValue?: string
  onMinChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onMaxChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const InputRange = React.forwardRef<HTMLDivElement, InputRangeProps>(
  ({
    className,
    minPlaceholder,
    maxPlaceholder,
    unit,
    minLabel,
    minLimit,
    maxLabel,
    maxLimit,
    minValue,
    maxValue,
    onMinChange,
    onMaxChange,
    variant,
    size,
    ...props
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex w-full", className)}
        {...props}
      >
        <div className="flex items-start gap-4">
          <Field className="flex-1">
            <InputGroup variant={variant} size={size}>
              <InputGroupInput
                className="min-w-100"
                placeholder={minPlaceholder}
                value={minValue}
                onChange={onMinChange}
              />
              {unit && (
                <InputGroupAddon align="inline-end">
                  <InputGroupText>{unit}</InputGroupText>
                </InputGroupAddon>
              )}
            </InputGroup>
            {(minLabel || minLimit) && (
              <FieldDescription className="flex justify-between px-4 select-none">
                <span>{minLabel}</span>
                <span>{minLimit}</span>
              </FieldDescription>
            )}
          </Field>

          <span className="text-gray-8 text-sm font-medium shrink-0 leading-none pt-10">─</span>

          <Field className="flex-1">
            <InputGroup variant={variant} size={size}>
              <InputGroupInput
                className="min-w-100"
                placeholder={maxPlaceholder}
                value={maxValue}
                onChange={onMaxChange}
              />
              {unit && (
                <InputGroupAddon align="inline-end">
                  <InputGroupText>{unit}</InputGroupText>
                </InputGroupAddon>
              )}
            </InputGroup>
            {(maxLabel || maxLimit) && (
              <FieldDescription className="flex justify-between px-4 select-none">
                <span>{maxLabel}</span>
                <span>{maxLimit}</span>
              </FieldDescription>
            )}
          </Field>
        </div>
      </div>
    )
  }
)
InputRange.displayName = "InputRange"

export { InputRange }
