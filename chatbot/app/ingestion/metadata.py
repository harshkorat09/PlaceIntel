from dataclasses import dataclass


@dataclass(frozen=True)
class ChunkMetadata:
    source_file: str
    document_type: str
    page_number: int
    chunk_index: int