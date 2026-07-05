import type { FiltersState, MethodId, SortOption } from "@/lib/api"

export const CATEGORIES = ["footwear", "apparel", "electronics", "home", "accessories"]

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "relevance", label: "Relevance" },
  { value: "price_asc", label: "Price: low → high" },
  { value: "price_desc", label: "Price: high → low" },
  { value: "rating", label: "Avg. rating" },
  { value: "newest", label: "Newest" },
]

export const TAG_POOL = [
  "outdoor",
  "casual",
  "winter",
  "kitchen",
  "waterproof",
  "wireless",
  "fitness",
  "formal",
]

// Purely synthetic, used only to blow up the URL for the "stress test" button.
export const STRESS_TAGS = Array.from({ length: 40 }, (_, i) => `stress-filter-${i + 1}`)

export const DEFAULT_FILTERS: FiltersState = {
  q: "",
  category: "electronics",
  priceMin: 0,
  priceMax: 300,
  tags: ["wireless"],
  sort: "rating",
}

export interface MethodMeta {
  id: MethodId
  verb: string
  label: string
  description: string
  tag: string
  color: string
}

export const METHODS: MethodMeta[] = [
  {
    id: "get",
    verb: "GET",
    label: "GET · URL",
    description: "Filters in the URL query string",
    tag: "The classic search",
    color: "#2563eb",
  },
  {
    id: "getbody",
    verb: "GET",
    label: "GET · body",
    description: "A JSON body on a GET request",
    tag: "The anti-pattern",
    color: "#dc2626",
  },
  {
    id: "post",
    verb: "POST",
    label: "POST",
    description: "Filters in a JSON request body",
    tag: "The workaround",
    color: "#d97706",
  },
  {
    id: "query",
    verb: "QUERY",
    label: "QUERY",
    description: "A body, done right",
    tag: "The proposed standard",
    color: "#059669",
  },
]

export function methodMeta(id: MethodId): MethodMeta {
  return METHODS.find((m) => m.id === id)!
}
