from app.retrieval.context_builder import build_context
from app.retrieval.retriever import retrieve_chunks


def main() -> None:
    query = "What is the CTC offered by TCS?"

    results = retrieve_chunks(
        query=query,
        top_k=5,
    )

    context = build_context(results)

    print("=" * 70)
    print("PlaceIntel Context Builder Test")
    print("=" * 70)

    print(f"\nQuery: {query}")
    print(f"Retrieved chunks: {len(results)}")

    print("\n" + "=" * 70)
    print("GENERATED CONTEXT")
    print("=" * 70)

    print(context)


if __name__ == "__main__":
    main()