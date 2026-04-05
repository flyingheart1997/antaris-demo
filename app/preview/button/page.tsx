"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Mail, ArrowRight, Star, Loader2, Plus, Settings } from "lucide-react"

const VARIANTS = ["solid", "soft", "surface", "outline", "ghost"] as const
const COLORS = ["accent", "error", "warning", "info", "neutral"] as const
const SIZES = ["sm", "md", "lg", "xl"] as const

export default function ButtonPreview() {

  return (
    <div className="p-40 space-y-40 bg-surface-bg min-h-screen">
      <h1 className="text-xxxl font-bold mb-20 text-text-primary">Antaris Button System Showcase</h1>

      {/* Main Grid: Variant x Color */}
      <div className="space-y-32">
        {VARIANTS.map((variant) => (
          <div key={variant} className="space-y-16">
            <h2 className="text-xl font-semibold capitalize text-text-secondary border-b border-stroke-primary pb-8">
              Variant: {variant}
            </h2>
            <div className="flex flex-wrap gap-16">
              {COLORS.map((color) => (
                <div key={color} className="flex flex-col items-center gap-8">
                  <Button variant={variant} color={color} size="md">
                    {color.charAt(0).toUpperCase() + color.slice(1)}
                  </Button>
                  <span className="text-xs text-text-disabled">{color}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Sizes Showcase */}
      <div className="space-y-16 pt-32">
        <h2 className="text-xl font-semibold text-text-secondary border-b border-stroke-primary pb-8">
          Sizes & Full Width
        </h2>
        <div className="flex flex-wrap items-end gap-16">
          {SIZES.map((size) => (
            <Button key={size} size={size} variant="solid" color="accent">
              Size {size.toUpperCase()}
            </Button>
          ))}
          <div className="w-full max-w-sm pt-16">
            <Button variant="surface" color="neutral">
              Full Width Button
            </Button>
          </div>
        </div>
      </div>

      {/* Icons & Loading Showcase */}
      <div className="space-y-16 pt-32">
        <h2 className="text-xl font-semibold text-text-secondary border-b border-stroke-primary pb-8">
          Icons, States & Loading
        </h2>
        <div className="flex flex-wrap items-center gap-16">
          <Button leadingIcon={<Mail className="size-16" />} color="info">
            Leading Icon
          </Button>
          <Button trailingIcon={<ArrowRight className="size-16" />} color="accent" variant="soft">
            Trailing Icon
          </Button>
          <Button leadingIcon={<Star className="size-16" />} trailingIcon={<Plus className="size-16" />} variant="outline">
            Double Icons
          </Button>

          <div className="bg-surface-secondary p-12 rounded-md flex gap-8">
            <Button size="sm" leadingIcon={<Settings className="size-12" />} showText={false} variant="ghost" color="neutral" />
            <Button size="md" leadingIcon={<Settings className="size-16" />} showText={false} variant="soft" color="neutral" />
            <Button size="lg" leadingIcon={<Settings className="size-20" />} showText={false} variant="surface" color="neutral" />
            <Button size="xl" leadingIcon={<Settings className="size-24" />} showText={false} variant="solid" color="neutral" />
          </div>

          <Button
            variant="solid"
            color="accent"
          >
            Click to Load
          </Button>

          <Button disabled variant="solid" color="error">
            Disabled
          </Button>
        </div>
      </div>

      {/* Radius Showcase */}
      <div className="space-y-16 pt-32">
        <h2 className="text-xl font-semibold text-text-secondary border-b border-stroke-primary pb-8">
          Radius System
        </h2>
        <div className="flex flex-wrap items-center gap-16">
          <Button radius="none" variant="solid" color="neutral">Radius: None</Button>
          <Button radius="md" variant="solid" color="neutral">Radius: Sq (Default)</Button>
          <Button radius="full" variant="solid" color="neutral">Radius: Full</Button>
        </div>
      </div>
    </div>
  )
}
