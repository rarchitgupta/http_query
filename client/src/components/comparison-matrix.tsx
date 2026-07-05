import { Check, TriangleAlert, X } from "lucide-react"

import { Card } from "@/components/ui/card"
import { METHODS } from "@/lib/constants"
import { cn } from "@/lib/utils"

type Symbol = "yes" | "no" | "warn"

interface Cell {
  sym: Symbol
  note?: string
}

interface Row {
  prop: string
  cells: [Cell, Cell, Cell, Cell]
}

const ROWS: Row[] = [
  {
    prop: "Request body",
    cells: [{ sym: "no", note: "none" }, { sym: "warn", note: "ignored" }, { sym: "yes", note: "JSON" }, { sym: "yes", note: "JSON" }],
  },
  {
    prop: "Safe (no side effects)",
    cells: [{ sym: "yes" }, { sym: "yes" }, { sym: "no" }, { sym: "yes" }],
  },
  {
    prop: "Idempotent",
    cells: [{ sym: "yes" }, { sym: "yes" }, { sym: "no" }, { sym: "yes" }],
  },
  {
    prop: "Cacheable response",
    cells: [{ sym: "yes" }, { sym: "no", note: "undefined" }, { sym: "no", note: "no-store" }, { sym: "yes", note: "by body" }],
  },
  {
    prop: "Filters kept out of the URL",
    cells: [{ sym: "no" }, { sym: "yes" }, { sym: "yes" }, { sym: "yes" }],
  },
  {
    prop: "Immune to URL length limits",
    cells: [{ sym: "no", note: "~2KB cap" }, { sym: "yes" }, { sym: "yes" }, { sym: "yes" }],
  },
  {
    prop: "Standardized & supported",
    cells: [{ sym: "yes" }, { sym: "no" }, { sym: "yes" }, { sym: "warn", note: "draft" }],
  },
]

const SYMBOLS: Record<Symbol, { icon: typeof Check; className: string }> = {
  yes: { icon: Check, className: "text-emerald-600 dark:text-emerald-400" },
  no: { icon: X, className: "text-red-600 dark:text-red-400" },
  warn: { icon: TriangleAlert, className: "text-amber-600 dark:text-amber-400" },
}

export function ComparisonMatrix() {
  return (
    <Card className="gap-0 overflow-hidden p-0">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-[13px]">
          <thead>
            <tr>
              <th className="border-b-2 px-3.5 py-3 font-mono text-[11px] font-bold text-muted-foreground">
                Capability
              </th>
              {METHODS.map((m) => (
                <th
                  key={m.id}
                  className={cn(
                    "border-b-2 px-3.5 py-3 text-center font-mono text-[11px] font-bold",
                    m.id === "query" && "bg-emerald-600/5"
                  )}
                  style={{ color: m.color }}
                >
                  {m.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.prop}>
                <td className="border-b px-3.5 py-2.5 font-medium text-foreground/90">
                  {row.prop}
                </td>
                {row.cells.map((cell, i) => {
                  const { icon: Icon, className } = SYMBOLS[cell.sym]
                  return (
                    <td
                      key={i}
                      className={cn(
                        "border-b px-3.5 py-2.5 text-center",
                        METHODS[i].id === "query" && "bg-emerald-600/5"
                      )}
                    >
                      <span className="inline-flex items-center gap-1.5">
                        <Icon className={cn("size-3.5", className)} />
                        {cell.note && (
                          <span className="text-[11px] text-muted-foreground">{cell.note}</span>
                        )}
                      </span>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
