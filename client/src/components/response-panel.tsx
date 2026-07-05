import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { MethodId, RequestResult } from "@/lib/api"
import { methodMeta } from "@/lib/constants"
import { JsonBlock } from "@/lib/json-highlight"

const SHOWN_HEADERS = [
  "cache-control",
  "x-cache",
  "x-response-time",
  "content-type",
]

export function ResponsePanel({
  method,
  result,
  sending,
  onSend,
}: {
  method: MethodId
  result: RequestResult | undefined
  sending: boolean
  onSend: () => void
}) {
  const meta = methodMeta(method)

  return (
    <Card className="flex flex-col gap-0 overflow-hidden p-0">
      <div className="flex items-center justify-between gap-2 border-b bg-muted/40 px-3.5 py-2">
        <span className="font-mono text-[11px] font-semibold tracking-wider text-muted-foreground">
          RESPONSE
        </span>
        <Button
          size="sm"
          disabled={sending}
          onClick={onSend}
          style={{ backgroundColor: meta.color, color: "white" }}
        >
          {sending ? "Sending..." : "Send"}
        </Button>
      </div>

      <div className="flex-1 overflow-x-auto p-4 font-mono text-[13px] leading-relaxed">
        {sending && (
          <div className="animate-pulse text-muted-foreground">
            waiting for response...
          </div>
        )}

        {!sending && !result && (
          <div className="text-muted-foreground">
            Press <span className="font-semibold text-foreground/80">Send</span>{" "}
            to fire this request.
          </div>
        )}

        {!sending && result && (
          <>
            <div>
              <span className="text-muted-foreground">HTTP/1.1 </span>
              <span
                className={
                  result.ok
                    ? "font-bold text-emerald-600 dark:text-emerald-400"
                    : "font-bold text-red-600 dark:text-red-400"
                }
              >
                {result.status} {result.statusText || "OK"}
              </span>
            </div>
            {SHOWN_HEADERS.filter((h) => result.headers[h]).map((h) => (
              <div key={h} className="text-muted-foreground">
                {headerLabel(h)}:{" "}
                <span className="text-foreground/80">{result.headers[h]}</span>
              </div>
            ))}
            <div className="text-muted-foreground">
              Round trip:{" "}
              <span className="text-foreground/80">
                {result.elapsedMs.toFixed(1)}ms
              </span>
            </div>
            <div className="mt-3">
              <JsonBlock value={result.body} />
            </div>
          </>
        )}
      </div>
    </Card>
  )
}

function headerLabel(key: string) {
  return key
    .split("-")
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join("-")
}
