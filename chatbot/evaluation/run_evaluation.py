import time

from app.generation.answer_generator import generate_answer
from app.retrieval.retriever import retrieve_chunks
from app.retrieval.source_builder import build_sources

from evaluation.test_cases import (
    EVALUATION_CASES,
    EvaluationCase,
)


def check_keywords(
    answer: str,
    keywords: list[str],
) -> tuple[int, int]:
    """
    Lightweight answer-quality heuristic.

    Returns:
        (matched_keywords, total_keywords)
    """

    normalized_answer = answer.lower()

    matched = 0

    for keyword in keywords:
        if keyword.lower() in normalized_answer:
            matched += 1

    return matched, len(keywords)


def evaluate_case(
    case: EvaluationCase,
) -> None:

    print()
    print("=" * 80)
    print(f"{case.id}: {case.question}")
    print("=" * 80)

    start_time = time.perf_counter()

    try:
        # -----------------------------------------------------
        # Retrieval
        # -----------------------------------------------------

        retrieved_chunks = retrieve_chunks(
            query=case.question,
            top_k=5,
        )

        retrieval_count = len(
            retrieved_chunks
        )

        print(
            f"Retrieved chunks: {retrieval_count}"
        )

        # -----------------------------------------------------
        # Retrieval details
        # -----------------------------------------------------

        print("\nRetrieved chunks:")

        for index, chunk in enumerate(
            retrieved_chunks,
            start=1,
        ):
            print(
                f"\nChunk {index}"
            )

            print(
                f"  Source: "
                f"{chunk.get('source_file')}"
            )

            print(
                f"  Page: "
                f"{chunk.get('page_number')}"
            )

            print(
                f"  Similarity: "
                f"{chunk.get('similarity'):.4f}"
            )

            print(
                f"  Text: "
                f"{chunk.get('chunk_text', '')[:250]}"
            )

        # -----------------------------------------------------
        # Generate answer
        # -----------------------------------------------------

        answer = generate_answer(
            question=case.question,
            retrieved_chunks=retrieved_chunks,
        )

        print("\nGenerated answer:")
        print(answer)

        # -----------------------------------------------------
        # Sources
        # -----------------------------------------------------

        sources = build_sources(
            retrieved_chunks=retrieved_chunks,
        )

        print("\nSources:")

        for source in sources:
            print(
                f"  {source['notice']} "
                f"pages={source['pages']}"
            )

        # -----------------------------------------------------
        # Keyword heuristic
        # -----------------------------------------------------

        matched, total = check_keywords(
            answer,
            case.expected_answer_keywords,
        )

        if total > 0:
            keyword_score = (
                matched / total
            ) * 100
        else:
            keyword_score = 100.0

        print(
            f"\nAnswer keyword coverage: "
            f"{matched}/{total} "
            f"({keyword_score:.1f}%)"
        )

        # -----------------------------------------------------
        # Source expectation
        # -----------------------------------------------------

        source_match = False

        if case.expected_source is None:
            source_match = len(sources) == 0

        else:
            for source in sources:
                if (
                    source["notice"]
                    == case.expected_source
                ):
                    expected_pages = set(
                        case.expected_pages
                    )

                    actual_pages = set(
                        source["pages"]
                    )

                    if expected_pages.intersection(
                        actual_pages
                    ):
                        source_match = True

        print(
            f"Source expectation: "
            f"{'PASS' if source_match else 'FAIL'}"
        )

        # -----------------------------------------------------
        # Retrieval expectation
        # -----------------------------------------------------

        retrieval_match = (
            retrieval_count > 0
            if case.should_retrieve
            else retrieval_count == 0
        )

        print(
            f"Retrieval expectation: "
            f"{'PASS' if retrieval_match else 'FAIL'}"
        )

        # -----------------------------------------------------
        # Total evaluation time
        # -----------------------------------------------------

        total_time = (
            time.perf_counter()
            - start_time
        )

        print(
            f"Evaluation time: "
            f"{total_time:.3f}s"
        )

    except Exception as exc:

        print(
            f"\nEVALUATION ERROR: {exc}"
        )


def main() -> None:

    print()
    print("=" * 80)
    print("PlaceIntel RAG Evaluation")
    print("=" * 80)

    print(
        f"Total evaluation cases: "
        f"{len(EVALUATION_CASES)}"
    )

    for case in EVALUATION_CASES:
        evaluate_case(case)

    print()
    print("=" * 80)
    print("Evaluation complete")
    print("=" * 80)


if __name__ == "__main__":
    main()