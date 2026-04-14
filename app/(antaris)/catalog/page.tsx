"use client"

import * as React from "react"
import {
  MetricProgress,
  CatalogSidepanel,
  CatalogStats,
  getPhysicalMetrics,
  mockCatalogItems,
} from "@/features/catalog"

export default function CatalogIndexPage() {
  const [selectedId, setSelectedId] = React.useState<string | null>(mockCatalogItems[0]?.id ?? null)

  const selectedItem = React.useMemo(
    () => mockCatalogItems.find((item) => item.id === selectedId) ?? mockCatalogItems[0],
    [selectedId]
  )

  const physicalMetrics = React.useMemo(
    () =>
      selectedItem
        ? getPhysicalMetrics([
          {
            key: "size",
            icon: "size",
            value: selectedItem.specs.size,
            max: "24U",
            maxValue: 24,
            fallbackValue: "0 U",
          },
          {
            key: "mass",
            icon: "mass",
            value: selectedItem.specs.mass,
            max: "100KG",
            maxValue: 100,
            fallbackValue: "0 Kg",
          },
          {
            key: "power",
            icon: "power",
            value: selectedItem.specs.power,
            max: "12W",
            maxValue: 12,
            fallbackValue: "0 W",
          },
        ])
        : [],
    [selectedItem]
  )

  return (
    <div className="h-full w-full flex gap-12">
      <CatalogSidepanel selectedId={selectedId} onSelect={setSelectedId} />
      <section className="flex-1 min-w-0">
        {selectedItem ? (
          <div className="flex h-full flex-col gap-16">
            <div className="w-125 mx-auto">
              <MetricProgress metrics={physicalMetrics} />
            </div>
            <CatalogStats item={selectedItem} />
          </div>
        ) : null}
      </section>
    </div>
  )
}
