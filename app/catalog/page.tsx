"use client"

import { CatalogCard } from "@/features/catalog"
import { mockCatalogItems } from "@/features/catalog/utils/mock-data"
import { useState } from "react"

export default function CatalogPage() {
  const [selectedId, setSelectedId] = useState<string | null>("1")

  return (
    <div className="flex flex-col gap-32 p-32 h-full overflow-y-auto">
      <div className="flex flex-col gap-8">
        <h1 className="text-4xl font-heading font-bold text-text-primary lowercase tracking-tight">
          component catalog
        </h1>
        <p className="text-lg text-text-secondary font-body">
          Browse and select satellite components for your mission.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-24">
        {mockCatalogItems.map((item) => (
          <CatalogCard
            key={item.id}
            item={item}
            selected={selectedId === item.id}
            onClick={() => setSelectedId(item.id)}
          />
        ))}
      </div>
    </div>
  )
}
