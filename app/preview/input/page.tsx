"use client"

import { Field, FieldLabel, FieldDescription, FieldError, FieldContent, FieldInput, FieldArea } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { InputGroup, InputGroupInput, InputGroupAddon, InputGroupText, InputGroupButton } from "@/components/ui/input-group"
import { InputRange } from "@/components/ui/input-range"
import { Textarea } from "@/components/ui/textarea"
import { Search, Info } from "lucide-react"

export default function InputPreviewPage() {
  return (
    <div className="p-40 max-w-5xl mx-auto space-y-60 bg-surface-bg min-h-screen">
      <section className="space-y-24">
        <h1 className="text-xxl font-bold text-text-primary">Input Component Fidelity Check</h1>
        <p className="text-text-secondary">Verifying Input and Field components against Antaris Design System (Figma).</p>
      </section>

      {/* 2. Basic Inputs */}
      <section className="space-y-32">
        <h2 className="text-xl font-medium text-text-primary border-b border-stroke-primary pb-8">1. Basic Inputs</h2>
        <div className="grid grid-cols-2 gap-40">
          <Field>
            <FieldLabel htmlFor="basic-input">Default Input</FieldLabel>
            <FieldInput id="basic-input" placeholder="Type something..." />
          </Field>
          <Field>
            <FieldLabel htmlFor="filled-input">Filled Input</FieldLabel>
            <FieldInput id="filled-input" defaultValue="Already has a value" />
          </Field>
        </div>
      </section>

      {/* 3. States */}
      <section className="space-y-32">
        <h2 className="text-xl font-medium text-text-primary border-b border-stroke-primary pb-8">2. States</h2>
        <div className="grid grid-cols-2 gap-40 text-text-primary">
          <Field>
            <FieldLabel htmlFor="disabled-input">Disabled</FieldLabel>
            <FieldInput id="disabled-input" disabled placeholder="Can't type here" />
          </Field>
          <Field>
            <FieldLabel htmlFor="readonly-input">Read Only</FieldLabel>
            <FieldInput id="readonly-input" readOnly defaultValue="Read only value" />
          </Field>
          <Field disabled>
            <FieldLabel htmlFor="unified-disabled">Unified Disabled Field</FieldLabel>
            <FieldInput id="unified-disabled" placeholder="Parent Field is disabled" />
            <FieldDescription>This whole section is disabled via Field prop.</FieldDescription>
          </Field>
          <Field data-invalid={true}>
            <FieldLabel htmlFor="error-input">Error State (Field Prop)</FieldLabel>
            <FieldInput id="error-input" defaultValue="Invalid input" />
            <FieldError>This is an error message (via Field data-invalid)</FieldError>
          </Field>
          <Field>
            <FieldLabel htmlFor="aria-invalid-input">Error State (Aria)</FieldLabel>
            <FieldInput id="aria-invalid-input" aria-invalid="true" defaultValue="Invalid input" />
            <FieldError>This is an error message (via aria-invalid)</FieldError>
          </Field>
          <Field>
            <FieldLabel htmlFor="success-input">Required Field</FieldLabel>
            <FieldInput id="success-input" placeholder="Required field..." required />
            <FieldDescription className="flex items-center justify-between">
              <span>Please fill out this field.</span>
              <span>0/20</span>
            </FieldDescription>
          </Field>
        </div>
        <Input disabled placeholder="Disabled Input" />
        <Input readOnly placeholder="Read Only Input" />
        <Input aria-invalid="true" placeholder="Invalid Input" />
        <Input required placeholder="Required Input" />
        <Textarea placeholder="Textarea" />
        <Textarea disabled placeholder="Disabled Textarea" />
        <Textarea readOnly placeholder="Read Only Textarea" />
        <Textarea aria-invalid="true" placeholder="Invalid Textarea" />
        <Textarea required placeholder="Required Textarea" />
      </section>

      {/* 4. Icons, Units & Counters */}
      <section className="space-y-32">
        <h2 className="text-xl font-medium text-text-primary border-b border-stroke-primary pb-8">3. Icons & Addons (InputGroup)</h2>
        <div className="grid grid-cols-2 gap-40">
          <Field>
            <FieldLabel htmlFor="search-input">Search Input</FieldLabel>
            <InputGroup>
              <InputGroupAddon>
                <Search />
              </InputGroupAddon>
              <InputGroupInput id="search-input" placeholder="Search..." />
            </InputGroup>
          </Field>

          <Field>
            <FieldLabel htmlFor="email-input">Email with Addon</FieldLabel>
            <InputGroup>
              <InputGroupInput id="email-input" placeholder="username" />
              <InputGroupAddon align="inline-end">
                <Search />
              </InputGroupAddon>
              <InputGroupAddon align="inline-end">
                <InputGroupText>USD</InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </Field>

          <Field>
            <FieldLabel htmlFor="price-input">Price with Units</FieldLabel>
            <InputGroup>
              <InputGroupAddon>
                <Search />
              </InputGroupAddon>
              <InputGroupInput id="price-input" placeholder="0.00" />
              <InputGroupAddon align="inline-end">
                <InputGroupText>USD</InputGroupText>
              </InputGroupAddon>
              <InputGroupButton variant="ghost" color='neutral'>
                <Search size={12} />
              </InputGroupButton>
            </InputGroup>
          </Field>

          <Field disabled>
            <FieldLabel htmlFor="disabled-group">Disabled InputGroup</FieldLabel>
            <InputGroup>
              <InputGroupAddon>
                <Search />
              </InputGroupAddon>
              <InputGroupInput id="disabled-group" placeholder="Disabled group..." />
              <InputGroupButton>
                <Search size={16} />
              </InputGroupButton>
            </InputGroup>
            <FieldDescription>Everything in this group is visually and functionally disabled.</FieldDescription>
          </Field>
          <Field>
            <FieldLabel htmlFor="api-key">API Key (Password)</FieldLabel>
            <FieldInput id="api-key" type="password" placeholder="sk-..." />
            <FieldDescription>Your API key is encrypted and stored securely.</FieldDescription>
          </Field>
        </div>
      </section>

      {/* 5. Field Component Integration */}
      <section className="space-y-32">
        <h2 className="text-xl font-medium text-text-primary border-b border-stroke-primary pb-8">4. Field Component (Form Integration)</h2>
        <div className="space-y-40">
          <div>
            <h3 className="text-sm font-medium text-text-secondary mb-16 uppercase">Vertical Field (Standard)</h3>
            <Field>
              <FieldLabel htmlFor="v-field"><Info size={14} className="text-icon-secondary mr-2" /> Form Label </FieldLabel>
              <FieldInput id="v-field" placeholder="Standard Input inside Field" />
              <FieldDescription>This description uses Antaris text tokens.</FieldDescription>
              <FieldError>This is how an error looks in a Field.</FieldError>
            </Field>
          </div>

          <div>
            <h3 className="text-sm font-medium text-text-secondary mb-16 uppercase">Horizontal Field</h3>
            <Field orientation="horizontal">
              <FieldLabel htmlFor="h-field">Side Label</FieldLabel>
              <FieldContent>
                <FieldInput id="h-field" placeholder="Input aligned to the right" />
                <FieldDescription>Description below input in horizontal mode.</FieldDescription>
              </FieldContent>
            </Field>
          </div>
        </div>
      </section>
      {/* 6. Textarea (FieldArea) */}
      <section className="space-y-32">
        <h2 className="text-xl font-medium text-text-primary border-b border-stroke-primary pb-8">5. Textarea (FieldArea)</h2>
        <div className="grid grid-cols-2 gap-40">
          <Field>
            <FieldLabel htmlFor="basic-textarea">Default Textarea</FieldLabel>
            <FieldArea id="basic-textarea" placeholder="Type your long message here..." rows={4} />
          </Field>
          <Field disabled>
            <FieldLabel htmlFor="disabled-textarea">Disabled Textarea</FieldLabel>
            <FieldArea id="disabled-textarea" placeholder="Natively disabled via Field" rows={4} />
          </Field>
          <Field data-invalid={true}>
            <FieldLabel htmlFor="error-textarea">Textarea with Error</FieldLabel>
            <FieldArea id="error-textarea" defaultValue="Something went wrong in this text" rows={4} />
            <FieldError>Please provide a valid description.</FieldError>
          </Field>
        </div>
      </section>

      {/* 6. Range Inputs */}
      <section className="space-y-32">
        <h2 className="text-xl font-medium text-text-primary border-b border-stroke-primary pb-8">6. Range Inputs</h2>
        <div className="flex items-center gap-3">
          <Field className="flex-1 min-w-0">
            <FieldLabel>Range with Units & Limits</FieldLabel>
            <InputRange
              unit="Km"
              minPlaceholder="10"
              maxPlaceholder="Value"
              minLabel="Mini"
              minLimit="5"
              maxLabel="Max"
              maxLimit="100"
            />
          </Field>

          <Field className="flex-1 min-w-0">
            <FieldLabel>Surface Variant</FieldLabel>
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
          </Field>
        </div>
      </section>
    </div>
  )
}
