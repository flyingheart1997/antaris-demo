"use client"

import { InputRange } from "@/components/ui/input-range"
import { useState } from "react"

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-16">
      <h2 className="text-xl font-semibold text-text-secondary border-b border-stroke-primary pb-8">{title}</h2>
      {children}
    </div>
  )
}

export default function InputRangePreview() {
  const [vals, setVals] = useState({ min: "400", max: "600" })

  return (
    <div className="p-40 space-y-40 bg-surface-bg min-h-screen">
      <h1 className="text-xxxl font-bold text-text-primary">Input Range Showcase</h1>

      <Section title="Standard Usage">
        <div className="max-w-md">
          <InputRange
            minPlaceholder="Min value"
            maxPlaceholder="Max value"
            minLabel="Start"
            maxLabel="End"
          />
        </div>
      </Section>

      <Section title="With Units & Limits">
        <div className="max-w-md">
          <InputRange
            unit="km"
            minPlaceholder="400"
            maxPlaceholder="2000"
            minLabel="Perigee"
            minLimit="> 300"
            maxLabel="Apogee"
            maxLimit="< 40,000"
          />
        </div>
      </Section>

      <Section title="Controlled Example">
        <div className="max-w-md space-y-12">
          <InputRange
            unit="GHz"
            minValue={vals.min}
            maxValue={vals.max}
            onMinChange={(e) => setVals(prev => ({ ...prev, min: e.target.value }))}
            onMaxChange={(e) => setVals(prev => ({ ...prev, max: e.target.value }))}
            minLabel="Lower Band"
            maxLabel="Upper Band"
          />
        </div>
      </Section>
    </div>
  )
}
