"use client"

import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible"
// import type { CatalogCategoryGroup as CategoryGroupType } from "../types/catalog"
// import { useCatalogStore } from "../hooks/useCatalogStore"
// import CatalogCard from "./catalog-card"

// interface CatalogCategoryGroupProps {
//   group: CategoryGroupType
// }

// export default function CatalogCategoryGroup({ group }: CatalogCategoryGroupProps) {
export default function CatalogCategoryGroup() {
  // const { expandedCategories, toggleCategory } = useCatalogStore()
  // const isExpanded = expandedCategories.has(group.category)

  return (
    <div></div>
    // <Collapsible open={isExpanded} onOpenChange={() => toggleCategory(group.category)}>
    //   {/* Category Header */}
    //   <CollapsibleTrigger
    //     className={cn(
    //       "flex items-center justify-between w-full px-12 py-8",
    //       "hover:bg-surface-hover transition-colors"
    //     )}
    //   >
    //     <div className="flex items-center gap-6">
    //       <span className="text-sm font-medium text-text-primary">
    //         {group.category}
    //       </span>
    //       <ChevronRight
    //         size={14}
    //         className={cn(
    //           "text-text-disabled transition-transform duration-200",
    //           isExpanded && "rotate-90"
    //         )}
    //       />
    //     </div>
    //     <span className="text-xs text-text-disabled tabular-nums">
    //       {group.count}
    //     </span>
    //   </CollapsibleTrigger>

    //   {/* Category Items */}
    //   <CollapsibleContent>
    //     <div className="flex flex-col gap-2 pb-4">
    //       {group.items.map((item) => (
    //         <CatalogCard key={item.id} item={item} />
    //       ))}
    //     </div>
    //   </CollapsibleContent>
    // </Collapsible>
  )
}
