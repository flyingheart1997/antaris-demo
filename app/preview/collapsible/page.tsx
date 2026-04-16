"use client"

import {
  Collapsible,
  CollapsibleTrigger,
  CollapsiblePanel,
} from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronRight, Settings, Satellite } from "lucide-react"
import { useState } from "react"
import { InputRange } from "@/components/ui/input-range"
import { Separator } from "@/components/ui/separator"

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-16">
      <h2 className="text-xl font-semibold text-text-secondary border-b border-stroke-primary pb-8">{title}</h2>
      {children}
    </div>
  )
}

export default function CollapsiblePreview() {
  const [open, setOpen] = useState(false)

  return (
    <div className="p-40 space-y-40 bg-surface-bg min-h-screen">
      <h1 className="text-xxxl font-bold text-text-primary">Collapsible</h1>

      <Section title="Basic Collapsible">
        <Collapsible className="w-full max-w-sm">
          <CollapsibleTrigger>
            <span className="text-md text-text-primary font-medium">Mission Alpha Details</span>
            <ChevronDown className="size-14 text-text-secondary transition-transform duration-200 group-data-panel-open:rotate-180" />
          </CollapsibleTrigger>
          <CollapsiblePanel>
            <InputRange
              variant="surface"
              unit="m"
              minPlaceholder="0"
              maxPlaceholder="1000"
              minLabel="Start"
              minLimit="0"
              maxLabel="End"
              maxLimit="5000"
            />
            <InputRange
              className="mt-12"
              variant="surface"
              unit="m"
              minPlaceholder="0"
              maxPlaceholder="1000"
              minLabel="Start"
              minLimit="0"
              maxLabel="End"
              maxLimit="5000"
            />
          </CollapsiblePanel>
        </Collapsible>
      </Section>

      <Section title="Controlled State">
        <div className="space-y-12">
          <div className="flex items-center gap-8">
            <Button
              variant="surface"
              color="accent"
              size="sm"
              onClick={() => setOpen(!open)}
            >
              {open ? "Collapse" : "Expand"} Panel
            </Button>
            <span className="text-text-disabled text-sm">State: {open ? "open" : "closed"}</span>
          </div>
          <Collapsible open={open} onOpenChange={setOpen}>
            <CollapsibleTrigger>
              <Settings className="size-14 text-text-secondary" />
              <span className="text-md text-text-primary font-medium flex-1">Configuration</span>
              <ChevronRight className="size-14 text-text-secondary transition-transform duration-200 group-data-panel-open:rotate-90" />
            </CollapsibleTrigger>
            <CollapsiblePanel>
              <InputRange
                variant="surface"
                unit="m"
                minPlaceholder="0"
                maxPlaceholder="1000"
                minLabel="Start"
                minLimit="0"
                maxLabel="End"
                maxLimit="5000"
              />
              <InputRange
                className="mt-12"
                variant="surface"
                unit="m"
                minPlaceholder="0"
                maxPlaceholder="1000"
                minLabel="Start"
                minLimit="0"
                maxLabel="End"
                maxLimit="5000"
              />
            </CollapsiblePanel>
          </Collapsible>
        </div>
      </Section>

      <Section title="Nested Collapsibles">
        <div className="w-full max-w-sm space-y-4">
          {["Satellites", "Ground Stations"].map((group) => (
            <Collapsible key={group}>
              <CollapsibleTrigger >
                <Satellite className="size-14 text-text-secondary" />
                <span className="text-text-primary text-md font-medium flex-1">{group}</span>
                <ChevronDown className="size-14 text-text-secondary transition-transform duration-200 group-data-panel-open:rotate-180" />
              </CollapsibleTrigger>
              <Separator />
              <CollapsiblePanel>
                <div className="pb-12 space-y-4">
                  {["Alpha", "Beta", "Gamma"].map((item) => (
                    <div key={item} className="flex items-center gap-8 p-8 rounded-md hover:bg-surface-secondary cursor-pointer">
                      <span className="size-6 rounded-full bg-green-9" />
                      <span className="text-text-secondary text-sm">{group.slice(0, -1)} {item}</span>
                    </div>
                  ))}
                </div>
              </CollapsiblePanel>
            </Collapsible>
          ))}
        </div>
      </Section>
    </div>
  )
}
