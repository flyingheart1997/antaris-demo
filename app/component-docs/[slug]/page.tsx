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
import { Separator } from "@/components/ui/separator"

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
    <article className="max-w-5xl mx-auto px-40 py-64">

      {/* ── Breadcrumb ── */}
      <nav className="flex items-center gap-10 mb-40 text-lg font-medium text-text-disabled">
        <Link
          href="/component-docs"
          className="flex items-center gap-6 hover:text-green-11 transition-all group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Components
        </Link>
        <span className="opacity-30">/</span>
        <span className="text-text-secondary">{doc.name}</span>
      </nav>

      {/* ── Page Header ── */}
      <header className="mb-64 relative">
        <div className="absolute -top-40 -left-64 size-160 bg-green-alpha-1 blur-80 rounded-full opacity-40 -z-10" />

        <div className="flex items-start gap-32 mb-32 child-pt-8">
          <div className="size-64 rounded-2xl bg-linear-to-br from-green-alpha-3 to-green-alpha-1 border border-green-7 flex items-center justify-center shadow-lg shrink-0">
            <Layers size={32} className="text-green-11" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-14 flex-wrap mb-12">
              <h1 className="text-xxl font-bold text-text-primary font-heading leading-[1.05] tracking-tight">
                {doc.name}
              </h1>
              <span className={`text-sm font-bold px-12 py-4 rounded-lg border uppercase tracking-widest ${CATEGORY_BADGE_STYLES[doc.category]}`}>
                {doc.category}
              </span>
              {doc.badge && (
                <span className="text-sm bg-green-alpha-4 text-green-11 px-12 py-4 rounded-lg font-bold uppercase tracking-widest">
                  {doc.badge}
                </span>
              )}
            </div>
            <p className="text-lg text-text-secondary leading-normal max-w-4xl font-light tracking-tight opacity-90">
              {doc.description}
            </p>
          </div>
        </div>
      </header>

      {/* ── Preview + Code Tabs (Integrated Header) ── */}
      <section aria-labelledby="preview-heading" className="mb-100">
        <div className="rounded-3xl border border-stroke-primary bg-surface-bg/40 backdrop-blur-xl overflow-hidden p-0 shadow-2xl shadow-black/2 relative group/preview">
          <div className="absolute inset-0 bg-linear-to-b from-white/10 to-transparent pointer-events-none" />
          <DocsTabs
            slug={doc.slug}
            code={doc.codeExample}
            previewHeight={560}
          />
        </div>
      </section>

      {/* ── Variants ── */}
      {doc.variants.length > 0 && (
        <section aria-labelledby="variants-heading" className="mb-100">
          <div className="flex items-center gap-20 mb-32">
            <div className="flex items-center justify-center size-32 rounded-xl bg-blue-9 text-gray-1 text-[13px] font-extrabold shadow-lg shadow-blue-alpha-3">
              02
            </div>
            <h2
              id="variants-heading"
              className="text-xxxl font-bold text-text-primary tracking-tight"
            >
              Variants
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-32">
            {doc.variants.map((variant, i) => (
              <div
                key={i}
                className="group relative flex flex-col gap-16 p-32 rounded-3xl border border-stroke-primary bg-surface-bg/20 backdrop-blur-sm hover:bg-surface-selected/40 hover:border-stroke-secondary transition-all duration-500 shadow-sm hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xxl font-bold text-text-primary group-hover:text-blue-11 transition-colors tracking-tight">
                    {variant.label}
                  </h3>
                  <span className="text-[11px] text-text-disabled font-mono opacity-40 uppercase tracking-widest font-bold">
                    V.0{i + 1}
                  </span>
                </div>
                <p className="text-xl text-text-secondary leading-normal opacity-80 font-normal">
                  {variant.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Props Table ── */}
      <section aria-labelledby="props-heading" className="mb-100">
        <div className="flex items-center gap-20 mb-32">
          <div className="flex items-center justify-center size-32 rounded-xl bg-yellow-9 text-gray-1 text-[13px] font-extrabold shadow-lg shadow-yellow-alpha-3">
            03
          </div>
          <h2
            id="props-heading"
            className="text-xxxl font-bold text-text-primary tracking-tight"
          >
            Props Documentation
          </h2>
        </div>
        <div className="rounded-3xl border border-stroke-primary overflow-hidden bg-surface-bg/20 backdrop-blur-xl shadow-lg shadow-black/1">
          <PropsTable props={doc.props} />
        </div>
        {doc.props.some((p) => p.required) && (
          <p className="mt-16 text-md text-text-disabled flex items-center gap-8 italic font-light opacity-60">
            <span className="text-red-11 font-bold text-lg">*</span> Represents a required property
          </p>
        )}
      </section>

      {/* ── Usage Section ── */}
      <section aria-labelledby="usage-heading" className="mb-100 pb-64">
        <div className="flex items-center gap-20 mb-32">
          <div className="flex items-center justify-center size-32 rounded-xl bg-green-9 text-gray-1 text-[13px] font-extrabold shadow-lg shadow-green-alpha-3">
            04
          </div>
          <h2 id="usage-heading" className="text-xxxl font-bold text-text-primary tracking-tight">
            Implementation
          </h2>
        </div>
        <div className="p-40 rounded-3xl border border-stroke-primary bg-surface-bg/20 backdrop-blur-xl space-y-32 shadow-sm">
          <div className="flex items-start gap-20">
            <div className="size-48 rounded-xl bg-green-alpha-2 flex items-center justify-center shrink-0 shadow-sm border border-green-alpha-3">
              <BookOpen size={24} className="text-green-11" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-bold text-text-primary mb-12 tracking-tight">Component Import</h3>
              <div className="relative group">
                <code className="text-green-11 font-code text-lg bg-surface-bg border border-stroke-primary px-20 py-16 rounded-xl block overflow-x-auto shadow-inner leading-relaxed">
                  import {"{ "}{doc.name}{" }"} from &quot;@/components/ui/{doc.slug}&quot;
                </code>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-24">
            <Separator />
            <p className="text-lg text-text-secondary leading-normal font-normal opacity-90">
              This component is part of the core Antaris design language. It integrates seamlessly with global design tokens for
              <span className="text-text-primary font-semibold"> layout, spacing, and micro-interactions</span>.
            </p>
          </div>
        </div>
      </section>

      {/* ── Prev / Next Navigation ── */}
      <div className="flex flex-col gap-30">
        <Separator />
        <nav
          aria-label="Component navigation"
          className="flex items-stretch gap-20"
        >
          {prevDoc ? (
            <Link
              href={`/component-docs/${prevDoc.slug}`}
              className="flex-1 flex flex-col gap-8 p-32 rounded-3xl border border-stroke-primary bg-surface-primary hover:bg-surface-selected hover:border-stroke-secondary transition-all group shadow-sm"
            >
              <span className="text-sm text-text-disabled font-bold uppercase tracking-[0.2em] opacity-60 group-hover:text-green-11 transition-colors">Previous</span>
              <span className="text-xxl font-bold text-text-primary group-hover:text-green-11 transition-colors tracking-tight">
                ← {prevDoc.name}
              </span>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
          {nextDoc && (
            <Link
              href={`/component-docs/${nextDoc.slug}`}
              className="flex-1 flex flex-col gap-8 p-32 rounded-3xl border border-stroke-primary bg-surface-primary hover:bg-surface-selected hover:border-stroke-secondary transition-all group text-right shadow-sm"
            >
              <span className="text-sm text-text-disabled font-bold uppercase tracking-[0.2em] opacity-60 group-hover:text-green-11 transition-colors">Next Up</span>
              <span className="text-xxl font-bold text-text-primary group-hover:text-green-11 transition-colors tracking-tight">
                {nextDoc.name} →
              </span>
            </Link>
          )}
        </nav>
      </div>
    </article>
  )
}
