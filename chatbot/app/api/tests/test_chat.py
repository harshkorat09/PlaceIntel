from fastapi.testclient import TestClient

from app.api.chat import router
from app.api.schemas import ChatResponse
from app.main import app


client = TestClient(app)


def test_chat_rejects_empty_question() -> None:
    response = client.post(
        "/chat",
        json={"question": ""},
    )

    assert response.status_code == 422


def test_chat_returns_answer_and_sources(monkeypatch) -> None:
    def fake_retrieve_chunks(
        query: str,
        top_k: int = 5,
    ) -> list[dict]:
        return [
            {
                "id": 1,
                "chunk_text": "TCS Prime CTC is 9.09–9.30 LPA for UG.",
                "page_number": 1,
                "source_file": "TCS_NQT_Notice_2026_-_19.02.2026.pdf",
                "similarity": 0.90,
            }
        ]

    def fake_generate_answer(
        question: str,
        retrieved_chunks: list[dict],
    ):
        from app.generation.answer_generator import GenerationResult

        return GenerationResult(
            answer="The TCS Prime UG CTC is 9.09–9.30 LPA.",
            context_chunks=retrieved_chunks,
        )

    monkeypatch.setattr(
        "app.api.chat.retrieve_chunks",
        fake_retrieve_chunks,
    )

    monkeypatch.setattr(
        "app.api.chat.generate_answer",
        fake_generate_answer,
    )

    response = client.post(
        "/chat",
        json={
            "question": "What is the TCS Prime UG CTC?"
        },
    )

    assert response.status_code == 200

    data = response.json()

    assert data["answer"] == (
        "The TCS Prime UG CTC is 9.09–9.30 LPA."
    )

    assert data["sources"] == [
        {
            "notice": "TCS_NQT_Notice_2026_-_19.02.2026.pdf",
            "pages": [1],
        }
    ]

def test_chat_returns_no_evidence_response(monkeypatch) -> None:
    def fake_retrieve_chunks(
        query: str,
        top_k: int = 5,
    ) -> list[dict]:
        return []

    monkeypatch.setattr(
        "app.api.chat.retrieve_chunks",
        fake_retrieve_chunks,
    )

    response = client.post(
        "/chat",
        json={
            "question": "What is Google's placement package?"
        },
    )

    assert response.status_code == 200

    data = response.json()

    assert data["sources"] == []

    assert (
        "couldn't find enough relevant evidence"
        in data["answer"].lower()
    )