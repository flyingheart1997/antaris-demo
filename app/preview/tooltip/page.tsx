"use client"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
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
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="surface" color="neutral">Hover Top</Button>
            </TooltipTrigger>
            <TooltipContent side="top">Tooltip on top</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="surface" color="neutral">Hover Bottom</Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">Tooltip on bottom</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="surface" color="neutral">Hover Left</Button>
            </TooltipTrigger>
            <TooltipContent side="left">Tooltip on left</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="surface" color="neutral">Hover Right</Button>
            </TooltipTrigger>
            <TooltipContent side="right">Tooltip on right</TooltipContent>
          </Tooltip>
        </Section>

        <Section title="On Icon Buttons">
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="p-8 text-text-secondary hover:text-text-primary transition-colors rounded-md hover:bg-surface-hover">
                <Info size={18} />
              </button>
            </TooltipTrigger>
            <TooltipContent>More information</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button className="p-8 text-text-secondary hover:text-text-primary transition-colors rounded-md hover:bg-surface-hover">
                <Settings size={18} />
              </button>
            </TooltipTrigger>
            <TooltipContent>Open settings</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button className="p-8 text-text-secondary hover:text-text-primary transition-colors rounded-md hover:bg-surface-hover">
                <HelpCircle size={18} />
              </button>
            </TooltipTrigger>
            <TooltipContent>Get help</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button className="p-8 text-yellow-11 hover:bg-yellow-alpha-2 transition-colors rounded-md">
                <AlertCircle size={18} />
              </button>
            </TooltipTrigger>
            <TooltipContent>Warning: Action required</TooltipContent>
          </Tooltip>
        </Section>

        <Section title="Long Content">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="soft" color="info">Hover for details</Button>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs text-center">
              This is a longer tooltip that wraps across multiple lines to display more complete information.
            </TooltipContent>
          </Tooltip>
        </Section>
      </div>
    </TooltipProvider>
  )
}
