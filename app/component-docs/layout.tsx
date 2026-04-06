import * as React from "react"
import type { Metadata } from "next"
import { SidebarProvider } from "@/components/ui/sidebar"
import { DocsSidebar } from "./_components/DocsSidebar"

export const metadata: Metadata = {
  title: {
    template: "%s — Antaris UI Components",
    default: "Antaris UI Components",
  },
  description:
    "A production-ready component documentation library for the Antaris design system. Browse, preview, and copy code for every UI component.",
}

export default function ComponentDocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen w-full bg-surface-bg">
        {/* ── Fixed sidebar ── */}
        <aside className="hidden md:flex flex-col w-65 min-w-65 h-screen sticky top-0 overflow-y-auto">
          <DocsSidebar />
        </aside>

        {/* ── Main content ── */}
        <main className="flex-1 min-w-0 overflow-y-auto">
          {children}
        </main>
      </div>
    </SidebarProvider>
  )
}
