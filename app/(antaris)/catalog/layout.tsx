import { CatalogLayout } from "@/features/catalog"
import type { Metadata } from "next"



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
    <CatalogLayout>
      {children}
    </CatalogLayout>
  )
}
