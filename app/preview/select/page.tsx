"use client"

import { InputRange } from "@/components/ui/input-range";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectItemText,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Globe, User, Shield, Zap, Bell, Command } from "lucide-react"
import * as React from "react"

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-16">
      <h2 className="text-xl font-semibold text-text-secondary border-b border-stroke-primary pb-8">{title}</h2>
      <div className="flex flex-wrap gap-24 items-start">{children}</div>
    </div>
  )
}

export default function SelectPreview() {
  return (
    <div className="p-40 space-y-40 bg-surface-bg min-h-screen max-w-7xl mx-auto">
      <div className="space-y-8">
        <h1 className="text-xxxl font-bold text-text-primary">Select Component</h1>
        <p className="text-text-secondary max-w-2xl">
          High-fidelity implementation of the Antaris Select component. Supports standard,
          icon-start, and semantic states with pixel-perfect Figma alignment.
        </p>
      </div>

      <Section title="Variants & Scaling">
        <div className="flex flex-col gap-24">
          <div className="flex flex-wrap gap-24 items-end">
            <div className="space-y-8">
              <p className="text-xs font-mono text-text-disabled uppercase">Surface (md)</p>
              <Select size="md">
                <SelectTrigger>
                  <SelectValue placeholder="Choose option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Option 1">
                    <Globe className="size-14" />
                    <SelectItemText>Option 1</SelectItemText>
                  </SelectItem>
                  <SelectItem value="Option 2">
                    <User className="size-14" />
                    <SelectItemText>Option 2</SelectItemText>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-8">
              <p className="text-xs font-mono text-text-disabled uppercase">Surface (lg)</p>
              <Select size="lg">
                <SelectTrigger >
                  <SelectValue placeholder="Choose option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="opt1">
                    <SelectItemText>Option 1</SelectItemText>
                  </SelectItem>
                  <SelectItem value="opt2">
                    <SelectItemText>Option 2</SelectItemText>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-wrap gap-24 items-end">
            <div className="space-y-8">
              <p className="text-xs font-mono text-text-disabled uppercase">Solid (md)</p>
              <Select size="md">
                <SelectTrigger variant="solid" >
                  <SelectValue placeholder="Choose option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="opt1">
                    <Globe className="size-14" />
                    <SelectItemText>Option 1</SelectItemText>
                  </SelectItem>
                  <SelectItem value="opt2">
                    <User className="size-14" />
                    <SelectItemText>Option 2</SelectItemText>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-8">
              <p className="text-xs font-mono text-text-disabled uppercase">Solid (lg)</p>
              <Select size="lg">
                <SelectTrigger variant="solid" >
                  <SelectValue placeholder="Choose option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="opt1">
                    <Globe className="size-14" />
                    <SelectItemText>Option 1</SelectItemText>
                  </SelectItem>
                  <SelectItem value="opt2">
                    <User className="size-14" />
                    <SelectItemText>Option 2</SelectItemText>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </Section>

      <Section title="With Leading Icons">
        <div className="flex flex-wrap gap-24">
          <Select size="md">
            <SelectTrigger>
              <Globe className="size-14" />
              <SelectValue placeholder="Select region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="us">
                <Globe className="size-14" />
                <SelectItemText>United States</SelectItemText>
              </SelectItem>
              <SelectItem value="eu">
                <Globe className="size-14" />
                <SelectItemText>European Union</SelectItemText>
              </SelectItem>
              <SelectItem value="ap">
                <SelectItemText>Asia Pacific</SelectItemText>
              </SelectItem>
            </SelectContent>
          </Select>

          <Select size="lg">
            <SelectTrigger>
              <Shield className="size-16" />
              <SelectValue placeholder="Security Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">
                <Shield className="size-14" />
                <SelectItemText>Standard Protection</SelectItemText>
              </SelectItem>
              <SelectItem value="mid">
                <Shield className="size-14" />
                <SelectItemText>Advanced Shield</SelectItemText>
              </SelectItem>
              <SelectItem value="high">
                <Shield className="size-14" />
                <SelectItemText>Enterprise Core</SelectItemText>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Section>

      <Section title="Complex Groups & Separators">
        <Select size="md">
          <SelectTrigger>
            <Command className="size-14" />
            <SelectValue placeholder="Select resource" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Automations</SelectLabel>
              <SelectItem value="zap">
                <Zap className="size-14 text-text-warning" />
                <SelectItemText>Zapier Trigger</SelectItemText>
              </SelectItem>
              <SelectItem value="webhook">
                <Bell className="size-14 text-text-info" />
                <SelectItemText>Webhook Listener</SelectItemText>
              </SelectItem>
            </SelectGroup>
            <SelectSeparator />
            <SelectGroup>
              <SelectLabel>Administration</SelectLabel>
              <SelectItem value="billing">
                <SelectItemText>Cloud Billing</SelectItemText>
              </SelectItem>
              <SelectItem value="usage">
                <SelectItemText>Resource Usage</SelectItemText>
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </Section>

      <Section title="Visual States">
        <div className="flex flex-wrap gap-24 items-end">
          <div className="space-y-8">
            <p className="text-xs font-mono text-text-error uppercase italic">Error State</p>
            <Select>
              <SelectTrigger color="error" >
                <SelectValue placeholder="Fix critical error" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="retry">
                  <SelectItemText>Retry Connection</SelectItemText>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-8">
            <p className="text-xs font-mono text-text-disabled uppercase italic">Disabled State</p>
            <Select disabled>
              <SelectTrigger>
                <SelectValue placeholder="Locked field" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">
                  <SelectItemText>Ghost option</SelectItemText>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-8">
            <p className="text-xs font-mono text-text-secondary uppercase italic">Read-Only State</p>
            <Select readOnly defaultValue="read-only">
              <SelectTrigger value="read-only">
                <SelectValue placeholder='Read Only' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="read-only">
                  <SelectItemText>Static value</SelectItemText>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-8">
            <p className="text-xs font-mono text-text-info uppercase italic">Filled State</p>
            <Select defaultValue="active">
              <SelectTrigger value="active">
                <SelectValue placeholder='Select' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">
                  <SelectItemText>Active Session</SelectItemText>
                </SelectItem>
                <SelectItem value="idle">
                  <SelectItemText>Idle Timeout</SelectItemText>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Section>
    </div>
  )
}
