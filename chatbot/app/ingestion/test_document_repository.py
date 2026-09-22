from app.ingestion.document_hash import calculate_file_hash
from app.repositories.placement_chunk_repository import (
    find_attachment_by_hash,
)


PDF_PATH = "data/raw/TCS_NQT_Notice_2026_-_19.02.2026.pdf"


def main() -> None:
    file_hash = calculate_file_hash(PDF_PATH)

    print("=" * 70)
    print("Document Repository Idempotency Test")
    print("=" * 70)

    print(f"SHA-256: {file_hash}")

    attachment = find_attachment_by_hash(file_hash)

    if attachment is None:
        print("\nNo existing attachment found.")
        return

    print("\nExisting attachment found:")
    print(f"Attachment ID: {attachment['id']}")
    print(f"Placement ID:  {attachment['placement_id']}")
    print(f"File path:     {attachment['file_path']}")
    print(f"File type:     {attachment['file_type']}")
    print(f"File hash:     {attachment['file_hash']}")


if __name__ == "__main__":
    main()