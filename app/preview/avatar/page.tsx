"use client"

import { Avatar, AvatarFallback, AvatarImage, AvatarIndicator } from "@/components/ui/avatar"
import React from "react"

const COLORS = ["green", "blue", "yellow", "white", "red"] as const
const SIZES = ["1", "2", "3", "4", "5", "6"] as const

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

      <Section title="Sizes & Colors Matrix (With Status Indicators)">
        <div className="flex flex-col gap-24 overflow-x-auto">
          <div className="flex items-center justify-between gap-24 min-w-max pb-8 border-b border-stroke-primary">
            <div className="min-w-40 text-sm font-medium text-text-secondary whitespace-nowrap">Color \ Size</div>
            {SIZES.map((size) => (
              <div key={size} className="flex min-w-40 justify-center text-sm font-medium text-text-secondary">
                Size {size}
              </div>
            ))}
          </div>

          {COLORS.map((color) => (
            <div key={color} className="flex items-center justify-between gap-24 min-w-max">
              <div className="min-w-40 text-md font-medium text-text-primary capitalize whitespace-nowrap">{color}</div>
              {SIZES.map((size) => (
                <div key={size} className="flex flex-col items-center justify-center min-w-40">
                  <Avatar size={size} color={color} className="relative">
                    <AvatarFallback>{color.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </div>
              ))}
            </div>
          ))}
        </div>
      </Section>

      <Section title="Avatar Fallback Matrix (Color \ Size)">
        <div className="flex flex-col gap-24 overflow-x-auto">
          <div className="flex items-center justify-between gap-24 min-w-max pb-8 border-b border-stroke-primary">
            <div className="min-w-40 text-sm font-medium text-text-secondary whitespace-nowrap">Color \ Size</div>
            {SIZES.map((size) => (
              <div key={size} className="flex min-w-40 justify-center text-sm font-medium text-text-secondary">
                Size {size}
              </div>
            ))}
          </div>

          {COLORS.map((color) => (
            <div key={color} className="flex items-center justify-between gap-24 min-w-max">
              <div className="min-w-40 text-md font-medium text-text-primary capitalize whitespace-nowrap">{color}</div>
              {SIZES.map((size) => (
                <div key={size} className="flex flex-col items-center justify-center min-w-40">
                  <Avatar size={size} color={color}>
                    <AvatarFallback >{color.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </div>
              ))}
            </div>
          ))}
        </div>
      </Section>

      <Section title="Avatar Indicator Matrix (Color \ Size)">
        <div className="flex flex-col gap-24 overflow-x-auto">
          <div className="flex items-center justify-between gap-24 min-w-max pb-8 border-b border-stroke-primary">
            <div className="min-w-40 text-sm font-medium text-text-secondary whitespace-nowrap">Color \ Size</div>
            {SIZES.map((size) => (
              <div key={size} className="flex min-w-40 justify-center text-sm font-medium text-text-secondary">
                Size {size}
              </div>
            ))}
          </div>

          {COLORS.map((color) => (
            <div key={color} className="flex items-center justify-between gap-24 min-w-max">
              <div className="min-w-40 text-md font-medium text-text-primary capitalize whitespace-nowrap">{color}</div>
              {SIZES.map((size) => (
                <div key={size} className="flex flex-col items-center justify-center min-w-40">
                  {/* We mount the indicator inside an empty Avatar component to show how it scales natively */}
                  <Avatar size={size} color="white" className="relative items-center justify-center flex">
                    <AvatarIndicator color={color} size={size} className="relative" />
                  </Avatar>
                </div>
              ))}
            </div>
          ))}
        </div>
      </Section>

      <Section title="With Image Support (Size 5)">
        <div className="flex flex-wrap items-center gap-24">
          <Avatar size="5">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Felix" />
          </Avatar>
          <Avatar size="5">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka" alt="Aneka" />
            <AvatarFallback color="green">AN</AvatarFallback>
          </Avatar>
          <Avatar size="5">
            {/* Intentionally broken src for fallback demo */}
            <AvatarImage src="/broken-image.jpg" alt="Fallback" />
            <AvatarFallback color="red">FB</AvatarFallback>
          </Avatar>
        </div>
      </Section>

      <Section title="Avatar Group (Stacked Overlapping)">
        <div className="flex -space-x-12">
          {["KD", "JS", "MC", "RN"].map((initials, i) => (
            <Avatar key={initials} size="5" color={["blue", "green", "yellow", "red"][i] as "blue" | "green" | "yellow" | "red"} className="ring-2 ring-surface-bg shadow-sm">
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
          ))}
          <Avatar size="5" color="white" className="ring-2 ring-surface-bg shadow-sm">
            <AvatarFallback>+4</AvatarFallback>
          </Avatar>
        </div>
      </Section>
    </div>
  )
}
