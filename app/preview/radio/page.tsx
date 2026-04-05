import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function RadioPreview() {
  return (
    <div className="flex flex-col gap-12 p-20 bg-surface-bg min-h-screen">
      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-bold text-text-primary">Radio - Surface Variant</h2>
        <div className="flex flex-col gap-2">
          <RadioGroup defaultValue="on">
             <div className="flex flex-col gap-4">
              <RadioGroupItem value="off" variant="surface">
                Surface Off
              </RadioGroupItem>
              <RadioGroupItem value="on" variant="surface">
                Surface On
              </RadioGroupItem>
              <RadioGroupItem value="hover" variant="surface" className="bg-surface-hover">
                Surface Hover (Manual)
              </RadioGroupItem>
              <RadioGroupItem value="disabled" variant="surface" disabled>
                Surface Disabled
              </RadioGroupItem>
            </div>
          </RadioGroup>
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-bold text-text-primary">Radio - Solid Variant</h2>
        <div className="flex flex-col gap-2">
          <RadioGroup defaultValue="on">
             <div className="flex flex-col gap-4">
              <RadioGroupItem value="off" variant="solid">
                Solid Default (Off)
              </RadioGroupItem>
              <RadioGroupItem value="on" variant="solid">
                Solid Default (On)
              </RadioGroupItem>
              <RadioGroupItem value="disabled" variant="solid" disabled>
                Solid Disabled
              </RadioGroupItem>
            </div>
          </RadioGroup>
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-bold text-text-primary">Radio - No Label (showText=false)</h2>
        <div className="flex flex-row gap-8">
          <RadioGroup defaultValue="1">
            <div className="flex flex-row gap-4">
              <RadioGroupItem value="1" variant="surface" showText={false} />
              <RadioGroupItem value="2" variant="surface" showText={false} />
            </div>
          </RadioGroup>
        </div>
      </section>
    </div>
  )
}
