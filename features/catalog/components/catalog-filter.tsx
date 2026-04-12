"use client"

import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Field } from "@/components/ui/field"
import { Search } from "lucide-react"
import { FilterIcon } from "@/icons"

export function CatalogFilter() {
  return (
    <Field>
      <InputGroup variant="surface" size="lg" className="h-36 bg-surface-primary/10 border-stroke-primary/10">
        <InputGroupAddon>
          <Search className="w-14 h-14 text-text-tertiary" />
        </InputGroupAddon>
        <InputGroupInput
          placeholder="Search components..."
          className="text-sm text-text-secondary placeholder:text-text-tertiary"
        />
        <InputGroupAddon align='inline-end'>
          <FilterIcon className="w-14 h-14 text-text-primary" />
        </InputGroupAddon>
      </InputGroup>
    </Field>
  )
}
