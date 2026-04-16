"use client";

import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";
import type React from "react";
import { cn } from "@/lib/utils";

export function Collapsible({
  className,
  ...props
}: CollapsiblePrimitive.Root.Props): React.ReactElement {
  return <CollapsiblePrimitive.Root data-slot="collapsible"
    className={cn(
      "group w-full max-w-sm rounded-lg border-[0.5px] border-gray-8 bg-surface-primary overflow-hidden",
      className
    )} {...props} />;
}

export function CollapsibleTrigger({
  className,
  title,
  ...props
}: CollapsiblePrimitive.Trigger.Props): React.ReactElement {
  return (
    <CollapsiblePrimitive.Trigger
      className={cn("group cursor-pointer w-full flex items-center justify-between gap-8 text-left py-6 px-10 transition-colors", className)}
      data-slot="collapsible-trigger"
      {...props}
    />
  );
}

export function CollapsiblePanel({
  className,
  ...props
}: CollapsiblePrimitive.Panel.Props): React.ReactElement {
  return (
    <CollapsiblePrimitive.Panel
      className={cn(
        "p-12 h-(--collapsible-panel-height) overflow-hidden transition-[height] duration-200 data-ending-style:h-0 data-starting-style:h-0",
        className,
      )}
      data-slot="collapsible-panel"
      {...props}
    />
  );
}

export { CollapsiblePrimitive, CollapsiblePanel as CollapsibleContent };
