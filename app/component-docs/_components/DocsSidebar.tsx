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
} from "@/components/ui/sidebar"
import { Input } from "@/components/ui/input"
import { Search, Layers } from "lucide-react"
import {
  getComponentsByCategory,
  type ComponentCategory,
} from "../config/components"

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
    <Sidebar collapsible="none" className="border-r border-stroke-primary bg-surface-primary h-full">
      {/* ── Logo / Header ── */}
      <SidebarHeader className="border-b border-stroke-primary px-16 py-14">
        <Link
          href="/component-docs"
          className="flex items-center gap-10 group"
        >
          <div className="size-28 rounded-md bg-green-9 flex items-center justify-center shrink-0 shadow-sm group-hover:bg-green-10 transition-colors">
            <Layers size={16} className="text-gray-1" />
          </div>
          <div className="flex flex-col">
            <span className="text-md font-bold text-text-primary leading-tight font-heading">
              Antaris UI
            </span>
            <span className="text-xs text-text-disabled leading-tight">
              Component Library
            </span>
          </div>
        </Link>

        {/* Search */}
        <div className="mt-12">
          <Input
            leadingIcon={<Search size={14} />}
            placeholder="Search components..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-32 text-sm"
          />
        </div>
      </SidebarHeader>

      {/* ── Nav ── */}
      <SidebarContent className="px-8 py-8">
        {CATEGORY_ORDER.map((category) => {
          const items = filtered[category]
          if (items.length === 0) return null
          return (
            <SidebarGroup key={category} className="mb-8 p-0">
              <SidebarGroupLabel className="flex items-center gap-6 px-8 py-6 mb-4 text-xs font-semibold uppercase tracking-widest text-text-disabled">
                <span className="text-icon-secondary">{CATEGORY_ICONS[category]}</span>
                {category}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((component) => {
                    const href = `/component-docs/${component.slug}`
                    const isActive = pathname === href
                    return (
                      <SidebarMenuItem key={component.slug}>
                        <SidebarMenuButton
                          asChild
                          isActive={isActive}
                          className={`
                            h-32 rounded-md px-8 text-sm transition-all
                            ${isActive
                              ? "bg-green-alpha-3 text-green-11 border border-green-7 font-medium"
                              : "text-text-secondary hover:bg-surface-hover hover:text-text-primary border border-transparent"
                            }
                          `}
                        >
                          <Link href={href} className="flex items-center gap-8">
                            <span className={`size-6 rounded-full shrink-0 ${isActive ? "bg-green-9" : "bg-gray-alpha-4"}`} />
                            <span className="truncate">{component.name}</span>
                            {component.badge && (
                              <span className="ml-auto text-xs bg-green-alpha-3 text-green-11 px-4 py-0.5 rounded-sm font-medium shrink-0">
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
      <div className="mt-auto border-t border-stroke-primary px-16 py-12">
        <p className="text-xs text-text-disabled">
          {/* Count of registered components */}
          {Object.values(grouped).flat().length} components · Antaris DS
        </p>
      </div>
    </Sidebar>
  )
}
