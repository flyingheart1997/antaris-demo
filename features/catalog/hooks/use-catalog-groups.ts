'use client'

import * as React from 'react'
import { CatalogItem } from '../types/catalog-data-types'
import { mockBusData, mockCatalogComponents } from '../utils/mock-data'
import { CatalogCategoryTypes, CatalogSubsystemTypes } from '../types/catalog-selection-state-types'

export interface CatalogGroup {
  groupLabel: string
  items: CatalogItem[]
  count: number
}

/**
 * Hook to handle filtering and grouping of Catalog items.
 * Separated from the UI to ensure the display layer remains agnostic 
 * of the data source (Mock vs TanStack Query).
 */
export function useCatalogGroups(
  category: CatalogCategoryTypes,
  subSystem: CatalogSubsystemTypes | null
) {
  return React.useMemo(() => {
    // 1. Identify Data Source (Context-Aware)
    // To transition to TanStack Query later, simply replace these pointers 
    // with the 'data' result from useQuery.
    const isTopLevelBus = category === 'bus' && !subSystem
    const dataSource = isTopLevelBus ? mockBusData : mockCatalogComponents

    // 2. Perform Context Filtering
    const filtered = dataSource.filter(item => {
      const itemUiCategory = item.assembly_type === 'bus' ? 'bus' : 'payload'
      const isCorrectCategory = itemUiCategory === category
      const isCorrectSubSystem = subSystem ? item.sub_system === subSystem : true
      
      return isCorrectCategory && isCorrectSubSystem
    })

    // 3. Group by Sub-Category or Type
    const grouped: Record<string, CatalogItem[]> = {}
    filtered.forEach(item => {
      const label = item.sub_category || item.antaris_component_type || "General"
      if (!grouped[label]) grouped[label] = []
      grouped[label].push(item)
    })
    
    // 4. Return formatted groups
    return Object.entries(grouped).map(([groupLabel, items]) => ({
      groupLabel,
      items,
      count: items.length
    })) as CatalogGroup[]
  }, [category, subSystem])
}
