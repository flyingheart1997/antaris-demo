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

      <Section title="Payload Subsystems (Status)">
        <div className="max-w-xl">
          <Accordion type="single" collapsible defaultValue="imager">
            <AccordionItem value="imager">
              <AccordionTrigger value="4">Imager</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <p>Spectral bands: 16 total (Visible, NIR, SWIR, TIR)</p>
                  <p>Resolution: 0.5m GSD at nadir</p>
                  <p>Data rate: 1.2 Gbps peak</p>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="sar">
              <AccordionTrigger value="2">SAR (Synthetic Aperture Radar)</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <p>Frequency band: X-band (9.6 GHz)</p>
                  <p>Polarization: Single, Dual, Quad</p>
                  <p>Swath width: Up to 100km</p>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="ais">
              <AccordionTrigger value="1">AIS Receiver</AccordionTrigger>
              <AccordionContent>
                Global ship tracking subsystem. Current sensitivity: -118 dBm.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </Section>

      <Section title="Navigation & Orbit">
        <div className="max-w-xl">
          <Accordion type="multiple">
            <AccordionItem value="gnss">
              <AccordionTrigger value="Locked">GNSS Receiver</AccordionTrigger>
              <AccordionContent>
                Multi-constellation support: GPS, Galileo, GLONASS, BeiDou. Position accuracy: &lt; 2m.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="star-tracker">
              <AccordionTrigger value="Active">Star Tracker</AccordionTrigger>
              <AccordionContent>
                Dual-head configuration. Attitude knowledge accuracy: 2 arcseconds.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </Section>
    </div>
  )
}
