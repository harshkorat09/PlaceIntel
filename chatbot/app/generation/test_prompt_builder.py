from app.generation.prompt_builder import build_rag_prompt


def main() -> None:
    question = "What is the CTC offered by TCS?"

    context = """
SOURCE 1
File: TCS_NQT_Notice_2026_-_19.02.2026.pdf
Page: 1

TCS Prime - CTC: 9.09 LPA
TCS Digital - CTC: 7.09 LPA
TCS Ninja - CTC: 3.61 LPA
""".strip()

    prompt = build_rag_prompt(
        question=question,
        context=context,
    )

    print("=" * 70)
    print("PlaceIntel RAG Prompt Test")
    print("=" * 70)
    print(prompt)


if __name__ == "__main__":
    main()