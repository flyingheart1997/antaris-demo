"use client"

import * as React from "react"

type ViewportMode = "desktop" | "tablet" | "mobile"

interface ComponentPreviewProps {
  /** The slug that maps to /preview/[slug] */
  slug: string
  /** Height of the preview iframe in pixels */
  height?: number
  /** Title for accessibility */
  title?: string
}

const VIEWPORT_WIDTHS: Record<ViewportMode, string> = {
  desktop: "100%",
  tablet: "768px",
  mobile: "375px",
}

const VIEWPORT_LABELS: Record<ViewportMode, string> = {
  desktop: "Desktop",
  tablet: "Tablet",
  mobile: "Mobile",
}

const VIEWPORT_ICONS: Record<ViewportMode, React.ReactNode> = {
  desktop: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  tablet: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  ),
  mobile: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  ),
}

export function ComponentPreview({ slug, height = 480, title }: ComponentPreviewProps) {
  const [mode, setMode] = React.useState<ViewportMode>("desktop")
  const [isLoading, setIsLoading] = React.useState(true)
  const iframeRef = React.useRef<HTMLIFrameElement>(null)

  const src = `/preview/${slug}`
  const width = VIEWPORT_WIDTHS[mode]

  return (
    <div className="rounded-xl border border-stroke-primary bg-surface-secondary overflow-hidden">
      {/* ── Toolbar ── */}
      <div className="flex items-center justify-between px-16 py-10 border-b border-stroke-primary bg-surface-primary">
        <div className="flex items-center gap-6">
          {/* Traffic-light dots */}
          <span className="size-10 rounded-full bg-red-alpha-6" />
          <span className="size-10 rounded-full bg-yellow-alpha-6" />
          <span className="size-10 rounded-full bg-green-alpha-6" />
        </div>

        {/* URL pill */}
        <div className="flex-1 mx-16 max-w-xs">
          <div className="flex items-center gap-6 h-24 px-10 rounded-md bg-surface-primary border border-stroke-primary">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-text-secondary shrink-0">
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span className="text-sm text-text-secondary truncate font-code">
              /preview/{slug}
            </span>
          </div>
        </div>

        {/* Viewport switcher */}
        <div className="flex items-center gap-2 p-1 rounded-lg bg-surface-secondary border border-stroke-primary">
          {(["desktop", "tablet", "mobile"] as ViewportMode[]).map((v) => (
            <button
              key={v}
              onClick={() => setMode(v)}
              title={VIEWPORT_LABELS[v]}
              className={`
                flex items-center justify-center size-24 rounded-md transition-all
                ${mode === v
                  ? "bg-surface-bg text-text-primary shadow-sm border border-stroke-primary"
                  : "text-text-disabled hover:text-text-secondary"
                }
              `}
            >
              {VIEWPORT_ICONS[v]}
            </button>
          ))}
        </div>
      </div>

      {/* ── iframe Container ── */}
      <div
        className="relative bg-surface-bg transition-all duration-300 mx-auto overflow-hidden"
        style={{ width, height }}
      >
        {/* Loading shimmer */}
        {isLoading && (
          <div className="absolute inset-0 bg-surface-secondary animate-pulse flex items-center justify-center">
            <div className="flex flex-col items-center gap-8">
              <div className="size-32 rounded-full border-2 border-stroke-primary border-t-green-9 animate-spin" />
              <span className="text-xs text-text-disabled">Loading preview...</span>
            </div>
          </div>
        )}
        <iframe
          ref={iframeRef}
          src={src}
          title={title ?? `${slug} preview`}
          className="w-full h-full border-0"
          style={{ height }}
          onLoad={() => setIsLoading(false)}
          loading="lazy"
        />
      </div>
    </div>
  )
}
