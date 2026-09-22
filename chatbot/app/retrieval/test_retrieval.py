from app.retrieval.retriever import retrieve_chunks


def main() -> None:
    query = "What is the CTC offered by TCS?"

    results = retrieve_chunks(
        query=query,
        top_k=5,
    )

    print("=" * 70)
    print("PlaceIntel Retrieval Test")
    print("=" * 70)

    print(f"\nQuery: {query}")
    print(f"Retrieved chunks: {len(results)}")

    for index, result in enumerate(results, start=1):
        print(f"\n--- Result {index} ---")
        print(f"Chunk ID:    {result['id']}")
        print(f"Distance:    {result['distance']:.4f}")
        print(f"Source:      {result['source_file']}")
        print(f"Page:        {result['page_number']}")
        print(f"Chunk Index: {result['chunk_index']}")
        print(f"Text:\n{result['chunk_text']}")


if __name__ == "__main__":
    main()