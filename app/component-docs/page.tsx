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
    <div className="max-w-6xl mx-auto px-40 py-64">
      {/* ── Hero section ── */}
      <div className="relative mb-80">
        {/* Decorative background element */}
        <div className="absolute -top-40 -left-64 size-160 bg-green-alpha-2 blur-80 rounded-full opacity-60" />
        <div className="absolute -top-20 right-0 size-120 bg-blue-alpha-2 blur-60 rounded-full opacity-40" />

        <div className="relative">
          <div className="flex items-center gap-12 mb-24">
            <div className="size-48 rounded-2xl bg-linear-to-br from-green-9 to-green-11 flex items-center justify-center shadow-lg shadow-green-alpha-3">
              <Layers size={24} className="text-gray-1" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xxxl font-bold text-text-primary font-heading leading-[1.05] tracking-tight mb-4">
                Antaris UI
              </h1>
              <p className="text-text-disabled text-lg font-bold uppercase tracking-[0.25em] opacity-60">
                Premium Design System
              </p>
            </div>
          </div>

          <p className="text-xl text-text-secondary max-w-2xl leading-relaxed mb-40 font-light tracking-tight">
            A premium collection of production-ready components built for{" "}
            <span className="text-text-primary font-semibold">high-performance interfaces</span>.
            Engineered with extreme precision and accessibility.
          </p>

          {/* Stats row */}
          <div className="flex items-center gap-48 pt-32 border-t border-stroke-primary relative overflow-hidden">
            <div className="flex flex-col">
              <span className="text-xxxl font-bold text-green-11 leading-tight tracking-tighter">
                {COMPONENT_REGISTRY.length}
              </span>
              <span className="text-sm text-text-disabled font-bold uppercase tracking-[0.2em] opacity-50">Components</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xxxl font-bold text-blue-11 leading-tight tracking-tighter">
                {CATEGORY_ORDER.filter((c) => grouped[c].length > 0).length}
              </span>
              <span className="text-sm text-text-disabled font-bold uppercase tracking-[0.2em] opacity-50">Categories</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xxxl font-bold text-yellow-11 leading-tight tracking-tighter">∞</span>
              <span className="text-sm text-text-disabled font-bold uppercase tracking-[0.2em] opacity-50">Customizable</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Category Sections ── */}
      <div className="space-y-100">
        {CATEGORY_ORDER.map((category) => {
          const items = grouped[category]
          if (items.length === 0) return null

          return (
            <section key={category} aria-labelledby={`category-${category}`} className="relative">
              <div className="flex items-baseline gap-12 mb-32">
                <h2
                  id={`category-${category}`}
                  className="text-xxxl font-bold text-text-primary tracking-tight"
                >
                  {category}
                </h2>
                <span className="text-xl text-text-secondary font-medium opacity-60">
                  {items.length} {items.length === 1 ? "element" : "elements"}
                </span>
                <div className="flex-1 h-px bg-stroke-primary/20 translate-y-[-0.3rem] ml-12" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {items.map((component) => (
                  <Link
                    key={component.slug}
                    href={`/component-docs/${component.slug}`}
                    className={`
                      group relative flex flex-col gap-24 p-32 rounded-3xl
                      border border-stroke-primary bg-surface-primary hover:bg-surface-selected
                      transition-all duration-500 ease-out
                      hover:shadow-2xl hover:shadow-black/5 hover:-translate-y-2
                      hover:border-stroke-secondary
                    `}
                  >
                    {/* Highlight indicator */}
                    <div className={`absolute top-0 right-0 p-16 opacity-0 group-hover:opacity-100 transition-opacity`}>
                      <ArrowRight size={20} className="text-green-9 animate-in slide-in-from-left-2 duration-500" />
                    </div>

                    {/* Name */}
                    <div className="flex items-start justify-between">
                      <h3 className="text-xxl font-bold text-text-primary group-hover:text-green-11 transition-colors leading-tight tracking-tight">
                        {component.name}
                      </h3>
                      {component.badge && (
                        <span className="text-sm bg-green-alpha-4 text-green-11 px-10 py-4 rounded-lg font-medium uppercase tracking-widest">
                          {component.badge}
                        </span>
                      )}
                    </div>

                    {/* Summary */}
                    <p className="text-xl text-text-secondary leading-relaxed flex-1 opacity-80 font-normal">
                      {component.summary}
                    </p>

                    {/* Meta info */}
                    <div className="flex items-center gap-12 pt-16 border-t border-stroke-primary">
                      <div className="flex items-center gap-6">
                        <Layers size={14} className="text-text-disabled" />
                        <span className="text-xl text-text-disabled font-medium group-hover:text-text-secondary transition-colors">
                          {component.variants.length} variant{component.variants.length !== 1 ? "s" : ""}
                        </span>
                      </div>
                      <span className="text-text-disabled/20">•</span>
                      <span className="text-xl text-text-disabled font-medium group-hover:text-text-secondary transition-colors">
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

      {/* ── Footer CTA ── */}
      <div className="mt-80 p-40 rounded-3xl border border-dashed border-stroke-secondary bg-surface-secondary/50 backdrop-blur-md text-center">
        <div className="inline-flex size-48 rounded-full bg-green-alpha-2 items-center justify-center mb-16">
          <Layers size={24} className="text-green-11" />
        </div>
        <h3 className="text-xl font-bold text-text-primary mb-12">
          Expanding the Library
        </h3>
        <p className="text-md text-text-secondary mb-24 max-w-lg mx-auto leading-relaxed">
          Need a component that isn&apos;t here yet? Register it in the registry to keep our documentation unified and always up to date.
        </p>
        <code className="inline-block px-12 py-6 rounded-lg bg-surface-primary border border-stroke-primary text-green-11 font-code text-sm shadow-sm">
          app/component-docs/config/components.ts
        </code>
      </div>
    </div>
  )
}
