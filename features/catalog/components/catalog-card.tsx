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
        selected={true}
        size="3"
        className="bg-[rgba(240,240,240,0.02)]"
        {...props}
      >
        <CardHeader className="p-0 flex flex-col gap-2 relative z-10">
          <CardTitle className="font-heading text-base font-semibold text-white/95 leading-tight group-hover:text-white">
            {item.name}
          </CardTitle>
          {item.category && (
            <span className="font-body text-[10px] text-white/30 font-medium uppercase tracking-wider">
              {item.category}
            </span>
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
              variant="solid"
              color='neutral'
            >
              {tag}
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
      <span className="font-body text-[9px] text-white/20 font-bold uppercase tracking-tight">
        {label}
      </span>
      <span className="font-heading text-sm text-white/80 font-medium leading-none group-hover:text-white/90">
        {value}
      </span>
    </div>
  )
}

export default CatalogCard
