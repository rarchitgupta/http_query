import { ComparisonMatrix } from "@/components/comparison-matrix"
import { FilterBuilder } from "@/components/filter-builder"
import { GithubIcon } from "@/components/icons"
import { MethodTabs } from "@/components/method-tabs"
import { RequestPanel } from "@/components/request-panel"
import { ResponsePanel } from "@/components/response-panel"
import { ThemeToggle } from "@/components/theme-toggle"
import { VerdictCard } from "@/components/verdict-card"
import { useProductSearch } from "@/hooks/use-product-search"

export function App() {
  const {
    filters,
    setFilters,
    method,
    setMethod,
    results,
    sending,
    send,
    toggleTag,
  } = useProductSearch()

  return (
    <div className="mx-auto max-w-5xl px-6 py-10 sm:py-14">
      <div className="mb-2 flex items-start justify-between gap-4">
        <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground">
          <span className="size-1.5 rounded-full bg-emerald-500" />
          RFC 10008 (June 2026) · a safe HTTP method with a body
        </div>
        <ThemeToggle />
      </div>
      <h1 className="max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        Search the right way with{" "}
        <span className="text-emerald-600">HTTP QUERY</span>
      </h1>
      <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
        A request body like{" "}
        <span className="font-semibold text-foreground">POST</span>, but safe,
        idempotent and cacheable like{" "}
        <span className="font-semibold text-foreground">GET</span>. Edit the
        product search below, pick a method, and send a real request against a
        live FastAPI backend to compare what actually goes over the wire.
      </p>

      <div className="mt-8">
        <FilterBuilder
          filters={filters}
          onChange={setFilters}
          onToggleTag={toggleTag}
        />
      </div>

      <div className="mt-5">
        <MethodTabs method={method} onChange={setMethod} />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <RequestPanel method={method} filters={filters} />
        <ResponsePanel
          method={method}
          result={results[method]}
          sending={sending === method}
          onSend={send}
        />
      </div>

      <div className="mt-4">
        <VerdictCard method={method} />
      </div>

      <div className="mt-10">
        <h2 className="text-lg font-semibold tracking-tight">At a glance</h2>
        <p className="mt-1 mb-3.5 text-sm text-muted-foreground">
          The same product search, four ways.
        </p>
        <ComparisonMatrix />
      </div>

      <div className="mt-8 flex items-center justify-between gap-4 border-t pt-4 font-mono text-xs text-muted-foreground">
        <span>HTTP QUERY · RFC 10008</span>
        <div className="flex items-center gap-4">
          {/* <span className="hidden sm:inline">
            Press <kbd>d</kbd> to toggle dark mode
          </span> */}
          <a
            href="https://github.com/rarchitgupta/http_query"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub repository"
            className="text-foreground/70 transition-colors hover:text-foreground"
          >
            <GithubIcon className="size-4" />
          </a>
          <a
            href="https://architgupta.dev"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-foreground"
          >
            architgupta.dev
          </a>
        </div>
      </div>
    </div>
  )
}

export default App
