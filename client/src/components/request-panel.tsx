import { Card } from "@/components/ui/card"
import { buildQueryString, type FiltersState, type MethodId } from "@/lib/api"
import { methodMeta } from "@/lib/constants"
import { JsonBlock } from "@/lib/json-highlight"
import { cn } from "@/lib/utils"

function filtersBody(filters: FiltersState) {
  return {
    q: filters.q || null,
    category: filters.category || null,
    price_min: filters.priceMin,
    price_max: filters.priceMax,
    tags: filters.tags,
    sort: filters.sort,
  }
}

function urlLengthBadge(length: number) {
  const level = length > 2048 ? "bad" : length > 512 ? "warn" : "ok"
  const styles = {
    ok: "border-emerald-600/25 bg-emerald-600/10 text-emerald-600 dark:text-emerald-400",
    warn: "border-amber-600/25 bg-amber-600/10 text-amber-600 dark:text-amber-400",
    bad: "border-red-600/25 bg-red-600/10 text-red-600 dark:text-red-400",
  }[level]
  return (
    <span className={cn("rounded-full border px-2.5 py-0.5 text-[11px] font-medium", styles)}>
      {length} chars
    </span>
  )
}

export function RequestPanel({ method, filters }: { method: MethodId; filters: FiltersState }) {
  const meta = methodMeta(method)

  return (
    <Card className="gap-0 overflow-hidden p-0">
      <div className="flex items-center justify-between gap-2 border-b bg-muted/40 px-3.5 py-2.5">
        <span className="font-mono text-[11px] font-semibold tracking-wider text-muted-foreground">
          CLIENT REQUEST
        </span>
        {method === "get" && urlLengthBadge(`/api/products?${buildQueryString(filters)}`.length)}
      </div>

      <div className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed">
        {method === "get" && (
          <>
            <div className="break-words whitespace-pre-wrap">
              <span className="font-bold" style={{ color: meta.color }}>
                GET{" "}
              </span>
              <span>/api/products?</span>
              <span className="text-muted-foreground">{buildQueryString(filters)}</span>
            </div>
            <div className="text-muted-foreground">
              Host: <span className="text-foreground/80">localhost</span>
            </div>
            <div className="text-muted-foreground">
              Accept: <span className="text-foreground/80">application/json</span>
            </div>
          </>
        )}

        {method === "getbody" && (
          <>
            <div className="break-words whitespace-pre-wrap">
              <span className="font-bold" style={{ color: meta.color }}>
                GET{" "}
              </span>
              <span>/api/products/body-demo HTTP/1.1</span>
            </div>
            <div className="text-muted-foreground">
              Content-Type: <span className="text-foreground/80">application/json</span>
            </div>
            <div className="mt-3 text-muted-foreground line-through decoration-red-500/60">
              <JsonBlock value={filtersBody(filters)} />
            </div>
          </>
        )}

        {(method === "post" || method === "query") && (
          <>
            <div className="break-words whitespace-pre-wrap">
              <span className="font-bold" style={{ color: meta.color }}>
                {meta.verb}{" "}
              </span>
              <span>{method === "post" ? "/api/products/search" : "/api/products"} HTTP/1.1</span>
            </div>
            <div className="text-muted-foreground">
              Content-Type: <span className="text-foreground/80">application/json</span>
            </div>
            <div className="mt-3">
              <JsonBlock value={filtersBody(filters)} />
            </div>
          </>
        )}
      </div>

      <div className="border-t px-4 py-3 text-xs leading-relaxed text-muted-foreground">
        {method === "get" &&
          "Every filter lives in the URL — visible in logs, history and shareable links, but capped by the ~2KB limit most proxies and CDNs enforce."}
        {method === "getbody" &&
          "fetch() throws if you attach a body to a GET request, so the body above is never actually sent. The server receives a bare GET and returns the whole catalog, unfiltered."}
        {method === "post" && "The body arrives fine — but POST means \"this changes state.\""}
        {method === "query" &&
          "A body like POST, sent on a method that's safe and idempotent like GET."}
      </div>
    </Card>
  )
}
