import { createPersistentStore } from '@/lib/store-factory'
import { CatalogSelectionStateType } from '../types/catalog-selection-state-types'

interface CatalogSelectionStore extends Omit<CatalogSelectionStateType, 'open'> {
  setSelectedComponents: (components: string[]) => void
}

/**
 * Feature-local Zustand store for Catalog workspace persistence.
 * This is a "Thin Store" - it only persists the IDs of selected components.
 * UI states like 'open' (drawer), 'category', and 'subSystem' live in the URL.
 */
export const useCatalogStore = createPersistentStore<CatalogSelectionStore>(
  'antaris-catalog-workspace',
  (set) => ({
    selectedComponents: [],
    setSelectedComponents: (components) => set({ selectedComponents: components }),
  })
)
