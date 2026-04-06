"use client"

import { Textarea } from "@/components/ui/textarea"

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-16">
      <h2 className="text-xl font-semibold text-text-secondary border-b border-stroke-primary pb-8">{title}</h2>
      <div className="grid grid-cols-2 gap-24">{children}</div>
    </div>
  )
}

export default function TextareaPreview() {
  return (
    <div className="p-40 space-y-40 bg-surface-bg min-h-screen">
      <h1 className="text-xxxl font-bold text-text-primary">Textarea Showcase</h1>

      <Section title="Variants">
        <Textarea variant="surface" labelText="Surface Variant" placeholder="Type your message..." />
        <Textarea variant="solid" labelText="Solid Variant" placeholder="Type your message..." />
      </Section>

      <Section title="States">
        <Textarea labelText="Default" placeholder="Default state..." />
        <Textarea labelText="With Helper Text" placeholder="Type here..." helper helperText="This field supports markdown." />
        <Textarea state="error" labelText="Error State" helper helperText="This field is required." defaultValue="Invalid content" />
        <Textarea state="disabled" labelText="Disabled" placeholder="Cannot type here" />
        <Textarea state="read-only" labelText="Read Only" defaultValue="This content cannot be edited." />
      </Section>

      <Section title="With Character Counter">
        <Textarea
          labelText="With Counter"
          placeholder="Max 200 chars..."
          maxLength={200}
          units
          rows={4}
        />
        <Textarea
          labelText="With Counter + Helper"
          placeholder="Describe the issue..."
          maxLength={500}
          helper
          helperText="Provide as much detail as possible."
          units
          rows={4}
        />
      </Section>

      <Section title="Without Label">
        <Textarea label={false} placeholder="No label, just textarea..." />
        <Textarea label={false} variant="solid" placeholder="Solid, no label..." />
      </Section>
    </div>
  )
}
