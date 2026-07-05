import { useCallback, useState } from "react"

import { sendRequest, type FiltersState, type MethodId, type RequestResult } from "@/lib/api"
import { DEFAULT_FILTERS } from "@/lib/constants"

export function useProductSearch() {
  const [filters, setFilters] = useState<FiltersState>(DEFAULT_FILTERS)
  const [method, setMethod] = useState<MethodId>("query")
  const [results, setResults] = useState<Partial<Record<MethodId, RequestResult>>>({})
  const [sending, setSending] = useState<MethodId | null>(null)

  const send = useCallback(async () => {
    setSending(method)
    try {
      const result = await sendRequest(method, filters)
      setResults((prev) => ({ ...prev, [method]: result }))
    } finally {
      setSending(null)
    }
  }, [method, filters])

  const toggleTag = useCallback((tag: string) => {
    setFilters((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag) ? prev.tags.filter((t) => t !== tag) : [...prev.tags, tag],
    }))
  }, [])

  return { filters, setFilters, method, setMethod, results, sending, send, toggleTag }
}
