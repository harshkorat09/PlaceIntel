from app.ingestion.pdf_loader import extract_pdf
from app.ingestion.text_cleaner import clean_text


PDF_PATH = "data/raw/TCS_NQT_Notice_2026_-_19.02.2026.pdf"


def main() -> None:
    result = extract_pdf(PDF_PATH)

    print(f"File: {result['file_name']}")
    print(f"Pages: {result['page_count']}")

    for page in result["pages"]:
        cleaned_text = clean_text(page["text"])

        print(f"\n--- Page {page['page_number']} ---")
        print(cleaned_text[:1000])


if __name__ == "__main__":
    main()