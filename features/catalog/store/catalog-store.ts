import { create } from 'zustand'
import { CatalogItem } from '../types/catalog-data-types'
import { CatalogDrawerTypes, CatalogSelectionStateType, CatalogComponentTypes } from '../types/catalog-selection-state-types'

interface CatalogSelectionStore extends CatalogSelectionStateType {
  setDrawer: (drawer: CatalogDrawerTypes) => void
  setActiveDrawer: (active: CatalogComponentTypes | null) => void
  setSelectedComponents: (components: CatalogItem[]) => void
  setSelectedComponentTab: (componentId: string | null) => void
}

/**
 * Feature-local Zustand store for Catalog selection state.
 */
export const useCatalogStore = create<CatalogSelectionStore>((set) => ({
  drawer: 'payload',
  open: true,
  activeDrawer: 'earth-observation',
  selectedComponents: [],
  selectedComponentTab: null,

  setDrawer: (drawer) => set((state) => {
    // If the same drawer is selected, toggle the open state
    if (state.drawer === drawer) {
      return { open: !state.open }
    }

    // Determine new activeDrawer based on drawer type for new selection
    const activeDrawer = drawer === 'payload' ? 'earth-observation' : null;

    return {
      drawer,
      open: true, // Always open when switching to a new drawer
      activeDrawer,
      selectedComponents: [], // Clear selection on drawer shift
      selectedComponentTab: null,
    }
  }),

  setActiveDrawer: (active) => set(() => ({
    activeDrawer: active,
    selectedComponents: [], // Clear selection when internal category changes
    selectedComponentTab: null,
  })),

  setSelectedComponents: (components) => set({ selectedComponents: components }),
  setSelectedComponentTab: (component) => set({ selectedComponentTab: component }),
}))
