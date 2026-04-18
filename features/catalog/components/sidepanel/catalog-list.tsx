'use client'
/** @jsxImportSource react */
import * as React from "react"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import CatalogCard from "./catalog-card"
import type { CatalogItem } from "../../types/catalog-data-types"
import { mockCatalogItems } from "../../utils/mock-data"
import { Text } from "@/components/ui/text"
import { useCatalogSelection } from "../../hooks/use-catalog-selection"

export function CatalogList() {
  const { category, subSystem, isSelectedComponent, selectComponent } = useCatalogSelection()

  // Filter items by category (payload/bus) and subSystem (EPS/ADCS/etc)
  // then group them by their groupLabel (Imager/SAR/etc)
  const groups = React.useMemo(() => {
    const filtered = mockCatalogItems.filter(item => 
        item.category === category && 
        (subSystem ? item.subSystem === subSystem : true)
    )

    const grouped: Record<string, CatalogItem[]> = {}
    filtered.forEach(item => {
      const group = item.groupLabel || "Uncategorized"
      if (!grouped[group]) grouped[group] = []
      grouped[group].push(item)
    })
    
    return Object.entries(grouped).map(([groupLabel, items]) => ({
      groupLabel,
      items,
      count: items.length
    }))
  }, [category, subSystem])

  return (
    <div className="h-[calc(100vh-165px)] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <Accordion type="multiple" defaultValue={groups.map(g => g.groupLabel)}>
        {groups.map((group) => (
          <AccordionItem key={group.groupLabel} value={group.groupLabel}>
            <AccordionTrigger>
              <div className="flex items-center w-full justify-between gap-8">
                <Text type='heading'>{group.groupLabel}</Text>
                <Text type='heading' className="text-green-9">{group.count}</Text>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-12 py-12">
                {group.items.map((item) => (
                  <CatalogCard
                    key={item.id}
                    item={item}
                    selected={isSelectedComponent(item.id)}
                    onClick={() => selectComponent(item)}
                  />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
