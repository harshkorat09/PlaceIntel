from hashlib import sha256
from pathlib import Path


def calculate_file_hash(file_path: str | Path) -> str:
    """
    Calculate a SHA-256 fingerprint of a file.

    The hash represents the actual file contents, not its filename.
    """

    path = Path(file_path)

    if not path.exists():
        raise FileNotFoundError(f"File not found: {path}")

    if not path.is_file():
        raise ValueError(f"Path is not a file: {path}")

    hasher = sha256()

    with path.open("rb") as file:
        for chunk in iter(lambda: file.read(1024 * 1024), b""):
            hasher.update(chunk)

    return hasher.hexdigest()