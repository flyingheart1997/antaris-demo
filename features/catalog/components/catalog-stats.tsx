"use client"

import * as React from "react"
import { Text } from "@/components/ui/text"
import { cn } from "@/lib/utils"
import type { CatalogItem } from "../types/catalog"
import { StatProgress } from "@/components/stat-progress"

const STAT_CONFIG = [
  { key: "size", label: "Size", max: 24, inverse: false },
  { key: "mass", label: "Mass", max: 25, inverse: false },
  { key: "power", label: "Power", max: 16, inverse: false },
  { key: "gsd", label: "GSD", max: 4, inverse: true },
  { key: "swath", label: "Swath", max: 50, inverse: false },
] as const

interface CatalogStatsProps extends React.HTMLAttributes<HTMLDivElement> {
  item: CatalogItem
}

export function CatalogStats({ item, className, ...props }: CatalogStatsProps) {
  const rows = React.useMemo(
    () =>
      STAT_CONFIG.map((stat) => ({
        key: stat.key,
        label: stat.label,
        value: item.specs[stat.key] ?? "N/A",
        progress: getProgress(item.specs[stat.key], stat.max, stat.inverse),
      })),
    [item]
  )

  return (
    <section
      className={cn(
        "flex h-full flex-col rounded-4xl border border-stroke-primary/10 bg-surface-primary/10 px-18 py-16 backdrop-blur-40",
        className
      )}
      {...props}
    >
      <div className="flex items-start justify-between gap-12 border-b border-stroke-primary/10 pb-12">
        <div className="flex flex-col gap-2">
          <Text type="heading" size="xl">
            {item.name}
          </Text>
          <Text size="sm" color="secondary" className="uppercase tracking-[0.18em]">
            {item.category ?? "Custom"}
          </Text>
        </div>
      </div>

      <div className="mt-14 flex flex-col gap-14">
        {rows.map((row) => (
          <CatalogStatRow
            key={row.key}
            label={row.label}
            value={row.value}
            progress={row.progress}
          />
        ))}
      </div>
    </section>
  )
}

interface CatalogStatRowProps {
  label: string
  value: string
  progress: number
}

function CatalogStatRow({ label, value, progress }: CatalogStatRowProps) {
  return (
    <div className="grid w-125 grid-cols-[72px_minmax(0,1fr)_64px] items-center gap-10">
      <Text size="lg" color="secondary" className="opacity-60">
        {label}
      </Text>

      <StatProgress progress={progress} className="h-30 w-full" aria-hidden />

      <Text type="heading" size="lg" className="justify-end text-right">
        {value}
      </Text>
    </div>
  )
}

function getProgress(value: string | undefined, max: number, inverse: boolean) {
  if (!value || value === "N/A") return 0

  const match = value.match(/(\d+(\.\d+)?)/)
  if (!match) return 0

  const numeric = Number.parseFloat(match[1])
  if (!Number.isFinite(numeric) || max <= 0) return 0

  const ratio = inverse ? 1 - numeric / max : numeric / max
  return clamp(ratio, 0, 1)
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}
