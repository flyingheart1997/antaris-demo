import * as React from "react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import {
  getComponentDoc,
  getAllSlugs,
  getComponentsByCategory,
  type ComponentCategory,
} from "../config/components"
import { DocsTabs } from "../_components/DocsTabs"
import { PropsTable } from "../_components/PropsTable"
import { ArrowLeft, BookOpen, Layers } from "lucide-react"

const CATEGORY_BADGE_STYLES: Record<ComponentCategory, string> = {
  UI: "bg-green-alpha-3 text-green-11 border-green-7",
  Forms: "bg-blue-alpha-3 text-blue-11 border-blue-7",
  Layout: "bg-yellow-alpha-3 text-yellow-11 border-yellow-7",
  Feedback: "bg-red-alpha-3 text-red-11 border-red-7",
}

type Params = { slug: string }

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params
  const doc = getComponentDoc(slug)
  if (!doc) return { title: "Component Not Found" }
  return {
    title: doc.name,
    description: doc.description,
  }
}

export default async function ComponentDocPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const doc = getComponentDoc(slug)

  if (!doc) notFound()

  // Get adjacent components for prev/next nav
  const allDocs = getAllSlugs()
  const currentIndex = allDocs.indexOf(slug)
  const prevSlug = currentIndex > 0 ? allDocs[currentIndex - 1] : null
  const nextSlug = currentIndex < allDocs.length - 1 ? allDocs[currentIndex + 1] : null
  const prevDoc = prevSlug ? getComponentDoc(prevSlug) : null
  const nextDoc = nextSlug ? getComponentDoc(nextSlug) : null

  return (
    <article className="max-w-4xl mx-auto px-32 py-48">

      {/* ── Breadcrumb ── */}
      <nav className="flex items-center gap-8 mb-32 text-sm text-text-disabled">
        <Link
          href="/component-docs"
          className="flex items-center gap-4 hover:text-text-secondary transition-colors"
        >
          <ArrowLeft size={14} />
          Components
        </Link>
        <span>/</span>
        <span className="text-text-secondary">{doc.name}</span>
      </nav>

      {/* ── Page Header ── */}
      <header className="mb-40">
        <div className="flex items-start gap-16 mb-16">
          <div className="size-48 rounded-xl bg-green-alpha-3 border border-green-7 flex items-center justify-center shrink-0">
            <Layers size={22} className="text-green-11" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-10 flex-wrap mb-6">
              <h1 className="text-xxxl font-bold text-text-primary font-heading leading-tight">
                {doc.name}
              </h1>
              <span className={`text-xs font-semibold px-8 py-2 rounded-md border ${CATEGORY_BADGE_STYLES[doc.category]}`}>
                {doc.category}
              </span>
              {doc.badge && (
                <span className="text-xs bg-green-alpha-4 text-green-11 px-8 py-2 rounded-md font-medium">
                  {doc.badge}
                </span>
              )}
            </div>
            <p className="text-lg text-text-secondary leading-relaxed">
              {doc.description}
            </p>
          </div>
        </div>
      </header>

      {/* ── Preview + Code Tabs ── */}
      <section aria-labelledby="preview-heading" className="mb-52">
        <h2
          id="preview-heading"
          className="text-xl font-semibold text-text-primary mb-16 flex items-center gap-8"
        >
          <span className="size-24 rounded-md bg-green-alpha-3 border border-green-7 flex items-center justify-center text-green-11 text-xs font-bold shrink-0">
            1
          </span>
          Live Preview
        </h2>
        <DocsTabs
          slug={doc.slug}
          code={doc.codeExample}
          previewHeight={520}
        />
      </section>

      {/* ── Variants ── */}
      {doc.variants.length > 0 && (
        <section aria-labelledby="variants-heading" className="mb-52">
          <h2
            id="variants-heading"
            className="text-xl font-semibold text-text-primary mb-16 flex items-center gap-8"
          >
            <span className="size-24 rounded-md bg-blue-alpha-3 border border-blue-7 flex items-center justify-center text-blue-11 text-xs font-bold shrink-0">
              2
            </span>
            Variants
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
            {doc.variants.map((variant, i) => (
              <div
                key={i}
                className="flex flex-col gap-6 p-16 rounded-xl border border-stroke-primary bg-surface-secondary hover:bg-surface-hover transition-colors"
              >
                <div className="flex items-center gap-8">
                  <span className="size-20 rounded-md bg-green-alpha-3 flex items-center justify-center text-green-11 text-xs font-bold shrink-0">
                    {i + 1}
                  </span>
                  <h3 className="text-md font-semibold text-text-primary">
                    {variant.label}
                  </h3>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {variant.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Props Table ── */}
      <section aria-labelledby="props-heading" className="mb-52">
        <h2
          id="props-heading"
          className="text-xl font-semibold text-text-primary mb-16 flex items-center gap-8"
        >
          <span className="size-24 rounded-md bg-yellow-alpha-3 border border-yellow-7 flex items-center justify-center text-yellow-11 text-xs font-bold shrink-0">
            3
          </span>
          Props
        </h2>
        <PropsTable props={doc.props} />
        {doc.props.some((p) => p.required) && (
          <p className="mt-8 text-xs text-text-disabled">
            <span className="text-red-11 font-medium">*</span> Required prop
          </p>
        )}
      </section>

      {/* ── Usage Section ── */}
      <section aria-labelledby="usage-heading" className="mb-52">
        <h2
          id="usage-heading"
          className="text-xl font-semibold text-text-primary mb-16 flex items-center gap-8"
        >
          <span className="size-24 rounded-md bg-green-alpha-3 border border-green-7 flex items-center justify-center text-green-11 text-xs font-bold shrink-0">
            4
          </span>
          Usage Guide
        </h2>
        <div className="p-20 rounded-xl border border-stroke-primary bg-surface-secondary space-y-16">
          <div className="flex items-start gap-12">
            <BookOpen size={16} className="text-green-11 mt-2 shrink-0" />
            <div>
              <h3 className="text-md font-semibold text-text-primary mb-4">Import</h3>
              <code className="text-green-11 font-code text-sm bg-green-alpha-2 px-8 py-4 rounded-md block">
                import {"{ "}{doc.name}{" }"} from &quot;@/components/ui/{doc.slug.replace("-test", "")}&quot;
              </code>
            </div>
          </div>
          <div className="border-t border-stroke-primary pt-16">
            <p className="text-sm text-text-secondary">
              All components follow the Antaris design token system. Tokens for spacing, color, and typography
              are defined in{" "}
              <code className="text-green-11 font-code text-xs bg-green-alpha-2 px-4 py-0.5 rounded-sm">
                styles/src/antaris-theme.css
              </code>.
            </p>
          </div>
        </div>
      </section>

      {/* ── Prev / Next Navigation ── */}
      <nav
        aria-label="Component navigation"
        className="flex items-stretch gap-16 pt-32 border-t border-stroke-primary"
      >
        {prevDoc ? (
          <Link
            href={`/component-docs/${prevDoc.slug}`}
            className="flex-1 flex flex-col gap-4 p-16 rounded-xl border border-stroke-primary bg-surface-secondary hover:bg-surface-hover hover:border-stroke-secondary transition-all group"
          >
            <span className="text-xs text-text-disabled uppercase tracking-widest">Previous</span>
            <span className="text-md font-semibold text-text-primary group-hover:text-green-11 transition-colors">
              ← {prevDoc.name}
            </span>
          </Link>
        ) : (
          <div className="flex-1" />
        )}
        {nextDoc && (
          <Link
            href={`/component-docs/${nextDoc.slug}`}
            className="flex-1 flex flex-col gap-4 p-16 rounded-xl border border-stroke-primary bg-surface-secondary hover:bg-surface-hover hover:border-stroke-secondary transition-all group text-right"
          >
            <span className="text-xs text-text-disabled uppercase tracking-widest">Next</span>
            <span className="text-md font-semibold text-text-primary group-hover:text-green-11 transition-colors">
              {nextDoc.name} →
            </span>
          </Link>
        )}
      </nav>
    </article>
  )
}
