// In dev, Vite's proxy forwards relative /api paths to the local backend (see
// vite.config.ts). In production the frontend and backend are on different
// domains, so this points at the deployed backend instead.
const API_BASE = import.meta.env.VITE_API_BASE_URL ?? ""

export type SortOption = "relevance" | "price_asc" | "price_desc" | "rating" | "newest"

export interface Product {
  id: number
  name: string
  category: string
  brand: string
  price: number
  rating: number
  in_stock: boolean
  tags: string[]
  created_at: string
}

export interface SearchResponse {
  count: number
  results: Product[]
  note?: string
}

export interface FiltersState {
  q: string
  category: string
  priceMin: number
  priceMax: number
  tags: string[]
  sort: SortOption
}

export type MethodId = "get" | "getbody" | "post" | "query"

export interface RequestResult {
  ok: boolean
  status: number
  statusText: string
  headers: Record<string, string>
  body: SearchResponse
  elapsedMs: number
}

function filtersToBody(filters: FiltersState) {
  return {
    q: filters.q || null,
    category: filters.category || null,
    price_min: filters.priceMin,
    price_max: filters.priceMax,
    tags: filters.tags,
    sort: filters.sort,
  }
}

export function buildQueryString(filters: FiltersState): string {
  const params = new URLSearchParams()
  if (filters.q) params.set("q", filters.q)
  if (filters.category) params.set("category", filters.category)
  params.set("price_min", String(filters.priceMin))
  params.set("price_max", String(filters.priceMax))
  for (const tag of filters.tags) params.append("tags", tag)
  params.set("sort", filters.sort)
  return params.toString()
}

async function toResult(request: Promise<Response>, start: number): Promise<RequestResult> {
  const res = await request
  const elapsedMs = performance.now() - start
  const headers: Record<string, string> = {}
  res.headers.forEach((value, key) => {
    headers[key] = value
  })
  const body = (await res.json()) as SearchResponse
  return { ok: res.ok, status: res.status, statusText: res.statusText, headers, body, elapsedMs }
}

function sendGet(filters: FiltersState) {
  const start = performance.now()
  return toResult(fetch(`${API_BASE}/api/products?${buildQueryString(filters)}`), start)
}

function sendGetBody() {
  // A body can never actually leave the browser on a GET request -- fetch()
  // throws synchronously if you try to attach one. So this fires the exact
  // request a real app is stuck making: a bare GET, no body, no filters.
  const start = performance.now()
  return toResult(fetch(`${API_BASE}/api/products/body-demo`), start)
}

function sendPost(filters: FiltersState) {
  const start = performance.now()
  return toResult(
    fetch(`${API_BASE}/api/products/search`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(filtersToBody(filters)),
    }),
    start
  )
}

function sendQuery(filters: FiltersState) {
  const start = performance.now()
  return toResult(
    fetch(`${API_BASE}/api/products`, {
      method: "QUERY",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(filtersToBody(filters)),
    }),
    start
  )
}

export function sendRequest(method: MethodId, filters: FiltersState): Promise<RequestResult> {
  switch (method) {
    case "get":
      return sendGet(filters)
    case "getbody":
      return sendGetBody()
    case "post":
      return sendPost(filters)
    case "query":
      return sendQuery(filters)
  }
}
