from app.ingestion.document_hash import calculate_file_hash


PDF_PATH = "data/raw/TCS_NQT_Notice_2026_-_19.02.2026.pdf"


def main() -> None:
    file_hash = calculate_file_hash(PDF_PATH)

    print("=" * 70)
    print("Document Fingerprint Test")
    print("=" * 70)

    print(f"File: {PDF_PATH}")
    print(f"SHA-256: {file_hash}")


if __name__ == "__main__":
    main()