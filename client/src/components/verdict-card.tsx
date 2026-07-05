import type { MethodId } from "@/lib/api"
import { methodMeta } from "@/lib/constants"

const VERDICTS: Record<MethodId, { title: string; text: string }> = {
  get: {
    title: "Works — but leaks and bloats",
    text: "Every filter is exposed in the URL and percent-encoded into an ever-growing query string. Complex or long searches hit the ~2KB length limit many proxies and CDNs enforce, and get truncated or rejected.",
  },
  getbody: {
    title: "Broken by design",
    text: "A body has no defined meaning on GET. fetch() refuses to attach one, and intermediaries strip any that do arrive — so the server sees no filters and returns everything. Never do this.",
  },
  post: {
    title: "Sends the body, wrong semantics",
    text: "POST means \"this changes state.\" The response comes back Cache-Control: no-store, and a retry is never guaranteed safe — even though this is just a read.",
  },
  query: {
    title: "The right tool for the job",
    text: "A request body like POST, but QUERY is safe and idempotent like GET — so the response is cacheable, keyed on the request body itself. Clean URLs, no length limits, correct semantics.",
  },
}

export function VerdictCard({ method }: { method: MethodId }) {
  const meta = methodMeta(method)
  const v = VERDICTS[method]

  return (
    <div
      className="rounded-r-lg border-l-[3px] px-4 py-3.5"
      style={{ borderColor: meta.color, backgroundColor: `${meta.color}0f` }}
    >
      <div className="text-sm font-semibold" style={{ color: meta.color }}>
        {v.title}
      </div>
      <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{v.text}</p>
    </div>
  )
}
