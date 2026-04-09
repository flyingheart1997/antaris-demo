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

      {/* Main Grid: Variant x Color x State */}
      <div className="space-y-32">
        {VARIANTS.map((variant) => (
          <div key={variant} className="space-y-16">
            <h2 className="text-xl font-semibold capitalize text-text-secondary border-b border-stroke-primary pb-8">
              Variant: {variant}
            </h2>
            <div className="overflow-x-auto">
              <div className="grid grid-cols-4 gap-y-12 gap-x-16 items-center min-w-175">
                <div className="text-sm font-medium text-text-secondary">Color</div>
                <div className="text-sm font-medium text-text-secondary">Default (Hover / Click)</div>
                <div className="text-sm font-medium text-text-secondary">Selected Prop</div>
                <div className="text-sm font-medium text-text-secondary">Disabled Prop</div>

                {COLORS.map((color) => (
                  <React.Fragment key={color}>
                    <div className="text-sm font-medium capitalize text-text-primary">
                      {color}
                    </div>
                    <div>
                      <Button variant={variant} color={color} size="md">
                        Normal
                      </Button>
                    </div>
                    <div>
                      <Button variant={variant} color={color} size="md" selected>
                        Selected
                      </Button>
                    </div>
                    <div>
                      <Button variant={variant} color={color} size="md" disabled>
                        Disabled
                      </Button>
                    </div>
                  </React.Fragment>
                ))}
              </div>
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
