import time

from fastapi import FastAPI, Query, Request, Response
from fastapi.middleware.cors import CORSMiddleware

from cache_sim import cache_status
from data import PRODUCTS
from filters import Filters, apply_filters

app = FastAPI(title="HTTP QUERY demo")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["X-Cache", "X-Response-Time"],
)


@app.middleware("http")
async def add_response_time_header(request: Request, call_next):
    start = time.perf_counter()
    response = await call_next(request)
    elapsed_ms = (time.perf_counter() - start) * 1000
    response.headers["X-Response-Time"] = f"{elapsed_ms:.1f}ms"
    return response


@app.get("/api/products")
def get_products(
    response: Response,
    q: str | None = None,
    category: str | None = None,
    price_min: float = 0,
    price_max: float = 1_000_000,
    tags: list[str] = Query(default=[]),
    sort: str = "relevance",
):
    """The classic search: every filter lives in the URL query string."""
    filters = Filters(
        q=q, category=category, price_min=price_min, price_max=price_max, tags=tags, sort=sort
    )
    results = apply_filters(filters)
    response.headers["Cache-Control"] = "public, max-age=60"
    response.headers["X-Cache"] = cache_status("get", filters)
    return {"count": len(results), "results": results}


@app.get("/api/products/body-demo")
async def get_products_body_demo(request: Request, response: Response):
    """The anti-pattern: a JSON body on a GET request.

    GET has no defined body semantics, so browsers won't even let fetch()
    attach one. Any body that does arrive here (e.g. from curl) is read but
    intentionally ignored -- this route exists to prove the point, not to
    honor the filters.
    """
    await request.body()
    response.headers["Cache-Control"] = "public, max-age=60"
    return {
        "count": len(PRODUCTS),
        "note": "no filters applied, GET has no defined body semantics, so it was ignored",
        "results": PRODUCTS,
    }


@app.post("/api/products/search")
async def post_products_search(filters: Filters, response: Response):
    """The workaround: filters in a JSON body via POST.

    Works, but POST means "this changes state" -- so the response isn't
    cacheable and a retry isn't guaranteed safe.
    """
    results = apply_filters(filters)
    response.headers["Cache-Control"] = "no-store"
    response.headers["X-Cache"] = "BYPASS"
    return {"count": len(results), "results": results}


@app.api_route("/api/products", methods=["QUERY"])
async def query_products(filters: Filters, response: Response):
    """The proposed standard: a body like POST, safety and cacheability like GET."""
    results = apply_filters(filters)
    response.headers["Cache-Control"] = "public, max-age=60"
    response.headers["X-Cache"] = cache_status("query", filters)
    return {"count": len(results), "results": results}
