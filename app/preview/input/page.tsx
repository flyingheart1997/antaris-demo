"use client"

import { Input } from "@/components/ui/input"
import { Field, FieldLabel, FieldDescription, FieldError, FieldContent } from "@/components/ui/field"
import { Search, Info, AtSign } from "lucide-react"

export default function InputPreviewPage() {
  return (
    <div className="p-40 max-w-5xl mx-auto space-y-60 bg-surface-bg min-h-screen">
      <section className="space-y-24">
        <h1 className="text-xxl font-bold text-text-primary">Input Component Fidelity Check</h1>
        <p className="text-text-secondary">Verifying Input and Field components against Antaris Design System (Figma).</p>
      </section>


      {/* 3. States */}
      <section className="space-y-32">
        <h2 className="text-xl font-medium text-text-primary border-b border-stroke-primary pb-8">3. States</h2>
        <div className="grid grid-cols-2 gap-40">
          <Input disabled placeholder="Can't type here" />
          <Input readOnly defaultValue="Read only value" />
          <Input state="error" helperText="This is an error message" defaultValue="Invalid input" />
          <Input defaultValue="Already has a value" />
        </div>
      </section>

      {/* 4. Icons, Units & Counters */}
      <section className="space-y-32">
        <h2 className="text-xl font-medium text-text-primary border-b border-stroke-primary pb-8">4. Icons, Units & Counters</h2>
        <div className="grid grid-cols-2 gap-40">
          <Input
            leadingIcon={<Search size={16} />}
            placeholder="Search..."
          />
          <Input
            trailingIcon={<AtSign size={16} />}
            placeholder="email@example.com"
          />
          <Input
            units
            unitsText="USD"
            placeholder="0.00"
          />
          <Input
            counter
            maxLength={20}
            placeholder="Type something..."
            helperText="Max 20 characters allowed"
          />
        </div>
      </section>

      {/* 5. Field Component Integration */}
      <section className="space-y-32">
        <h2 className="text-xl font-medium text-text-primary border-b border-stroke-primary pb-8">5. Field Component (Form Integration)</h2>
        <div className="space-y-40">
          <div>
            <h3 className="text-sm font-medium text-text-secondary mb-16 uppercase">Vertical Field</h3>
            <Field>
              <FieldLabel><Info size={14} className="text-icon-secondary" /> Form Label </FieldLabel>
              <FieldContent>
                <Input placeholder="Standard Input inside Field" />
              </FieldContent>
              <FieldDescription>This description uses Antaris text tokens.</FieldDescription>
              <FieldError>This is how an error looks in a Field.</FieldError>
            </Field>
          </div>

          <div>
            <h3 className="text-sm font-medium text-text-secondary mb-16 uppercase">Horizontal Field</h3>
            <Field orientation="horizontal">
              <FieldLabel>Side Label</FieldLabel>
              <FieldContent>
                <Input placeholder="Input aligned to the right" />
                <FieldDescription>Description below input in horizontal mode.</FieldDescription>
              </FieldContent>
            </Field>
          </div>
        </div>
      </section>
    </div>
  )
}
