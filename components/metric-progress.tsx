"use client"

import * as React from "react"
import { MassIcon, SizeIcon, SolarGenerationIcon } from "@/icons"
import { cn } from "@/lib/utils"
// Note: In a real project, these types should be generic or moved to a shared location.
// For now, importing from catalog feature as per plan.
import type { PhysicalMetric } from "@/features/catalog/types/catalog"

export interface MetricProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  metrics: PhysicalMetric[]
}

const metricIcons = {
  size: SizeIcon,
  mass: MassIcon,
  power: SolarGenerationIcon,
} as const

export function MetricProgress({
  metrics,
  className,
  ...props
}: MetricProgressProps) {
  return (
    <div
      className={cn("flex items-center gap-24", className)}
      {...props}
    >
      {metrics.map((metric) => (
        <MetricCard key={metric.key} metric={metric} />
      ))}
    </div>
  )
}

interface MetricCardProps {
  metric: PhysicalMetric
}

function MetricCard({ metric }: MetricCardProps) {
  const Icon = metricIcons[metric.icon]

  return (
    <div className="flex min-w-0 flex-1 flex-col items-start">
      <div className="flex w-full items-center justify-between rounded-t-md px-12 py-[10.5px] shadow-[35px_0px_10px_0px_rgba(0,0,0,0),22px_0px_9px_0px_rgba(0,0,0,0.01),12px_0px_7px_0px_rgba(0,0,0,0.02),6px_0px_6px_0px_rgba(0,0,0,0.04),1px_0px_3px_0px_rgba(0,0,0,0.05)]">
        <div className="flex min-w-0 items-center gap-12">
          <div className="flex items-center gap-[2.878px] opacity-80">
            <Icon className="size-4.5 text-text-primary" />
            <span className="font-heading text-[14px] font-normal leading-4.5 tracking-[-0.21px] text-text-primary">
              {metric.value}
            </span>
          </div>
        </div>

        <span className="shrink-0 font-heading text-[12px] font-normal leading-[normal] tracking-[-0.18px] text-text-primary opacity-40">
          {metric.max}
        </span>
      </div>

      <MetricProgressBar progress={metric.progress} />
    </div>
  )
}

function MetricProgressBar({ progress }: { progress: number }) {
  const safeProgress = Math.min(Math.max(progress, 0), 1)
  const totalSegments = 4
  const scaledProgress = safeProgress * totalSegments
  const fullSegments = Math.floor(scaledProgress)
  const partialSegment = scaledProgress - fullSegments

  return (
    <div className="grid h-px w-full grid-cols-4 gap-[2.888px] rounded-b-md">
      {Array.from({ length: totalSegments }, (_, index) => {
        const isFull = index < fullSegments
        const isPartial = index === fullSegments && partialSegment > 0

        return (
          <div key={index} className="relative h-px overflow-hidden bg-text-primary/20">
            {isFull ? <div className="h-px w-full bg-[#CCF54E]" /> : null}
            {isPartial ? (
              <div
                className="h-px bg-[#CCF54E]"
                style={{ width: `${partialSegment * 100}%` }}
              />
            ) : null}
          </div>
        )
      })}
    </div>
  )
}
