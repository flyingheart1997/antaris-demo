"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { Spinner } from "@/components/ui/spinner"

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-16">
      <h2 className="text-xl font-semibold text-text-secondary border-b border-stroke-primary pb-8">{title}</h2>
      {children}
    </div>
  )
}

export default function SkeletonSpinnerPreview() {
  return (
    <div className="p-40 space-y-40 bg-surface-bg min-h-screen">
      <h1 className="text-xxxl font-bold text-text-primary">Skeleton & Spinner Showcase</h1>

      {/* Skeleton */}
      <Section title="Skeleton — Card Loading State">
        <div className="flex flex-col space-y-12 w-72 p-16 rounded-xl border border-stroke-primary bg-surface-secondary">
          <Skeleton className="h-40 w-full rounded-lg" />
          <div className="space-y-8">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-5/6" />
          </div>
          <div className="flex items-center gap-8">
            <Skeleton className="h-32 w-32 rounded-full" />
            <div className="flex-1 space-y-6">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-8 w-1/2" />
            </div>
          </div>
        </div>
      </Section>

      <Section title="Skeleton — Table Loading State">
        <div className="space-y-8 w-full max-w-2xl">
          {/* Header */}
          <div className="flex gap-16 px-16 py-8">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-10 w-24 ml-auto" />
          </div>
          {/* Rows */}
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-16 px-16 py-12 rounded-lg border border-stroke-primary">
              <Skeleton className="h-32 w-32 rounded-full shrink-0" />
              <Skeleton className="h-10 flex-1 max-w-xs" />
              <Skeleton className="h-10 w-24 ml-auto" />
              <Skeleton className="h-24 w-16 rounded-full" />
            </div>
          ))}
        </div>
      </Section>

      {/* Spinner */}
      <Section title="Spinner — Loading Indicator">
        <div className="flex flex-wrap items-center gap-24">
          <div className="flex flex-col items-center gap-8">
            <Spinner />
            <span className="text-xs text-text-disabled">Default</span>
          </div>
          <div className="flex flex-col items-center gap-8">
            <Spinner className="size-24" />
            <span className="text-xs text-text-disabled">Large</span>
          </div>
          <div className="flex flex-col items-center gap-8">
            <Spinner className="size-12" />
            <span className="text-xs text-text-disabled">Small</span>
          </div>
          <div className="flex flex-col items-center gap-8">
            <Spinner className="text-blue-11" />
            <span className="text-xs text-text-disabled">Info color</span>
          </div>
          <div className="flex flex-col items-center gap-8">
            <Spinner className="text-red-11" />
            <span className="text-xs text-text-disabled">Error color</span>
          </div>
        </div>
      </Section>

      <Section title="Spinner — Inline Usage">
        <div className="space-y-12">
          <button className="flex items-center gap-8 h-36 px-16 bg-green-9 text-gray-1 rounded-md text-sm font-medium" disabled>
            <Spinner className="size-14 text-gray-1" />
            Processing...
          </button>
          <button className="flex items-center gap-8 h-36 px-16 border border-stroke-primary text-text-primary rounded-md text-sm" disabled>
            <Spinner className="size-14" />
            Loading data
          </button>
        </div>
      </Section>
    </div>
  )
}
