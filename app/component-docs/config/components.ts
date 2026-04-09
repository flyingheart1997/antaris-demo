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
    summary: "Interactive trigger for actions. Supports 5 variants, 5 colors, 4 sizes, icons, and loading states.",
    description:
      "The Button component is the primary interactive element in the Antaris design system. It ships with 5 visual variants (solid, soft, surface, outline, ghost), 5 semantic color scales, and full icon support via leadingIcon / trailingIcon props.",
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
      { name: "leadingIcon", type: "React.ReactNode", default: "—", description: "Icon node rendered before the label." },
      { name: "trailingIcon", type: "React.ReactNode", default: "—", description: "Icon node rendered after the label." },
      { name: "showText", type: "boolean", default: "true", description: "Hide the label text (icon-only mode)." },
      { name: "disabled", type: "boolean", default: "false", description: "Disables the button and reduces opacity." },
      { name: "asChild", type: "boolean", default: "false", description: "Renders as the Radix Slot — delegates rendering to the child element." },
    ],
    codeExample: `import { Button } from "@/components/ui/button"
import { Mail, ArrowRight } from "lucide-react"

// Solid accent (primary CTA)
<Button variant="solid" color="accent">
  Get Started
</Button>

// With leading icon
<Button
  variant="soft"
  color="info"
  leadingIcon={<Mail className="size-16" />}
>
  Send Email
</Button>

// Trailing icon
<Button
  variant="outline"
  color="accent"
  trailingIcon={<ArrowRight className="size-16" />}
>
  Learn More
</Button>

// Icon-only (ghost)
<Button
  variant="ghost"
  color="neutral"
  leadingIcon={<Settings className="size-16" />}
  showText={false}
/>

// Disabled state
<Button variant="solid" color="error" disabled>
  Disabled
</Button>`,
  },

  {
    slug: "card",
    name: "Card",
    category: "UI",
    summary: "Content container with size and state variants. Supports header, content, and footer slots.",
    description:
      "Card provides a flexible content container with 6 size scales, 4 states (default, hover, emphasis, disabled), and an insetContent mode for flush edge media like images or maps.",
    variants: [
      { label: "Sizes 1–6", description: "Six padding/radius scale steps from compact (1) to spacious (6)." },
      { label: "States", description: "default, hover, emphasis, and disabled visual states." },
      { label: "Inset Content", description: "insetContent={true} removes padding so child media bleeds to card edges." },
    ],
    props: [
      { name: "size", type: "'1' | '2' | '3' | '4' | '5' | '6'", default: "'3'", description: "Controls padding and border-radius via Antaris spacing tokens." },
      { name: "state", type: "'default' | 'hover' | 'emphasis' | 'disabled'", default: "'default'", description: "Visual state of the card." },
      { name: "stroke", type: "boolean", default: "false", description: "Adds a 1px border using stroke-primary token." },
      { name: "insetContent", type: "boolean", default: "false", description: "Removes padding so children bleed to the card edge." },
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
</Card>`,
  },

  {
    slug: "tabs",
    name: "Tabs",
    category: "UI",
    summary: "Segmented navigation control with 3 visual variants, 3 sizes, icon and badge support.",
    description:
      "Tabs provides accessible keyboard-navigable tab navigation built on Radix UI Tabs. Three visual variants (surface, underline, soft) × three sizes (sm, md, lg). Supports leading/trailing icons and numeric badge counts.",
    variants: [
      { label: "Surface", description: "Pill-style tabs inside a container with active state card effect." },
      { label: "Underline", description: "Minimal bottom-border indicator, full-width line." },
      { label: "Soft", description: "Low-profile with green tint on active tab." },
    ],
    props: [
      { name: "variant (TabsList)", type: "'surface' | 'underline' | 'soft'", default: "'surface'", description: "Visual style of the tab list." },
      { name: "size (TabsList)", type: "'sm' | 'md' | 'lg'", default: "'md'", description: "Height and font-size of the tab list." },
      { name: "iconStart", type: "React.ReactNode", default: "—", description: "Icon rendered before trigger label." },
      { name: "iconEnd", type: "React.ReactNode", default: "—", description: "Icon rendered after trigger label." },
      { name: "badge", type: "React.ReactNode", default: "—", description: "Badge/count indicator next to label." },
      { name: "disabled (TabsTrigger)", type: "boolean", default: "false", description: "Disables the individual tab trigger." },
    ],
    codeExample: `import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs"

<Tabs defaultValue="overview">
  <TabsList variant="surface" size="md">
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="analytics" badge={5}>
      Analytics
    </TabsTrigger>
    <TabsTrigger value="settings">Settings</TabsTrigger>
  </TabsList>

  <TabsContent value="overview">
    <p>Overview content here.</p>
  </TabsContent>
  <TabsContent value="analytics">
    <p>Analytics content here.</p>
  </TabsContent>
  <TabsContent value="settings">
    <p>Settings content here.</p>
  </TabsContent>
</Tabs>`,
  },

  // ─── Forms ──────────────────────────────────────────────────────────────────
  {
    slug: "input",
    name: "Input",
    category: "Forms",
    summary: "Text input with leading/trailing icons, units, character counter, and error state.",
    description:
      "The Input component extends the native HTML input with Antaris design tokens. Supports leading/trailing icons, a unit label (e.g. 'USD'), character counter with maxLength, and helper/error text. Integrates with the Field component for full form layouts.",
    variants: [
      { label: "Default", description: "Standard text input with placeholder." },
      { label: "With Icons", description: "leadingIcon and trailingIcon props for search or suffix labels." },
      { label: "Units", description: "units + unitsText appends a label inside the input (e.g. 'USD', 'kg')." },
      { label: "Counter", description: "counter + maxLength shows remaining character count." },
      { label: "States", description: "disabled, readOnly, and error states." },
    ],
    props: [
      { name: "leadingIcon", type: "React.ReactNode", default: "—", description: "Icon node rendered inside the input on the left." },
      { name: "trailingIcon", type: "React.ReactNode", default: "—", description: "Icon node rendered inside the input on the right." },
      { name: "units", type: "boolean", default: "false", description: "Enables the units suffix panel." },
      { name: "unitsText", type: "string", default: "—", description: "Text shown in units panel (e.g. 'USD')." },
      { name: "counter", type: "boolean", default: "false", description: "Enables the character counter display." },
      { name: "maxLength", type: "number", default: "—", description: "Max characters; used by counter." },
      { name: "helperText", type: "string", default: "—", description: "Helper text below the input." },
      { name: "state", type: "'error'", default: "—", description: "Applies error styling (red ring + icon)." },
      { name: "disabled", type: "boolean", default: "false", description: "Disables the input." },
    ],
    codeExample: `import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

// Basic
<Input placeholder="Enter value..." />

// With leading icon
<Input
  leadingIcon={<Search size={16} />}
  placeholder="Search..."
/>

// With units
<Input units unitsText="USD" placeholder="0.00" />

// With counter
<Input counter maxLength={20} placeholder="Max 20 chars" />

// Error state
<Input
  state="error"
  helperText="This field is required."
  defaultValue="Invalid"
/>`,
  },

  {
    slug: "input-group",
    name: "Input Group",
    category: "Forms",
    summary: "Composable input wrapper with inline/block prefix and suffix addons — text labels, icons, and action buttons.",
    description:
      "InputGroup wraps an input or textarea with contextual addons. Inline addons (inline-start / inline-end) add prefix/suffix elements like currency symbols, domain suffixes, copy buttons, or visibility toggles. Block addons (block-start / block-end) add top/bottom labels or descriptions. Focus and error states propagate to the entire group automatically.",
    variants: [
      { label: "Inline-Start", description: "Prefix addon — icon, text, or symbol placed before the input (e.g. '@', '$', 'https://')." },
      { label: "Inline-End", description: "Suffix addon — unit, domain, or action button placed after the input (e.g. 'km/s', '.io', copy button)." },
      { label: "Both Inline", description: "Prefix and suffix combined — ideal for URL, password toggle, and search-with-action patterns." },
      { label: "Block Addons", description: "Top (block-start) or bottom (block-end) label or helper text spanning the full width of the input." },
      { label: "Textarea", description: "InputGroupTextarea replaces InputGroupInput for multi-line content with full addon support." },
    ],
    props: [
      { name: "align (InputGroupAddon)", type: "'inline-start' | 'inline-end' | 'block-start' | 'block-end'", default: "'inline-start'", description: "Position of the addon relative to the input." },
      { name: "size (InputGroupButton)", type: "'xs' | 'sm' | 'icon-xs' | 'icon-sm'", default: "'xs'", description: "Size of the action button inside the addon." },
      { name: "variant (InputGroupButton)", type: "ButtonVariant", default: "'ghost'", description: "Visual style of the button inside the addon." },
      { name: "className (InputGroup)", type: "string", default: "—", description: "Extend the group container. Use h-auto when using block addons or textarea." },
      { name: "rows (InputGroupTextarea)", type: "number", default: "—", description: "Number of visible rows for the textarea variant." },
    ],
    codeExample: `import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Search, Send } from "lucide-react"

// Search with prefix icon + send button
<InputGroup>
  <InputGroupAddon align="inline-start">
    <InputGroupText><Search size={14} /></InputGroupText>
  </InputGroupAddon>
  <InputGroupInput placeholder="Search satellites..." />
  <InputGroupAddon align="inline-end">
    <InputGroupButton size="icon-xs">
      <Send size={12} />
    </InputGroupButton>
  </InputGroupAddon>
</InputGroup>

// URL with protocol prefix + TLD suffix
<InputGroup>
  <InputGroupAddon align="inline-start">
    <InputGroupText>https://</InputGroupText>
  </InputGroupAddon>
  <InputGroupInput placeholder="hostname" />
  <InputGroupAddon align="inline-end">
    <InputGroupText>.atmos.io</InputGroupText>
  </InputGroupAddon>
</InputGroup>`,
    badge: "New",
  },

  {
    slug: "checkbox",
    name: "Checkbox",
    category: "Forms",
    summary: "Binary and indeterminate selection control with surface and solid variants.",
    description:
      "Checkbox is built on Radix UI Checkbox and supports two visual variants (surface, solid), three states (unchecked, checked, indeterminate), an optional label, and a showText prop to render icon-only.",
    variants: [
      { label: "Surface", description: "Outlined checkbox, subtle fill on checked state." },
      { label: "Solid", description: "Filled background on checked state — higher emphasis." },
      { label: "Indeterminate", description: "Mixed state for parent checkboxes in a tree." },
    ],
    props: [
      { name: "variant", type: "'surface' | 'solid'", default: "'surface'", description: "Visual style of the checkbox." },
      { name: "label", type: "string", default: "—", description: "Label text rendered beside the checkbox.", required: true },
      { name: "showText", type: "boolean", default: "true", description: "Set false to hide the label (icon-only)." },
      { name: "checked", type: "boolean | 'indeterminate'", default: "false", description: "Controlled checked state." },
      { name: "defaultChecked", type: "boolean", default: "false", description: "Uncontrolled initial state." },
      { name: "disabled", type: "boolean", default: "false", description: "Disables interaction." },
      { name: "onCheckedChange", type: "(checked: boolean | 'indeterminate') => void", default: "—", description: "Callback on state change." },
    ],
    codeExample: `import { Checkbox } from "@/components/ui/checkbox"

// Basic
<Checkbox variant="surface" label="Accept terms" />

// Pre-checked
<Checkbox variant="solid" label="Notifications" defaultChecked />

// Indeterminate
<Checkbox
  variant="surface"
  label="Select all"
  checked="indeterminate"
/>

// Disabled
<Checkbox variant="surface" label="Locked option" disabled />

// Icon-only (no label text)
<Checkbox variant="surface" label="Hidden" showText={false} />`,
  },

  {
    slug: "radio",
    name: "Radio",
    category: "Forms",
    summary: "Single-selection radio group with surface and solid variants.",
    description:
      "RadioGroup and RadioGroupItem are built on Radix UI RadioGroup. Supports surface and solid visual variants, disabled state, and a showText prop for label-free (icon) mode.",
    variants: [
      { label: "Surface", description: "Outlined radio indicator with subtle fill." },
      { label: "Solid", description: "Filled indicator on selection — higher emphasis." },
      { label: "No Label", description: "showText={false} renders icon-only radio buttons." },
    ],
    props: [
      { name: "variant", type: "'surface' | 'solid'", default: "'surface'", description: "Visual style applied to each RadioGroupItem." },
      { name: "value", type: "string", default: "—", description: "Value of this radio item.", required: true },
      { name: "showText", type: "boolean", default: "true", description: "Show or hide the label text." },
      { name: "disabled", type: "boolean", default: "false", description: "Disables this radio item." },
      { name: "defaultValue (RadioGroup)", type: "string", default: "—", description: "Pre-selected value (uncontrolled)." },
      { name: "onValueChange (RadioGroup)", type: "(value: string) => void", default: "—", description: "Callback with the selected value." },
    ],
    codeExample: `import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group"

<RadioGroup defaultValue="option-a">
  <RadioGroupItem value="option-a" variant="surface">
    Option A
  </RadioGroupItem>
  <RadioGroupItem value="option-b" variant="surface">
    Option B
  </RadioGroupItem>
  <RadioGroupItem value="option-c" variant="surface" disabled>
    Disabled Option
  </RadioGroupItem>
</RadioGroup>`,
  },

  // ─── Layout ─────────────────────────────────────────────────────────────────
  {
    slug: "separator-test",
    name: "Separator",
    category: "Layout",
    summary: "Horizontal or vertical visual divider based on Radix UI Separator.",
    description:
      "Separator renders a thin dividing line using the stroke-primary design token. Supports horizontal and vertical orientations and is fully accessible via role='separator'.",
    variants: [
      { label: "Horizontal", description: "Default — full-width divider between stacked content." },
      { label: "Vertical", description: "orientation='vertical' for inline or side-by-side content." },
    ],
    props: [
      { name: "orientation", type: "'horizontal' | 'vertical'", default: "'horizontal'", description: "Direction of the separator line." },
      { name: "decorative", type: "boolean", default: "true", description: "When true, hides from assistive technologies." },
      { name: "className", type: "string", default: "—", description: "Additional Tailwind classes." },
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
    summary: "Full Antaris sidebar shell with collapsible navigation, groups, and keyboard shortcut support.",
    description:
      "The Sidebar system is a comprehensive set of composable primitives — SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarGroup, SidebarMenu, SidebarMenuButton, and more. It supports icon-collapse mode, mobile sheet fallback, and ⌘B keyboard shortcut.",
    variants: [
      { label: "Expanded", description: "Full-width sidebar showing labels alongside icons." },
      { label: "Collapsed (icon)", description: "Narrow icon-only strip with tooltips on hover." },
      { label: "Mobile Sheet", description: "Slides in as a sheet on small viewports." },
    ],
    props: [
      { name: "collapsible", type: "'offcanvas' | 'icon' | 'none'", default: "'offcanvas'", description: "Collapse behavior of the sidebar." },
      { name: "variant", type: "'sidebar' | 'floating' | 'inset'", default: "'sidebar'", description: "Layout variant affecting border/shadow treatment." },
      { name: "side", type: "'left' | 'right'", default: "'left'", description: "Which side the sidebar attaches to." },
      { name: "defaultOpen", type: "boolean", default: "true", description: "Initial expanded state (SidebarProvider)." },
      { name: "open", type: "boolean", default: "—", description: "Controlled open state (SidebarProvider)." },
      { name: "onOpenChange", type: "(open: boolean) => void", default: "—", description: "Callback (SidebarProvider)." },
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

  // ─── Feedback / UI ──────────────────────────────────────────────────────────
  {
    slug: "custom-text",
    name: "Text",
    category: "UI",
    summary: "Typography component exposing all Antaris text scale tokens with variant and size props.",
    description:
      "The Text component provides a unified API over the Antaris typography scale — all font sizes (xs → xxxl), weights (light, regular, medium, bold), line heights, and letter spacing. Renders as <p> by default; use the 'as' prop to change the element.",
    variants: [
      { label: "Font Sizes", description: "xs, sm, md, lg, xl, xxl, xxxl — mapped directly to Antaris text tokens." },
      { label: "Weights", description: "light, regular, medium, bold following Antaris font-weight tokens." },
      { label: "Semantic Colors", description: "text-text-primary, text-text-secondary, text-text-disabled, and more." },
    ],
    props: [
      { name: "size", type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl'", default: "'md'", description: "Font size using Antaris text scale." },
      { name: "weight", type: "'light' | 'regular' | 'medium' | 'bold'", default: "'regular'", description: "Font weight token." },
      { name: "as", type: "React.ElementType", default: "'p'", description: "Rendered HTML element." },
      { name: "className", type: "string", default: "—", description: "Additional Tailwind classes." },
    ],
    codeExample: `import { Text } from "@/components/ui/text"

<Text size="xxxl" weight="bold">
  Display Heading
</Text>

<Text size="lg" weight="medium" className="text-text-secondary">
  Subtitle paragraph
</Text>

<Text size="sm" className="text-text-disabled">
  Helper / metadata text
</Text>

<Text as="span" size="xs" weight="bold">
  Badge label
</Text>`,
  },

  {
    slug: "drawer",
    name: "Drawer",
    category: "UI",
    summary: "Slide-out drawer panel for contextual detail views and side panels.",
    description:
      "ComponentDrawer provides a slide-out panel anchored to the right edge. Used for detail views, property panels, or action sheets without leaving the current context. Built on Radix Dialog primitives with Antaris motion tokens.",
    variants: [
      { label: "Default", description: "Right-side slide-in drawer panel with header title and close button." },
    ],
    props: [
      { name: "open", type: "boolean", default: "false", description: "Controlled open state." },
      { name: "onOpenChange", type: "(open: boolean) => void", default: "—", description: "Called when open state changes." },
      { name: "title", type: "string", default: "—", description: "Header title of the drawer." },
      { name: "children", type: "React.ReactNode", default: "—", description: "Drawer body content." },
    ],
    codeExample: `import { ComponentDrawer } from "@/components/ui/drawer"
import { useState } from "react"

function Example() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button onClick={() => setOpen(true)}>
        Open Drawer
      </button>
      <ComponentDrawer
        open={open}
        onOpenChange={setOpen}
        title="Component Details"
      >
        <p>Drawer content goes here.</p>
      </ComponentDrawer>
    </>
  )
}`,
  },

  // ─── New UI Components ─────────────────────────────────────────────────────
  {
    slug: "badge",
    name: "Badge",
    category: "UI",
    summary: "Compact label with 4 variants, 6 semantic states, 3 sizes, and optional start/end icons.",
    description:
      "Badge provides a compact inline label for status, category, or count information. Ships with 4 variants (solid, soft, surface, outline) × 6 semantic states (accent, neutral, success, warning, error, info) × 3 sizes.",
    variants: [
      { label: "Solid", description: "Filled background — highest emphasis." },
      { label: "Soft", description: "Subtle tinted background — default." },
      { label: "Surface", description: "Tinted with visible border." },
      { label: "Outline", description: "Transparent fill, border only." },
    ],
    props: [
      { name: "variant", type: "'solid' | 'soft' | 'surface' | 'outline'", default: "'soft'", description: "Visual style of the badge." },
      { name: "state", type: "'accent' | 'neutral' | 'success' | 'warning' | 'error' | 'info'", default: "'accent'", description: "Semantic color state." },
      { name: "size", type: "'sm' | 'md' | 'lg'", default: "'md'", description: "Height and padding scale." },
      { name: "iconStart", type: "React.ReactNode", default: "—", description: "Icon rendered before the label text." },
      { name: "iconEnd", type: "React.ReactNode", default: "—", description: "Icon rendered after the label text." },
      { name: "asChild", type: "boolean", default: "false", description: "Render as a Radix Slot child element." },
    ],
    codeExample: `import { Badge } from "@/components/ui/badge"
