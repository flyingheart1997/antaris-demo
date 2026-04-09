"use client"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import {
  Search,
  Globe,
  Lock,
  Copy,
  Eye,
  EyeOff,
  AtSign,
  DollarSign,
  Send,
  RefreshCw,
  Satellite,
  Radio,
} from "lucide-react"
import * as React from "react"

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-20">
      <h2 className="text-xl font-semibold text-text-secondary border-b border-stroke-primary pb-8">
        {title}
      </h2>
      <div className="flex flex-wrap gap-24 items-start">{children}</div>
    </div>
  )
}

function Col({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-8 w-72">
      <p className="text-xs font-mono text-text-disabled uppercase">{label}</p>
      {children}
    </div>
  )
}

export default function InputGroupPreview() {
  const [showPassword, setShowPassword] = React.useState(false)

  return (
    <div className="p-40 space-y-48 bg-surface-bg min-h-screen max-w-5xl mx-auto">
      <div className="space-y-8">
        <h1 className="text-xxxl font-bold text-text-primary">Input Group</h1>
        <p className="text-text-secondary max-w-2xl">
          Composable input group with inline/block addons, text labels, icons, and action buttons.
          Wrap any input or textarea with contextual prefix/suffix elements.
        </p>
      </div>

      {/* ── Inline-start: prefix addons ── */}
      <Section title="Inline-Start — Prefix Addons">
        <Col label="Text prefix">
          <InputGroup>
            <InputGroupAddon align="inline-start">
              <InputGroupText>https://</InputGroupText>
            </InputGroupAddon>
            <InputGroupInput placeholder="example.com" />
          </InputGroup>
        </Col>

        <Col label="Symbol prefix">
          <InputGroup>
            <InputGroupAddon align="inline-start">
              <InputGroupText><DollarSign size={14} /></InputGroupText>
            </InputGroupAddon>
            <InputGroupInput placeholder="0.00" type="number" />
          </InputGroup>
        </Col>

        <Col label="Icon prefix">
          <InputGroup>
            <InputGroupAddon align="inline-start">
              <InputGroupText><AtSign size={14} /></InputGroupText>
            </InputGroupAddon>
            <InputGroupInput placeholder="username" />
          </InputGroup>
        </Col>

        <Col label="Satellite ID prefix">
          <InputGroup>
            <InputGroupAddon align="inline-start">
              <InputGroupText><Satellite size={14} /></InputGroupText>
            </InputGroupAddon>
            <InputGroupInput placeholder="SAT-0001" />
          </InputGroup>
        </Col>
      </Section>

      {/* ── Inline-end: suffix addons ── */}
      <Section title="Inline-End — Suffix Addons">
        <Col label="Text suffix">
          <InputGroup>
            <InputGroupInput placeholder="0.00" type="number" />
            <InputGroupAddon align="inline-end">
              <InputGroupText>km/s</InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </Col>

        <Col label="Domain suffix">
          <InputGroup>
            <InputGroupInput placeholder="mission-name" />
            <InputGroupAddon align="inline-end">
              <InputGroupText>.atmos.io</InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </Col>

        <Col label="Copy button suffix">
          <InputGroup>
            <InputGroupInput defaultValue="sat://atmos/cubesat-1" readOnly />
            <InputGroupAddon align="inline-end">
              <InputGroupButton size="icon-xs">
                <Copy size={12} />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </Col>

        <Col label="Refresh button suffix">
          <InputGroup>
            <InputGroupInput placeholder="API key" />
            <InputGroupAddon align="inline-end">
              <InputGroupButton size="icon-xs">
                <RefreshCw size={12} />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </Col>
      </Section>

      {/* ── Both inline addons ── */}
      <Section title="Both Inline Addons — Prefix + Suffix">
        <Col label="URL with protocol + TLD">
          <InputGroup>
            <InputGroupAddon align="inline-start">
              <InputGroupText><Globe size={14} /></InputGroupText>
            </InputGroupAddon>
            <InputGroupInput placeholder="hostname" />
            <InputGroupAddon align="inline-end">
              <InputGroupText>.io</InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </Col>

        <Col label="Search with send button">
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
        </Col>

        <Col label="Password with toggle">
          <InputGroup>
            <InputGroupAddon align="inline-start">
              <InputGroupText><Lock size={14} /></InputGroupText>
            </InputGroupAddon>
            <InputGroupInput
              type={showPassword ? "text" : "password"}
              placeholder="Enter passphrase"
            />
            <InputGroupAddon align="inline-end">
              <InputGroupButton
                size="icon-xs"
                onClick={() => setShowPassword((v) => !v)}
              >
                {showPassword ? <EyeOff size={12} /> : <Eye size={12} />}
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </Col>

        <Col label="Frequency with unit">
          <InputGroup>
            <InputGroupAddon align="inline-start">
              <InputGroupText><Radio size={14} /></InputGroupText>
            </InputGroupAddon>
            <InputGroupInput placeholder="437.525" type="number" />
            <InputGroupAddon align="inline-end">
              <InputGroupText>MHz</InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </Col>
      </Section>

      {/* ── Block addons ── */}
      <Section title="Block Addons — Top & Bottom Labels">
        <Col label="Block-start label">
          <InputGroup>
            <InputGroupAddon align="block-start" className="border-b border-stroke-primary">
              <InputGroupText>Mission name</InputGroupText>
            </InputGroupAddon>
            <InputGroupInput placeholder="ATMOS-LEO-01" />
          </InputGroup>
        </Col>

        <Col label="Block-end description">
          <InputGroup>
            <InputGroupInput placeholder="Ground station ID" />
            <InputGroupAddon align="block-end" className="border-t border-stroke-primary">
              <InputGroupText>Format: GS-XXXX-YYY</InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </Col>

        <Col label="Both block addons">
          <InputGroup>
            <InputGroupAddon align="block-start" className="border-b border-stroke-primary">
              <InputGroupText>Orbital altitude</InputGroupText>
            </InputGroupAddon>
            <InputGroupInput placeholder="550" type="number" />
            <InputGroupAddon align="block-end" className="border-t border-stroke-primary">
              <InputGroupText>Measured in kilometers above MSL</InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </Col>
      </Section>

      {/* ── Textarea variant ── */}
      <Section title="Textarea Variant">
        <Col label="Textarea with label">
          <InputGroup className="h-auto">
            <InputGroupAddon align="block-start" className="border-b border-stroke-primary">
              <InputGroupText>Mission notes</InputGroupText>
            </InputGroupAddon>
            <InputGroupTextarea placeholder="Describe the mission objectives..." rows={4} />
          </InputGroup>
        </Col>

        <Col label="Textarea with char count">
          <InputGroup className="h-auto">
            <InputGroupTextarea placeholder="Telemetry payload description..." rows={3} />
            <InputGroupAddon align="block-end" className="border-t border-stroke-primary">
              <InputGroupText>Max 500 characters</InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </Col>
      </Section>

      {/* ── States ── */}
      <Section title="States">
        <Col label="Disabled">
          <InputGroup data-disabled="true" className="opacity-50 pointer-events-none">
            <InputGroupAddon align="inline-start">
              <InputGroupText><Lock size={14} /></InputGroupText>
            </InputGroupAddon>
            <InputGroupInput placeholder="Locked field" disabled />
          </InputGroup>
        </Col>

        <Col label="Error state">
          <InputGroup>
            <InputGroupAddon align="inline-start">
              <InputGroupText><AtSign size={14} /></InputGroupText>
            </InputGroupAddon>
            <InputGroupInput
              aria-invalid="true"
              defaultValue="invalid-value"
            />
          </InputGroup>
        </Col>

        <Col label="Read-only">
          <InputGroup>
            <InputGroupAddon align="inline-start">
              <InputGroupText>ID:</InputGroupText>
            </InputGroupAddon>
            <InputGroupInput readOnly defaultValue="SAT-2024-A3F7" />
            <InputGroupAddon align="inline-end">
              <InputGroupButton size="icon-xs">
                <Copy size={12} />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </Col>

        <Col label="Focused (click to see)">
          <InputGroup>
            <InputGroupAddon align="inline-start">
              <InputGroupText><Search size={14} /></InputGroupText>
            </InputGroupAddon>
            <InputGroupInput placeholder="Click to focus..." />
          </InputGroup>
        </Col>
      </Section>
    </div>
  )
}
