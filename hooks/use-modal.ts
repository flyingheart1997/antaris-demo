"use client"

import { useModalStore, ModalConfig } from "@/store/modal-store"

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