import { CheckCircle } from "lucide-react"

// Status badge
<Badge variant="soft" state="success">Active</Badge>

// Error badge
<Badge variant="surface" state="error">Failed</Badge>

// With icon
<Badge iconStart={<CheckCircle size={10} />} state="success">
  Verified
</Badge>

// Solid large
<Badge variant="solid" state="warning" size="lg">
  Pending Review
</Badge>`,
    badge: "New",
  },

  {
    slug: "avatar",
    name: "Avatar",
    category: "UI",
    summary: "User avatar with image, initials fallback, 5 color variants, 5 sizes, and status indicator.",
    description:
      "Avatar renders a user/entity icon using an image (AvatarImage) with an initials fallback (AvatarFallback). Supports 5 color themes, 5 size steps, and an optional AvatarIndicator for online/offline status dots.",
    variants: [
      { label: "Image", description: "AvatarImage loads the src; falls back to initials if image fails." },
      { label: "Fallback Initials", description: "Shows 1–2 letter initials in the chosen color." },
      { label: "With Indicator", description: "AvatarIndicator adds a colored dot at a corner position." },
      { label: "Group (stacked)", description: "Negative margin + ring create overlapping avatar stacks." },
    ],
    props: [
      { name: "size", type: "'1' | '2' | '3' | '4' | '5'", default: "'2'", description: "Size step (24–40px)." },
      { name: "color", type: "'green' | 'blue' | 'yellow' | 'white' | 'red'", default: "'blue'", description: "Background color for the fallback initials." },
      { name: "src (AvatarImage)", type: "string", default: "—", description: "Image URL." },
      { name: "color (AvatarIndicator)", type: "'green' | 'red' | 'yellow' | 'blue' | 'gray'", default: "'green'", description: "Status dot color." },
      { name: "position (AvatarIndicator)", type: "'top-right' | 'bottom-right'", default: "'bottom-right'", description: "Corner placement of the indicator." },
    ],
    codeExample: `import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarIndicator,
} from "@/components/ui/avatar"

