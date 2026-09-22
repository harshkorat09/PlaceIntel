from app.generation.answer_generator import generate_answer
from app.retrieval.retriever import retrieve_chunks


def main() -> None:
    print("=" * 70)
    print("PlaceIntel - Complete RAG Test")
    print("=" * 70)

    question = "What CTC packages are offered by TCS?"

    # ---------------------------------------------------------
    # 1. Student question
    # ---------------------------------------------------------

    print("\n[1] Student Question:")
    print(question)

    # ---------------------------------------------------------
    # 2. Retrieve relevant chunks
    # ---------------------------------------------------------

    print("\n[2] Retrieving relevant chunks...")

    retrieved_chunks = retrieve_chunks(
        query=question,
        top_k=5,
    )

    print(
        f"Retrieved chunks: {len(retrieved_chunks)}"
    )

    # ---------------------------------------------------------
    # 3. Generate grounded answer
    # ---------------------------------------------------------

    print("\n[3] Generating grounded answer...")

    answer = generate_answer(
        question=question,
        retrieved_chunks=retrieved_chunks,
    )

    # ---------------------------------------------------------
    # 4. Display answer
    # ---------------------------------------------------------

    print("\n" + "=" * 70)
    print("PLACEINTEL ANSWER")
    print("=" * 70)

    print(answer)

    print("\n" + "=" * 70)
    print("RAG TEST COMPLETE")
    print("=" * 70)


if __name__ == "__main__":
    main()