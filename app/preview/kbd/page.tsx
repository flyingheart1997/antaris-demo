"use client"

import { Kbd, KbdGroup } from "@/components/ui/kbd"
import { Separator } from "@/components/ui/separator";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-16">
      <h2 className="text-xl font-semibold text-text-secondary border-b border-stroke-primary pb-8">{title}</h2>
      <div className="flex flex-wrap gap-12 items-center">{children}</div>
    </div>
  )
}

const SHORTCUTS = [
  { label: "Search", keys: ["⌘", "K"] },
  { label: "Save", keys: ["⌘", "S"] },
  { label: "New", keys: ["⌘", "N"] },
  { label: "Copy", keys: ["⌘", "C"] },
  { label: "Paste", keys: ["⌘", "V"] },
  { label: "Undo", keys: ["⌘", "Z"] },
  { label: "Redo", keys: ["⌘", "⇧", "Z"] },
  { label: "Close", keys: ["Esc"] },
]

export default function KbdPreview() {
  return (
    <div className="p-40 space-y-40 bg-surface-bg min-h-screen">
      <h1 className="text-xxxl font-bold text-text-primary">Kbd</h1>
      <Section title="Key Groups (Shortcuts)">
        <Separator orientation="vertical" className="h-16" />
        {SHORTCUTS.map(({ label, keys }) => (
          <div key={label} className="flex items-center gap-3">
            <KbdGroup>
              {keys.map((k) => <Kbd key={k}>{k}</Kbd>)}
            </KbdGroup>
            <Separator orientation="vertical" className="h-16" />
          </div>
        ))}
      </Section>

      <Section title="Key Groups (Shortcuts)">
        {SHORTCUTS.map(({ label, keys }) => (
          <div key={label} className="flex items-center gap-3">
            <span className="text-text-secondary text-sm">{label}</span>
            <KbdGroup>
              {keys.map((k) => <Kbd key={k}>{k}</Kbd>)}
            </KbdGroup>
          </div>
        ))}
      </Section>

      <Section title="In Context (Dropdown-style)">
        <div className="rounded-lg border border-stroke-primary bg-surface-primary divide-y divide-stroke-primary overflow-hidden">
          {SHORTCUTS.slice(0, 5).map(({ label, keys }) => (
            <div key={label} className="flex items-center justify-between px-12 py-10 gap-12">
              <span className="text-text-secondary text-sm">{label}</span>
              <KbdGroup>
                {keys.map((k) => <Kbd key={k}>{k}</Kbd>)}
              </KbdGroup>
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}
