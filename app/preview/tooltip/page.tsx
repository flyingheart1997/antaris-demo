"use client"

import {
  Tooltip,
  TooltipProvider,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { Info, Settings, HelpCircle, AlertCircle } from "lucide-react"

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-16">
      <h2 className="text-xl font-semibold text-text-secondary border-b border-stroke-primary pb-8">{title}</h2>
      <div className="flex flex-wrap gap-24 items-center">{children}</div>
    </div>
  )
}

export default function TooltipPreview() {
  return (
    <TooltipProvider>
      <div className="p-40 space-y-40 bg-surface-bg min-h-screen">
        <h1 className="text-xxxl font-bold text-text-primary">Tooltip Showcase</h1>

        <Section title="Sides">
          <Tooltip content="Tooltip on top" side="top">
            <Button variant="surface" color="neutral">Hover Top</Button>
          </Tooltip>

          <Tooltip content="Tooltip on bottom" side="bottom" align="center">
            <Button variant="surface" color="neutral">Hover Bottom</Button>
          </Tooltip>

          <Tooltip content="Tooltip on left" side="left">
            <Button variant="surface" color="neutral">Hover Left</Button>
          </Tooltip>

          <Tooltip content="Tooltip on right" side="right">
            <Button variant="surface" color="neutral">Hover Right</Button>
          </Tooltip>
        </Section>

        <Section title="On Icon Buttons">
          <Tooltip content="More information">
            <button className="p-8 text-text-secondary hover:text-text-primary transition-colors rounded-md hover:bg-surface-hover">
              <Info size={18} />
            </button>
          </Tooltip>

          <Tooltip content="Open settings">
            <button className="p-8 text-text-secondary hover:text-text-primary transition-colors rounded-md hover:bg-surface-hover">
              <Settings size={18} />
            </button>
          </Tooltip>

          <Tooltip content="Get help">
            <button className="p-8 text-text-secondary hover:text-text-primary transition-colors rounded-md hover:bg-surface-hover">
              <HelpCircle size={18} />
            </button>
          </Tooltip>

          <Tooltip content="Warning: Action required">
            <button className="p-8 text-yellow-11 hover:bg-yellow-alpha-2 transition-colors rounded-md">
              <AlertCircle size={18} />
            </button>
          </Tooltip>
        </Section>

        <Section title="Long Content">
          <Tooltip
            content="This is a longer tooltip that wraps across multiple lines to display more complete information."
            contentClassName="max-w-xs text-center"
          >
            <Button variant="soft" color="info">Hover for details</Button>
          </Tooltip>
        </Section>
      </div>
    </TooltipProvider>
  )
}
