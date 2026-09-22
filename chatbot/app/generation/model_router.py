import time
from threading import Lock


class AdaptiveModelRouter:
    """
    Adaptive runtime router for Gemini generation models.

    Configured models:

        Primary:
            Gemini 3.6 Flash

        Fallback:
            Gemini 3.5 Flash-Lite

    Runtime behavior:

        1. Start with the configured primary model.
        2. If the primary fails, try the fallback.
        3. If the fallback succeeds, temporarily make it
           the active model.
        4. Do not repeatedly call the unhealthy primary.
        5. After the recovery interval, allow one request
           to probe the primary.
        6. If the primary succeeds, switch back to it.
        7. If the primary fails again, continue using fallback.

    This implementation is designed for the current
    single-process PlaceIntel AI service.

    For future multi-instance deployment, runtime state
    should be coordinated through a shared mechanism or
    infrastructure-level health routing.
    """

    def __init__(
        self,
        primary_model: str,
        fallback_model: str,
        recovery_interval_seconds: int = 300,
    ) -> None:
        self.primary_model = primary_model
        self.fallback_model = fallback_model

        # How long we wait before testing the primary again.
        self.recovery_interval_seconds = (
            recovery_interval_seconds
        )

        # Model currently receiving normal traffic.
        self._active_model = primary_model

        # Timestamp of the most recent primary failure.
        self._primary_failed_at: float | None = None

        # Prevent concurrent requests from corrupting
        # router state.
        self._lock = Lock()

    def get_model(self) -> str:
        """
        Return the model that should handle the next request.

        Normally returns the active model.

        If the fallback is active and the recovery interval
        has expired, return the primary model so that the
        next request can test whether it has recovered.
        """

        with self._lock:

            # Primary is already active.
            if self._active_model == self.primary_model:
                print(
                    "[MODEL ROUTER] "
                    f"Active model: {self.primary_model}"
                )

                return self.primary_model

            # Fallback is active.
            if self._primary_failed_at is None:
                print(
                    "[MODEL ROUTER] "
                    f"Active model: {self.fallback_model}"
                )

                return self.fallback_model

            elapsed = (
                time.monotonic()
                - self._primary_failed_at
            )

            # Primary is still considered unhealthy.
            if elapsed < self.recovery_interval_seconds:
                print(
                    "[MODEL ROUTER] "
                    f"Using fallback: {self.fallback_model} | "
                    f"Primary recovery check in "
                    f"{self.recovery_interval_seconds - elapsed:.1f}s"
                )

                return self.fallback_model

            # Recovery interval expired.
            #
            # Allow the next request to test the primary.
            print(
                "[MODEL ROUTER] "
                "Primary recovery interval expired. "
                f"Probing {self.primary_model}"
            )

            return self.primary_model

    def record_success(
        self,
        model: str,
    ) -> None:
        """
        Record a successful generation.

        A successful primary request restores the primary
        model as the active model.

        A successful fallback request keeps fallback active
        if the primary is currently unhealthy.
        """

        with self._lock:

            if model == self.primary_model:

                self._active_model = (
                    self.primary_model
                )

                self._primary_failed_at = None

                print(
                    "[MODEL ROUTER] "
                    f"{self.primary_model} recovered. "
                    "Primary model restored."
                )

                return

            if model == self.fallback_model:

                # If fallback succeeds, keep it active.
                #
                # This is especially important when the
                # primary model is currently unavailable.
                self._active_model = (
                    self.fallback_model
                )

                print(
                    "[MODEL ROUTER] "
                    f"{self.fallback_model} generation succeeded."
                )

    def record_failure(
        self,
        model: str,
    ) -> None:
        """
        Record a model failure.

        A primary failure activates the fallback.

        A fallback failure does not change the primary
        model configuration. The caller can decide how
        to handle total provider failure.
        """

        with self._lock:

            if model == self.primary_model:

                self._primary_failed_at = (
                    time.monotonic()
                )

                self._active_model = (
                    self.fallback_model
                )

                print(
                    "[MODEL ROUTER] "
                    f"{self.primary_model} failed. "
                    f"Switching active model to "
                    f"{self.fallback_model}."
                )

                return

            if model == self.fallback_model:

                print(
                    "[MODEL ROUTER] "
                    f"{self.fallback_model} also failed."
                )

    def get_active_model(self) -> str:
        """
        Return the currently active runtime model.
        """

        with self._lock:
            return self._active_model