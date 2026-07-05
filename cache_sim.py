from collections import defaultdict

from filters import Filters

_seen: dict[str, int] = defaultdict(int)


def cache_status(scope: str, filters: Filters) -> str:
    """Fake the CDN/proxy cache a real deployment would sit behind.

    Keys on the exact (scope, filters) pair, so repeating the same request
    on a cacheable route is a HIT while a new combination of filters is a
    MISS -- mirroring how a cache keyed on request signature would behave.
    """
    key = scope + ":" + filters.model_dump_json()
    _seen[key] += 1
    return "HIT" if _seen[key] > 1 else "MISS"
