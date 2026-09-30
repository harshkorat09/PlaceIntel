import json
from dataclasses import dataclass
from google import genai
from google.genai import types

from app.config import GEMINI_API_KEY, GENERATION_MODEL

client = genai.Client(
    api_key=GEMINI_API_KEY,
    http_options=types.HttpOptions(
        timeout=30_000,
    ),
)


@dataclass
class IntentContext:
    intent: str
    target_companies: list[str]
    target_skills: list[str]
    target_branches: list[str]


def classify_intent(question: str) -> IntentContext:
    prompt = f"""You are a Placement Intelligence query router.
Classify the following user question into exactly one of these intents:

1. PLACEMENT_LOOKUP: Specific facts about one company/placement (CTC, CGPA, deadline, skills, branches, status).
2. PLACEMENT_FILTER: Find companies matching criteria (accepts CSE, requires Python, currently open).
3. PLACEMENT_AGGREGATION: Aggregate analysis (highest CTC, lowest CGPA, most common skill, "Which companies offer high packages?").
4. PLACEMENT_COMPARISON: Compare two or more companies directly.
5. PLACEMENT_CRITERIA: Subjective / criteria-based recommendations ("Which company is suitable if I prioritize higher CTC?").
6. NOTICE_RAG: Questions answered from a placement notice PDF (selection process, rounds, test format, how to apply).
7. HYBRID: Requires both structured DB data AND notice PDF details.
8. COMPANY_VISITS: Questions about company visit dates and scheduling ("Show me companies visiting next week").
9. GENERAL_PLACEMENT: General overview of available placements or conversational greetings ("hello").
10. OUT_OF_DOMAIN: Completely unrelated to placements (weather, poems, capitals of countries, etc.).

Also, extract any specific companies mentioned in the query.
Extract any skills mentioned (e.g., Python, SQL, React).
Extract any branches mentioned (e.g., CSE, IT, EC).

Question: {question}

Respond strictly in valid JSON format:
{{
  "intent": "INTENT_NAME_HERE",
  "target_companies": ["company1", "company2"],
  "target_skills": ["skill1"],
  "target_branches": ["branch1"]
}}
"""
    try:
        response = client.models.generate_content(
            model=GENERATION_MODEL,
            contents=prompt,
            config=types.GenerateContentConfig(
                temperature=0.0,
                response_mime_type="application/json",
            ),
        )
        data = json.loads(response.text)
        return IntentContext(
            intent=data.get("intent", "PLACEMENT_LOOKUP"),
            target_companies=data.get("target_companies", []),
            target_skills=data.get("target_skills", []),
            target_branches=data.get("target_branches", []),
        )
    except Exception as e:
        print(f"Failed to classify intent: {e}")
        return IntentContext(
            intent="HYBRID",
            target_companies=[],
            target_skills=[],
            target_branches=[],
        )
