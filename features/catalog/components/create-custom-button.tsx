"use client"

import { Button } from "@/components/ui/button"
import { CustomIcon, UploadIcon } from "@/icons"
import { Text } from "@/components/ui/text"
import { Separator } from "@/components/ui/separator"

export function CreateCustomButton() {
  return (
    <div className="pb-3 mt-auto">
      <Button
        size='lg'
        variant="surface"
        className="w-full"
      >
        <div className="flex items-center justify-between w-full opacity-80">
          <div className="flex items-center gap-4">
            <CustomIcon />
            <Text type='heading'>Create Custom</Text>
          </div>
          <div className="flex items-center gap-4">
            <Separator orientation="vertical" />
            <UploadIcon className="w-14 h-14" />
          </div>
        </div>
      </Button>
    </div>
  )
}
