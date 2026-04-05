"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

const sizes = ["1", "2", "3", "4", "5", "6"] as const
const states = ["default", "hover", "emphasis", "disabled"] as const

export default function CardPreview() {
  return (
    <div className="p-10 space-y-12 min-h-screen">
      <section className="space-y-4">
        <h1 className="text-2xl font-bold">Card Sizes (Default State)</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sizes.map((size) => (
            <Card key={size} size={size} stroke={true}>
              <CardHeader>
                <CardTitle>Size {size}</CardTitle>
                <CardDescription>Padding and radius scale.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">This is the content area for size {size}.</p>
              </CardContent>
              <CardFooter>
                <span className="text-xs text-text-secondary">Footer info</span>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h1 className="text-2xl font-bold">Card States (Size 3)</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {states.map((state) => (
            <Card key={state} size="3" state={state} stroke={true}>
              <CardHeader>
                <CardTitle className="capitalize">{state}</CardTitle>
                <CardDescription>Variant: {state}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Testing the visual effect of the {state} state.</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h1 className="text-2xl font-bold">Inset Content vs Normal (Size 4)</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card size="4" stroke={true}>
            <div className="h-32 bg-green-100 flex items-center justify-center rounded-sm mb-4">
              Normal Content with Padding
            </div>
            <CardHeader>
              <CardTitle>Standard Padding</CardTitle>
            </CardHeader>
            <CardContent>Standard padding ensures space between card edges and content.</CardContent>
          </Card>

          <Card size="4" stroke={true} insetContent={true}>
            <div className="h-32 bg-blue-100 flex items-center justify-center">
              Inset Content (Flush to Edges)
            </div>
            <div className="p-16">
              <CardHeader>
                <CardTitle>Inset Content</CardTitle>
              </CardHeader>
              <CardContent>When insetContent is true, parent padding is removed for flush assets.</CardContent>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}
