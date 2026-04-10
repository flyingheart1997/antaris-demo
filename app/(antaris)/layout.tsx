import type { Metadata } from "next"

import HomeLayout from "@/features/home/components/home-layout"


export const metadata: Metadata = {
  title: "Catalog — Antaris",
  description: "Browse and manage satellite component catalog",
}

export default function CatalogPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="flex flex-col h-screen w-screen bg-surface-bg-grad overflow-hidden">
      <HomeLayout>
        {children}
      </HomeLayout>
    </main>
  )
}
