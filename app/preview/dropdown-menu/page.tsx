"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { User, Settings, LogOut, Plus, Trash2, Copy, Edit, Mail, MessageSquare, PlusCircle } from "lucide-react"
import * as React from "react"

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-16">
      <h2 className="text-xl font-semibold text-text-secondary border-b border-stroke-primary pb-8">{title}</h2>
      <div className="flex flex-wrap gap-16">{children}</div>
    </div>
  )
}

export default function DropdownMenuPreview() {
  const [checked, setChecked] = React.useState(true)
  const [position, setPosition] = React.useState("bottom")

  return (
    <div className="p-40 space-y-40 bg-surface-bg min-h-screen">
      <h1 className="text-xxxl font-bold text-text-primary">Dropdown Menu Showcase</h1>

      <Section title="Basic Menu (MD Size)">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="surface" color="neutral">Open MD Menu</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent size="md">
            <DropdownMenuGroup groupLabel="My Account" bottomSeparator>
              <DropdownMenuItem leadingIcon={<User className="size-14" />} hotkey="⇧⌘P">
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem leadingIcon={<Settings className="size-14" />} hotkey="⌘S">
                Settings
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem color="error" leadingIcon={<LogOut className="size-14" />}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Section>

      <Section title="Large Menu (LG Size)">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="surface" color="neutral">Open LG Menu</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent size="lg">
            <DropdownMenuGroup groupLabel="Personal Settings" bottomSeparator>
              <DropdownMenuItem leadingIcon={<User className="size-16" />} hotkey="⇧⌘P">
                Profile Management
              </DropdownMenuItem>
              <DropdownMenuItem leadingIcon={<Settings className="size-16" />} hotkey="⌘S">
                Application Settings
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem color="error" leadingIcon={<LogOut className="size-16" />}>
              Terminate Session
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Section>

      <Section title="Submenus & Coordination">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="surface" color="neutral">Workflows</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent size="md">
            <DropdownMenuGroup groupLabel="Collaboration" bottomSeparator>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger leadingIcon={<User className="size-14" />}>
                  Invite Team
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem leadingIcon={<Mail className="size-14" />}>Via Email</DropdownMenuItem>
                  <DropdownMenuItem leadingIcon={<MessageSquare className="size-14" />}>Via Discord</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem leadingIcon={<PlusCircle className="size-14" />}>Custom Link</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuItem leadingIcon={<Plus className="size-14" />} hotkey="⌘T">
                New Org
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </Section>

      <Section title="Checkboxes & Radio Groups">
        <div className="flex gap-16">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="surface" color="neutral">Options</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent size="md" >
              <DropdownMenuLabel>View Mode</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked={checked} onCheckedChange={setChecked}>
                Show Grid
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked={false}>
                Show Hidden
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="surface" color="neutral">Position: {position}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent size="md" >
              <DropdownMenuLabel>Alignment</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </Section>

      <Section title="Semantic States">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="surface" color="neutral">Danger Zone</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent size="md" >
            <DropdownMenuItem leadingIcon={<Trash2 className="size-14" />} color="error">
              Delete Forever
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Section>
    </div>
  )
}
