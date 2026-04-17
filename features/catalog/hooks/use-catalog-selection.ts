'use client'

import { CustomIcon } from '@/icons'
import { useCatalogStore } from '../store/catalog-store'
import { CatalogItem } from '../types/catalog-data-types'
import { getDrawerItemConfig } from '../utils/drawer-configs'

/**
 * Hook to consume catalog selection state.
 */
export function useCatalogSelection() {
  const {
    drawer,
    open,
    activeDrawer,
    selectedComponents,
    selectedComponentTab,
    setDrawer,
    setActiveDrawer,
    setSelectedComponents,
    setSelectedComponentTab,
  } = useCatalogStore()

  const isSelectedComponent = (id: string) => selectedComponents.some((item) => item.id === id)

  const selectComponent = (component: CatalogItem) => {
    setSelectedComponentTab(component.id)
    const exist = isSelectedComponent(component.id)
    if (exist) return
    const updatedComponent = {
      ...component,
      catalogType: drawer,
      componentType: activeDrawer,
      componentIcon: getDrawerItemConfig(drawer, activeDrawer)?.icon || CustomIcon,
    }
    setSelectedComponents([...selectedComponents, updatedComponent])
  }

  const unSelectComponent = (component: CatalogItem) => {
    const selectedComponentIndex = selectedComponents.findIndex((c) => c.id === component.id)
    const samecomponent = selectedComponentTab === component.id
    const filterComponents = selectedComponents.filter((c) => c.id !== component.id)
    const previousComponent = filterComponents[selectedComponentIndex - 1]?.id || null
    const nextComponent = filterComponents[selectedComponentIndex]?.id || null
    setSelectedComponentTab(samecomponent ? previousComponent || nextComponent : selectedComponentTab)
    setSelectedComponents(filterComponents)
  }

  return {
    drawer,
    open,
    activeDrawer,
    selectedComponents,
    selectedComponentTab,
    setDrawer,
    setActiveDrawer,
    setSelectedComponents,
    isSelectedComponent,
    selectComponent,
    unSelectComponent,
  }
}
