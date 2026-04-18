'use client'

import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { useCallback } from 'react'
import { CatalogCategoryTypes, CatalogSubsystemTypes } from '../types/catalog-selection-state-types'

/**
 * Hook to manage Catalog navigation via URL search parameters.
 * Handles category switching, subsystem selection, and drawer toggle logic.
 */
export function useCatalogNavigation() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const category = searchParams.get('category') as CatalogCategoryTypes
  const subSystem = searchParams.get('subSystem') as CatalogSubsystemTypes | null
  const componentId = searchParams.get('componentId')
  const drawer = searchParams.get('drawer') !== 'false' // Default to true if not specified or is 'true'

  const createQueryString = useCallback(
    (params: Record<string, string | null>) => {
      const newParams = new URLSearchParams(searchParams.toString())
      Object.entries(params).forEach(([key, value]) => {
        if (value === null) {
          newParams.delete(key)
        } else {
          newParams.set(key, value)
        }
      })
      return newParams.toString()
    },
    [searchParams]
  )

  /**
   * Unified handler for drawer toggle and category selection.
   * Utilizes a DOM check to distinguish between Chevron clicks and Icon clicks.
   */
  const setCategory = useCallback(
    (newCategory: CatalogCategoryTypes) => {
      // 1. Detect if the click originated from the bottom Chevron
      const activeEl = typeof document !== 'undefined' ? document.activeElement : null
      const isChevronClick = activeEl?.id === 'drawer-toggle-chevron' ||
        activeEl?.closest('#drawer-toggle-chevron')

      const isSameCategory = category === newCategory
      let targetSubSystem = subSystem
      let targetDrawer = 'true'

      // 2. Branch logic based on click source
      if (isChevronClick && isSameCategory) {
        // CASE A: Bottom Chevron Click -> ALWAYS only toggle visibility, NEVER reset data
        targetDrawer = drawer ? 'false' : 'true'
      }
      else if (isSameCategory) {
        // CASE B: Top Icon Click (Same Category) -> Apply specialized toggle rules
        if (newCategory === 'payload') {
          // Payload icon click: Toggle drawer, preserve subsystem
          targetDrawer = drawer ? 'false' : 'true'
        } else {
          // Bus icon click: 
          if (subSystem !== null) {
            // Reset to top-level bus view first
            targetSubSystem = null
            targetDrawer = 'true'
          } else {
            // If already at top-level, toggle drawer
            targetDrawer = drawer ? 'false' : 'true'
          }
        }
      }
      else {
        // CASE C: Different Category Click -> Full Reset to default
        targetSubSystem = newCategory === 'payload' ? 'earth-observation' : null
        targetDrawer = 'true'
      }

      const query = createQueryString({
        category: newCategory,
        subSystem: targetSubSystem,
        drawer: targetDrawer,
        componentId: isSameCategory && !isChevronClick ? componentId : null
      })

      router.push(`${pathname}?${query}`)
    },
    [category, subSystem, drawer, componentId, router, pathname, createQueryString]
  )

  const setSubSystem = useCallback(
    (newSubSystem: CatalogSubsystemTypes | null) => {
      const query = createQueryString({
        subSystem: newSubSystem,
        drawer: 'true'
      })
      router.push(`${pathname}?${query}`)
    },
    [router, pathname, createQueryString]
  )

  const setComponentId = useCallback(
    (id: string | null) => {
      const query = createQueryString({ componentId: id })
      router.push(`${pathname}?${query}`)
    },
    [router, pathname, createQueryString]
  )

  return {
    category,
    subSystem,
    componentId,
    drawer,
    setCategory,
    setSubSystem,
    setComponentId
  }
}
