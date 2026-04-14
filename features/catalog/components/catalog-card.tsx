"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import type { CatalogItem } from "../types/catalog"
import { Badge } from "@/components/ui/badge"
import { Text } from "@/components/ui/text"

interface CatalogCardProps extends React.HTMLAttributes<HTMLDivElement> {
  item: CatalogItem
  selected?: boolean
}

const CatalogCard = React.forwardRef<HTMLDivElement, CatalogCardProps>(
  ({ item, selected, className, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        state='default'
        selected={selected}
        size="3"
        className={cn(selected ? 'w-[96%]' : 'w-full')}
        {...props}
      >
        <CardHeader className="p-0 flex flex-row items-center justify-between gap-2 relative z-10">
          <CardTitle>
            <Text type='heading' size='lg' color='primary'>
              {item.name}
            </Text>
          </CardTitle>
          {item.category && (
            <Text type='heading' size='sm' color='secondary' className="opacity-80">
              {item.category}
            </Text>
          )}
        </CardHeader>

        <CardContent className="p-0 grid grid-cols-4 gap-x-4 gap-y-4 relative z-10">
          <SpecItem label="Size" value={item.specs.size} />
          <SpecItem label="Mass" value={item.specs.mass} />
          <SpecItem label="Power" value={item.specs.power} />
          <SpecItem label="Swath" value={item.specs.swath} />
        </CardContent>

        <CardFooter className="pt-12 flex flex-wrap gap-4 relative z-10">
          {item.tags.map((tag) => (
            <Badge
              key={tag}
              size='md'
              variant="soft"
              color='neutral'
              className="p-6"
            >
              <Text type='body' size='xs' color='secondary'>{tag}</Text>
            </Badge>
          ))}
        </CardFooter>
      </Card>
    )
  }
)
CatalogCard.displayName = "CatalogCard"

function SpecItem({ label, value }: { label: string; value?: string }) {
  if (!value) return null
  return (
    <div className="flex flex-col gap-1">
      <Text type='body' size='sm' color='secondary' className="opacity-80">
        {label}
      </Text>
      <Text type='heading' size='md' color='secondary'>
        {value}
      </Text>
    </div>
  )
}

export default CatalogCard