// With initials
<Avatar size="4" color="blue">
  <AvatarFallback size="4">AB</AvatarFallback>
</Avatar>

// With image + fallback
<Avatar size="4">
  <AvatarImage src="/avatars/user.jpg" alt="User" />
  <AvatarFallback size="4" color="green">JD</AvatarFallback>
</Avatar>

// With online status indicator
<Avatar size="4" color="blue" className="relative">
  <AvatarFallback size="4">AB</AvatarFallback>
  <AvatarIndicator color="green" size="4" position="bottom-right" />
</Avatar>`,
    badge: "New",
  },

  {
    slug: "tooltip",
    name: "Tooltip",
    category: "UI",
    summary: "Unified floating tooltip component with a simplified API for easy integration.",
    description:
      "Tooltip is built on Radix UI Tooltip with Antaris surface tokens. This unified component handles the trigger and content internally, offering props for side, alignment, and visibility. Wraps TooltipProvider at the root of your application.",
    variants: [
      { label: "Side & Align", description: "Use side (top, bottom, left, right) and align (start, center, end) to position the tooltip." },
      { label: "Visibility", description: "The hidden prop can be used to manually control tooltip visibility (e.g. in sidebars)." },
      { label: "Arrow", description: "All tooltips now feature a sleek arrow by default; use showArrow={false} to hide it." },
    ],
    props: [
      { name: "children", type: "React.ReactNode", default: "—", description: "The trigger element (anchor) for the tooltip.", required: true },
      { name: "content", type: "React.ReactNode | string", default: "—", description: "The content to display inside the tooltip." },
      { name: "side", type: "'top' | 'bottom' | 'left' | 'right'", default: "'top'", description: "Side the tooltip appears on." },
      { name: "align", type: "'start' | 'center' | 'end'", default: "'center'", description: "Alignment relative to the trigger." },
      { name: "hidden", type: "boolean", default: "false", description: "Manually hide the tooltip." },
      { name: "showArrow", type: "boolean", default: "true", description: "Whether to show the tooltip arrow." },
      { name: "contentClassName", type: "string", default: "—", description: "Additional classes for the tooltip content." },
      { name: "delayDuration", type: "number", default: "200", description: "Hover delay in ms before showing." },
      { name: "sideOffset", type: "number", default: "6", description: "Gap in pixels between trigger and tooltip." },
    ],
    codeExample: `import {
  Tooltip,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"


  <Tooltip content="This is a tooltip" side="top">
    <Button variant="surface" color="neutral">Hover me</Button>
  </Tooltip>
`,
    badge: "New",
  },

  // ─── New Form Components ───────────────────────────────────────────────────
  {
    slug: "select",
    name: "Select",
    category: "Forms",
    summary: "Dropdown select with surface/solid variants, sizes, grouped options, and error state.",
    description:
      "Select is built on Radix UI Select. The trigger supports surface and solid variants, md and lg sizes, a leadingIcon, and color states (primary, error, warning, etc.). Options can be organized with SelectGroup and SelectLabel.",
    variants: [
      { label: "Surface", description: "Default — outlined trigger with hover background." },
      { label: "Solid", description: "Filled trigger background." },
      { label: "Grouped Options", description: "SelectGroup + SelectLabel for categorized option lists." },
      { label: "Error State", description: "color='error' applies red ring and border." },
    ],
    props: [
      { name: "variant", type: "'surface' | 'solid'", default: "'surface'", description: "Visual style of the SelectTrigger." },
      { name: "color", type: "'primary' | 'info' | 'success' | 'warning' | 'error'", default: "'primary'", description: "Semantic color state for focus ring." },
      { name: "size", type: "'md' | 'lg'", default: "'md'", description: "Height and padding of the trigger." },
      { name: "leadingIcon", type: "React.ReactNode", default: "—", description: "Icon rendered on the left side of the trigger." },
      { name: "placeholder (SelectValue)", type: "string", default: "—", description: "Placeholder text when no value is selected." },
      { name: "disabled (Select)", type: "boolean", default: "false", description: "Disables the select control." },
    ],
    codeExample: `import {
  Select, SelectContent, SelectGroup,
  SelectItem, SelectLabel, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { Globe } from "lucide-react"

<Select>
  <SelectTrigger leadingIcon={<Globe size={14} />}>
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
      <SelectItem value="fr">France</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>`,
    badge: "New",
  },

  {
    slug: "textarea",
    name: "Textarea",
    category: "Forms",
    summary: "Multi-line text input with label, helper text, character counter, and error/disabled states.",
    description:
      "Textarea extends the native HTML textarea with Antaris tokens. Supports surface and solid variants, state-based styling (default, error, disabled, read-only), an optional label, helper text, and a character counter linked to maxLength.",
    variants: [
      { label: "Surface", description: "Outlined textarea with hover/focus states." },
      { label: "Solid", description: "Filled gray background style." },
      { label: "Error", description: "Red border + ring with error helper text." },
      { label: "With Counter", description: "units={true} + maxLength shows remaining character count." },
    ],
    props: [
      { name: "variant", type: "'surface' | 'solid'", default: "'surface'", description: "Visual style." },
      { name: "state", type: "'default' | 'active' | 'filled' | 'disabled' | 'error' | 'read-only'", default: "'default'", description: "Explicit visual state override." },
      { name: "label", type: "boolean", default: "true", description: "Show/hide the label element." },
      { name: "labelText", type: "string", default: "'Label'", description: "Label text content." },
      { name: "helper", type: "boolean", default: "false", description: "Show/hide helper text." },
      { name: "helperText", type: "string", default: "'Helper'", description: "Helper text content." },
      { name: "units", type: "boolean", default: "false", description: "Enable character counter display." },
      { name: "maxLength", type: "number", default: "—", description: "Max character count (used by counter)." },
    ],
    codeExample: `import { Textarea } from "@/components/ui/textarea"

// Basic
<Textarea labelText="Message" placeholder="Type your message..." />

// With error
<Textarea
  state="error"
  labelText="Description"
  helper
  helperText="This field is required."
/>

// With character counter
<Textarea
  labelText="Bio"
  placeholder="Tell us about yourself..."
  maxLength={200}
  units
  rows={4}
/>`,
    badge: "New",
  },

  {
    slug: "icon-button",
    name: "IconButton",
    category: "UI",
    summary: "Square icon-only button with 5 variants, 5 colors, 4 sizes, and radius control.",
    description:
      "IconButton is a square button designed to contain a single icon. Shares the same variant/color/size system as Button but is always square. The radius prop is additionally exposed for full/circular shapes.",
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
      { name: "size", type: "'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: "Square dimensions (24–48px)." },
      { name: "radius", type: "'none' | 'md' | 'lg' | 'xl' | 'full'", default: "'md'", description: "Border-radius token." },
      { name: "disabled", type: "boolean", default: "false", description: "Disables the button." },
      { name: "asChild", type: "boolean", default: "false", description: "Render as Radix Slot child." },
    ],
    codeExample: `import { IconButton } from "@/components/ui/icon-button"
import { Plus, Trash2, Settings } from "lucide-react"

// Solid accent
<IconButton variant="solid" color="accent">
  <Plus size={16} />
</IconButton>

// Soft error (delete)
<IconButton variant="soft" color="error">
  <Trash2 size={16} />
</IconButton>

// Ghost neutral (circular)
<IconButton variant="ghost" color="neutral" radius="full">
  <Settings size={16} />
</IconButton>`,
    badge: "New",
  },

  // ─── New Feedback/Overlay Components ──────────────────────────────────────
  {
    slug: "dropdown-menu",
    name: "Dropdown Menu",
    category: "Feedback",
    summary: "Accessible dropdown with items, groups, labels, checkboxes, radio groups, and shortcuts.",
    description:
      "DropdownMenu is built on Radix UI DropdownMenu. Supports item groups with labels and separators, checkbox/radio items for state, keyboard shortcuts, and sub-menus. Opens on click and closes on selection or outside click.",
    variants: [
      { label: "Basic Items", description: "Simple action list with icons and keyboard shortcuts." },
      { label: "Checkbox Items", description: "Toggle visibility/preference options." },
      { label: "Radio Group", description: "Single-select options within the dropdown." },
    ],
    props: [
      { name: "open", type: "boolean", default: "—", description: "Controlled open state." },
      { name: "onOpenChange", type: "(open: boolean) => void", default: "—", description: "Open state change callback." },
      { name: "modal", type: "boolean", default: "true", description: "Whether to enable modal behavior." },
      { name: "side (Content)", type: "'top' | 'right' | 'bottom' | 'left'", default: "'bottom'", description: "Side the menu appears on." },
      { name: "align (Content)", type: "'start' | 'center' | 'end'", default: "'center'", description: "Alignment relative to trigger." },
    ],
    codeExample: `import {
  DropdownMenu, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { User, Settings, LogOut } from "lucide-react"

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="surface" color="neutral">Actions</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-52">
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>
      <User className="mr-2 h-4 w-4" />
      Profile
      <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
    </DropdownMenuItem>
    <DropdownMenuItem>
      <Settings className="mr-2 h-4 w-4" />
      Settings
    </DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem className="text-red-11">
      <LogOut className="mr-2 h-4 w-4" />
      Logout
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
      { label: "Edit Dialog", description: "Form-based dialog for editing data." },
      { label: "Confirmation Dialog", description: "Destructive action confirmation with clear warning UI." },
      { label: "Information Dialog", description: "Read-only informational overlay." },
    ],
    props: [
      { name: "open", type: "boolean", default: "—", description: "Controlled open state." },
      { name: "onOpenChange", type: "(open: boolean) => void", default: "—", description: "Open state change callback." },
      { name: "modal", type: "boolean", default: "true", description: "Locks scroll and traps focus when true." },
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
  <DialogContent className="sm:max-w-106.25">
    <DialogHeader>
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogDescription>
        Make changes to your profile here.
      </DialogDescription>
    </DialogHeader>
    {/* Form fields here */}
    <DialogFooter>
      <Button variant="ghost" color="neutral">Cancel</Button>
      <Button variant="solid" color="accent">Save</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
    badge: "New",
  },

  {
    slug: "accordion",
    name: "Accordion",
    category: "UI",
    summary: "Collapsible accordion with single or multiple open items — built on Radix UI.",
    description:
      "Accordion provides expandable/collapsible content sections. Use type='single' for one-at-a-time behavior (optionally collapsible) or type='multiple' to allow multiple open items simultaneously.",
    variants: [
      { label: "Single Collapsible", description: "Only one item can be open at a time; clicking the open item closes it." },
      { label: "Multiple", description: "Multiple items can be open simultaneously." },
    ],
    props: [
      { name: "type", type: "'single' | 'multiple'", default: "'single'", description: "Allow single or multiple open items.", required: true },
      { name: "collapsible (single)", type: "boolean", default: "false", description: "Allow closing the open item by clicking its trigger again." },
      { name: "defaultValue", type: "string | string[]", default: "—", description: "Initially open item(s)." },
      { name: "value", type: "string | string[]", default: "—", description: "Controlled open state." },
      { name: "onValueChange", type: "(value: string | string[]) => void", default: "—", description: "Callback on open state change." },
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
      Antaris is a satellite operations platform with a
      comprehensive design system for mission-critical UIs.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>How do I install it?</AccordionTrigger>
    <AccordionContent>
      Import directly from @/components/ui in this project.
    </AccordionContent>
  </AccordionItem>
</Accordion>`,
    badge: "New",
  },

  {
    slug: "skeleton",
    name: "Skeleton & Spinner",
    category: "Feedback",
    summary: "Loading state primitives — Skeleton placeholder animation and Spinner loading indicator.",
    description:
      "Skeleton renders a pulsing placeholder that matches the shape of content loading. Spinner is an animated icon for inline or overlay loading states. Both use Antaris design tokens for color and sizing.",
    variants: [
      { label: "Skeleton Card", description: "Skeleton shapes composing a card loading state." },
      { label: "Skeleton Table", description: "Row-based skeleton for table/list loading." },
      { label: "Spinner Sizes", description: "Default, small, and large spinner via className." },
      { label: "Spinner Inline", description: "Spinner inside a disabled button during async action." },
    ],
    props: [
      { name: "className (Skeleton)", type: "string", default: "—", description: "Controls width, height, and border-radius of the skeleton shape." },
      { name: "className (Spinner)", type: "string", default: "—", description: "Override size (size-*) or color (text-*) of the spinner icon." },
    ],
    codeExample: `import { Skeleton } from "@/components/ui/skeleton"
import { Spinner } from "@/components/ui/spinner"

// Skeleton card
<div className="space-y-8">
  <Skeleton className="h-40 w-full rounded-lg" />
  <Skeleton className="h-12 w-3/4" />
  <Skeleton className="h-10 w-full" />
</div>

// Spinner in a loading button
<button disabled className="flex items-center gap-8">
  <Spinner className="size-14" />
  Loading...
</button>`,
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
