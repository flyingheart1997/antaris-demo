"use client"

import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable"

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-16">
      <h2 className="text-xl font-semibold text-text-secondary border-b border-stroke-primary pb-8">{title}</h2>
      {children}
    </div>
  )
}

function PanelContent({ label, muted }: { label: string; muted?: boolean }) {
  return (
    <div className={`h-full flex items-center justify-center p-16 ${muted ? "bg-surface-secondary" : "bg-surface-primary"}`}>
      <span className="text-text-secondary text-sm">{label}</span>
    </div>
  )
}

export default function ResizablePreview() {
  return (
    <div className="p-40 space-y-40 bg-surface-bg min-h-screen">
      <h1 className="text-xxxl font-bold text-text-primary">Resizable</h1>

      <Section title="Horizontal (Side-by-Side)">
        <ResizablePanelGroup
          orientation="horizontal"
          className="h-48 rounded-lg border border-stroke-primary overflow-hidden"
        >
          <ResizablePanel defaultSize={40} minSize={20}>
            <PanelContent label="Navigation Panel" muted />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={60}>
            <PanelContent label="Main Content" />
          </ResizablePanel>
        </ResizablePanelGroup>
      </Section>

      <Section title="Vertical (Stacked)">
        <ResizablePanelGroup
          orientation="vertical"
          className="h-72 rounded-lg border border-stroke-primary overflow-hidden"
        >
          <ResizablePanel defaultSize={40} minSize={20}>
            <PanelContent label="Top Panel — Telemetry" muted />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={60}>
            <PanelContent label="Bottom Panel — Logs" />
          </ResizablePanel>
        </ResizablePanelGroup>
      </Section>

      <Section title="Three Panels (Horizontal)">
        <ResizablePanelGroup
          orientation="horizontal"
          className="h-48 rounded-lg border border-stroke-primary overflow-hidden"
        >
          <ResizablePanel defaultSize={25} minSize={15}>
            <PanelContent label="Sidebar" muted />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={50}>
            <PanelContent label="Main" />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={25} minSize={15}>
            <PanelContent label="Details" muted />
          </ResizablePanel>
        </ResizablePanelGroup>
      </Section>

      <Section title="Without Visual Handle">
        <ResizablePanelGroup
          orientation="horizontal"
          className="h-36 rounded-lg border border-stroke-primary overflow-hidden"
        >
          <ResizablePanel defaultSize={50}>
            <PanelContent label="Left (drag edge to resize)" />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={50}>
            <PanelContent label="Right" muted />
          </ResizablePanel>
        </ResizablePanelGroup>
      </Section>
    </div>
  )
}
