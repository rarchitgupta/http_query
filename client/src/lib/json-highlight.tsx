// Minimal JSON tokenizer for read-only request/response previews.
// Not a general-purpose highlighter -- just enough to color keys, strings,
// numbers and booleans in the fixed shapes this demo prints.
const TOKEN_RE = /("(?:\\.|[^"\\])*")(\s*:)?|(-?\d+(?:\.\d+)?)|\b(true|false|null)\b/g

function highlightLine(line: string, key: React.Key) {
  const spans: React.ReactNode[] = []
  let last = 0
  let i = 0
  let match: RegExpExecArray | null
  TOKEN_RE.lastIndex = 0

  while ((match = TOKEN_RE.exec(line))) {
    if (match.index > last) {
      spans.push(
        <span key={i++} className="text-muted-foreground">
          {line.slice(last, match.index)}
        </span>
      )
    }

    const isKey = match[2] !== undefined
    const isString = match[1] !== undefined
    const isBoolOrNull = match[4] !== undefined
    const className = isKey
      ? "text-sky-600 dark:text-sky-400"
      : isString
        ? "text-emerald-600 dark:text-emerald-400"
        : isBoolOrNull
          ? "text-amber-600 dark:text-amber-400"
          : "text-violet-600 dark:text-violet-400"

    spans.push(
      <span key={i++} className={className}>
        {match[0]}
      </span>
    )
    last = TOKEN_RE.lastIndex
  }

  if (last < line.length) {
    spans.push(
      <span key={i} className="text-muted-foreground">
        {line.slice(last)}
      </span>
    )
  }

  return (
    <div key={key} className="min-h-[1.35em] break-words whitespace-pre-wrap">
      {spans}
    </div>
  )
}

export function JsonBlock({ value }: { value: unknown }) {
  const text = JSON.stringify(value, null, 2)
  return <>{text.split("\n").map((line, i) => highlightLine(line, i))}</>
}
