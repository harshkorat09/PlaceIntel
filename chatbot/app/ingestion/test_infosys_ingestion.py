from app.ingestion.ingest_pdf import ingest_pdf


def main() -> None:
    result = ingest_pdf(
        placement_id=5,
        file_path=(
            "data/raw/"
            "PLACEMENT-Notification-of-Infosys-for-BTech-MCA.pdf"
        ),
    )

    print("\nResult:")
    print(result)


if __name__ == "__main__":
    main()