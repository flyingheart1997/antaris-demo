import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { AccordianCaretCloseIcon } from "@/icons"

import { cn } from "@/lib/utils"

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(
      "mb-8 last:mb-0 overflow-hidden",
      className
    )}
    {...props}
  />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> & {
    value?: React.ReactNode
  }
>(({ className, children, value, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center gap-4 py-8 h-34 px-12 text-md font-medium transition-all bg-green-alpha-2 hover:bg-green-alpha-3 text-left [&[data-state=open]>svg]:rotate-90 text-text-primary border border-green-alpha-3 rounded-md",
        className
      )}
      {...props}
    >
      <AccordianCaretCloseIcon className="h-14 w-14 shrink-0 text-icon-secondary transition-transform duration-200" />
      <span className="flex-1">{children}</span>
      {value && <span className="text-text-selected ml-auto">{value}</span>}
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down text-text-secondary"
    {...props}
  >
    <div className={cn("py-8 flex flex-col gap-8", className)}>{children}</div>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
