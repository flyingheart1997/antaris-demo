"use client"

import * as React from "react"
import {
  MetricProgress,
  CatalogSidepanel,
  CatalogStats,
  getPhysicalMetrics,
  mockCatalogItems,
  useCatalogSelection,
  CatalogComponentPreview,
} from "@/features/catalog"

export default function CatalogIndexPage() {
  const { selectedComponents } = useCatalogSelection()
  const selectedItem = React.useMemo(
    () => selectedComponents[selectedComponents.length - 1] || mockCatalogItems[0],
    [selectedComponents]
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
    <main className="flex h-full w-full min-w-0 gap-12">
      <CatalogSidepanel />
      <section className="min-w-0 flex-1 overflow-hidden">
        <CatalogComponentPreview />
      </section>
    </main>
  )
}
