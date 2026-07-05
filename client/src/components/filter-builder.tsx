import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { FiltersState } from "@/lib/api"
import { CATEGORIES, DEFAULT_FILTERS, SORT_OPTIONS, STRESS_TAGS, TAG_POOL } from "@/lib/constants"
import { cn } from "@/lib/utils"

export function FilterBuilder({
  filters,
  onChange,
  onToggleTag,
}: {
  filters: FiltersState
  onChange: (next: FiltersState) => void
  onToggleTag: (tag: string) => void
}) {
  return (
    <Card className="gap-4 p-5">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-semibold">Product search</span>
        <span className="text-xs text-muted-foreground">
          — edit to see each request update live
        </span>
        <div className="ml-auto flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onChange({ ...filters, tags: [...TAG_POOL, ...STRESS_TAGS] })}
          >
            Stress test · 48 filters
          </Button>
          <Button variant="outline" size="sm" onClick={() => onChange(DEFAULT_FILTERS)}>
            Reset
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <div className="flex flex-col gap-1.5">
          <Label className="text-muted-foreground">Keyword</Label>
          <Input
            value={filters.q}
            onChange={(e) => onChange({ ...filters, q: e.target.value })}
            placeholder="search products…"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label className="text-muted-foreground">Category</Label>
          <Select
            value={filters.category}
            onValueChange={(value) => onChange({ ...filters, category: value as string })}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label className="text-muted-foreground">Min $</Label>
          <Input
            type="number"
            value={filters.priceMin}
            onChange={(e) => onChange({ ...filters, priceMin: Number(e.target.value) || 0 })}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label className="text-muted-foreground">Max $</Label>
          <Input
            type="number"
            value={filters.priceMax}
            onChange={(e) => onChange({ ...filters, priceMax: Number(e.target.value) || 0 })}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label className="text-muted-foreground">Sort by</Label>
          <Select
            value={filters.sort}
            onValueChange={(value) =>
              onChange({ ...filters, sort: value as FiltersState["sort"] })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label className="text-muted-foreground">Tags</Label>
        <div className="flex flex-wrap gap-2">
          {TAG_POOL.map((tag) => {
            const on = filters.tags.includes(tag)
            return (
              <button
                key={tag}
                type="button"
                onClick={() => onToggleTag(tag)}
                className={cn(
                  "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                  on
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                {tag}
              </button>
            )
          })}
        </div>
      </div>
    </Card>
  )
}
