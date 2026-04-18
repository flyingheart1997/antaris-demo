import { create, StateCreator, StoreApi } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

/**
 * Creates a persistent Zustand store with standardized hydration tracking.
 * 
 * @param name - The unique key for LocalStorage
 * @param creator - The store definition
 * @returns A persistent Zustand hook
 */
export function createPersistentStore<T>(
  name: string,
  creator: StateCreator<T, [['zustand/persist', unknown]]>
) {
  return create<T>()(
    persist(creator, {
      name,
      storage: createJSONStorage(() => localStorage),
    })
  )
}
