"use client"

import { IconButton } from "@/components/ui/icon-button"
import {
  Settings, Search, Plus, Trash2, Edit2, Download,
  Star, Bell, Heart, Copy, Share, Lock
} from "lucide-react"

const VARIANTS = ["solid", "soft", "surface", "outline", "ghost"] as const
const COLORS = ["accent", "neutral", "error", "warning", "info"] as const
const SIZES = ["sm", "md", "lg", "xl"] as const

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-16">
      <h2 className="text-xl font-semibold text-text-secondary border-b border-stroke-primary pb-8">{title}</h2>
      {children}
    </div>
  )
}

export default function IconButtonPreview() {
  return (
    <div className="p-40 space-y-40 bg-surface-bg min-h-screen">
      <h1 className="text-xxxl font-bold text-text-primary">IconButton Showcase</h1>

      <Section title="Variant × Color">
        {VARIANTS.map((variant) => (
          <div key={variant} className="space-y-8">
            <h3 className="text-md font-medium text-text-disabled capitalize">{variant}</h3>
            <div className="flex flex-wrap gap-8">
              {COLORS.map((color) => (
                <div key={color} className="flex flex-col items-center gap-4">
                  <IconButton variant={variant} color={color} size="md">
                    <Settings size={16} />
                  </IconButton>
                  <span className="text-xs text-text-disabled">{color}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </Section>

      <Section title="Sizes">
        <div className="flex flex-wrap items-end gap-16">
          {SIZES.map((size) => (
            <div key={size} className="flex flex-col items-center gap-6">
              <IconButton size={size} variant="surface" color="neutral">
                <Search size={size === "sm" ? 12 : size === "md" ? 16 : size === "lg" ? 20 : 24} />
              </IconButton>
              <span className="text-xs text-text-disabled">{size}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Radius Variants">
        <div className="flex flex-wrap gap-16">
          <div className="flex flex-col items-center gap-6">
            <IconButton radius="none" variant="solid" color="accent"><Settings size={16} /></IconButton>
            <span className="text-xs text-text-disabled">none</span>
          </div>
          <div className="flex flex-col items-center gap-6">
            <IconButton radius="md" variant="solid" color="accent"><Settings size={16} /></IconButton>
            <span className="text-xs text-text-disabled">md</span>
          </div>
          <div className="flex flex-col items-center gap-6">
            <IconButton radius="lg" variant="solid" color="accent"><Settings size={16} /></IconButton>
            <span className="text-xs text-text-disabled">lg</span>
          </div>
          <div className="flex flex-col items-center gap-6">
            <IconButton radius="full" variant="solid" color="accent"><Settings size={16} /></IconButton>
            <span className="text-xs text-text-disabled">full</span>
          </div>
        </div>
      </Section>

      <Section title="Common Use Cases">
        <div className="flex flex-wrap gap-12">
          <IconButton variant="ghost" color="neutral"><Search size={16} /></IconButton>
          <IconButton variant="ghost" color="neutral"><Bell size={16} /></IconButton>
          <IconButton variant="ghost" color="neutral"><Star size={16} /></IconButton>
          <IconButton variant="ghost" color="neutral"><Heart size={16} /></IconButton>
          <IconButton variant="soft" color="accent"><Plus size={16} /></IconButton>
          <IconButton variant="soft" color="error"><Trash2 size={16} /></IconButton>
          <IconButton variant="surface" color="neutral"><Edit2 size={16} /></IconButton>
          <IconButton variant="surface" color="neutral"><Copy size={16} /></IconButton>
          <IconButton variant="surface" color="neutral"><Share size={16} /></IconButton>
          <IconButton variant="surface" color="neutral"><Download size={16} /></IconButton>
          <IconButton variant="solid" color="accent"><Plus size={16} /></IconButton>
          <IconButton variant="ghost" color="neutral" disabled><Lock size={16} /></IconButton>
        </div>
      </Section>

      <Section title="Advanced (Corner Borders)">
        <div className="flex flex-wrap gap-24">
          <IconButton advanced variant="surface" color="accent"><Plus size={16} /></IconButton>
          <IconButton advanced variant="solid" color="accent"><Settings size={16} /></IconButton>
          <IconButton advanced variant="outline" color="neutral"><Search size={16} /></IconButton>
          <IconButton advanced variant="soft" color="info"><Bell size={16} /></IconButton>
          <IconButton advanced variant="surface" size="lg" color="warning"><Star size={20} /></IconButton>
        </div>
      </Section>
    </div>
  )
}
