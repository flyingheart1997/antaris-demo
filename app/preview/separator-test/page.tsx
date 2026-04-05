"use client"

import { Separator } from "@/components/ui/separator"

export default function SeparatorTestPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-12 bg-surface-bg p-20">
      <h1 className="text-4xl font-heading font-bold text-text-primary">Separator Component Test (v2)</h1>
      
      <div className="flex flex-col gap-4 w-full max-w-md items-center">
        <p className="text-text-secondary text-sm">Horizontal Separator (bg-stroke-separator)</p>
        <Separator orientation="horizontal" />
      </div>

      <div className="flex gap-20 h-40 items-center">
        <div className="flex flex-col items-center gap-4 h-full">
          <p className="text-text-secondary text-sm">Vertical Separator (Rotated)</p>
          <Separator orientation="vertical" />
        </div>
      </div>

      <div className="mt-12 p-8 border border-stroke-primary rounded-lg bg-surface-secondary/20">
        <p className="text-text-primary text-lg mb-4">Sample Card with Separator</p>
        <div className="flex flex-col gap-4 w-80">
          <div className="h-4 bg-surface-tertiary rounded w-1/2" />
          <Separator />
          <div className="h-4 bg-surface-tertiary rounded w-full" />
          <div className="h-4 bg-surface-tertiary rounded w-3/4" />
        </div>
      </div>
    </div>
  )
}
