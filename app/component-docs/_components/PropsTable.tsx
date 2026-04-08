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
    <div className="overflow-x-auto">
      <Table className="w-full">
        <TableHeader>
          <TableRow className="bg-surface-bg/40 hover:bg-surface-bg/40 border-b border-stroke-primary backdrop-blur-sm">
            <TableHead className="text-text-disabled font-bold text-sm uppercase tracking-[0.2em] min-w-40 py-20 px-24">
              Property
            </TableHead>
            <TableHead className="text-text-disabled font-bold text-sm uppercase tracking-[0.2em] min-w-55 py-20 px-24">
              Type Definition
            </TableHead>
            <TableHead className="text-text-disabled font-bold text-sm uppercase tracking-[0.2em] min-w-30 py-20 px-24">
              Default
            </TableHead>
            <TableHead className="text-text-disabled font-bold text-sm uppercase tracking-[0.2em] py-20 px-24">
              Description
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.map((prop) => (
            <TableRow
              key={prop.name}
              className="border-b border-stroke-primary last:border-0 hover:bg-surface-hover/60 transition-colors group"
            >
              {/* Prop name */}
              <TableCell className="py-20 px-24 align-top">
                <div className="flex items-center gap-10">
                  <code className="text-green-11 font-code text-md font-bold bg-green-alpha-2 px-12 py-4 rounded-md shadow-sm">
                    {prop.name}
                  </code>
                  {prop.required && (
                    <span className="text-md text-red-11 font-bold animate-pulse">*</span>
                  )}
                </div>
              </TableCell>

              <TableCell className="py-20 px-24 align-top">
                <code className="text-blue-11 font-code text-md bg-blue-alpha-2 px-10 py-4 rounded-md wrap-break-word whitespace-pre-wrap block leading-relaxed font-medium min-w-0">
                  {prop.type}
                </code>
              </TableCell>

              {/* Default */}
              <TableCell className="py-20 px-24 align-top text-center">
                {prop.default === "—" ? (
                  <span className="text-text-disabled text-md font-medium">—</span>
                ) : (
                  <code className="text-yellow-11 font-code text-md bg-yellow-alpha-3 px-10 py-4 rounded-md shadow-sm">
                    {prop.default}
                  </code>
                )}
              </TableCell>

              {/* Description */}
              <TableCell className="py-20 px-24 align-top text-md text-text-secondary leading-normal font-normal opacity-90">
                {prop.description}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
