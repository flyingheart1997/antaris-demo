import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Catalog — Antaris ATMOS",
  description: "Browse and manage satellite component catalog",
}

export default function CatalogPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col h-screen bg-surface-bg overflow-hidden">
      {children}
    </div>
  )
}
