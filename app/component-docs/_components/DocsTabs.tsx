"use client"

import * as React from "react"
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs"
import { Eye, Code2 } from "lucide-react"
import { ComponentPreview } from "./ComponentPreview"
import { CodeBlock } from "./CodeBlock"

interface DocsTabsProps {
  slug: string
  code: string
  previewHeight?: number
}

export function DocsTabs({ slug, code, previewHeight = 560 }: DocsTabsProps) {
  return (
    <Tabs defaultValue="preview" className="w-full">
      {/* ── Premium Integrated Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-16 px-24 py-10 bg-surface-bg/40 border-b border-stroke-primary backdrop-blur-xl">
        <div className="flex items-center gap-12">
          <div className="flex items-center justify-center size-28 rounded-lg bg-green-9 text-gray-1 text-[13px] font-extrabold shadow-lg shadow-green-alpha-4">
            01
          </div>
          <h2 className="text-xl font-bold text-text-primary tracking-tight">
            Live Preview
          </h2>
        </div>

        <TabsList className="bg-surface-bg border border-stroke-primary p-4 rounded-xl h-40 shadow-inner">
          <TabsTrigger
            value="preview"
            className="rounded-lg px-20 font-bold text-sm tracking-tight data-[state=active]:bg-green-alpha-3 data-[state=active]:text-green-11 data-[state=active]:shadow-sm transition-all"
          >
            <Eye size={16} />
            Visual
          </TabsTrigger>
          <TabsTrigger
            value="code"
            className="rounded-lg px-20 font-bold text-sm tracking-tight data-[state=active]:bg-green-alpha-3 data-[state=active]:text-green-11 data-[state=active]:shadow-sm transition-all"
          >
            <Code2 size={16} />
            Code
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="preview" className="mt-0 p-20 bg-surface-bg/20">
        <ComponentPreview slug={slug} height={previewHeight} />
      </TabsContent>

      <TabsContent value="code" className="mt-0 p-20 bg-surface-bg/20">
        <CodeBlock code={code} language="tsx" />
      </TabsContent>
    </Tabs>
  )
}
