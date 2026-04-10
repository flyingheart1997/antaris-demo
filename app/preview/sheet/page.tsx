"use client"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-16">
      <h2 className="text-xl font-semibold text-text-secondary border-b border-stroke-primary pb-8">{title}</h2>
      <div className="flex gap-4">{children}</div>
    </div>
  )
}

export default function SheetPreview() {
  return (
    <div className="p-40 space-y-40 bg-surface-bg min-h-screen">
      <h1 className="text-xxxl font-bold text-text-primary">Sheet Showcase</h1>

      <Section title="Standard Sides">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="surface" color="neutral">Right (Default)</Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Telemetry Configuration</SheetTitle>
              <SheetDescription>Adjust sampling rates and downlink priorities.</SheetDescription>
            </SheetHeader>
            <div className="flex-1 p-24 space-y-16 overflow-y-auto">
              {/* Dummy content */}
              <div className="h-200 bg-surface-primary/10 rounded-lg flex items-center justify-center border border-dashed border-stroke-primary">
                Config Panel
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button variant="ghost" color="neutral">Cancel</Button>
              </SheetClose>
              <Button variant="solid" color="accent">Apply Changes</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="surface" color="neutral">Bottom Sheet</Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-1/2">
            <SheetHeader>
              <SheetTitle>Mobile Alerts</SheetTitle>
              <SheetDescription>Recent mission critical notifications.</SheetDescription>
            </SheetHeader>
            <div className="p-24 overflow-y-auto">
              <p className="text-text-secondary">No active alerts at this time.</p>
            </div>
          </SheetContent>
        </Sheet>
      </Section>

      <Section title="Left & Top Panels">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" color="neutral">Left Navigation</Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Navigation</SheetTitle>
            </SheetHeader>
            <div className="p-24">
              <nav className="space-y-8">
                <p className="hover:text-text-selected cursor-pointer transition-colors">Dashboard</p>
                <p className="hover:text-text-selected cursor-pointer transition-colors">Missions</p>
                <p className="hover:text-text-selected cursor-pointer transition-colors">Catalog</p>
              </nav>
            </div>
          </SheetContent>
        </Sheet>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" color="neutral">Top Banner</Button>
          </SheetTrigger>
          <SheetContent side="top">
            <SheetHeader>
              <SheetTitle>Global Announcement</SheetTitle>
            </SheetHeader>
            <div className="p-16 text-center">
              System maintenance scheduled for Sat 04/12 at 02:00 UTC.
            </div>
          </SheetContent>
        </Sheet>
      </Section>
    </div>
  )
}
