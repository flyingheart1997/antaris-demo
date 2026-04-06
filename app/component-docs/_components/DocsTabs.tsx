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

export function DocsTabs({ slug, code, previewHeight = 480 }: DocsTabsProps) {
  return (
    <Tabs defaultValue="preview" className="w-full">
      <TabsList variant="underline" size="md" className="mb-0 w-full rounded-none border-b border-stroke-primary px-0">
        <TabsTrigger
          value="preview"
          iconStart={<Eye size={14} />}
          className="rounded-none"
        >
          Preview
        </TabsTrigger>
        <TabsTrigger
          value="code"
          iconStart={<Code2 size={14} />}
          className="rounded-none"
        >
          Code
        </TabsTrigger>
      </TabsList>

      <TabsContent value="preview" className="mt-0 pt-20">
        <ComponentPreview slug={slug} height={previewHeight} />
      </TabsContent>

      <TabsContent value="code" className="mt-0 pt-20">
        <CodeBlock code={code} language="tsx" />
      </TabsContent>
    </Tabs>
  )
}
