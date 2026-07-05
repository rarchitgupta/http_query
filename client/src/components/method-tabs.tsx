import type { MethodId } from "@/lib/api"
import { METHODS } from "@/lib/constants"
import { cn } from "@/lib/utils"

export function MethodTabs({
  method,
  onChange,
}: {
  method: MethodId
  onChange: (id: MethodId) => void
}) {
  return (
    <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
      {METHODS.map((m) => {
        const active = m.id === method
        return (
          <button
            key={m.id}
            type="button"
            onClick={() => onChange(m.id)}
            style={active ? { borderColor: m.color, backgroundColor: `${m.color}0f` } : undefined}
            className={cn(
              "flex flex-col items-start gap-1 rounded-lg border p-3.5 text-left transition-colors",
              !active && "border-border bg-card hover:bg-muted/50"
            )}
          >
            <span
              className="font-mono text-sm font-bold"
              style={{ color: active ? m.color : undefined }}
            >
              {m.label}
            </span>
            <span className="text-xs leading-snug text-foreground/80">{m.description}</span>
            <span className="text-[11px] text-muted-foreground">{m.tag}</span>
          </button>
        )
      })}
    </div>
  )
}
