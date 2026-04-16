"use client"

import { Button } from "@/components/ui/button"
import { CustomIcon, UploadIcon } from "@/icons"
import { Text } from "@/components/ui/text"
import { useModal } from "@/hooks/use-modal"
import { IconButton } from "@/components/ui/icon-button"

export function CreateCustomButton() {
  const { openModal } = useModal("Catalog")

  return (
    <div className="flex items-center gap-4">
      <Button
        size="lg"
        variant="soft"
        color='accent'
        className="flex-1"
      >
        <CustomIcon />
        <Text type="heading">Add Component</Text>
      </Button>
      <IconButton
        size='lg'
        variant='soft'
        color='accent'
        onClick={() =>
          openModal({
            mode: "Upload",
            data: {
              source: "catalog-create-custom",
            },
            accept: ".csv,.json",
          })
        }
      >
        <UploadIcon className="h-14 w-14" />
      </IconButton>
    </div>
  )
}
