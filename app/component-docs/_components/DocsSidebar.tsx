"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { SidebarLogo } from "@/components/ui/sidebar/sidebar-background"
import { Input } from "@/components/ui/input"
import { Search, Layers } from "lucide-react"
import {
  getComponentsByCategory,
  type ComponentCategory,
} from "../config/components"
import { Separator } from "@/components/ui/separator"

const CATEGORY_ORDER: ComponentCategory[] = ["UI", "Forms", "Layout", "Feedback"]

const CATEGORY_ICONS: Record<ComponentCategory, React.ReactNode> = {
  UI: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  Forms: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  ),
  Layout: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18" />
      <path d="M9 21V9" />
    </svg>
  ),
  Feedback: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
}

export function DocsSidebar() {
  const pathname = usePathname()
  const [query, setQuery] = React.useState("")
  const grouped = React.useMemo(() => getComponentsByCategory(), [])
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  const filtered = React.useMemo(() => {
    if (!query.trim()) return grouped
    const q = query.toLowerCase()
    const result: typeof grouped = { UI: [], Forms: [], Layout: [], Feedback: [] }
    for (const cat of CATEGORY_ORDER) {
      result[cat] = grouped[cat].filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.summary.toLowerCase().includes(q)
      )
    }
    return result
  }, [grouped, query])

  return (
    <Sidebar collapsible="icon">
      {/* ── Brand Logo Header ── */}
      <SidebarHeader className="w-full flex flex-col items-center">
        <Link href="/component-docs" className="block w-full">
          <SidebarLogo />
        </Link>

        {/* Search - only visible in expanded state */}
        {!isCollapsed && (
          <div className="w-full mt-24">
            <Input
              leadingIcon={<Search size={14} />}
              placeholder="Search components..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-32 text-sm bg-surface-primary border-stroke-primary"
            />
          </div>
        )}
      </SidebarHeader>

      {/* ── Component Navigation ── */}
      <SidebarContent className="w-full">
        {CATEGORY_ORDER.map((category) => {
          const items = filtered[category]
          if (items.length === 0) return null
          return (
            <SidebarGroup key={category} className="p-0">
              <Separator className="my-4" />
              <SidebarGroupLabel className="flex items-center gap-6 py-3 text-md font-semibold uppercase tracking-widest text-text-disabled">
                <span className="text-icon-secondary">{CATEGORY_ICONS[category]}</span>
                {category}
              </SidebarGroupLabel>
              <Separator className="mt-4" />
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((component) => {
                    const href = `/component-docs/${component.slug}`
                    const isActive = pathname === href
                    return (
                      <SidebarMenuItem key={component.slug}>
                        <SidebarMenuButton asChild isActive={isActive}>
                          <Link href={href} className="flex items-center gap-8 w-full">
                            <Layers size={14} className={isActive ? "text-green-9" : "text-text-disabled"} />
                            <span className="truncate">{component.name}</span>
                            {component.badge && (
                              <span className="ml-auto text-[10px] bg-green-alpha-3 text-green-11 px-4 py-0.5 rounded-sm font-medium shrink-0 uppercase tracking-wider">
                                {component.badge}
                              </span>
                            )}
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          )
        })}

        {/* Empty state when search has no results */}
        {CATEGORY_ORDER.every((c) => filtered[c].length === 0) && (
          <div className="flex flex-col items-center justify-center py-40 gap-8 text-center px-16">
            <Search size={20} className="text-text-disabled" />
            <p className="text-sm text-text-disabled">
              No components match <span className="text-text-secondary font-medium">&ldquo;{query}&rdquo;</span>
            </p>
          </div>
        )}
      </SidebarContent>

      {/* ── Footer ── */}
      {!isCollapsed && (
        <div className="w-full flex items-center justify-center py-12">
          <p className="text-[10px] text-text-disabled uppercase tracking-widest font-medium opacity-60">
            {Object.values(grouped).flat().length} components · Antaris DS
          </p>
        </div>
      )}
    </Sidebar>
  )
}
