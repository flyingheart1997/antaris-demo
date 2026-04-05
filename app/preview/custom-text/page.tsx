'use client';

import React from 'react';
import { Text } from '@/components/ui/text';

export default function TextShowcase() {
  const [testText, setTestText] = React.useState(
    "Antaris Design System provides high-fidelity typography components with premium interactions."
  );

  return (
    <div className="min-h-screen bg-surface-bg text-text-primary p-8 lg:p-16 space-y-16 max-w-7xl mx-auto">
      {/* Header */}
      <header className="space-y-4 border-b border-stroke-primary pb-8">
        <Text type="heading" size="xxxl" weight="bold">
          Text Component
        </Text>
        <Text type="body" size="lg" color="secondary" className="block max-w-2xl leading-relaxed">
          A versatile typography system that strictly adheres to Figma design tokens, 
          featuring polymorphic rendering and advanced masking interactions.
        </Text>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Sizes & Types */}
        <section className="space-y-8">
          <Text type="heading" size="xl" weight="medium" className="block mb-6">
            Typography Scale
          </Text>
          <div className="space-y-6 bg-surface-secondary/5 p-8 rounded-xl border border-stroke-primary/50 backdrop-blur-sm shadow-xl shadow-black/10">
            {(['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs'] as const).map((size) => (
              <div key={size} className="flex items-baseline gap-4 border-b border-stroke-primary/20 pb-4 last:border-0 last:pb-0">
                <Text type="code" size="xs" color="disabled" className="w-12 uppercase opacity-50">
                  {size}
                </Text>
                <div className="flex-1">
                   <Text type="body" size={size}>
                    Antaris Design System ({size})
                  </Text>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Weights & Colors */}
        <section className="space-y-8">
          <Text type="heading" size="xl" weight="medium" className="block mb-6">
            Styles & Variants
          </Text>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4 bg-surface-secondary/5 p-6 rounded-xl border border-stroke-primary/50">
              <Text type="code" size="xs" color="disabled" className="block mb-2 uppercase tracking-widest opacity-50">Weights</Text>
              <div className="space-y-3">
                <Text type="body" weight="light" className="block">Light Weight</Text>
                <Text type="body" weight="regular" className="block">Regular Weight</Text>
                <Text type="body" weight="medium" className="block">Medium Weight</Text>
                <Text type="body" weight="bold" className="block">Bold Weight</Text>
                <Text type="body" weight="italic" className="block italic">Italic Style</Text>
              </div>
            </div>
            <div className="space-y-4 bg-surface-secondary/5 p-6 rounded-xl border border-stroke-primary/50">
              <Text type="code" size="xs" color="disabled" className="block mb-2 uppercase tracking-widest opacity-50">Semantic Colors</Text>
              <div className="space-y-3">
                <Text type="body" color="primary" className="block">Primary Text Content</Text>
                <Text type="body" color="secondary" className="block">Secondary Text Content</Text>
                <Text type="body" color="info" className="block">Information Highlight</Text>
                <Text type="body" color="warning" className="block">Warning Indication</Text>
                <Text type="body" color="error" className="block">Critical Error Status</Text>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Interactive Playground */}
      <section className="space-y-8 pt-8">
        <div className="flex items-center justify-between border-b border-stroke-primary pb-4">
          <Text type="heading" size="xl" weight="medium">
            Advanced Mask Interaction
          </Text>
          <div className="flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-surface-info animate-pulse" />
             <Text type="code" size="xs" color="info" className="px-2 py-1 bg-surface-info/10 rounded-sm border border-stroke-info/20">
                1s Hover Delay
             </Text>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
             <Text type="body" size="md" color="secondary" className="block leading-relaxed">
              The mask effect uses a dynamic CSS gradient fade and handles overflow automatically via ResizeObserver. 
              Hover over the boxes to see the smooth, premium reveal animation.
            </Text>
            <textarea 
              value={testText}
              onChange={(e) => setTestText(e.target.value)}
              className="w-full h-32 bg-surface-secondary/5 border border-stroke-primary rounded-lg p-4 text-sm focus:ring-1 focus:ring-text-focus outline-none transition-all placeholder:opacity-30"
              placeholder="Enter long text here to test overflow..."
            />
          </div>

          <div className="space-y-8 p-10 bg-surface-secondary/5 rounded-2xl border border-dashed border-stroke-primary flex flex-col items-center">
            {/* Left Aligned Mask */}
            <div className="w-full max-w-sm space-y-3">
              <Text type="code" size="xs" color="disabled" className="block mb-1 uppercase tracking-tighter opacity-50">Variant: Left Aligned Mask</Text>
              <div className="p-4 border border-stroke-primary bg-surface-bg/50 rounded-lg shadow-2xl overflow-hidden backdrop-blur-md">
                <Text mask maskAlignment="left" size="lg" weight="medium">
                  {testText}
                </Text>
              </div>
            </div>

            {/* Right Aligned Mask */}
            <div className="w-full max-w-sm space-y-3">
              <Text type="code" size="xs" color="disabled" className="block mb-1 uppercase tracking-tighter text-right opacity-50">Variant: Right Aligned Mask</Text>
              <div className="p-4 border border-stroke-primary bg-surface-bg/50 rounded-lg shadow-2xl overflow-hidden backdrop-blur-md">
                <Text mask maskAlignment="right" size="lg" weight="medium">
                  {testText}
                </Text>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Polymorphism Section */}
      <section className="space-y-8 pt-8">
        <Text type="heading" size="xl" weight="medium" className="block border-b border-stroke-primary pb-4">
          Polymorphic Slots
        </Text>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 bg-surface-secondary/5 rounded-xl border border-stroke-primary/30">
            <Text type="code" size="xs" color="disabled" className="uppercase block mb-4">Native H3 Element</Text>
            <Text asChild size="xxl" weight="bold">
              <h3 className="text-text-info drop-shadow-sm">Heading Level 3</h3>
            </Text>
          </div>
          <div className="p-6 bg-surface-secondary/5 rounded-xl border border-stroke-primary/30">
            <Text type="code" size="xs" color="disabled" className="uppercase block mb-4">Formatted Code Block</Text>
            <Text asChild type="code" size="md" color="warning">
              <pre className="inline-block px-3 py-1 bg-surface-bg border border-stroke-primary rounded shadow-inner">
                const framework = "Antaris";
              </pre>
            </Text>
          </div>
        </div>
      </section>

      <footer className="pt-24 pb-12 text-center border-t border-stroke-primary/10">
        <Text size="xs" color="disabled" weight="light" className="uppercase tracking-[0.4em] opacity-30 italic">
          Antaris Typography Suite • Technical Specification
        </Text>
      </footer>
    </div>
  );
}
