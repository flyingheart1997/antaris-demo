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
        state={selected ? "emphasis" : "default"}
        selected={selected}
        size="4"
        className={cn(
          "relative flex flex-col gap-20 p-24 min-h-42.5 cursor-pointer group",
          className
        )}
        {...props}
      >
        <CardHeader className="p-0 flex-row items-center justify-between space-y-0 relative z-10">
          <CardTitle className="font-heading text-xl font-medium text-white/95 tracking-normal">
            {item.name}
          </CardTitle>
          {item.category && (
            <span className="font-body text-[11px] text-white/40 font-medium uppercase tracking-widest">
              {item.category}
            </span>
          )}
        </CardHeader>

        <CardContent className="p-0 grid grid-cols-4 gap-8 relative z-10">
          <SpecItem label="Size" value={item.specs.size} />
          <SpecItem label="Mass" value={item.specs.mass} />
          <SpecItem label="Power" value={item.specs.power} />
          <SpecItem label="Swath" value={item.specs.swath} />
        </CardContent>

        <CardFooter className="p-0 flex mt-auto relative z-10">
          {item.tags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className={cn(
                "font-body text-[10px] px-10 py-5 border-[#1A2B0A] bg-[#0E1608] text-white/40 rounded-sm font-semibold",
                "tracking-widest uppercase hover:bg-[#1A2B0A] transition-colors duration-300"
              )}
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
    <div className="flex flex-col gap-2">
      <span className="font-body text-[11px] text-[#2D3A24] font-semibold uppercase tracking-wider">
        {label}
      </span>
      <span className="font-heading text-lg text-white/90 font-medium leading-none">
        {value}
      </span>
    </div>
  )
}

export default CatalogCard
