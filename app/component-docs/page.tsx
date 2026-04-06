import * as React from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { COMPONENT_REGISTRY, getComponentsByCategory } from "./config/components"
import { ArrowRight, Layers } from "lucide-react"

export const metadata: Metadata = {
  title: "Antaris UI Components",
  description:
    "Browse all components in the Antaris design system. Click any component to see live previews, props documentation, and copy-ready code examples.",
}

const CATEGORY_ORDER = ["UI", "Forms", "Layout", "Feedback"] as const

const CATEGORY_GRADIENTS: Record<string, string> = {
  UI: "from-green-alpha-3 to-green-alpha-1 border-green-7",
  Forms: "from-blue-alpha-3 to-blue-alpha-1 border-blue-7",
  Layout: "from-yellow-alpha-3 to-yellow-alpha-1 border-yellow-7",
  Feedback: "from-red-alpha-3 to-red-alpha-1 border-red-7",
}

const CATEGORY_BADGE_STYLES: Record<string, string> = {
  UI: "bg-green-alpha-3 text-green-11",
  Forms: "bg-blue-alpha-3 text-blue-11",
  Layout: "bg-yellow-alpha-3 text-yellow-11",
  Feedback: "bg-red-alpha-3 text-red-11",
}

export default function ComponentDocsIndexPage() {
  const grouped = getComponentsByCategory()

  return (
    <div className="max-w-5xl mx-auto px-32 py-48">
      {/* ── Hero ── */}
      <div className="mb-60">
        <div className="flex items-center gap-10 mb-20">
          <div className="size-40 rounded-xl bg-green-9 flex items-center justify-center shadow-sm">
            <Layers size={22} className="text-gray-1" />
          </div>
          <div>
            <h1 className="text-xxxl font-bold text-text-primary font-heading leading-tight">
              Antaris UI
            </h1>
            <p className="text-text-disabled text-sm">Component Documentation Library</p>
          </div>
        </div>

        <p className="text-xl text-text-secondary max-w-xl leading-relaxed mb-24">
          A curated collection of production-ready components built on the{" "}
          <span className="text-text-primary font-medium">Antaris design system</span>.
          Browse live previews, explore props, and copy code instantly.
        </p>

        {/* Stats row */}
        <div className="flex items-center gap-24 pt-16 border-t border-stroke-primary">
          <div className="flex flex-col">
            <span className="text-xxl font-bold text-green-11">
              {COMPONENT_REGISTRY.length}
            </span>
            <span className="text-xs text-text-disabled uppercase tracking-widest">Components</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xxl font-bold text-blue-11">
              {CATEGORY_ORDER.filter((c) => grouped[c].length > 0).length}
            </span>
            <span className="text-xs text-text-disabled uppercase tracking-widest">Categories</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xxl font-bold text-yellow-11">∞</span>
            <span className="text-xs text-text-disabled uppercase tracking-widest">Composable</span>
          </div>
        </div>
      </div>

      {/* ── Category Sections ── */}
      <div className="space-y-52">
        {CATEGORY_ORDER.map((category) => {
          const items = grouped[category]
          if (items.length === 0) return null

          return (
            <section key={category} aria-labelledby={`category-${category}`}>
              <div className="flex items-center gap-12 mb-20">
                <h2
                  id={`category-${category}`}
                  className="text-xl font-semibold text-text-primary"
                >
                  {category}
                </h2>
                <span className={`text-xs font-medium px-8 py-2 rounded-md ${CATEGORY_BADGE_STYLES[category]}`}>
                  {items.length} {items.length === 1 ? "component" : "components"}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
                {items.map((component) => (
                  <Link
                    key={component.slug}
                    href={`/component-docs/${component.slug}`}
                    className={`
                      group relative flex flex-col gap-12 p-20 rounded-xl
                      border bg-linear-to-br transition-all duration-200
                      hover:shadow-md hover:-translate-y-0.5
                      ${CATEGORY_GRADIENTS[category]}
                    `}
                  >
                    {/* Name + badge */}
                    <div className="flex items-start justify-between gap-8">
                      <h3 className="text-md font-semibold text-text-primary group-hover:text-green-11 transition-colors">
                        {component.name}
                      </h3>
                      <div className="flex items-center gap-4 shrink-0">
                        {component.badge && (
                          <span className="text-xs bg-green-alpha-4 text-green-11 px-6 py-1 rounded-sm font-medium">
                            {component.badge}
                          </span>
                        )}
                        <ArrowRight
                          size={14}
                          className="text-text-disabled group-hover:text-green-11 group-hover:translate-x-1 transition-all"
                        />
                      </div>
                    </div>

                    {/* Summary */}
                    <p className="text-sm text-text-secondary leading-relaxed flex-1">
                      {component.summary}
                    </p>

                    {/* Variants count */}
                    <div className="flex items-center gap-8 pt-8 border-t border-stroke-primary">
                      <span className="text-xs text-text-disabled">
                        {component.variants.length} variant{component.variants.length !== 1 ? "s" : ""}
                      </span>
                      <span className="text-text-disabled">·</span>
                      <span className="text-xs text-text-disabled">
                        {component.props.length} props
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )
        })}
      </div>

      {/* ── Add New Component CTA ── */}
      <div className="mt-60 p-28 rounded-xl border border-stroke-secondary bg-surface-secondary text-center">
        <h3 className="text-lg font-semibold text-text-primary mb-8">
          Add a new component
        </h3>
        <p className="text-sm text-text-secondary mb-0 max-w-md mx-auto">
          Register your component in{" "}
          <code className="text-green-11 font-code text-xs bg-green-alpha-2 px-6 py-1 rounded-sm">
            app/component-docs/config/components.ts
          </code>{" "}
          and it appears everywhere automatically.
        </p>
      </div>
    </div>
  )
}
