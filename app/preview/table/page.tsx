"use client"

import {
  Table, TableBody, TableCaption, TableCell,
  TableFooter, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-16">
      <h2 className="text-xl font-semibold text-text-secondary border-b border-stroke-primary pb-8">{title}</h2>
      {children}
    </div>
  )
}

const COMPONENTS = [
  { name: "ADCS Module", type: "Attitude Control", mass: 2.4, status: "active", id: "ATMS-ADCS-01" },
  { name: "EPS Unit", type: "Power System", mass: 1.8, status: "active", id: "ATMS-EPS-01" },
  { name: "Communications", type: "RF System", mass: 0.9, status: "warning", id: "ATMS-COM-01" },
  { name: "GPS Receiver", type: "Navigation", mass: 0.3, status: "active", id: "ATMS-GPS-01" },
  { name: "Main Processor", type: "OBC", mass: 0.4, status: "active", id: "ATMS-OBC-01" },
  { name: "Payload Camera", type: "Mission Payload", mass: 1.1, status: "error", id: "ATMS-PL-01" },
]

const TOTAL_MASS = COMPONENTS.reduce((sum, c) => sum + c.mass, 0)

const STATUS_COLOR = {
  active: "success" as const,
  warning: "warning" as const,
  error: "error" as const,
}

export default function TablePreview() {
  return (
    <div className="p-40 space-y-40 bg-surface-bg min-h-screen">
      <h1 className="text-xxxl font-bold text-text-primary">Table</h1>

      <Section title="Data Table with Footer">
        <Table>
          <TableCaption>Active satellite components — Mission Alpha</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Component</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Mass (kg)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {COMPONENTS.map((comp) => (
              <TableRow key={comp.id}>
                <TableCell className="font-mono text-text-disabled text-sm">{comp.id}</TableCell>
                <TableCell className="font-medium">{comp.name}</TableCell>
                <TableCell className="text-text-secondary">{comp.type}</TableCell>
                <TableCell>
                  <Badge variant="soft" color={STATUS_COLOR[comp.status as keyof typeof STATUS_COLOR]} size="sm">
                    {comp.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">{comp.mass.toFixed(1)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4} className="font-medium">Total System Mass</TableCell>
              <TableCell className="text-right font-bold">{TOTAL_MASS.toFixed(1)}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </Section>

      <Section title="Simple Table (No Footer)">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Parameter</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Unit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              { param: "Altitude", value: "550", unit: "km" },
              { param: "Inclination", value: "53.0", unit: "°" },
              { param: "Period", value: "95.6", unit: "min" },
              { param: "RAAN", value: "120.5", unit: "°" },
              { param: "Eccentricity", value: "0.0012", unit: "—" },
            ].map((row) => (
              <TableRow key={row.param}>
                <TableCell className="font-medium">{row.param}</TableCell>
                <TableCell className="font-mono">{row.value}</TableCell>
                <TableCell className="text-text-disabled">{row.unit}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Section>
    </div>
  )
}
