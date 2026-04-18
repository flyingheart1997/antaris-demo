'use client'

import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { useCallback } from 'react'
import { CatalogCategoryTypes, CatalogSubsystemTypes } from '../types/catalog-selection-state-types'

const PARAM_ORDER = ['drawer', 'category', 'subSystem', 'componentId'] as const

/**
 * Hook to manage Catalog navigation via URL search parameters.
 * Handles category switching, subsystem selection, and drawer toggle logic.
 * Enforces strict URL parameter ordering for a professional dashboard experience.
 */
export function useCatalogNavigation() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const category = searchParams.get('category') as CatalogCategoryTypes
  const subSystem = searchParams.get('subSystem') as CatalogSubsystemTypes | null
  const componentId = searchParams.get('componentId')
  const drawer = searchParams.get('drawer') !== 'false'

  /**
   * Builds an ordered query string based on a professional schema.
   * Drawer -> Category -> SubSystem -> ComponentId
   */
  const createQueryString = useCallback(
    (params: Record<string, string | null>) => {
      const merged: Record<string, string | null> = {}
      searchParams.forEach((value, key) => { merged[key] = value })
      Object.assign(merged, params)

      const orderedParams = new URLSearchParams()
      PARAM_ORDER.forEach(key => {
        const value = merged[key]
        if (value !== null && value !== undefined) {
          orderedParams.set(key, value)
        }
      })

      return orderedParams.toString()
    },
    [searchParams]
  )

  /**
   * Refined handler for category selection and visibility toggling.
   * Preserves exact business logic with context-locked persistence rules.
   */
  const setCategory = useCallback(
    (newCategory: CatalogCategoryTypes) => {
      const activeEl = typeof document !== 'undefined' ? document.activeElement : null
      const isChevronClick = activeEl?.id === 'drawer-toggle-chevron' || 
                             activeEl?.closest('#drawer-toggle-chevron')

      const isSameCategory = category === newCategory
      const toggleDrawer = drawer ? 'false' : 'true'
      
      let targetSubSystem = subSystem
      let targetDrawer = 'true'
      let targetComponentId = componentId

      if (isChevronClick && isSameCategory) {
        // VISIBILITY TOGGLE (Chevron): Preserve everything
        targetDrawer = toggleDrawer
      } 
      else if (isSameCategory) {
        // NAVIGATION (Icon Toggle - Same Category)
        if (newCategory === 'bus' && subSystem) {
          // Bus reset rule: Switching from subsystem to top-level Bus (CONTEXT SHIFT)
          targetSubSystem = null
          targetDrawer = 'true'
          targetComponentId = null
        } else {
          // Normal toggle (Payload icon or Bus-at-top icon)
          targetDrawer = toggleDrawer
          targetComponentId = componentId // Preserve
        }
      } 
      else {
        // NAVIGATION (New Category - CONTEXT SHIFT)
        targetSubSystem = newCategory === 'payload' ? 'earth-observation' : null
        targetDrawer = 'true'
        targetComponentId = null
      }

      const query = createQueryString({
        category: newCategory,
        subSystem: targetSubSystem,
        drawer: targetDrawer,
        componentId: targetComponentId
      })

      router.push(`${pathname}?${query}`)
    },
    [category, subSystem, drawer, componentId, router, pathname, createQueryString]
  )

  const setSubSystem = useCallback(
    (newSubSystem: CatalogSubsystemTypes | null) => {
      const query = createQueryString({ 
        subSystem: newSubSystem, 
        drawer: 'true',
        componentId: null // Any subsystem change is a CONTEXT SHIFT
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
