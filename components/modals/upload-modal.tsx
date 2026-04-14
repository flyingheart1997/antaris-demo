"use client"

import * as React from "react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Text } from "@/components/ui/text"
import { UploadIcon } from "@/icons"
import { useModal } from "@/hooks/use-modal"
import { cn } from "@/lib/utils"

const DEFAULT_ACCEPT = ".csv,.json"


export function UploadModal() {
  const { modal, closeModal } = useModal()

  if (!modal || modal.mode !== "Upload" || !modal.open) {
    return null
  }

  return <UploadModalContent modal={modal} closeModal={closeModal} />
}

function UploadModalContent({ modal, closeModal }: { modal: any, closeModal: () => void }) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = React.useState(false)

  const onFilesSelect = modal.onFilesSelect as ((files: File[]) => void) | undefined
  const icon = (modal.icon as React.ReactNode | undefined) ?? (
    <UploadIcon className="size-20 text-text-primary/60" />
  )
  const title = modal.title as string | undefined
  const instructionPrefix =
    (modal.instructionPrefix as string | undefined) ?? "Drag & drop file here or"
  const actionText = (modal.actionText as string | undefined) ?? "click here"
  const instructionSuffix = (modal.instructionSuffix as string | undefined) ?? "to upload"
  const supportedFileTypesText =
    (modal.supportedFileTypesText as string | undefined) ?? "Supported file types: .csv .json"
  const fileSizeText = (modal.fileSizeText as string | undefined) ?? "File size: <2MB"
  const accept = (modal.accept as string | undefined) ?? DEFAULT_ACCEPT
  const className = modal.className as string | undefined

  const handleFiles = React.useCallback(
    (fileList: FileList | null) => {
      if (!fileList?.length) return
      onFilesSelect?.(Array.from(fileList))
    },
    [onFilesSelect]
  )

  const openFilePicker = React.useCallback(() => {
    inputRef.current?.click()
  }, [])

  const handleInputChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      handleFiles(event.target.files)
      event.target.value = ""
    },
    [handleFiles]
  )

  const handleDragOver = React.useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault()
      setIsDragging(true)
    },
    []
  )

  const handleDragLeave = React.useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const relatedTarget = event.relatedTarget as Node | null
    if (relatedTarget && event.currentTarget.contains(relatedTarget)) return
    setIsDragging(false)
  }, [])

  const handleDrop = React.useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault()
      setIsDragging(false)
      handleFiles(event.dataTransfer.files)
    },
    [handleFiles]
  )

  return (
    <Dialog open={modal.open} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent
        className={cn(
          "w-[calc(100vw-48px)] max-w-310 border-none bg-transparent p-0 shadow-none sm:max-w-310",
          className
        )}
      >
        <DialogTitle className="sr-only">
          {title ?? `${modal.name} ${modal.mode} modal`}
        </DialogTitle>
        <div
          role="button"
          tabIndex={0}
          onClick={openFilePicker}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault()
              openFilePicker()
            }
          }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "group relative flex min-h-[calc(100vh-48px)] cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-dashed border-gray-4 bg-[rgba(3,8,12,0.10)] shadow-[0px_0px_40px_0px_rgba(204,245,78,0.07)] outline-none backdrop-blur-[19px] transition-all duration-150",
            isDragging && "border-[#CCF54E]/70 bg-[rgba(8,14,18,0.8)] shadow-[0px_0px_48px_0px_rgba(204,245,78,0.14)]"
          )}
        >
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            className="hidden"
            onChange={handleInputChange}
          />

          <div className="relative z-10 flex max-w-90 flex-col items-center text-center">
            <div className="mb-20 flex items-center justify-center opacity-90">{icon}</div>

            {title ? (
              <Text
                type="heading"
                size="md"
                className="mb-8 justify-center text-center text-text-primary"
              >
                {title}
              </Text>
            ) : null}

            <div className="flex flex-wrap items-center justify-center gap-x-4">
              <Text
                type="heading"
                size="sm"
                weight="italic"
                className="justify-center text-center text-[#F0F0F0]/60"
              >
                {instructionPrefix}
              </Text>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation()
                  openFilePicker()
                }}
                className="font-heading text-sm italic text-[#CCF54E] opacity-90 transition-opacity hover:opacity-100 focus:outline-none"
              >
                {actionText}
              </button>
              <Text
                type="heading"
                size="sm"
                weight="italic"
                className="justify-center text-center text-[#F0F0F0]/60"
              >
                {instructionSuffix}
              </Text>
            </div>

            <Text
              type="heading"
              size="sm"
              weight="italic"
              className="mt-2 justify-center text-center text-[#F0F0F0]/60"
            >
              {supportedFileTypesText}
            </Text>

            <Text
              type="heading"
              size="sm"
              weight="italic"
              className="mt-1 justify-center text-center text-[#F0F0F0]/60"
            >
              {fileSizeText}
            </Text>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
