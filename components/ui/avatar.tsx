"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const avatarVariants = cva(
  "inline-flex shrink-0 items-center justify-center overflow-hidden bg-surface-bg border relative",
  {
    variants: {
      size: {
        "0": "size-16 rounded-sm",
        "1": "size-24 rounded-md",
        "2": "size-28 rounded-md",
        "3": "size-32 rounded-md",
        "4": "size-40 rounded-lg border-lg",
        "5": "size-48 rounded-lg border-lg",
      },
      color: {
        green: "border-stroke-success",
        red: "border-stroke-error",
        blue: "border-stroke-info",
        yellow: "border-stroke-warning",
        gray: "border-gray-9",
      },
      radius: {
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        full: "rounded-full",
        none: "rounded-none",
      }
    },
    defaultVariants: {
      size: "2",
      color: "blue",
    },
  }
)

const fallbackVariants = cva(
  "flex h-full w-full items-center justify-center font-heading font-regular",
  {
    variants: {
      size: {
        "0": "size-1.5",
        "1": "size-2",
        "2": "size-2.5",
        "3": "size-3",
        "4": "size-4",
        "5": "size-5",
      },
      color: {
        green: "text-green-9",
        red: "text-red-9",
        blue: "text-blue-9",
        yellow: "text-yellow-9",
        gray: "text-gray-9",
      },
    },
    defaultVariants: {
      size: "2",
    },
  }
)

const indicatorVariants = cva(
  "absolute rounded-full border-2 border-surface-bg",
  {
    variants: {
      size: {
        "0": "size-1.5",
        "1": "size-2",
        "2": "size-2.5",
        "3": "size-3",
        "4": "size-4",
        "5": "size-5",
      },
      color: {
        green: "bg-green-9",
        red: "bg-red-9",
        yellow: "bg-yellow-9",
        blue: "bg-blue-9",
        gray: "bg-gray-9",
      },
      position: {
        "top-right": "top-0 right-0 translate-x-1/4 -translate-y-1/4",
        "bottom-right": "bottom-0 right-0 translate-x-1/4 translate-y-1/4",
      }
    },
    defaultVariants: {
      color: "green",
      position: "bottom-right",
    }
  }
)

interface AvatarProps
  extends Omit<React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>, "color">,
  VariantProps<typeof avatarVariants> { }

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ className, size, color, radius, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    data-slot="avatar"
    data-radius={radius}
    className={cn(avatarVariants({ size, color, radius, className }))}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    data-slot="avatar-image"
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

type AvatarFallbackProps = React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback> & VariantProps<typeof fallbackVariants>

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  AvatarFallbackProps
>(({ className, size, color, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    data-slot="avatar-fallback"
    data-color={color}
    className={cn(fallbackVariants({ size, color, className }))}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

type AvatarIndicatorProps = React.ComponentPropsWithoutRef<"span"> & VariantProps<typeof indicatorVariants>

const AvatarIndicator = ({ className, size, color, position, ...props }: AvatarIndicatorProps) => (
  <span
    data-slot="avatar-indicator"
    className={cn(indicatorVariants({ size, color, position, className }))}
    {...props}
  />
)

export { Avatar, AvatarImage, AvatarFallback, AvatarIndicator }
