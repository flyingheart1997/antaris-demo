"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const avatarVariants = cva(
  "inline-flex shrink-0 items-center justify-center overflow-hidden bg-surface-bg border relative rounded-md text-text-primary select-none",
  {
    variants: {
      size: {
        "1": "h-16 w-16 text-sm",
        "2": "h-24 w-24 text-md",
        "3": "h-26 w-26 text-md",
        "4": "h-28 w-28 text-lg",
        "5": "h-32 w-32 text-xl",
        "6": "h-40 w-40 text-xxl",
      },
      color: {
        green: "border-stroke-success",
        blue: "border-stroke-info",
        yellow: "border-stroke-warning",
        white: "border-stroke-primary",
        red: "border-stroke-error",
      },
    },
    defaultVariants: {
      size: "2",
      color: "blue",
    },
  }
)

const fallbackVariants = cva(
  "flex h-full w-full items-center justify-center font-heading font-medium uppercase",
  {
    variants: {
      size: {
        "1": "text-sm",
        "2": "text-md",
        "3": "text-md",
        "4": "text-lg",
        "5": "text-xl",
        "6": "text-xxl",
      },
      color: {
        green: "text-text-primary",
        blue: "text-text-primary",
        yellow: "text-text-primary",
        white: "text-text-primary",
        red: "text-text-primary",
      },
    },
    defaultVariants: {
      size: "2",
    },
  }
)

const indicatorVariants = cva(
  "absolute rounded-full",
  {
    variants: {
      size: {
        "1": "size-6",
        "2": "size-8",
        "3": "size-10",
        "4": "size-12",
        "5": "size-14",
        "6": "size-16",
      },
      color: {
        green: "bg-stroke-success",
        blue: "bg-stroke-info",
        yellow: "bg-stroke-warning",
        white: "bg-stroke-primary",
        red: "bg-stroke-error",
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
>(({ className, size, color, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    data-slot="avatar"
    data-size={size}
    className={cn(avatarVariants({ size, color, className }))}
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
    className={cn("aspect-square h-full w-full object-cover", className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

type AvatarFallbackProps = React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback> & VariantProps<typeof fallbackVariants>

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  AvatarFallbackProps
>(({ className, size, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    data-slot="avatar-fallback"
    className={cn(fallbackVariants({ size, className }))}
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
