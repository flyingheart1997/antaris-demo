"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const avatarVariants = cva(
  "inline-flex shrink-0 items-center justify-center overflow-hidden bg-surface-bg border relative rounded-sm select-none",
  {
    variants: {
      size: {
        "1": "h-24 w-24",
        "2": "h-26 w-26",
        "3": "h-28 w-28",
        "4": "h-32 w-32",
        "5": "h-40 w-40",
      },
      color: {
        green: "bg-green-11 border-green-7 text-white",
        blue: "bg-blue-11 border-blue-7 text-white",
        yellow: "bg-yellow-9 border-yellow-7 text-black",
        white: "bg-surface-bg border-stroke-primary text-text-primary",
        red: "bg-red-11 border-red-7 text-white",
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
        "1": "text-[10px]",
        "2": "text-[11px]",
        "3": "text-xs",
        "4": "text-sm",
        "5": "text-md",
      },
      color: {
        green: "text-white",
        blue: "text-white",
        yellow: "text-black",
        white: "text-text-primary",
        red: "text-white",
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
