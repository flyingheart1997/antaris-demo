"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-16">
      <h2 className="text-xl font-semibold text-text-secondary border-b border-stroke-primary pb-8">{title}</h2>
      {children}
    </div>
  )
}

export default function AccordionPreview() {
  return (
    <div className="p-40 space-y-40 bg-surface-bg min-h-screen">
      <h1 className="text-xxxl font-bold text-text-primary">Accordion Showcase</h1>

      <Section title="Single (Collapsible)">
        <div className="max-w-xl">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>What is the Antaris Design System?</AccordionTrigger>
              <AccordionContent>
                The Antaris Design System is a comprehensive UI component library built for mission-critical satellite operations interfaces. It provides design tokens, components, and patterns.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How do I install it?</AccordionTrigger>
              <AccordionContent>
                The system is pre-configured in this Next.js project. Import components directly from <code className="text-green-11 bg-green-alpha-2 px-4 py-0.5 rounded-sm text-xs">@/components/ui</code>.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes. All components are built on Radix UI primitives, which implement WAI-ARIA patterns. Keyboard navigation, focus management, and screen reader support are built-in.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </Section>

      <Section title="Multiple (Allow Multiple Open)">
        <div className="max-w-xl">
          <Accordion type="multiple" defaultValue={["q1"]}>
            <AccordionItem value="q1">
              <AccordionTrigger>Orbit Insertion Parameters</AccordionTrigger>
              <AccordionContent>
                LEO insertion at 550km altitude. Inclination: 53°. RAAN: 127.4°. True anomaly: 245.8°.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q2">
              <AccordionTrigger>Telemetry Status</AccordionTrigger>
              <AccordionContent>
                All subsystems nominal. Battery: 94%. Signal strength: -87 dBm. Downlink rate: 2 Mbps.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q3">
              <AccordionTrigger>Thermal Control</AccordionTrigger>
              <AccordionContent>
                Panel temperature: 22°C. Heater duty cycle: 12%. All thermal zones within limits.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </Section>
    </div>
  )
}
