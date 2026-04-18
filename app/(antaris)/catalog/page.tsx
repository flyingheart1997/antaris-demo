"use client"

import * as React from "react"
import {
  CatalogSidepanel,
  mockBusData,
  useCatalogSelection,
  CatalogComponentPreview,
  getPhysicalMetrics,
} from "@/features/catalog"

export default function CatalogIndexPage() {
  const { selectedComponents } = useCatalogSelection()
  const selectedItem = React.useMemo(
    () => selectedComponents[selectedComponents.length - 1] || mockBusData[0],
    [selectedComponents]
  )

  const physicalMetrics = React.useMemo(
    () => {
      if (!selectedItem) return []

      const massVal = selectedItem.common_attributes.mass
      const dim = selectedItem.common_attributes.dimensions

      return getPhysicalMetrics([
        {
          key: "size",
          icon: "size",
          value: `${dim.length}x${dim.width}x${dim.height} ${dim.unit}`,
          max: "1m",
          maxValue: 1,
          fallbackValue: "N/A",
        },
        {
          key: "mass",
          icon: "mass",
          value: `${massVal.attribute_value}${massVal.attribute_unit}`,
          max: "1000kg",
          maxValue: 1000,
          fallbackValue: "0kg",
        },
        {
          key: "power",
          icon: "power",
          value: "100W", // Mocked for now until specific power attributes are standardized
          max: "500W",
          maxValue: 500,
          fallbackValue: "0W",
        },
      ])
    },
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
