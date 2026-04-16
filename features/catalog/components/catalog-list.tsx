"use client"

import * as React from "react"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import CatalogCard from "./catalog-card"
import type { CatalogItem } from "../types/catalog"
import { mockCatalogItems } from "../utils/mock-data"
import { Text } from "@/components/ui/text"

interface CatalogListProps {
  selectedId: string | null
  onSelect: (id: string) => void
}

export function CatalogList({ selectedId, onSelect }: CatalogListProps) {

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
    <div className="h-[calc(100vh-165px)] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <Accordion type="multiple" defaultValue={groups.map(g => g.category)}>
        {groups.map((group) => (
          <AccordionItem key={group.category} value={group.category}>
            <AccordionTrigger>
              <div className="flex items-center w-full justify-between gap-8">
                <Text type='heading'>{group.category}</Text>
                <Text type='heading' className="text-green-9">{group.count}</Text>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              {group.items.map((item) => (
                <CatalogCard
                  key={item.id}
                  item={item}
                  selected={selectedId === item.id}
                  onClick={() => onSelect(item.id)}
                />
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
