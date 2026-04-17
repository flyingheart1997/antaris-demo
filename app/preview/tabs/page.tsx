"use client"

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

// Simple icon placeholder using inline SVG
function HomeIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-text-secondary text-xs font-medium uppercase tracking-wider">{title}</h2>
      <div className="flex flex-col gap-8">
        {children}
      </div>
    </div>
  )
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-text-secondary text-md">{label}</span>
      <div className="flex flex-wrap items-start gap-6">
        {children}
      </div>
    </div>
  )
}

export default function TabsPreviewPage() {
  return (
    <div className="min-h-screen bg-surface-bg p-12 font-body">
      <div className="max-w-5xl mx-auto flex flex-col gap-16">

        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-text-primary text-xxl font-medium font-heading">Tabs Component</h1>
          <p className="text-text-secondary text-lg">Antaris Design System · Root-Prop Pattern · CSS-Driven</p>
        </div>

        {/* ── Sizing: md ── */}
        <Section title="Size: md">
          <Row label="Default States (Default, Hover, Active, Disabled)">
            <Tabs defaultValue="tab1" size="md">
              <TabsList>
                <TabsTrigger value="tab1">Active Tab</TabsTrigger>
                <TabsTrigger value="tab2">Default Tab</TabsTrigger>
                <TabsTrigger value="tab3">Hover Me</TabsTrigger>
                <TabsTrigger value="tab4" disabled>Disabled Tab</TabsTrigger>
              </TabsList>
            </Tabs>
          </Row>
        </Section>

        {/* ── Sizing: lg ── */}
        <Section title="Size: lg">
          <Row label="Default States (Default, Hover, Active, Disabled)">
            <Tabs defaultValue="tab1" size="lg">
              <TabsList>
                <TabsTrigger value="tab1">Active Tab</TabsTrigger>
                <TabsTrigger value="tab2">Default Tab</TabsTrigger>
                <TabsTrigger value="tab3">Hover Me</TabsTrigger>
                <TabsTrigger value="tab4" disabled>Disabled Tab</TabsTrigger>
              </TabsList>
            </Tabs>
          </Row>
        </Section>

        {/* ── Functional Example ── */}
        <Section title="Functional Example (with Content)">
          <Tabs defaultValue="overview" size="md">
            <TabsList>
              <TabsTrigger value="overview">
                <HomeIcon className="mr-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <div className="mt-8">
                <TabsContent value="overview">
                <div className="rounded-lg border border-stroke-primary bg-surface-primary/5 p-12 text-text-secondary text-md">
                    Overview content displayed here.
                </div>
                </TabsContent>
                <TabsContent value="analytics">
                <div className="rounded-lg border border-stroke-primary bg-surface-primary/5 p-12 text-text-secondary text-md">
                    Analytics dashboard content.
                </div>
                </TabsContent>
                <TabsContent value="settings">
                <div className="rounded-lg border border-stroke-primary bg-surface-primary/5 p-12 text-text-secondary text-md">
                    Configuration and settings options.
                </div>
                </TabsContent>
            </div>
          </Tabs>
        </Section>

      </div>
    </div>
  )
}
