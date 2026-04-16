"use client"

import { create } from "zustand"

export type ModalMode = string

export interface ModalConfig<TData = unknown> {
  id?: string
  name: string
  mode: ModalMode
  data?: TData
  open: boolean
  [key: string]: unknown
}

interface ModalStore {
  modal: ModalConfig | null
  openModal: <TData = unknown>(
    config: Omit<ModalConfig<TData>, "open"> & { open?: boolean }
  ) => void
  closeModal: () => void
  setOpen: (open: boolean) => void
  updateModal: <TData = unknown>(patch: Partial<ModalConfig<TData>>) => void
}

export const useModalStore = create<ModalStore>((set) => ({
  modal: null,

  openModal: (config) => {
    set({
      modal: {
        ...config,
        open: config.open ?? true,
      } as ModalConfig,
    })
  },

  closeModal: () =>
    set((state) => ({
      modal: state.modal ? { ...state.modal, open: false } : null,
    })),

  setOpen: (open) =>
    set((state) => ({
      modal: state.modal ? { ...state.modal, open } : null,
    })),

  updateModal: (patch) =>
    set((state) => ({
      modal: state.modal
        ? {
            ...state.modal,
            ...patch,
          }
        : null,
    })),
}))

export function useModal<TData = unknown>(name?: string) {
  const modal = useModalStore((state) => state.modal) as ModalConfig<TData> | null
  const openModalStore = useModalStore((state) => state.openModal)
  const closeModal = useModalStore((state) => state.closeModal)
  const setOpen = useModalStore((state) => state.setOpen)
  const updateModal = useModalStore((state) => state.updateModal)

  const isCurrentModal = !name || modal?.name === name

  return {
    modal: isCurrentModal ? modal : null,
    isOpen: isCurrentModal ? (modal?.open ?? false) : false,
    mode: isCurrentModal ? modal?.mode : undefined,
    data: isCurrentModal ? modal?.data : undefined,
    openModal: (
      config: Omit<ModalConfig<TData>, "name" | "open"> & {
        name?: string
        open?: boolean
      }
    ) =>
      openModalStore({
        ...config,
        name: config.name ?? name ?? "Modal",
        open: config.open ?? true,
      }),
    closeModal,
    setOpen,
    updateModal,
    // For backward compatibility or simpler logic where order was used
    order: 1, 
  }
}
