import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function RadioPreview() {
  return (
    <div className="flex flex-col gap-12 p-20 bg-surface-bg min-h-screen">
      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-bold text-text-primary">Radio - Surface Variant</h2>
        <div className="flex flex-col gap-2">
          <RadioGroup defaultValue="on">
            <div className="flex flex-col gap-4">
              <RadioGroupItem value="off" variant="surface" label="Surface Off" />
              <RadioGroupItem value="on" variant="surface" label="Surface On" />
              <RadioGroupItem value="hover" variant="surface" className="bg-surface-hover" label="Surface Hover (Manual)" />
              <RadioGroupItem value="disabled" variant="surface" disabled label="Surface Disabled" />
            </div>
          </RadioGroup>
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-bold text-text-primary">Radio - Solid Variant</h2>
        <div className="flex flex-col gap-2">
          <RadioGroup defaultValue="on">
            <div className="flex flex-col gap-4">
              <RadioGroupItem value="off" variant="solid" label="Solid Default (Off)" />
              <RadioGroupItem value="on" variant="solid" label="Solid Default (On)" />
              <RadioGroupItem value="disabled" variant="solid" disabled label="Solid Disabled" />
            </div>
          </RadioGroup>
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-bold text-text-primary">Radio - No Label (showText=false)</h2>
        <div className="flex flex-row gap-8">
          <RadioGroup defaultValue="1">
            <div className="flex flex-row gap-4">
              <RadioGroupItem value="1" variant="surface" />
              <RadioGroupItem value="2" variant="surface" />
            </div>
          </RadioGroup>
        </div>
      </section>
    </div>
  )
}
