import * as React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { type PropDef } from "../config/components"

interface PropsTableProps {
  props: PropDef[]
}

export function PropsTable({ props }: PropsTableProps) {
  if (props.length === 0) {
    return (
      <p className="text-text-disabled text-sm italic py-16">
        No props documented for this component.
      </p>
    )
  }

  return (
    <div className="rounded-xl border border-stroke-primary overflow-hidden">
      <Table className="table-fixed">
        <TableHeader>
          <TableRow className="bg-surface-secondary hover:bg-surface-secondary border-b border-stroke-primary">
            <TableHead className="text-text-secondary font-semibold text-xs uppercase tracking-wider w-35 py-12 px-16">
              Prop
            </TableHead>
            <TableHead className="text-text-secondary font-semibold text-xs uppercase tracking-wider w-[240px] py-12 px-16">
              Type
            </TableHead>
            <TableHead className="text-text-secondary font-semibold text-xs uppercase tracking-wider w-25 py-12 px-16">
              Default
            </TableHead>
            <TableHead className="text-text-secondary font-semibold text-xs uppercase tracking-wider py-12 px-16">
              Description
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.map((prop) => (
            <TableRow
              key={prop.name}
              className="border-b border-stroke-primary last:border-0 hover:bg-surface-hover transition-colors group"
            >
              {/* Prop name */}
              <TableCell className="py-12 px-16 align-top">
                <div className="flex items-center gap-6">
                  <code className="text-green-11 font-code text-sm bg-green-alpha-2 px-6 py-1 rounded-sm">
                    {prop.name}
                  </code>
                  {prop.required && (
                    <span className="text-xs text-red-11 font-medium">*</span>
                  )}
                </div>
              </TableCell>

              <TableCell className="py-12 px-16 align-top">
                <code className="text-blue-11 font-code text-xs bg-blue-alpha-2 px-6 py-1 rounded-sm wrap-break-word whitespace-normal block">
                  {prop.type}
                </code>
              </TableCell>

              {/* Default */}
              <TableCell className="py-12 px-16 align-top">
                {prop.default === "—" ? (
                  <span className="text-text-disabled text-sm">—</span>
                ) : (
                  <code className="text-yellow-11 font-code text-xs bg-yellow-alpha-2 px-6 py-1 rounded-sm">
                    {prop.default}
                  </code>
                )}
              </TableCell>

              {/* Description */}
              <TableCell className="py-12 px-16 align-top text-sm text-text-secondary">
                {prop.description}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
