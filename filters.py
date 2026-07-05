from pydantic import BaseModel

from data import PRODUCTS, Product

SORT_OPTIONS = {"relevance", "price_asc", "price_desc", "rating", "newest"}


class Filters(BaseModel):
    q: str | None = None
    category: str | None = None
    price_min: float = 0
    price_max: float = 1_000_000
    tags: list[str] = []
    sort: str = "relevance"


def apply_filters(f: Filters) -> list[Product]:
    results = PRODUCTS

    if f.q:
        needle = f.q.lower()
        results = [p for p in results if needle in p.name.lower()]
    if f.category:
        results = [p for p in results if p.category == f.category]
    results = [p for p in results if f.price_min <= p.price <= f.price_max]
    if f.tags:
        wanted = set(f.tags)
        results = [p for p in results if wanted & set(p.tags)]

    if f.sort == "price_asc":
        results = sorted(results, key=lambda p: p.price)
    elif f.sort == "price_desc":
        results = sorted(results, key=lambda p: p.price, reverse=True)
    elif f.sort == "rating":
        results = sorted(results, key=lambda p: p.rating, reverse=True)
    elif f.sort == "newest":
        results = sorted(results, key=lambda p: p.created_at, reverse=True)

    return results
