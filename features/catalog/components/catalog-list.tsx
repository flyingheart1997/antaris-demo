"use client"

import * as React from "react"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import CatalogCard from "./catalog-card"
import type { CatalogItem } from "../types/catalog"
import { mockCatalogItems } from "../utils/mock-data"
import { Text } from "@/components/ui/text"

export function CatalogList() {
  const [selectedId, setSelectedId] = React.useState<string | null>(null)

  // Group items by category
  const groups = React.useMemo(() => {
    const grouped: Record<string, CatalogItem[]> = {}
    mockCatalogItems.forEach(item => {
      const cat = item.category || "Uncategorized"
      if (!grouped[cat]) grouped[cat] = []
      grouped[cat].push(item)
    })
    return Object.entries(grouped).map(([category, items]) => ({
      category,
      items,
      count: items.length
    }))
  }, [])

  return (
    <div className="flex-1 overflow-y-auto scrollbar-hide">
      <Accordion type="multiple" defaultValue={groups.map(g => g.category)}>
        {groups.map((group) => (
          <AccordionItem key={group.category} value={group.category}>
            <AccordionTrigger>
              <div className="flex items-center w-full justify-between gap-8">
                <Text type='heading'>{group.category}</Text>
                <Text type='heading' className="text-green-9">{group.count}</Text>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pr-12">
              {group.items.map((item) => (
                <CatalogCard
                  key={item.id}
                  item={item}
                  selected={selectedId === item.id}
                  onClick={() => setSelectedId(item.id)}
                />
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
