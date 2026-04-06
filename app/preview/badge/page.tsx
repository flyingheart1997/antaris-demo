"use client"

import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertCircle, Info, Star, Shield } from "lucide-react"

const VARIANTS = ["solid", "soft", "surface", "outline"] as const
const COLORS = ["accent", "neutral", "success", "warning", "error", "info"] as const
const SIZES = ["sm", "md", "lg"] as const

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-16">
      <h2 className="text-xl font-semibold text-text-secondary border-b border-stroke-primary pb-8">{title}</h2>
      {children}
    </div>
  )
}

export default function BadgePreview() {
  return (
    <div className="p-40 space-y-40 bg-surface-bg min-h-screen">
      <h1 className="text-xxxl font-bold text-text-primary">Badge System Showcase</h1>

      <Section title="Variant × State">
        {VARIANTS.map((variant) => (
          <div key={variant} className="space-y-8">
            <h3 className="text-md font-medium text-text-disabled capitalize">{variant}</h3>
            <div className="flex flex-wrap gap-8">
              {COLORS.map((color) => (
                <Badge key={color} variant={variant} color={color}>
                  {color.charAt(0).toUpperCase() + color.slice(1)}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </Section>

      <Section title="Sizes">
        <div className="flex flex-wrap items-center gap-10">
          {SIZES.map((size) => (
            <Badge key={size} size={size} variant="soft" color="accent">
              Size {size.toUpperCase()}
            </Badge>
          ))}
        </div>
      </Section>

      <Section title="With Icons">
        <div className="flex flex-wrap gap-10">
          <Badge iconStart={<CheckCircle size={10} />} variant="soft" color="success">Active</Badge>
          <Badge iconStart={<AlertCircle size={10} />} variant="soft" color="error">Failed</Badge>
          <Badge iconStart={<Info size={10} />} variant="soft" color="info">Info</Badge>
          <Badge iconStart={<Star size={10} />} variant="solid" color="warning">Featured</Badge>
          <Badge iconEnd={<Shield size={10} />} variant="surface" color="neutral">Verified</Badge>
        </div>
      </Section>
    </div>
  )
}
