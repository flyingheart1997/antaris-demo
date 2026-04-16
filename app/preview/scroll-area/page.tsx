"use client"

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-16">
      <h2 className="text-xl font-semibold text-text-secondary border-b border-stroke-primary pb-8">{title}</h2>
      {children}
    </div>
  )
}

const COMPONENTS = [
  { name: "ADCS Module", type: "Attitude Control", mass: "2.4 kg", status: "active" },
  { name: "EPS Unit", type: "Power System", mass: "1.8 kg", status: "active" },
  { name: "Communications", type: "RF System", mass: "0.9 kg", status: "warning" },
  { name: "GPS Receiver", type: "Navigation", mass: "0.3 kg", status: "active" },
  { name: "Main Processor", type: "OBC", mass: "0.4 kg", status: "active" },
  { name: "Solar Panels", type: "Power Generation", mass: "3.2 kg", status: "active" },
  { name: "Payload Camera", type: "Mission Payload", mass: "1.1 kg", status: "error" },
  { name: "Battery Pack", type: "Energy Storage", mass: "2.0 kg", status: "active" },
  { name: "Thruster", type: "Propulsion", mass: "0.6 kg", status: "active" },
  { name: "Star Tracker", type: "Attitude Sensing", mass: "0.2 kg", status: "active" },
  { name: "Magnetorquer", type: "Attitude Control", mass: "0.15 kg", status: "active" },
  { name: "UHF Antenna", type: "Communications", mass: "0.05 kg", status: "active" },
]

const STATUS_COLOR = {
  active: "success" as const,
  warning: "warning" as const,
  error: "error" as const,
}

export default function ScrollAreaPreview() {
  return (
    <div className="p-40 space-y-40 bg-surface-bg min-h-screen">
      <h1 className="text-xxxl font-bold text-text-primary">Scroll Area</h1>

      <Section title="Vertical Scroll (List)">
        <ScrollArea className="h-72 w-125 rounded-md border border-stroke-primary">
          <div className="p-16">
            {COMPONENTS.map((comp, i) => (
              <div key={comp.name}>
                <div className="py-10 flex items-center justify-between">
                  <div>
                    <p className="text-text-primary text-sm font-medium">{comp.name}</p>
                    <p className="text-text-disabled text-xs">{comp.type}</p>
                  </div>
                  <Badge variant="soft" color={STATUS_COLOR[comp.status as keyof typeof STATUS_COLOR]} size="sm">
                    {comp.status}
                  </Badge>
                </div>
                {i < COMPONENTS.length - 1 && <Separator />}
              </div>
            ))}
          </div>
        </ScrollArea>
      </Section>

      <Section title="Horizontal Scroll (Cards)">
        <ScrollArea className="w-full max-w-lg whitespace-nowrap rounded-md border border-stroke-primary">
          <div className="flex gap-12 p-16">
            {COMPONENTS.map((comp) => (
              <div
                key={comp.name}
                className="inline-flex flex-col gap-4 w-40 p-12 rounded-lg bg-surface-primary border border-stroke-primary shrink-0"
              >
                <span className="text-text-primary text-xs font-medium truncate">{comp.name}</span>
                <span className="text-text-disabled text-xs">{comp.mass}</span>
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </Section>

      <Section title="Both Axes">
        <ScrollArea className="h-48 w-50 rounded-md border border-stroke-primary">
          <div className="min-w-200 p-16 space-y-8">
            {COMPONENTS.slice(0, 6).map((comp) => (
              <div key={comp.name} className="flex items-center gap-40 whitespace-nowrap">
                <span className="text-text-primary text-sm w-40">{comp.name}</span>
                <span className="text-text-secondary text-sm w-40">{comp.type}</span>
                <span className="text-text-disabled text-sm w-20">{comp.mass}</span>
                <Badge variant="soft" color={STATUS_COLOR[comp.status as keyof typeof STATUS_COLOR]} size="sm">
                  {comp.status}
                </Badge>
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </Section>

      <Section title="Masked Examples">
        <div className="grid grid-cols-2 gap-32">
          {/* Masked Vertical */}
          <div className="space-y-8">
            <h3 className="text-sm font-medium text-text-disabled uppercase tracking-wider">Vertical Mask</h3>
            <ScrollArea mask orientation="vertical" className="h-75 w-full rounded-md border border-stroke-primary bg-surface-primary">
              <div className="p-16 space-y-12">
                {COMPONENTS.map((comp) => (
                  <div key={comp.name} className="flex items-center justify-between">
                    <span className="text-text-primary text-sm">{comp.name}</span>
                    <Badge size="sm" variant="outline">{comp.mass}</Badge>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Masked Horizontal */}
          <div className="space-y-8">
            <h3 className="text-sm font-medium text-text-disabled uppercase tracking-wider">Horizontal Mask</h3>
            <ScrollArea mask orientation="horizontal" className="w-full whitespace-nowrap rounded-md border border-stroke-primary bg-surface-primary">
              <div className="flex gap-12 p-16">
                {COMPONENTS.map((comp) => (
                  <div key={comp.name} className="inline-flex px-12 py-6 rounded border border-stroke-secondary bg-surface-secondary text-xs text-text-secondary shrink-0">
                    {comp.name}
                  </div>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        </div>
      </Section>
    </div>
  )
}
