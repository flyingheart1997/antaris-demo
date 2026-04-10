"use client"

import { InputRange } from "@/components/ui/input-range";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
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
                <SelectTrigger >
                  <SelectValue placeholder="Choose option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="opt1">Option 1</SelectItem>
                  <SelectItem value="opt2">Option 2</SelectItem>
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
                  <SelectItem value="opt1">Option 1</SelectItem>
                  <SelectItem value="opt2">Option 2</SelectItem>
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
                  <SelectItem value="opt1">Option 1</SelectItem>
                  <SelectItem value="opt2">Option 2</SelectItem>
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
                  <SelectItem value="opt1">Option 1</SelectItem>
                  <SelectItem value="opt2">Option 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </Section>

      <Section title="With Leading Icons">
        <div className="flex flex-wrap gap-24">
          <Select size="md">
            <SelectTrigger leadingIcon={<Globe className="size-14" />} >
              <SelectValue placeholder="Select region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="us">United States</SelectItem>
              <SelectItem value="eu">European Union</SelectItem>
              <SelectItem value="ap">Asia Pacific</SelectItem>
            </SelectContent>
          </Select>

          <Select size="lg">
            <SelectTrigger leadingIcon={<Shield className="size-16" />} >
              <SelectValue placeholder="Security Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Standard Protection</SelectItem>
              <SelectItem value="mid">Advanced Shield</SelectItem>
              <SelectItem value="high">Enterprise Core</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Section>

      <Section title="Complex Groups & Separators">
        <Select size="md">
          <SelectTrigger leadingIcon={<Command className="size-14" />} >
            <SelectValue placeholder="Select resource" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Automations</SelectLabel>
              <SelectItem value="zap"><div className="flex items-center gap-8"><Zap className="size-14 text-text-warning" /> Zapier Trigger</div></SelectItem>
              <SelectItem value="webhook"><div className="flex items-center gap-8"><Bell className="size-14 text-text-info" /> Webhook Listener</div></SelectItem>
            </SelectGroup>
            <SelectSeparator />
            <SelectGroup>
              <SelectLabel>Administration</SelectLabel>
              <SelectItem value="billing">Cloud Billing</SelectItem>
              <SelectItem value="usage">Resource Usage</SelectItem>
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
                <SelectItem value="retry">Retry Connection</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-8">
            <p className="text-xs font-mono text-text-disabled uppercase italic">Disabled State</p>
            <Select disabled>
              <SelectTrigger >
                <SelectValue placeholder="Locked field" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Ghost option</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-8">
            <p className="text-xs font-mono text-text-secondary uppercase italic">Read-Only State</p>
            <Select readOnly defaultValue="read-only">
              <SelectTrigger >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="read-only">Static value</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-8">
            <p className="text-xs font-mono text-text-info uppercase italic">Filled State</p>
            <Select defaultValue="active">
              <SelectTrigger >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active Session</SelectItem>
                <SelectItem value="idle">Idle Timeout</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-8">
            <p className="text-xs font-mono text-text-info uppercase italic">Select Input Range</p>
            <Select size="lg">
              <SelectTrigger variant='neutral' className="w-75">
                <SelectValue placeholder="Select Range" />
              </SelectTrigger>
              <SelectContent className="p-12 border border-gray-8 w-75 bg-surface-bg flex flex-col">
                <InputRange
                  variant="surface"
                  unit="m"
                  minPlaceholder="0"
                  maxPlaceholder="1000"
                  minLabel="Start"
                  minLimit="0"
                  maxLabel="End"
                  maxLimit="5000"
                />
                <InputRange
                  className="mt-12"
                  variant="surface"
                  unit="m"
                  minPlaceholder="0"
                  maxPlaceholder="1000"
                  minLabel="Start"
                  minLimit="0"
                  maxLabel="End"
                  maxLimit="5000"
                />
              </SelectContent>
            </Select>
          </div>
        </div>
      </Section>
    </div>
  )
}
