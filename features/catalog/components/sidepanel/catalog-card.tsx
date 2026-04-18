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
import { Badge } from "@/components/ui/badge"
import { Text } from "@/components/ui/text"
import { Tooltip } from "@/components/ui/tooltip"
import type { CatalogItem } from "@/features/catalog/types/catalog-data-types"

interface CatalogCardProps extends React.HTMLAttributes<HTMLDivElement> {
  item: CatalogItem
  selected?: boolean
}

const CatalogCard = React.forwardRef<HTMLDivElement, CatalogCardProps>(
  ({ item, selected, className, ...props }, ref) => {

    // Technical Spec Resolvers
    const mass = `${item.common_attributes.mass.attribute_value}${item.common_attributes.mass.attribute_unit}`
    const dimensions = item.common_attributes.dimensions
    const size = `${dimensions.length}x${dimensions.width}m`

    const power = item.component_specific_attributes?.power ||
      (item.bus_specific_attributes?.bus_power_output?.attribute_min?.toString() + "W") ||
      "N/A"

    const swath = item.component_specific_attributes?.swath || "N/A"

    return (
      <Card
        ref={ref}
        state='default'
        selected={selected}
        size="3"
        className={cn("transition-all duration-200", selected ? 'w-[96%]' : 'w-full', className)}
        {...props}
      >
        <CardHeader className="p-0 flex flex-row items-center justify-between gap-2 relative z-10">
          <CardTitle className="min-w-0 flex-1">
            <Tooltip content={item.name} side="top">
              <Text type='heading' size='lg' color='primary' className="truncate block w-full">
                {item.name}
              </Text>
            </Tooltip>
          </CardTitle>
          {item.category && (
            <Text type='heading' size='sm' color='secondary' className="opacity-80 shrink-0">
              {item.category}
            </Text>
          )}
        </CardHeader>

        <CardContent className="p-0 grid grid-cols-4 gap-x-8 gap-y-4 relative z-10 overflow-hidden text-ellipsis">
          <SpecItem label="Size" value={size} />
          <SpecItem label="Mass" value={mass} />
          <SpecItem label="Power" value={power} />
          <SpecItem label="Swath" value={swath} />
        </CardContent>

        <CardFooter className="pt-12 flex flex-wrap gap-4 relative z-10">
          {item.common_attributes.vendor && (
            <Badge size='md' variant="soft" color='neutral' className="p-6">
              <Tooltip content={item.common_attributes.vendor} side="top">
                <Text type='body' size='xs' color='secondary' className="truncate block max-w-100">{item.common_attributes.vendor}</Text>
              </Tooltip>
            </Badge>
          )}
          {item.antaris_component_type && (
            <Badge size='md' variant="soft" color='neutral' className="p-6">
              <Tooltip content={item.antaris_component_type} side="top">
                <Text type='body' size='xs' color='secondary' className="truncate block max-w-100">{item.antaris_component_type}</Text>
              </Tooltip>
            </Badge>
          )}
        </CardFooter>
      </Card>
    )
  }
)
CatalogCard.displayName = "CatalogCard"

/**
 * Individual specification item with truncation and tooltip support.
 */
function SpecItem({ label, value }: { label: string; value?: string }) {
  if (!value || value === "N/A") return null

  return (
    <div className="flex flex-col gap-1 min-w-0 overflow-hidden text-ellipsis">
      <Text type='body' size='sm' color='secondary' className="opacity-80 truncate block w-full">
        {label}
      </Text>
      <Tooltip content={value} side="bottom" delayDuration={300}>
        <Text type='heading' size='md' color='secondary' className="truncate block w-full">
          {value}
        </Text>
      </Tooltip>
    </div>
  )
}

export default CatalogCard
