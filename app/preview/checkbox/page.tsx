"use client"

import * as React from "react"
import { Checkbox } from "@/components/ui/checkbox"

export default function CheckboxPreview() {
  return (
    <div className="p-10 space-y-10 bg-surface-bg min-h-screen">
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-text-primary">Surface Variant</h2>
        <div className="flex flex-wrap gap-10 items-start">
          <div className="space-y-2">
            <p className="text-xs text-text-secondary">Default (Off)</p>
            <Checkbox variant="surface" label="Label" />
          </div>
          <div className="space-y-2">
            <p className="text-xs text-text-secondary">Checked (On)</p>
            <Checkbox variant="surface" label="Label" defaultChecked />
          </div>
          <div className="space-y-2">
            <p className="text-xs text-text-secondary">Mixed (Indeterminate)</p>
            <Checkbox variant="surface" label="Label" checked="indeterminate" />
          </div>
          <div className="space-y-2">
            <p className="text-xs text-text-secondary">Disabled</p>
            <Checkbox variant="surface" label="Label" disabled />
          </div>
          <div className="space-y-2">
            <p className="text-xs text-text-secondary">No Text</p>
            <Checkbox variant="surface" showText={false} label="Hidden" />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-text-primary">Solid Variant</h2>
        <div className="flex flex-wrap gap-10 items-start">
          <div className="space-y-2">
            <p className="text-xs text-text-secondary">Default (Off)</p>
            <Checkbox variant="solid" label="Label" />
          </div>
          <div className="space-y-2">
            <p className="text-xs text-text-secondary">Checked (On)</p>
            <Checkbox variant="solid" label="Label" defaultChecked />
          </div>
          <div className="space-y-2">
            <p className="text-xs text-text-secondary">Mixed (Indeterminate)</p>
            <Checkbox variant="solid" label="Label" checked="indeterminate" />
          </div>
          <div className="space-y-2">
            <p className="text-xs text-text-secondary">Disabled</p>
            <Checkbox variant="solid" label="Label" disabled />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-text-primary">States (Surface)</h2>
        <div className="flex flex-col gap-4">
          <Checkbox variant="surface" label="Hover me (Surface)" />
          <Checkbox variant="surface" label="Focus me (Surface)" />
        </div>
      </section>
    </div>
  )
}
