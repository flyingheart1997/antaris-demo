"use client"

import { Field, FieldLabel, FieldInput, FieldDescription, FieldError, FieldArea } from "@/components/ui/field"
import { InputGroup, InputGroupInput, InputGroupAddon } from "@/components/ui/input-group"
import { Search } from "lucide-react"

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-16">
      <h2 className="text-xl font-semibold text-text-secondary border-b border-stroke-primary pb-8">{title}</h2>
      {children}
    </div>
  )
}

export default function FieldPreview() {
  return (
    <div className="p-40 space-y-40 bg-surface-bg min-h-screen">
      <h1 className="text-xxxl font-bold text-text-primary">Field Showcase</h1>

      <Section title="Vertical Orientation (Default)">
        <div className="max-w-md">
          <Field orientation="vertical">
            <FieldLabel>Satellite Name</FieldLabel>
            <FieldInput placeholder="e.g. Antaris-1" />
            <FieldDescription>Unique identifier for the mission.</FieldDescription>
          </Field>
        </div>
      </Section>

      <Section title="Horizontal Orientation">
        <div className="max-w-2xl">
          <Field orientation="horizontal">
            <FieldLabel>Mission Type</FieldLabel>
            <FieldInput placeholder="LEO / MEO / GEO" />
            <FieldDescription>Orbit classification.</FieldDescription>
          </Field>
        </div>
      </Section>

      <Section title="Error State">
        <div className="max-w-md">
          <Field aria-invalid="true">
            <FieldLabel>Uplink Frequency</FieldLabel>
            <FieldInput defaultValue="Invalid Value" aria-invalid="true" />
            <FieldError>Frequency must be between 8.0 and 8.4 GHz.</FieldError>
          </Field>
        </div>
      </Section>

      <Section title="With InputGroup Decorators">
        <div className="max-w-md">
          <Field>
            <FieldLabel>Search Components</FieldLabel>
            <InputGroup>
              <InputGroupAddon>
                <Search className="size-14" />
              </InputGroupAddon>
              <InputGroupInput placeholder="Search catalog..." />
            </InputGroup>
          </Field>
        </div>
      </Section>

      <Section title="Textarea Field">
        <div className="max-w-md">
          <Field>
            <FieldLabel>Mission Objectives</FieldLabel>
            <FieldArea placeholder="Describe primary sensor goals..." rows={4} />
          </Field>
        </div>
      </Section>
    </div>
  )
}
