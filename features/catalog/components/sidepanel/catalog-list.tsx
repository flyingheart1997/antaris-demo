'use client'
/** @jsxImportSource react */
import * as React from "react"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import CatalogCard from "./catalog-card"
import { Text } from "@/components/ui/text"
import { useCatalogSelection } from "../../hooks/use-catalog-selection"
import { useCatalogGroups } from "../../hooks/use-catalog-groups"
import { Tooltip } from "@/components/ui/tooltip"

/**
 * High-performance Catalog List view.
 * Displays hardware items grouped by sub-category in a scrollable accordion.
 */
export function CatalogList() {
  const {
    category,
    subSystem,
    isSelectedComponent,
    selectComponent
  } = useCatalogSelection()

  // Logic encapsulated in hook for maintainability and future TanStack Query integration
  const groups = useCatalogGroups(category, subSystem)

  return (
    <div className="h-[calc(100vh-165px)] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <Accordion type="multiple" defaultValue={groups.map(g => g.groupLabel)}>
        {groups.map((group) => (
          <AccordionItem key={group.groupLabel} value={group.groupLabel}>
            <AccordionTrigger>
              <div className="flex items-center w-full justify-between gap-8">
                <Text type='heading'>
                  {group.groupLabel}
                </Text>
                <Text type='heading' className="text-green-9">{group.count}</Text>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              {group.items.map((item) => (
                <CatalogCard
                  key={item.id}
                  item={item}
                  selected={isSelectedComponent(item.id)}
                  onClick={() => selectComponent(item)}
                />
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
