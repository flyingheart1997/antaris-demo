'use client'

import { useCatalogStore } from '../store/catalog-store'
import { CatalogItem } from '../types/catalog-data-types'
import { getSubsystemConfig } from '../utils/drawer-configs'
import { useCatalogNavigation } from './use-catalog-navigation'
import { mockBusData, mockCatalogComponents } from '../utils/mock-data'
import { CustomIcon } from '@/icons'
import * as React from 'react'
import { CatalogCategoryTypes, CatalogSubsystemTypes } from '../types/catalog-selection-state-types'

export interface EnrichedCatalogItem extends CatalogItem {
  componentIcon: React.ComponentType
}

/**
 * Hook to consume catalog selection state.
 * Bridges URL-based navigation (category/subSystem/componentId/drawer) with 
 * LocalStorage-based workspace (selectedComponents as IDs).
 */
export function useCatalogSelection() {
  const {
    category,
    subSystem,
    componentId,
    drawer,
    setCategory: navSetCategory,
    setSubSystem: navSetSubSystem,
    setComponentId
  } = useCatalogNavigation()

  const {
    selectedComponents: selectedComponentIds,
    setSelectedComponents: setSelectedComponentIds,
  } = useCatalogStore()

  /**
   * Selection Purge Logic:
   * Wraps navigation setters to ensure workspace is cleared during context shifts.
   */
  const setCategory = (newCategory: CatalogCategoryTypes) => {
    const activeEl = typeof document !== 'undefined' ? document.activeElement : null
    const isChevronClick = activeEl?.id === 'drawer-toggle-chevron' || 
                           activeEl?.closest('#drawer-toggle-chevron')
    
    const isSameCategory = category === newCategory
    
    // CONTEXT SHIFT: New category selected, OR Bus subsystem reset triggered (not a chevron toggle)
    const isContextShift = !isSameCategory || (newCategory === 'bus' && subSystem && !isChevronClick)

    if (isContextShift) {
      setSelectedComponentIds([])
    }
    navSetCategory(newCategory)
  }

  const setSubSystem = (newSubSystem: CatalogSubsystemTypes | null) => {
    if (newSubSystem !== subSystem) {
      setSelectedComponentIds([])
    }
    navSetSubSystem(newSubSystem)
  }

  /**
   * Unified Registry: Combines both data sources for efficient ID resolution.
   * Prefetched separately but merged here for the enrichment layer.
   */
  const unifiedRegistry = React.useMemo(() => [
    ...mockBusData,
    ...mockCatalogComponents
  ], [])

  /**
   * Enrichment Layer: Maps persisted IDs to full component data from the registry.
   * Handles translation from backend-style keys (assembly_type) to UI-style keys (uiCategory).
   */
  const selectedComponentsObjs: EnrichedCatalogItem[] = (selectedComponentIds || [])
    .map((id) => {
      const item = unifiedRegistry.find((item) => item.id === id)
      if (!item) return null
      
      const icon = getSubsystemConfig(
        item.assembly_type === 'bus' ? 'bus' : 'payload', 
        (item.sub_system as CatalogSubsystemTypes) || null
      )?.icon || CustomIcon
      
      return {
        ...item,
        uiCategory: item.assembly_type === 'bus' ? 'bus' : 'payload',
        uiSubSystem: (item.sub_system as CatalogSubsystemTypes) || null,
        componentIcon: icon,
      } as EnrichedCatalogItem
    })
    .filter((c): c is EnrichedCatalogItem => c !== null)

  const isSelectedComponent = (id: string) => (selectedComponentIds || []).includes(id)

  const selectComponent = (component: CatalogItem) => {
    setComponentId(component.id)
    if (!isSelectedComponent(component.id)) {
      const newIds = [...(selectedComponentIds || []), component.id]
      setSelectedComponentIds(newIds)
    }
  }

  const unSelectComponent = (component: CatalogItem) => {
    if (!selectedComponentIds) return

    const selectedIndex = selectedComponentIds.indexOf(component.id)
    const isCurrentlyActive = componentId === component.id
    
    const newIds = selectedComponentIds.filter((id) => id !== component.id)
    setSelectedComponentIds(newIds)

    if (isCurrentlyActive) {
      const previousId = newIds[selectedIndex - 1]
      const nextId = newIds[selectedIndex] 
      setComponentId(previousId || nextId || null)
    }
  }

  return {
    // Navigation (URL State - Zero Flicker)
    category,
    subSystem,
    componentId,
    drawer, 
    setCategory, // Wrapped with purge logic
    setSubSystem, // Wrapped with purge logic
    setComponentId,

    // Workspace (Persistent IDs)
    selectedComponents: selectedComponentsObjs,
    
    // Actions
    isSelectedComponent,
    selectComponent,
    unSelectComponent,
  }
}
