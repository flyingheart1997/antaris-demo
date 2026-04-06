"use client"

import { Avatar, AvatarFallback, AvatarImage, AvatarIndicator } from "@/components/ui/avatar"

const COLORS = ["green", "blue", "yellow", "red", "white"] as const
const SIZES = ["1", "2", "3", "4", "5"] as const

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-16">
      <h2 className="text-xl font-semibold text-text-secondary border-b border-stroke-primary pb-8">{title}</h2>
      {children}
    </div>
  )
}

export default function AvatarPreview() {
  return (
    <div className="p-40 space-y-40 bg-surface-bg min-h-screen">
      <h1 className="text-xxxl font-bold text-text-primary">Avatar System Showcase</h1>

      <Section title="Colors (Fallback Initials)">
        <div className="flex flex-wrap items-center gap-16">
          {COLORS.map((color) => (
            <div key={color} className="flex flex-col items-center gap-6">
              <Avatar size="4" color={color}>
                <AvatarFallback size="4">{color.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <span className="text-xs text-text-disabled">{color}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Sizes (Blue)">
        <div className="flex flex-wrap items-end gap-16">
          {SIZES.map((size) => (
            <div key={size} className="flex flex-col items-center gap-6">
              <Avatar size={size} color="blue">
                <AvatarFallback size={size}>AB</AvatarFallback>
              </Avatar>
              <span className="text-xs text-text-disabled">Size {size}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="With Image">
        <div className="flex flex-wrap items-center gap-16">
          <Avatar size="4">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Felix" />
            <AvatarFallback size="4" color="blue">FX</AvatarFallback>
          </Avatar>
          <Avatar size="4">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka" alt="Aneka" />
            <AvatarFallback size="4" color="green">AN</AvatarFallback>
          </Avatar>
          <Avatar size="4">
            {/* Intentionally broken src for fallback demo */}
            <AvatarImage src="/broken-image.jpg" alt="Fallback" />
            <AvatarFallback size="4" color="red">FB</AvatarFallback>
          </Avatar>
        </div>
      </Section>

      <Section title="With Status Indicator">
        <div className="flex flex-wrap items-center gap-24">
          {(["green", "red", "yellow", "blue", "gray"] as const).map((color) => (
            <div key={color} className="flex flex-col items-center gap-6">
              <Avatar size="4" color="blue" className="relative">
                <AvatarFallback size="4">AB</AvatarFallback>
                <AvatarIndicator color={color} size="4" position="bottom-right" />
              </Avatar>
              <span className="text-xs text-text-disabled">{color}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Avatar Group (Stacked)">
        <div className="flex -space-x-8">
          {["AB", "CD", "EF", "GH"].map((initials, i) => (
            <Avatar key={initials} size="4" color={["blue", "green", "yellow", "red"][i] as "blue" | "green" | "yellow" | "red"} className="ring-2 ring-surface-bg">
              <AvatarFallback size="4">{initials}</AvatarFallback>
            </Avatar>
          ))}
          <Avatar size="4" color="white" className="ring-2 ring-surface-bg">
            <AvatarFallback size="4">+3</AvatarFallback>
          </Avatar>
        </div>
      </Section>
    </div>
  )
}
