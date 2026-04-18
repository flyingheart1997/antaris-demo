"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuItemText,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { User, Settings, LogOut, Plus, Trash2, Mail, MessageSquare, PlusCircle } from "lucide-react"
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
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuItem>
                <User className="size-14" />
                <DropdownMenuItemText title="Profile">Profile</DropdownMenuItemText>
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="size-14" />
                <DropdownMenuItemText title="Settings">Settings</DropdownMenuItemText>
                <DropdownMenuShortcut>⇧⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem color="error">
              <LogOut className="size-14" />
              <DropdownMenuItemText title="Log Out">Log Out</DropdownMenuItemText>
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
            <DropdownMenuGroup>
              <DropdownMenuLabel>Personal Settings</DropdownMenuLabel>
              <DropdownMenuItem>
                <User className="size-14 shrink-0" />
                <DropdownMenuItemText title="Profile Management">Profile Management</DropdownMenuItemText>
                <DropdownMenuShortcut>⇧⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="size-14 shrink-0" />
                <DropdownMenuItemText title="Application Settings">Application Settings</DropdownMenuItemText>
                <DropdownMenuShortcut>⇧⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem color="error">
              <LogOut className="size-16 shrink-0" />
              <DropdownMenuItemText title="Terminate Session">Terminate Session</DropdownMenuItemText>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Section>

      <Section title="Submenus & Coordination">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="surface" color="neutral">Workflows</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuLabel>Collaboration</DropdownMenuLabel>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <User className="size-14" />
                  <DropdownMenuItemText title="Invite Team">Invite Team</DropdownMenuItemText>
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>
                    <Mail className="size-14" />
                    <DropdownMenuItemText title="Via Email">Via Email</DropdownMenuItemText>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <MessageSquare className="size-14" />
                    <DropdownMenuItemText title="Via Discord">Via Discord</DropdownMenuItemText>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <PlusCircle className="size-14" />
                    <DropdownMenuItemText title="Custom Link">Custom Link</DropdownMenuItemText>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuItem>
                <Plus className="size-14" />
                <DropdownMenuItemText title="New Org">New Org</DropdownMenuItemText>
                <DropdownMenuShortcut>⌘T</DropdownMenuShortcut>
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
            <DropdownMenuContent>
              <DropdownMenuLabel>View Mode</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked={checked} onCheckedChange={setChecked}>
                <DropdownMenuItemText title="Show Grid">Show Grid</DropdownMenuItemText>
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked={false}>
                <DropdownMenuItemText title="Show Hidden">Show Hidden</DropdownMenuItemText>
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="surface" color="neutral">Position: {position}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Alignment</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                <DropdownMenuRadioItem value="top"><DropdownMenuItemText title="Top">Top</DropdownMenuItemText></DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="bottom"><DropdownMenuItemText title="Bottom">Bottom</DropdownMenuItemText></DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="right"><DropdownMenuItemText title="Right">Right</DropdownMenuItemText></DropdownMenuRadioItem>
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
          <DropdownMenuContent>
            <DropdownMenuItem color="error">
              <Trash2 className="size-14" />
              <DropdownMenuItemText title="Delete Forever">Delete Forever</DropdownMenuItemText>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Section>
    </div>
  )
}
