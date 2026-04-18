/**
 * Antaris Component Documentation Registry
 * ─────────────────────────────────────────
 * Single source of truth for all documented components.
 * Add a new entry here to automatically surface it in the sidebar and index.
 */

export type PropDef = {
  name: string
  type: string
  default: string
  description: string
  required?: boolean
}

export type ComponentVariant = {
  label: string
  description: string
}

export type ComponentDoc = {
  /** URL-friendly slug — must match the /preview/[slug] route */
  slug: string
  name: string
  description: string
  category: ComponentCategory
  /** Short summary shown in the index card */
  summary: string
  /** Ordered list of visual variant descriptions */
  variants: ComponentVariant[]
  /** Props API table */
  props: PropDef[]
  /** Code example shown in the Code tab */
  codeExample: string
  /** Optional badge text, e.g. "New", "Beta" */
  badge?: string
}

export type ComponentCategory =
  | "Forms"
  | "UI"
  | "Layout"
  | "Feedback"

export const COMPONENT_REGISTRY: ComponentDoc[] = [
  // ─── UI ────────────────────────────────────────────────────────────────────
  {
    slug: "button",
    name: "Button",
    category: "UI",
    summary: "Interactive trigger for actions. Supports 5 variants, 5 colors, 4 sizes, and advanced corner animations.",
    description:
      "The Button component is the primary interactive element in the Antaris design system. It ships with 5 visual variants (solid, soft, surface, outline, ghost), 5 semantic color scales, 4 sizes, and 5 radius options. Icons and other content are passed as children.",
    variants: [
      { label: "Solid", description: "High-emphasis, filled background. Use for primary CTAs." },
      { label: "Soft", description: "Low-emphasis tinted background. Good for secondary actions." },
      { label: "Surface", description: "Subtle border with slight tint. Default variant." },
      { label: "Outline", description: "Transparent fill with visible border only." },
      { label: "Ghost", description: "No background or border. Low-profile action." },
    ],
    props: [
      { name: "variant", type: "'solid' | 'soft' | 'surface' | 'outline' | 'ghost'", default: "'surface'", description: "Visual style of the button." },
      { name: "color", type: "'accent' | 'neutral' | 'error' | 'warning' | 'info'", default: "'accent'", description: "Semantic color scale applied to the variant." },
      { name: "size", type: "'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: "Height and padding scale." },
      { name: "radius", type: "'none' | 'md' | 'lg' | 'xl' | 'full'", default: "'md'", description: "Border-radius token." },
      { name: "selected", type: "boolean", default: "false", description: "Sets aria-pressed and data-selected for toggle states." },
      { name: "advanced", type: "boolean", default: "false", description: "Adds animated corner accent borders on hover." },
      { name: "disabled", type: "boolean", default: "false", description: "Disables the button and reduces opacity." },
      { name: "asChild", type: "boolean", default: "false", description: "Renders as Radix Slot — delegates rendering to the child element." },
      { name: "children", type: "React.ReactNode", default: "—", description: "Button label and/or icon(s). Pass icon components directly as children alongside text." },
    ],
    codeExample: `import { Button } from "@/components/ui/button"
import { Mail, ArrowRight, Settings } from "lucide-react"

// Solid accent (primary CTA)
<Button variant="solid" color="accent">
  Get Started
</Button>

// With leading icon — pass icon as first child
<Button variant="soft" color="info">
  <Mail className="size-4" />
  Send Email
</Button>

// With trailing icon — pass icon as last child
<Button variant="outline" color="accent">
  Learn More
  <ArrowRight className="size-4" />
</Button>

// Icon-only ghost button
<Button variant="ghost" color="neutral">
  <Settings className="size-4" />
</Button>

// Disabled state
<Button variant="solid" color="error" disabled>
  Disabled
</Button>`,
  },

  {
    slug: "card",
    name: "Card",
    category: "UI",
    summary: "Content container with 4 sizes, 3 states, stroke border, and selected-state mask overlay.",
    description:
      "Card provides a flexible content container with 4 size scales (1–4), 3 states (default, emphasis, disabled), an optional stroke border, and a Figma-synced selected-state mask with dark-green gradient and glow. Use insetContent for flush edge media.",
    variants: [
      { label: "Sizes 1–4", description: "Four padding/radius scale steps from compact (1) to spacious (4)." },
      { label: "States", description: "default, emphasis, and disabled visual states." },
      { label: "Selected", description: "selected={true} overlays the Figma selection mask — dark green gradient with right-side glow bump." },
      { label: "Inset Content", description: "insetContent={true} removes padding so child media bleeds to card edges." },
    ],
    props: [
      { name: "size", type: "'1' | '2' | '3' | '4'", default: "'3'", description: "Controls padding and border-radius via Antaris spacing tokens." },
      { name: "state", type: "'default' | 'emphasis' | 'disabled'", default: "'default'", description: "Visual state of the card." },
      { name: "stroke", type: "boolean", default: "false", description: "Adds a 1px border using stroke-primary token." },
      { name: "insetContent", type: "boolean", default: "false", description: "Removes padding so children bleed to the card edge (useful for images/maps)." },
      { name: "selected", type: "boolean", default: "false", description: "Overlays the Figma selected-state mask: dark green gradient background, right-side green glow bump." },
    ],
    codeExample: `import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"

<Card size="3" stroke>
  <CardHeader>
    <CardTitle>Mission Alpha</CardTitle>
    <CardDescription>LEO orbit insertion</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Signal acquired. Telemetry nominal.</p>
  </CardContent>
  <CardFooter>
    <span className="text-text-secondary text-xs">Updated 2m ago</span>
  </CardFooter>
</Card>

// Selected state (shows Figma mask)
<Card size="3" stroke selected>
  <CardContent>Selected satellite component</CardContent>
</Card>`,
  },

  {
    slug: "tabs",
    name: "Tabs",
    category: "UI",
    summary: "Segmented navigation control with 2 sizes, focused on a unified high-fidelity design.",
    description:
      "Tabs provide accessible keyboard-navigable tab navigation built on Radix UI Tabs. Features a high-fidelity, CSS-driven design with 2 sizes (md, lg). The size configuration is applied at the root <Tabs> component and propagates automatically to trigger states (hover, active, disabled) using CSS variables and group modifiers.",
    variants: [
      { label: "Size md", description: "Default compact size with 32px height and refined spacing." },
      { label: "Size lg", description: "Prominent size with 40px height and standard padding." },
    ],
    props: [
      { name: "size (Tabs)", type: "'md' | 'lg'", default: "'md'", description: "Unified size scale for the entire tab system." },
      { name: "defaultValue (Tabs)", type: "string", default: "—", description: "Initially selected tab value." },
      { name: "value (Tabs)", type: "string", default: "—", description: "Controlled selected value." },
      { name: "onValueChange (Tabs)", type: "(value: string) => void", default: "—", description: "Callback when selected tab changes." },
      { name: "disabled (TabsTrigger)", type: "boolean", default: "false", description: "Disables the individual tab trigger." },
      { name: "title (TabTriggerText)", type: "string", default: "—", description: "Tooltip content revealed on hover." },
      { name: "side (TooltipPosition)", type: "'top' | 'bottom' | 'left' | 'right'", default: "'bottom'", description: "Side the tooltip appears on." },
    ],
    codeExample: `  TabsList,
  TabsTrigger,
  TabTriggerText,
  TabsContent,
} from "@/components/ui/tabs"
import { LayoutDashboard } from "lucide-react"

<Tabs defaultValue="overview" size="md">
  <TabsList>
    <TabsTrigger value="overview">
      <TabTriggerText title="System Overview">
        <LayoutDashboard size={14} className="mr-s-2" />
        Overview
      </TabTriggerText>
    </TabsTrigger>
    <TabsTrigger value="analytics">
      <TabTriggerText title="Usage Analytics">
        Analytics
      </TabTriggerText>
    </TabsTrigger>
    <TabsTrigger value="settings" disabled>
       Settings
    </TabsTrigger>
  </TabsList>

  <TabsContent value="overview">
    <p>Overview content here.</p>
  </TabsContent>
  <TabsContent value="analytics">
    <p>Analytics content here.</p>
  </TabsContent>
</Tabs>`,
  },

  {
    slug: "badge",
    name: "Badge",
    category: "UI",
    summary: "Compact label with 4 variants, 6 semantic colors, 3 sizes.",
    description:
      "Badge provides a compact inline label for status, category, or count information. Ships with 4 variants (solid, soft, surface, outline) × 6 semantic colors (accent, neutral, success, warning, error, info) × 3 sizes. Accepts icons or any content as children.",
    variants: [
      { label: "Solid", description: "Filled background — highest emphasis." },
      { label: "Soft", description: "Subtle tinted background — default." },
      { label: "Surface", description: "Tinted with visible border." },
      { label: "Outline", description: "Transparent fill, border only." },
    ],
    props: [
      { name: "variant", type: "'solid' | 'soft' | 'surface' | 'outline'", default: "'soft'", description: "Visual style of the badge." },
      { name: "color", type: "'accent' | 'neutral' | 'success' | 'warning' | 'error' | 'info'", default: "'accent'", description: "Semantic color applied to the variant." },
      { name: "size", type: "'sm' | 'md' | 'lg'", default: "'md'", description: "Height and padding scale." },
      { name: "asChild", type: "boolean", default: "false", description: "Render as a Radix Slot child element." },
      { name: "children", type: "React.ReactNode", default: "—", description: "Badge label text and/or icon(s). Pass icons alongside text as children." },
    ],
    codeExample: `import { Badge } from "@/components/ui/badge"
import { CheckCircle2, AlertCircle } from "lucide-react"

// Status badges
<Badge variant="soft" color="success">Active</Badge>
<Badge variant="surface" color="error">Failed</Badge>
<Badge variant="solid" color="warning" size="lg">Pending</Badge>

// With icon as child
<Badge variant="soft" color="success">
  <CheckCircle2 size={10} />
  Verified
</Badge>

// Error with icon
<Badge variant="surface" color="error">
  <AlertCircle size={10} />
  Critical
</Badge>`,
    badge: "New",
  },

  {
    slug: "avatar",
    name: "Avatar",
    category: "UI",
    summary: "User avatar with image, initials fallback, 5 color variants, 6 sizes, and status indicator.",
    description:
      "Avatar renders a user/entity icon using an image (AvatarImage) with an initials fallback (AvatarFallback). Supports 5 color themes, 6 size steps (1–6), and an optional AvatarIndicator for online/offline status dots.",
    variants: [
      { label: "Image", description: "AvatarImage loads the src; falls back to initials if image fails." },
      { label: "Fallback Initials", description: "Shows 1–2 letter initials in the chosen color." },
      { label: "With Indicator", description: "AvatarIndicator adds a colored status dot at a corner position." },
    ],
    props: [
      { name: "size", type: "'1' | '2' | '3' | '4' | '5' | '6'", default: "'2'", description: "Size step from smallest (1) to largest (6)." },
      { name: "color", type: "'green' | 'blue' | 'yellow' | 'white' | 'red'", default: "'blue'", description: "Background color for the fallback initials." },
      { name: "title", type: "string", default: "—", description: "Tooltip content revealed on hover." },
      { name: "side", type: "'top' | 'bottom' | 'left' | 'right'", default: "'top'", description: "Side the tooltip appears on." },
      { name: "src (AvatarImage)", type: "string", default: "—", description: "Image URL for the avatar." },
      { name: "size (AvatarFallback)", type: "'1' | '2' | '3' | '4' | '5' | '6'", default: "'2'", description: "Must match the parent Avatar size." },
      { name: "color (AvatarIndicator)", type: "'green' | 'blue' | 'yellow' | 'white' | 'red'", default: "'green'", description: "Status dot color." },
      { name: "position (AvatarIndicator)", type: "'top-right' | 'bottom-right'", default: "'bottom-right'", description: "Corner placement of the status indicator." },
      { name: "size (AvatarIndicator)", type: "'1' | '2' | '3' | '4' | '5' | '6'", default: "—", description: "Controls the indicator dot size." },
    ],
    codeExample: `import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarIndicator,
} from "@/components/ui/avatar"

// Image with fallback
<Avatar size="4">
  <AvatarImage src="/avatars/user.jpg" alt="User" />
  <AvatarFallback size="4" color="green">JD</AvatarFallback>
</Avatar>

// Initials only
<Avatar size="4" color="blue">
  <AvatarFallback size="4">AB</AvatarFallback>
</Avatar>

// With online status indicator
<Avatar size="4" color="blue">
  <AvatarFallback size="4">AB</AvatarFallback>
  <AvatarIndicator color="green" size="4" position="bottom-right" />
</Avatar>`,
    badge: "New",
  },

  {
    slug: "tooltip",
    name: "Tooltip",
    category: "UI",
    summary: "Floating tooltip with side, alignment, arrow, and delay controls.",
    description:
      "Tooltip is built on Radix UI Tooltip with Antaris surface tokens. The unified Tooltip component handles trigger and content internally via props. Wrap your app in TooltipProvider (already in AllProviders). Use CustomTooltip for full compositional control.",
    variants: [
      { label: "Side & Align", description: "Control position with side (top, bottom, left, right) and align (start, center, end)." },
      { label: "Arrow", description: "All tooltips show an arrow by default. Use showArrow={false} to hide." },
      { label: "Visibility", description: "Use hidden to programmatically suppress the tooltip (useful in sidebars)." },
    ],
    props: [
      { name: "children", type: "React.ReactNode", default: "—", description: "The trigger element that the tooltip anchors to.", required: true },
      { name: "content", type: "React.ReactNode | string", default: "—", description: "Content displayed inside the tooltip." },
      { name: "side", type: "'top' | 'bottom' | 'left' | 'right'", default: "'top'", description: "Side the tooltip appears on relative to the trigger." },
      { name: "align", type: "'start' | 'center' | 'end'", default: "'center'", description: "Alignment of the tooltip relative to the trigger." },
      { name: "hidden", type: "boolean", default: "false", description: "Hides the tooltip — useful for conditionally disabling it." },
      { name: "showArrow", type: "boolean", default: "true", description: "Whether to show the directional arrow." },
      { name: "contentClassName", type: "string", default: "—", description: "Additional className for the tooltip content." },
      { name: "delayDuration", type: "number", default: "200", description: "Hover delay in milliseconds before showing." },
      { name: "sideOffset", type: "number", default: "6", description: "Gap in pixels between trigger and tooltip." },
    ],
    codeExample: `import { Tooltip } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { Settings } from "lucide-react"

// Basic tooltip
<Tooltip content="Open settings" side="top">
  <Button variant="ghost" color="neutral">
    <Settings size={16} />
  </Button>
</Tooltip>

// Left side, no arrow
<Tooltip content="Delete this item" side="left" showArrow={false}>
  <Button variant="soft" color="error">Delete</Button>
</Tooltip>

// Custom delay
<Tooltip content="Satellite ID: ATMS-001" delayDuration={500}>
  <span className="text-text-secondary cursor-help">ATMS-001</span>
</Tooltip>`,
    badge: "New",
  },

  {
    slug: "icon-button",
    name: "IconButton",
    category: "UI",
    summary: "Square icon-only button with 5 variants, 5 colors, 4 sizes, and radius control.",
    description:
      "IconButton is a square button designed to contain a single icon. Shares the same variant/color/size system as Button but is always square. The radius prop exposes circular shapes. Pass the icon as a child.",
    variants: [
      { label: "Solid", description: "Filled background — highest emphasis." },
      { label: "Soft", description: "Tinted background." },
      { label: "Surface", description: "Outlined with subtle fill — default." },
      { label: "Outline", description: "Transparent fill, border only." },
      { label: "Ghost", description: "No background or border — lowest emphasis." },
    ],
    props: [
      { name: "variant", type: "'solid' | 'soft' | 'surface' | 'outline' | 'ghost'", default: "'surface'", description: "Visual style." },
      { name: "color", type: "'accent' | 'neutral' | 'error' | 'warning' | 'info'", default: "'accent'", description: "Semantic color scale." },
      { name: "size", type: "'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: "Square dimensions (sm=24px, md=32px, lg=40px, xl=48px)." },
      { name: "radius", type: "'none' | 'md' | 'lg' | 'xl' | 'full'", default: "'md'", description: "Border-radius token. Use 'full' for circular." },
      { name: "selected", type: "boolean", default: "false", description: "Toggle selection state via aria-pressed." },
      { name: "advanced", type: "boolean", default: "false", description: "Adds animated corner accent borders on hover." },
      { name: "disabled", type: "boolean", default: "false", description: "Disables the button." },
      { name: "asChild", type: "boolean", default: "false", description: "Render as Radix Slot child." },
      { name: "children", type: "React.ReactNode", default: "—", description: "The icon to display. Pass a Lucide or custom icon component." },
    ],
    codeExample: `import { IconButton } from "@/components/ui/icon-button"
import { Plus, Trash2, Settings, X } from "lucide-react"

// Solid accent
<IconButton variant="solid" color="accent">
  <Plus size={16} />
</IconButton>

// Soft error (delete action)
<IconButton variant="soft" color="error">
  <Trash2 size={16} />
</IconButton>

// Ghost neutral circular
<IconButton variant="ghost" color="neutral" radius="full">
  <Settings size={16} />
</IconButton>

// Close button (common pattern)
<IconButton variant="ghost" color="neutral" size="sm">
  <X size={14} />
</IconButton>`,
    badge: "New",
  },

  {
    slug: "accordion",
    name: "Accordion",
    category: "UI",
    summary: "Collapsible accordion with single or multiple open items — built on Radix UI.",
    description:
      "Accordion provides expandable/collapsible content sections. Use type='single' for one-at-a-time behavior (optionally collapsible) or type='multiple' to allow multiple open items simultaneously. AccordionTrigger accepts an optional value node rendered on the right side.",
    variants: [
      { label: "Single Collapsible", description: "Only one item open at a time; clicking the open item closes it." },
      { label: "Multiple", description: "Multiple items can be open simultaneously." },
    ],
    props: [
      { name: "type", type: "'single' | 'multiple'", default: "—", description: "Allow single or multiple open items.", required: true },
      { name: "collapsible (type=single)", type: "boolean", default: "false", description: "Allow closing the open item by clicking its trigger again." },
      { name: "defaultValue", type: "string | string[]", default: "—", description: "Initially open item(s)." },
      { name: "value", type: "string | string[]", default: "—", description: "Controlled open state." },
      { name: "onValueChange", type: "(value: string | string[]) => void", default: "—", description: "Callback on open state change." },
      { name: "value (AccordionTrigger)", type: "React.ReactNode", default: "—", description: "Optional node rendered on the right side of the trigger header (e.g. a badge or stat)." },
    ],
    codeExample: `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>What is Antaris?</AccordionTrigger>
    <AccordionContent>
      Antaris is a satellite operations platform.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger value={<span className="text-text-disabled text-xs">3 items</span>}>
      Mission Details
    </AccordionTrigger>
    <AccordionContent>
      Full mission telemetry and configuration.
    </AccordionContent>
  </AccordionItem>
</Accordion>`,
    badge: "New",
  },

  {
    slug: "drawer",
    name: "Drawer",
    category: "UI",
    summary: "Collapsible sidebar navigation drawer with icon items, tooltips, and chevron toggle.",
    description:
      "The Drawer component is a vertical sidebar icon drawer — a collapsible strip of icon navigation buttons. It follows a Root-Prop pattern where active state is controlled at the top level. Built on Collapsible with a specialized CSS-driven active highlight. Use DrawerTrigger for main category buttons and DrawerItem for sub-navigation.",
    variants: [
      { label: "Collapsed", description: "Only the toggle chevron is visible. Items are hidden." },
      { label: "Expanded", description: "DrawerContainer reveals all DrawerItem icon buttons." },
      { label: "Active Selection", description: "Root active={true} highlights the entire drawer category with Antaris selection tokens." },
    ],
    props: [
      { name: "active (Drawer)", type: "boolean", default: "false", description: "Active logical state based on current navigation category." },
      { name: "open (Drawer)", type: "boolean", default: "—", description: "Controlled open/closed state of the collapsible panel." },
      { name: "onOpenChange (Drawer)", type: "(open: boolean) => void", default: "—", description: "Callback triggered when the drawer is toggled via chevron or trigger." },
      { name: "title (DrawerTrigger)", type: "string", default: "—", description: "Tooltip text shown on the right side of the trigger." },
      { name: "active (DrawerItem)", type: "boolean", default: "false", description: "Highlights the individual sub-navigation item." },
      { name: "title (DrawerItem)", type: "string", default: "—", description: "Tooltip label shown on hover (required).", required: true },
    ],
    codeExample: `import {
  Drawer,
  DrawerTrigger,
  DrawerContainer,
  DrawerItem,
} from "@/components/ui/drawer"
import { Satellite, Globe, Settings } from "lucide-react"

<Drawer active={isSatellitesActive} open={isOpen} onOpenChange={setOpen}>
  <DrawerTrigger title="Navigation" onClick={() => switchDrawer('satellites')}>
    <Satellite />
  </DrawerTrigger>
  <DrawerContainer>
    <DrawerItem title="Active Mission" active>
      <Satellite />
    </DrawerItem>
    <DrawerItem title="Global Constellation">
      <Globe />
    </DrawerItem>
    <DrawerItem title="System Settings">
      <Settings />
    </DrawerItem>
  </DrawerContainer>
</Drawer>`,
  },

  {
    slug: "custom-text",
    name: "Text",
    category: "UI",
    summary: "Typography component with font type, full size scale, weights, semantic colors, caps, and mask-reveal.",
    description:
      "The Text component provides a unified API over the Antaris typography scale. Supports font type (heading/body/code), 7 sizes (xs–xxxl), 5 weights including italic, 8 semantic colors, caps transform, and an optional mask-reveal animation for truncated text on hover. Renders as a <span> by default.",
    variants: [
      { label: "Font Types", description: "heading (Space Grotesk), body (Montserrat), code (Fira Mono)." },
      { label: "Font Sizes", description: "xs, sm, md, lg, xl, xxl, xxxl — each with matching line-height and tracking tokens." },
      { label: "Weights", description: "light, regular, medium, bold, italic." },
      { label: "Semantic Colors", description: "primary, secondary, disabled, selected, focus, info, warning, error." },
      { label: "Mask Reveal", description: "mask={true} on truncated text shows a fade-out effect; hover scrolls the text then snaps back." },
    ],
    props: [
      { name: "type", type: "'heading' | 'body' | 'code'", default: "'body'", description: "Font family: heading = Space Grotesk, body = Montserrat, code = Fira Mono." },
      { name: "size", type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl'", default: "'md'", description: "Font size with matching line-height and letter-spacing tokens." },
      { name: "weight", type: "'light' | 'regular' | 'medium' | 'bold' | 'italic'", default: "'regular'", description: "Font weight. 'italic' also applies italic style." },
      { name: "color", type: "'primary' | 'secondary' | 'disabled' | 'selected' | 'focus' | 'info' | 'warning' | 'error'", default: "'primary'", description: "Semantic text color token." },
      { name: "capsOn", type: "boolean", default: "false", description: "Applies uppercase transform." },
      { name: "mask", type: "boolean", default: "false", description: "Adds fade-out mask on truncated text; hover reveals full text via scroll animation." },
      { name: "maskAlignment", type: "'left' | 'center' | 'right' | 'top' | 'bottom'", default: "'left'", description: "Side the fade gradient appears on for the mask effect." },
      { name: "asChild", type: "boolean", default: "false", description: "Renders as the Radix Slot child." },
    ],
    codeExample: `import { Text } from "@/components/ui/text"

// Heading with bold weight
<Text type="heading" size="xxxl" weight="bold">
  Mission Control
</Text>

// Body text with semantic color
<Text size="lg" weight="medium" color="secondary">
  Satellite telemetry nominal
</Text>

// Code block styling
<Text type="code" size="sm" color="info">
  atmos.mission.status = "nominal"
</Text>

// Caps + disabled
<Text size="xs" weight="bold" capsOn color="disabled">
  Last Updated
</Text>

// Mask reveal for truncated sidebar labels
<Text size="md" mask maskAlignment="left" className="w-40">
  Very long satellite component name that overflows
</Text>`,
  },

  // ─── Forms ──────────────────────────────────────────────────────────────────
  {
    slug: "input",
    name: "Input",
    category: "Forms",
    summary: "Standard text input with surface/solid variants, 2 sizes, and automatic error state.",
    description:
      "The Input component is a low-level primitive for capturing text data. It automatically handles visual states like error (red ring) when aria-invalid is true or when contained within an invalid Field. Best used inside a Field component for labels and descriptions.",
    variants: [
      { label: "Surface", description: "Outlined style with subtle background tint." },
      { label: "Solid", description: "Filled style — uses solid gray background. Default." },
      { label: "Sizes", description: "md (32px height) and lg (40px height)." },
    ],
    props: [
      { name: "variant", type: "'surface' | 'solid'", default: "'solid'", description: "Visual style of the input." },
      { name: "size", type: "'md' | 'lg'", default: "'lg'", description: "Controls height and padding." },
      { name: "disabled", type: "boolean", default: "false", description: "Disables interaction and dims the input." },
      { name: "readOnly", type: "boolean", default: "false", description: "Prevents editing while maintaining focusability." },
      { name: "aria-invalid", type: "boolean | 'grammar' | 'spelling'", default: "false", description: "Triggers error state styling (red border and ring)." },
    ],
    codeExample: `import { Input } from "@/components/ui/input"
import { Field, FieldLabel, FieldInput, FieldDescription, FieldError } from "@/components/ui/field"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Search } from "lucide-react"

// Recommended: inside a Field
<Field>
  <FieldLabel htmlFor="username">Username</FieldLabel>
  <FieldInput id="username" placeholder="Type something..." />
  <FieldDescription>Alpha-numeric only.</FieldDescription>
</Field>

// With InputGroup for icons/addons
<Field>
  <FieldLabel htmlFor="search">Search</FieldLabel>
  <InputGroup>
    <InputGroupAddon>
      <Search size={14} />
    </InputGroupAddon>
    <InputGroupInput id="search" placeholder="Search satellites..." />
  </InputGroup>
</Field>

// Standalone
<Input placeholder="Quick search..." />`,
  },

  {
    slug: "checkbox",
    name: "Checkbox",
    category: "Forms",
    summary: "Binary and indeterminate selection control with surface and solid variants.",
    description:
      "Checkbox is built on Radix UI Checkbox and supports two visual variants (surface, solid). It uses a unified label prop for both text strings and complex React nodes. Supports indeterminate state for parent checkboxes in a hierarchy.",
    variants: [
      { label: "Surface", description: "Outlined checkbox, subtle fill on checked state. Default." },
      { label: "Solid", description: "Filled background on checked state — higher emphasis." },
      { label: "Indeterminate", description: "Mixed state for parent checkboxes in a tree." },
    ],
    props: [
      { name: "variant", type: "'surface' | 'solid'", default: "'surface'", description: "Visual style of the checkbox." },
      { name: "label", type: "string | number | React.ReactNode", default: "—", description: "Label content rendered beside the checkbox." },
      { name: "checked", type: "boolean | 'indeterminate'", default: "false", description: "Controlled checked state." },
      { name: "defaultChecked", type: "boolean", default: "false", description: "Uncontrolled initial state." },
      { name: "disabled", type: "boolean", default: "false", description: "Disables interaction." },
      { name: "onCheckedChange", type: "(checked: boolean | 'indeterminate') => void", default: "—", description: "Callback on state change." },
    ],
    codeExample: `import { Checkbox } from "@/components/ui/checkbox"

// Basic with label
<Checkbox variant="surface" label="Accept terms" />

// Controlled
<Checkbox
  variant="solid"
  label="Enable Protocol"
  checked={enabled}
  onCheckedChange={setEnabled}
/>

// Indeterminate (parent of a group)
<Checkbox
  checked="indeterminate"
  label="Select all"
/>

// No label (icon-only)
<Checkbox variant="surface" />`,
  },

  {
    slug: "radio",
    name: "Radio",
    category: "Forms",
    summary: "Single-selection radio group with surface and solid variants.",
    description:
      "RadioGroup and RadioGroupItem are built on Radix UI RadioGroup. Supports surface and solid visual variants, disabled state, and a simplified label prop for each item.",
    variants: [
      { label: "Surface", description: "Outlined radio indicator with subtle fill. Default." },
      { label: "Solid", description: "Filled indicator on selection — higher emphasis." },
    ],
    props: [
      { name: "variant (RadioGroupItem)", type: "'surface' | 'solid'", default: "'surface'", description: "Visual style applied to each RadioGroupItem." },
      { name: "value (RadioGroupItem)", type: "string", default: "—", description: "Value of this radio item.", required: true },
      { name: "label (RadioGroupItem)", type: "string | number | React.ReactNode", default: "—", description: "Label content for the radio item." },
      { name: "disabled (RadioGroupItem)", type: "boolean", default: "false", description: "Disables this radio item." },
      { name: "defaultValue (RadioGroup)", type: "string", default: "—", description: "Pre-selected value (uncontrolled)." },
      { name: "value (RadioGroup)", type: "string", default: "—", description: "Controlled selected value." },
      { name: "onValueChange (RadioGroup)", type: "(value: string) => void", default: "—", description: "Callback with the selected value." },
    ],
    codeExample: `import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

<RadioGroup defaultValue="option-a">
  <RadioGroupItem value="option-a" label="Option A" />
  <RadioGroupItem value="option-b" label="Option B" />
  <RadioGroupItem value="option-c" label="Disabled" disabled />
</RadioGroup>

// Icon-only (no label)
<RadioGroup defaultValue="1">
  <RadioGroupItem value="1" />
  <RadioGroupItem value="2" />
</RadioGroup>`,
  },

  {
    slug: "select",
    name: "Select",
    category: "Forms",
    summary: "Dropdown select with surface/solid variants, sizes, and readonly state on root.",
    description:
      "Select is built on Radix UI Select. It utilizes a Root-Prop pattern where all aesthetic configuration (variant, color, size, readOnly) is managed on the root <Select> component. This state automatically propagates to the trigger and dropdown content via internal cloning, ensuring perfect synchronization.",
    variants: [
      { label: "Surface", description: "Default — outlined trigger with hover background." },
      { label: "Solid", description: "Filled trigger background." },
      { label: "Grouped Options", description: "SelectGroup + SelectLabel for categorized option lists." },
      { label: "ReadOnly", description: "Sets the entire select control to a non-editable visual state." },
    ],
    props: [
      { name: "variant (Select)", type: "'surface' | 'solid' | 'neutral'", default: "'surface'", description: "Visual style of the trigger." },
      { name: "color (Select)", type: "'primary' | 'error'", default: "'primary'", description: "Semantic color intent." },
      { name: "size (Select)", type: "'md' | 'lg'", default: "'md'", description: "Height scale." },
      { name: "readOnly (Select)", type: "boolean", default: "false", description: "Disables interaction but preserves visual style." },
      { name: "disabled (SelectTrigger)", type: "boolean", default: "false", description: "Standard disabled state." },
      { name: "placeholder (SelectValue)", type: "string", default: "—", description: "Text displayed when no value is selected." },
    ],
    codeExample: `import {
  Select, SelectContent, SelectGroup,
  SelectItem, SelectLabel, SelectTrigger, SelectValue, SelectItemText
} from "@/components/ui/select"
import { Globe } from "lucide-react"

<Select variant="surface" size="lg" color="primary">
  <SelectTrigger>
    <Globe size={14} className="mr-6" />
    <SelectValue placeholder="Select region" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>Americas</SelectLabel>
      <SelectItem value="us">United States</SelectItem>
      <SelectItem value="ca">Canada</SelectItem>
    </SelectGroup>
    <SelectGroup>
      <SelectLabel>Europe</SelectLabel>
      <SelectItem value="de">Germany</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>`,
    badge: "New",
  },

  {
    slug: "textarea",
    name: "Textarea",
    category: "Forms",
    summary: "Multi-line text input with surface/solid variants and full error/disabled state support.",
    description:
      "Textarea provides the same variant and state system as Input, but for multi-line content. Supports surface and solid variants and automatically reacts to disabled/read-only/invalid states. Best used inside a Field with FieldArea.",
    variants: [
      { label: "Surface", description: "Outlined style." },
      { label: "Solid", description: "Solid background style. Default." },
    ],
    props: [
      { name: "variant", type: "'surface' | 'solid'", default: "'solid'", description: "Visual style." },
      { name: "disabled", type: "boolean", default: "false", description: "Disables interaction." },
      { name: "readOnly", type: "boolean", default: "false", description: "Prevents editing while maintaining focusability." },
      { name: "rows", type: "number", default: "—", description: "Number of visible rows." },
      { name: "aria-invalid", type: "boolean", default: "false", description: "Triggers error state styling." },
    ],
    codeExample: `import { Textarea } from "@/components/ui/textarea"
import { Field, FieldLabel, FieldArea, FieldDescription } from "@/components/ui/field"

// Recommended: inside a Field using FieldArea
<Field>
  <FieldLabel htmlFor="bio">Mission Notes</FieldLabel>
  <FieldArea id="bio" placeholder="Describe the mission..." rows={4} />
  <FieldDescription>Maximum 500 characters.</FieldDescription>
</Field>

// Standalone
<Textarea placeholder="Quick notes..." rows={3} />`,
    badge: "New",
  },


  {
    slug: "input-range",
    name: "Input Range",
    category: "Forms",
    summary: "Compound min/max range input with unit labels, limit indicators, and controlled value support.",
    description:
      "InputRange provides a synchronized pair of inputs for capturing a range of values (e.g. altitude min/max). Supports units appended inside both inputs, sub-labels, limit indicators below each input, controlled values, and shares the InputGroup variant/size system.",
    variants: [
      { label: "Standard", description: "Two inputs with a separator dash." },
      { label: "With Units", description: "Unit appended inside each input (e.g. m, kg, ms)." },
      { label: "With Limits", description: "Sub-labels and limit values shown below each input." },
    ],
    props: [
      { name: "maxPlaceholder", type: "string", default: "—", description: "Placeholder text for the max input." },
      { name: "minValue", type: "string", default: "—", description: "Controlled value for the min input." },
      { name: "maxValue", type: "string", default: "—", description: "Controlled value for the max input." },
      { name: "onMinChange", type: "(e: React.ChangeEvent<HTMLInputElement>) => void", default: "—", description: "Change handler for the min input." },
      { name: "onMaxChange", type: "(e: React.ChangeEvent<HTMLInputElement>) => void", default: "—", description: "Change handler for the max input." },
      { name: "unit", type: "string", default: "—", description: "Unit label appended inside both inputs." },
      { name: "minLabel", type: "string", default: "—", description: "Sub-label shown below the min input." },
      { name: "maxLabel", type: "string", default: "—", description: "Sub-label shown below the max input." },
      { name: "minLimit", type: "string | number", default: "—", description: "Limit value shown below the min input." },
      { name: "maxLimit", type: "string | number", default: "—", description: "Limit value shown below the max input." },
      { name: "variant", type: "'surface' | 'solid'", default: "'solid'", description: "Visual style of the InputGroup containers." },
      { name: "size", type: "'md' | 'lg'", default: "'lg'", description: "Height of the input containers." },
    ],
    codeExample: `import { InputRange } from "@/components/ui/input-range"

// Basic range
<InputRange
  minPlaceholder="Min"
  maxPlaceholder="Max"
/>

// With unit and labels
<InputRange
  unit="m"
  minPlaceholder="0"
  maxPlaceholder="1000"
  minLabel="Min altitude"
  maxLabel="Max altitude"
  minLimit={0}
  maxLimit={2000}
/>

// Controlled
<InputRange
  minValue={minAlt}
  maxValue={maxAlt}
  onMinChange={(e) => setMinAlt(e.target.value)}
  onMaxChange={(e) => setMaxAlt(e.target.value)}
  unit="km"
/>`,
    badge: "New",
  },

  // ─── Layout ─────────────────────────────────────────────────────────────────
  {
    slug: "separator-test",
    name: "Separator",
    category: "Layout",
    summary: "Horizontal or vertical visual divider using stroke-primary design token.",
    description:
      "Separator renders a thin dividing line using the stroke-primary design token. Supports horizontal and vertical orientations and is fully accessible via role='separator'.",
    variants: [
      { label: "Horizontal", description: "Default — full-width divider between stacked content." },
      { label: "Vertical", description: "orientation='vertical' for inline or side-by-side content." },
    ],
    props: [
      { name: "orientation", type: "'horizontal' | 'vertical'", default: "'horizontal'", description: "Direction of the separator line." },
      { name: "decorative", type: "boolean", default: "true", description: "When true, hides from assistive technologies." },
      { name: "className", type: "string", default: "—", description: "Additional Tailwind classes for custom width/height." },
    ],
    codeExample: `import { Separator } from "@/components/ui/separator"

// Horizontal (default)
<div className="space-y-16">
  <p>Section One</p>
  <Separator />
  <p>Section Two</p>
</div>

// Vertical
<div className="flex items-center gap-16 h-32">
  <span>Left</span>
  <Separator orientation="vertical" />
  <span>Right</span>
</div>`,
  },

  {
    slug: "sidebar-test",
    name: "Sidebar",
    category: "Layout",
    summary: "Full navigation sidebar shell with collapsible mode, groups, keyboard shortcut, and mobile sheet.",
    description:
      "The Sidebar system is a comprehensive set of composable primitives. It supports icon-collapse mode (collapsible='icon'), mobile sheet fallback, and ⌘B keyboard shortcut toggle. SidebarProvider must wrap the entire layout.",
    variants: [
      { label: "Expanded", description: "Full-width sidebar showing labels alongside icons." },
      { label: "Collapsed (icon)", description: "Narrow icon-only strip with tooltips on hover." },
      { label: "Mobile Sheet", description: "Slides in as a sheet on small viewports automatically." },
    ],
    props: [
      { name: "collapsible (Sidebar)", type: "'offcanvas' | 'icon' | 'none'", default: "'offcanvas'", description: "Collapse behavior." },
      { name: "variant (Sidebar)", type: "'sidebar' | 'floating' | 'inset'", default: "'sidebar'", description: "Layout variant affecting border/shadow treatment." },
      { name: "side (Sidebar)", type: "'left' | 'right'", default: "'left'", description: "Which side the sidebar attaches to." },
      { name: "defaultOpen (SidebarProvider)", type: "boolean", default: "true", description: "Initial expanded state." },
      { name: "open (SidebarProvider)", type: "boolean", default: "—", description: "Controlled open state." },
      { name: "onOpenChange (SidebarProvider)", type: "(open: boolean) => void", default: "—", description: "Callback on open state change." },
    ],
    codeExample: `import {
  SidebarProvider, Sidebar,
  SidebarHeader, SidebarContent,
  SidebarGroup, SidebarGroupLabel,
  SidebarMenu, SidebarMenuItem,
  SidebarMenuButton, SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar"
import { Home, Settings } from "lucide-react"

<SidebarProvider>
  <Sidebar collapsible="icon">
    <SidebarHeader>
      <span className="font-bold">Antaris</span>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Navigation</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton isActive tooltip="Home">
              <Home /> <span>Home</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Settings">
              <Settings /> <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
  <SidebarInset>
    <SidebarTrigger />
    {/* main content */}
  </SidebarInset>
</SidebarProvider>`,
  },

  {
    slug: "resizable",
    name: "Resizable",
    category: "Layout",
    summary: "Draggable panel groups with horizontal and vertical resize handles.",
    description:
      "Resizable provides a drag-to-resize panel layout built on react-resizable-panels. ResizablePanelGroup sets the direction. ResizablePanel defines each section. ResizableHandle renders the draggable divider — withHandle adds a visible grip icon.",
    variants: [
      { label: "Horizontal", description: "Side-by-side panels with vertical drag handle." },
      { label: "Vertical", description: "Stacked panels with horizontal drag handle." },
      { label: "With Handle", description: "withHandle={true} adds a visual grip icon to the divider." },
    ],
    props: [
      { name: "direction (ResizablePanelGroup)", type: "'horizontal' | 'vertical'", default: "'horizontal'", description: "Resize direction.", required: true },
      { name: "className (ResizablePanelGroup)", type: "string", default: "—", description: "Additional classes for the group container." },
      { name: "defaultSize (ResizablePanel)", type: "number", default: "—", description: "Initial size as a percentage (0–100)." },
      { name: "minSize (ResizablePanel)", type: "number", default: "—", description: "Minimum size as a percentage." },
      { name: "withHandle (ResizableHandle)", type: "boolean", default: "false", description: "Renders a visible grip icon in the handle." },
    ],
    codeExample: `import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable"

<ResizablePanelGroup direction="horizontal" className="h-96 rounded-lg border border-stroke-primary">
  <ResizablePanel defaultSize={40} minSize={20}>
    <div className="p-20">
      <p>Navigation Panel</p>
    </div>
  </ResizablePanel>
  <ResizableHandle withHandle />
  <ResizablePanel defaultSize={60}>
    <div className="p-20">
      <p>Main Content</p>
    </div>
  </ResizablePanel>
</ResizablePanelGroup>`,
    badge: "New",
  },

  {
    slug: "scroll-area",
    name: "Scroll Area",
    category: "Layout",
    summary: "Custom styled scroll container with hidden native scrollbar and Antaris scrollbar design.",
    description:
      "ScrollArea provides a cross-browser consistent scroll container with a custom-styled scrollbar using Antaris design tokens. Built on Radix UI ScrollArea. ScrollBar is the customizable scrollbar component with vertical/horizontal orientation.",
    variants: [
      { label: "Vertical", description: "Default — vertical scroll with custom right-side scrollbar." },
      { label: "Horizontal", description: "orientation='horizontal' for wide content scrolling." },
    ],
    props: [
      { name: "className (ScrollArea)", type: "string", default: "—", description: "Controls size and position of the scroll container." },
      { name: "orientation (ScrollBar)", type: "'vertical' | 'horizontal'", default: "'vertical'", description: "Scrollbar orientation." },
    ],
    codeExample: `import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

// Vertical scroll
<ScrollArea className="h-72 rounded-md border border-stroke-primary p-16">
  {Array.from({ length: 20 }).map((_, i) => (
    <div key={i} className="py-8 border-b border-stroke-primary text-text-secondary text-sm">
      Satellite Component {i + 1}
    </div>
  ))}
</ScrollArea>

// Horizontal scroll
<ScrollArea className="w-full whitespace-nowrap rounded-md border border-stroke-primary">
  <div className="flex gap-16 p-16">
    {satellites.map((s) => <SatelliteCard key={s.id} satellite={s} />)}
  </div>
  <ScrollBar orientation="horizontal" />
</ScrollArea>`,
    badge: "New",
  },

  {
    slug: "table",
    name: "Table",
    category: "Layout",
    summary: "Semantic HTML table with Antaris token-based styling for headers, rows, and cells.",
    description:
      "Table provides a complete set of semantic HTML table primitives (Table, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, TableCaption) styled with Antaris design tokens. The outer Table wrapper includes horizontal scroll for overflow handling.",
    variants: [
      { label: "Basic", description: "Standard data table with header row and body rows." },
      { label: "With Footer", description: "TableFooter for totals, summaries, or action rows." },
      { label: "With Caption", description: "TableCaption for accessible table descriptions." },
    ],
    props: [
      { name: "className (Table)", type: "string", default: "—", description: "Additional classes for the table element." },
      { name: "className (TableHead)", type: "string", default: "—", description: "Additional classes for header cells." },
      { name: "className (TableCell)", type: "string", default: "—", description: "Additional classes for data cells." },
      { name: "className (TableRow)", type: "string", default: "—", description: "Additional classes for table rows." },
    ],
    codeExample: `import {
  Table, TableBody, TableCaption, TableCell,
  TableFooter, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"

<Table>
  <TableCaption>Active satellite components</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Type</TableHead>
      <TableHead>Status</TableHead>
      <TableHead className="text-right">Mass (kg)</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>ADCS Module</TableCell>
      <TableCell>Attitude Control</TableCell>
      <TableCell>Active</TableCell>
      <TableCell className="text-right">2.4</TableCell>
    </TableRow>
  </TableBody>
  <TableFooter>
    <TableRow>
      <TableCell colSpan={3}>Total</TableCell>
      <TableCell className="text-right">12.8</TableCell>
    </TableRow>
  </TableFooter>
</Table>`,
    badge: "New",
  },

  // ─── Feedback ───────────────────────────────────────────────────────────────
  {
    slug: "dropdown-menu",
    name: "Dropdown Menu",
    category: "Feedback",
    summary: "Accessible dropdown with items, groups, labels, checkboxes, radio groups, and shortcuts.",
    description:
      "DropdownMenu is built on Radix UI DropdownMenu. Supports item groups with labels, separators, checkbox/radio items, keyboard shortcuts, and nested sub-menus. High-fidelity items like DropdownMenuItemText provide built-in tooltip and truncation support for hardware catalogs.",
    variants: [
      { label: "Basic Items", description: "Simple action list with icons and keyboard shortcuts." },
      { label: "Checkbox Items", description: "Toggle visibility/preference options." },
      { label: "Radio Group", description: "Single-select options within the dropdown." },
      { label: "Sub-menu", description: "DropdownMenuSub for nested menu levels." },
    ],
    props: [
      { name: "open (DropdownMenu)", type: "boolean", default: "—", description: "Controlled open state." },
      { name: "onOpenChange (DropdownMenu)", type: "(open: boolean) => void", default: "—", description: "Open state change callback." },
      { name: "modal (DropdownMenu)", type: "boolean", default: "true", description: "Enables modal behavior (locks scroll)." },
      { name: "side (DropdownMenuContent)", type: "'top' | 'right' | 'bottom' | 'left'", default: "'bottom'", description: "Side the menu appears on." },
      { name: "align (DropdownMenuContent)", type: "'start' | 'center' | 'end'", default: "'start'", description: "Alignment relative to trigger." },
      { name: "sideOffset (DropdownMenuContent)", type: "number", default: "4", description: "Distance from the trigger." },
      { name: "size (DropdownMenuContent)", type: "'md' | 'lg'", default: "'md'", description: "Item size scale for all children." },
      { name: "variant (DropdownMenuItem)", type: "'default' | 'destructive'", default: "'default'", description: "Visual style of the item." },
      { name: "color (DropdownMenuItem)", type: "'accent' | 'error'", default: "'accent'", description: "Semantic color intent." },
      { name: "size (DropdownMenuItem)", type: "'md' | 'lg'", default: "—", description: "Override size for individual item." },
      { name: "title (DropdownMenuItemText)", type: "string", default: "—", description: "Tooltip content revealed on hover." },
      { name: "side (DropdownMenuItemText)", type: "'top' | 'bottom' | 'left' | 'right'", default: "'right'", description: "Side the tooltip appears on." },
      { name: "checked (DropdownMenuCheckboxItem)", type: "boolean", default: "false", description: "Controlled checked state." },
    ],
    codeExample: `import {
  DropdownMenu, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuItemText,
  DropdownMenuSeparator, DropdownMenuTrigger,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { User, Settings, LogOut } from "lucide-react"

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="surface" color="neutral">Actions</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>
      <User size={14} />
      <DropdownMenuItemText title="View user profile">
        Profile
      </DropdownMenuItemText>
      <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
    </DropdownMenuItem>
    <DropdownMenuItem>
      <Settings size={14} />
      <DropdownMenuItemText>Settings</DropdownMenuItemText>
    </DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem color="error">
      <LogOut size={14} />
      <DropdownMenuItemText>Logout</DropdownMenuItemText>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
    badge: "New",
  },

  {
    slug: "dialog",
    name: "Dialog",
    category: "Feedback",
    summary: "Modal dialog overlay with header, description, body, and footer — built on Radix UI.",
    description:
      "Dialog is built on Radix UI Dialog. Provides a centered modal overlay with DialogHeader, DialogTitle, DialogDescription, and DialogFooter slots. Focus is trapped inside when open; closes on Escape or overlay click.",
    variants: [
      { label: "Form Dialog", description: "Input fields inside the dialog body for editing data." },
      { label: "Confirmation Dialog", description: "Destructive action confirmation with clear warning UI." },
      { label: "Info Dialog", description: "Read-only informational overlay." },
    ],
    props: [
      { name: "open", type: "boolean", default: "—", description: "Controlled open state." },
      { name: "onOpenChange", type: "(open: boolean) => void", default: "—", description: "Open state change callback." },
      { name: "modal", type: "boolean", default: "true", description: "Locks scroll and traps focus when true." },
      { name: "overlayClassName (DialogContent)", type: "string", default: "—", description: "Additional classes for the backdrop overlay." },
    ],
    codeExample: `import {
  Dialog, DialogContent, DialogDescription,
  DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

<Dialog>
  <DialogTrigger asChild>
    <Button variant="surface" color="neutral">Open Dialog</Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-md">
    <DialogHeader>
      <DialogTitle>Edit Satellite</DialogTitle>
      <DialogDescription>
        Update satellite configuration and save changes.
      </DialogDescription>
    </DialogHeader>
    {/* Form fields here */}
    <DialogFooter>
      <Button variant="ghost" color="neutral">Cancel</Button>
      <Button variant="solid" color="accent">Save Changes</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
    badge: "New",
  },

  {
    slug: "sheet",
    name: "Sheet",
    category: "UI",
    summary: "Slide-out overlay panel anchored to any viewport edge — built on Radix UI Dialog.",
    description:
      "Sheet provides a sliding overlay panel anchored to any of the four viewport edges. Ideal for mobile navigation, settings panels, or contextual side-views. Built on top of Radix UI Dialog with animated transitions. showCloseButton controls the built-in X button.",
    variants: [
      { label: "Right", description: "Default — slides in from the right edge (side panels, details)." },
      { label: "Bottom", description: "Slides in from the bottom — good for mobile action sheets." },
      { label: "Left", description: "Slides in from the left — secondary navigation." },
    ],
    props: [
      { name: "side (SheetContent)", type: "'top' | 'right' | 'bottom' | 'left'", default: "'right'", description: "Which edge the sheet slides in from." },
      { name: "showCloseButton (SheetContent)", type: "boolean", default: "true", description: "Shows or hides the built-in top-right close button." },
      { name: "open (Sheet)", type: "boolean", default: "—", description: "Controlled open state." },
      { name: "onOpenChange (Sheet)", type: "(open: boolean) => void", default: "—", description: "Callback on open state change." },
    ],
    codeExample: `import {
  Sheet, SheetContent, SheetHeader,
  SheetTitle, SheetDescription, SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

<Sheet>
  <SheetTrigger asChild>
    <Button variant="surface" color="neutral">Open Settings</Button>
  </SheetTrigger>
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>Configuration</SheetTitle>
      <SheetDescription>
        Adjust satellite parameters.
      </SheetDescription>
    </SheetHeader>
    <div className="p-20">
      {/* Settings content */}
    </div>
  </SheetContent>
</Sheet>`,
    badge: "New",
  },

  {
    slug: "skeleton",
    name: "Skeleton & Spinner",
    category: "Feedback",
    summary: "Loading state primitives — Skeleton pulsing placeholder and Spinner animated icon.",
    description:
      "Skeleton renders a pulsing placeholder that matches the shape of loading content. Spinner is an animated icon for inline or overlay loading states. Both use Antaris design tokens for color and sizing.",
    variants: [
      { label: "Skeleton Card", description: "Skeleton shapes composing a card loading state." },
      { label: "Skeleton Table Row", description: "Row-based skeleton for table/list loading." },
      { label: "Spinner Inline", description: "Spinner inside a disabled button during async action." },
    ],
    props: [
      { name: "className (Skeleton)", type: "string", default: "—", description: "Controls width, height, and border-radius of the skeleton shape." },
      { name: "className (Spinner)", type: "string", default: "—", description: "Override size (size-*) or color (text-*) of the spinner icon." },
    ],
    codeExample: `import { Skeleton } from "@/components/ui/skeleton"
import { Spinner } from "@/components/ui/spinner"

// Card skeleton
<div className="space-y-8">
  <Skeleton className="h-40 w-full rounded-lg" />
  <Skeleton className="h-12 w-3/4" />
  <Skeleton className="h-10 w-full" />
</div>

// Spinner in a loading button
<Button disabled variant="soft" color="neutral">
  <Spinner className="size-14" />
  Processing...
</Button>`,
    badge: "New",
  },

  {
    slug: "alert-dialog",
    name: "Alert Dialog",
    category: "Feedback",
    summary: "Confirmation overlay that interrupts user flow — requires explicit action to dismiss.",
    description:
      "AlertDialog is built on Radix UI AlertDialog. Unlike Dialog, it is intentionally disruptive — the overlay cannot be dismissed by clicking outside or pressing Escape without taking an action. Use for destructive confirmations (delete, overwrite). AlertDialogMedia provides an icon slot. AlertDialogAction and AlertDialogCancel accept Button variant/size props.",
    variants: [
      { label: "Destructive Confirmation", description: "Red AlertDialogAction for irreversible actions." },
      { label: "Informational", description: "Neutral action for user acknowledgement." },
    ],
    props: [
      { name: "open (AlertDialog)", type: "boolean", default: "—", description: "Controlled open state." },
      { name: "onOpenChange (AlertDialog)", type: "(open: boolean) => void", default: "—", description: "Open state change callback." },
      { name: "variant (AlertDialogAction)", type: "Button variant", default: "'solid'", description: "Visual style of the confirm button." },
      { name: "size (AlertDialogAction)", type: "Button size", default: "'md'", description: "Size of the confirm button." },
      { name: "variant (AlertDialogCancel)", type: "Button variant", default: "'outline'", description: "Visual style of the cancel button." },
    ],
    codeExample: `import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader,
  AlertDialogTitle, AlertDialogTrigger, AlertDialogMedia,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="soft" color="error">
      <Trash2 size={14} />
      Delete Satellite
    </Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogMedia>
      <Trash2 size={24} className="text-red-9" />
    </AlertDialogMedia>
    <AlertDialogHeader>
      <AlertDialogTitle>Delete Satellite?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. All telemetry data will be permanently removed.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction variant="solid" onClick={handleDelete}>
        Delete
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`,
    badge: "New",
  },

  {
    slug: "toast",
    name: "Toast",
    category: "Feedback",
    summary: "Non-blocking notification toasts using Sonner — imperative API with semantic types.",
    description:
      "The Toast system is powered by Sonner. Use the toast() imperative API from 'sonner' to show notifications anywhere in your app. The Toaster component renders the toast container with Antaris token-based styling and Lucide icons for each type. Already mounted in AllProviders.",
    variants: [
      { label: "Success", description: "toast.success() — green checkmark icon." },
      { label: "Error", description: "toast.error() — red X circle icon." },
      { label: "Info", description: "toast.info() — blue info icon." },
      { label: "Warning", description: "toast.warning() — amber alert triangle icon." },
      { label: "Loading", description: "toast.loading() — animated spinner." },
    ],
    props: [
      { name: "toast.success(message)", type: "string | React.ReactNode", default: "—", description: "Show a success toast." },
      { name: "toast.error(message)", type: "string | React.ReactNode", default: "—", description: "Show an error toast." },
      { name: "toast.info(message)", type: "string | React.ReactNode", default: "—", description: "Show an info toast." },
      { name: "toast.warning(message)", type: "string | React.ReactNode", default: "—", description: "Show a warning toast." },
      { name: "toast.loading(message)", type: "string", default: "—", description: "Show a loading toast. Returns an ID for dismissal." },
      { name: "toast.dismiss(id)", type: "string | number", default: "—", description: "Programmatically dismiss a specific toast." },
    ],
    codeExample: `import { toast } from "sonner"
import { Button } from "@/components/ui/button"

// Success
<Button onClick={() => toast.success("Operator created successfully")}>
  Create Operator
</Button>

// Error
<Button onClick={() => toast.error("Failed to connect to satellite")}>
  Connect
</Button>

// Loading → then dismiss
async function handleUpload() {
  const id = toast.loading("Uploading firmware...")
  try {
    await uploadFirmware()
    toast.success("Firmware uploaded", { id })
  } catch (e) {
    toast.error("Upload failed", { id })
  }
}

// Rich content
toast.info(
  <span>Mission <b>Alpha-7</b> entered eclipse phase</span>
)`,
    badge: "New",
  },

  // ─── New UI Components ─────────────────────────────────────────────────────
  {
    slug: "collapsible",
    name: "Collapsible",
    category: "UI",
    summary: "Animated expand/collapse panel built on @base-ui/react with smooth height transition.",
    description:
      "Collapsible provides an animated expand/collapse container built on @base-ui/react Collapsible primitives. CollapsiblePanel animates its height smoothly. CollapsibleTrigger toggles the state. Used internally by the Drawer component.",
    variants: [
      { label: "Default", description: "Trigger toggles the panel open/closed with height animation." },
    ],
    props: [
      { name: "defaultOpen (Collapsible)", type: "boolean", default: "false", description: "Initial open state (uncontrolled)." },
      { name: "open (Collapsible)", type: "boolean", default: "—", description: "Controlled open state." },
      { name: "onOpenChange (Collapsible)", type: "(open: boolean) => void", default: "—", description: "Callback on open state change." },
      { name: "className (CollapsiblePanel)", type: "string", default: "—", description: "Additional classes for the animated panel." },
    ],
    codeExample: `import {
  Collapsible,
  CollapsibleTrigger,
  CollapsiblePanel,
} from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"

<Collapsible>
  <CollapsibleTrigger asChild>
    <Button variant="ghost" color="neutral">
      Toggle Details
    </Button>
  </CollapsibleTrigger>
  <CollapsiblePanel>
    <div className="p-16 space-y-8">
      <p className="text-text-secondary text-sm">Altitude: 550 km</p>
      <p className="text-text-secondary text-sm">Inclination: 53°</p>
    </div>
  </CollapsiblePanel>
</Collapsible>`,
    badge: "New",
  },

  {
    slug: "kbd",
    name: "Kbd",
    category: "UI",
    summary: "Styled keyboard shortcut display with individual keys and grouped sequences.",
    description:
      "Kbd renders styled keyboard key labels. KbdGroup wraps multiple keys in a horizontal sequence (e.g. ⌘ + K). Used in dropdowns, tooltips, and shortcut documentation.",
    variants: [
      { label: "Single Key", description: "Individual keyboard key with monospace styling." },
      { label: "Group", description: "KbdGroup wraps a sequence of keys side-by-side." },
    ],
    props: [
      { name: "className (Kbd)", type: "string", default: "—", description: "Additional classes for the key element." },
      { name: "className (KbdGroup)", type: "string", default: "—", description: "Additional classes for the group container." },
    ],
    codeExample: `import { Kbd, KbdGroup } from "@/components/ui/kbd"

// Single key
<Kbd>⌘</Kbd>
<Kbd>K</Kbd>
<Kbd>Escape</Kbd>

// Grouped sequence
<KbdGroup>
  <Kbd>⌘</Kbd>
  <Kbd>K</Kbd>
</KbdGroup>

// In a shortcut label
<div className="flex items-center gap-8">
  <span className="text-text-secondary text-sm">Search</span>
  <KbdGroup>
    <Kbd>⌘</Kbd>
    <Kbd>K</Kbd>
  </KbdGroup>
</div>`,
    badge: "New",
  },



]


/** Derive grouped structure for sidebar rendering */
export function getComponentsByCategory(): Record<ComponentCategory, ComponentDoc[]> {
  const grouped: Record<ComponentCategory, ComponentDoc[]> = {
    UI: [],
    Forms: [],
    Layout: [],
    Feedback: [],
  }
  for (const doc of COMPONENT_REGISTRY) {
    grouped[doc.category].push(doc)
  }
  return grouped
}

/** Lookup a single component by slug */
export function getComponentDoc(slug: string): ComponentDoc | undefined {
  return COMPONENT_REGISTRY.find((c) => c.slug === slug)
}

/** All valid slugs (for generateStaticParams) */
export function getAllSlugs(): string[] {
  return COMPONENT_REGISTRY.map((c) => c.slug)
}
