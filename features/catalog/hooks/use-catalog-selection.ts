'use client'

import { useCatalogStore } from '../store/catalog-store'
import { CatalogItem } from '../types/catalog-data-types'
import { getSubsystemConfig } from '../utils/drawer-configs'
import { useCatalogNavigation } from './use-catalog-navigation'
import { mockCatalogItems } from '../utils/mock-data'
import { CustomIcon } from '@/icons'

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
    drawer, // Managed via URL parameter
    setCategory,
    setSubSystem,
    setComponentId
  } = useCatalogNavigation()

  const {
    selectedComponents: selectedComponentIds,
    setSelectedComponents: setSelectedComponentIds,
  } = useCatalogStore()

  /**
   * Enrichment Layer: Maps persisted IDs to full component data from the registry.
   */
  const selectedComponentsObjs: EnrichedCatalogItem[] = (selectedComponentIds || [])
    .map((id) => {
      const component = mockCatalogItems.find((item) => item.id === id)
      if (!component) return null
      
      const icon = getSubsystemConfig(component.category, component.subSystem)?.icon || CustomIcon
      
      return {
        ...component,
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
    drawer, // Exposed as boolean derived from URL
    setCategory, // Consolidated toggle logic inside
    setSubSystem,
    setComponentId,

    // Workspace (Persistent IDs)
    selectedComponents: selectedComponentsObjs,
    
    // Actions
    isSelectedComponent,
    selectComponent,
    unSelectComponent,
  }
}
