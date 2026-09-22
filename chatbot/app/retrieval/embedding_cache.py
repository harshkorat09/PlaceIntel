from collections import OrderedDict
from threading import Lock


class EmbeddingCache:
    """
    Small in-memory LRU cache for query embeddings.

    This cache is intentionally local for the current
    single-process AI service.

    Future production deployment:
        Replace with Redis if multiple AI service
        instances need to share cached embeddings.
    """

    def __init__(self, max_size: int = 256) -> None:
        self.max_size = max_size

        self._cache: OrderedDict[
            str,
            list[float],
        ] = OrderedDict()

        self._lock = Lock()

    def get(
        self,
        query: str,
    ) -> list[float] | None:

        key = self._normalize(query)

        with self._lock:

            embedding = self._cache.get(key)

            if embedding is None:
                print(
                    "[EMBEDDING CACHE] MISS"
                )

                return None

            # Move recently used item to the end.
            self._cache.move_to_end(key)

            print(
                "[EMBEDDING CACHE] HIT"
            )

            return embedding

    def set(
        self,
        query: str,
        embedding: list[float],
    ) -> None:

        key = self._normalize(query)

        with self._lock:

            self._cache[key] = embedding

            self._cache.move_to_end(key)

            # Remove oldest item when cache is full.
            if len(self._cache) > self.max_size:
                self._cache.popitem(
                    last=False
                )

    @staticmethod
    def _normalize(query: str) -> str:
        """
        Normalize query text so trivial whitespace
        differences don't create separate cache entries.
        """

        return " ".join(
            query.strip().lower().split()
        )