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
        <Textarea variant="surface" placeholder="Type your message..." />
        <Textarea variant="solid" placeholder="Type your message..." />
      </Section>

      <Section title="States">
        <Textarea placeholder="Default state..." />
        <Textarea placeholder="Type here..." />
        <Textarea defaultValue="Invalid content" />
        <Textarea placeholder="Cannot type here" />
        <Textarea defaultValue="This content cannot be edited." />
      </Section>

      <Section title="With Character Counter">
        <Textarea
          placeholder="Max 200 chars..."
          maxLength={200}
          rows={4}
        />
        <Textarea
          placeholder="Describe the issue..."
          maxLength={500}
          rows={4}
        />
      </Section>

      <Section title="Without Label">
        <Textarea placeholder="No label, just textarea..." />
        <Textarea variant="solid" placeholder="Solid, no label..." />
      </Section>
    </div>
  )
}
