"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AlertCircle } from "lucide-react"
import * as React from "react"

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-16">
      <h2 className="text-xl font-semibold text-text-secondary border-b border-stroke-primary pb-8">{title}</h2>
      <div className="flex flex-wrap gap-16">{children}</div>
    </div>
  )
}

export default function DialogPreview() {
  return (
    <div className="p-40 space-y-40 bg-surface-bg min-h-screen">
      <h1 className="text-xxxl font-bold text-text-primary">Dialog Showcase</h1>

      <Section title="Basic Dialog">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="surface" color="neutral">Open Dialog</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-106.25">
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-16 py-16">
              <div className="space-y-4">
                <label className="text-sm font-medium text-text-secondary">Name</label>
                <Input defaultValue="Koushik Mondal" />
              </div>
              <div className="space-y-4">
                <label className="text-sm font-medium text-text-secondary">Username</label>
                <Input defaultValue="@koushik" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="ghost" color="neutral">Cancel</Button>
              <Button variant="solid" color="accent">Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Section>

      <Section title="Confirmation Dialog">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="soft" color="error">Delete Item</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-95">
            <DialogHeader>
              <div className="flex items-center gap-12 mb-8">
                <div className="size-40 rounded-xl bg-red-alpha-3 border border-red-7 flex items-center justify-center">
                  <AlertCircle size={20} className="text-red-11" />
                </div>
                <div>
                  <DialogTitle>Delete Project?</DialogTitle>
                  <DialogDescription>This action cannot be undone.</DialogDescription>
                </div>
              </div>
            </DialogHeader>
            <p className="text-md text-text-secondary">
              This will permanently delete <strong className="text-text-primary">Mission Alpha</strong> and all of its data. Are you sure?
            </p>
            <DialogFooter className="mt-16">
              <Button variant="ghost" color="neutral">Cancel</Button>
              <Button variant="solid" color="error">Yes, Delete</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Section>

      <Section title="Information Dialog">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="soft" color="info">Learn More</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-120">
            <DialogHeader>
              <DialogTitle>About Antaris Design System</DialogTitle>
              <DialogDescription>Version 1.0 · Production Ready</DialogDescription>
            </DialogHeader>
            <div className="space-y-12 text-md text-text-secondary">
              <p>The Antaris Design System provides a comprehensive set of UI components, design tokens, and patterns for building mission-critical interfaces.</p>
              <p>Built on Next.js, Radix UI primitives, and Tailwind CSS — the system prioritizes accessibility, performance, and visual consistency.</p>
            </div>
            <DialogFooter>
              <Button variant="solid" color="accent">Got it</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Section>
    </div>
  )
}
