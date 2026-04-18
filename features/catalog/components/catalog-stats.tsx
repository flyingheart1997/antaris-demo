"use client"

import * as React from "react"
import { Text } from "@/components/ui/text"
import { cn } from "@/lib/utils"
import type { CatalogItem } from "../types/catalog-data-types"
import { StatProgress } from "@/components/stat-progress"
import { useCatalogStats, type CatalogStatRowData } from "../hooks/use-catalog-stats"
import { Tooltip } from "@/components/ui/tooltip"

interface CatalogStatsProps extends React.HTMLAttributes<HTMLDivElement> {
  item: CatalogItem
}

/**
 * Enterprise Hardware Statistics View.
 * Displays normalized technical metrics for the selected hardware item.
 */
export function CatalogStats({ item, className, ...props }: CatalogStatsProps) {
  const { stats } = useCatalogStats(item)

  return (
    <section
      className={cn(
        "flex h-full flex-col rounded-4xl border border-stroke-primary/10 bg-surface-primary/10 px-18 py-16 backdrop-blur-40",
        className
      )}
      {...props}
    >
      <div className="flex items-start justify-between gap-12 border-b border-stroke-primary/10 pb-12">
        <div className="flex flex-col gap-2 min-w-0 flex-1">
          <Tooltip content={item.name} side="top">
            <Text type="heading" size="xl" className="truncate block w-full">
              {item.name}
            </Text>
          </Tooltip>
          <Text size="sm" color="secondary" className="uppercase tracking-[0.18em] truncate">
            {item.category ?? "Custom"}
          </Text>
        </div>
      </div>

      <div className="mt-14 flex flex-col gap-14">
        {stats.map((row) => (
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

function CatalogStatRow({ label, value, progress }: Omit<CatalogStatRowData, 'key'>) {
  return (
    <div className="grid w-full grid-cols-[72px_minmax(0,1fr)_84px] items-center gap-10">
      <Text size="lg" color="secondary" className="opacity-60 truncate block w-full">
        {label}
      </Text>

      <StatProgress progress={progress} className="h-30 w-full" aria-hidden />

      <Tooltip content={value} side="bottom">
        <Text type="heading" size="lg" className="justify-end text-right truncate block w-full">
          {value}
        </Text>
      </Tooltip>
    </div>
  )
}
