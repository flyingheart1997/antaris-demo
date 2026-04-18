'use client'

import * as React from 'react'
import type { CatalogItem } from '../types/catalog-data-types'

export type StatKey = "size" | "mass" | "power" | "gsd" | "swath"

export interface CatalogStatRowData {
  key: StatKey
  label: string
  value: string
  progress: number
}

const STAT_CONFIG: Array<{ key: StatKey; label: string; max: number; inverse: boolean }> = [
  { key: "size", label: "Size", max: 2, inverse: false },
  { key: "mass", label: "Mass", max: 1000, inverse: false },
  { key: "power", label: "Power", max: 50, inverse: false },
  { key: "gsd", label: "GSD", max: 4, inverse: true },
  { key: "swath", label: "Swath", max: 100, inverse: false },
]

/**
 * Hook to resolve hardware technical metrics and calculate 
 * normalized progress values for the Stats UI.
 */
export function useCatalogStats(item: CatalogItem) {
  
  /**
   * Enterprise Attribute Resolver
   * Aggregates technical metrics from nested schema (Common, Component-Specific, Bus-Specific).
   */
  const resolveAttributeValue = React.useCallback((key: StatKey): string => {
    switch (key) {
      case 'mass':
        return `${item.common_attributes.mass.attribute_value}${item.common_attributes.mass.attribute_unit}`
      case 'size':
        return `${item.common_attributes.dimensions.length}m`
      case 'power':
        return item.component_specific_attributes?.power || 
               item.bus_specific_attributes?.bus_power_output?.attribute_max?.toString() + "W" || 
               "N/A"
      case 'gsd':
        return item.component_specific_attributes?.gsd || "N/A"
      case 'swath':
        return item.component_specific_attributes?.swath || "N/A"
      default:
        return "N/A"
    }
  }, [item])

  const stats = React.useMemo((): CatalogStatRowData[] =>
    STAT_CONFIG.map((stat) => {
      const valueStr = resolveAttributeValue(stat.key)
      return {
        key: stat.key,
        label: stat.label,
        value: valueStr,
        progress: calculateProgress(valueStr, stat.max, stat.inverse),
      }
    }),
    [item, resolveAttributeValue]
  )

  return { stats }
}

/**
 * Normalizes technical string values (e.g., "12.5kg") to a 0-1 scale.
 */
function calculateProgress(value: string | undefined, max: number, inverse: boolean) {
  if (!value || value === "N/A") return 0

  const match = value.match(/(\d+(\.\d+)?)/)
  if (!match) return 0

  const numeric = Number.parseFloat(match[1])
  if (!Number.isFinite(numeric) || max <= 0) return 0

  const ratio = inverse ? 1 - numeric / max : numeric / max
  return Math.min(Math.max(ratio, 0), 1)
}
