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
class ResolvedQueryContext:
    is_placement_related: bool
    resolved_query: str
    active_company: str | None


def resolve_question(question: str, history: list[dict]) -> ResolvedQueryContext:
    """
    Uses Gemini to resolve a follow-up question based on conversation history,
    and determines if it is placement-related. It also extracts the active company context.
    """
    if not history:
        # Without history, we just check intent. No resolution needed.
        return _classify_standalone_intent(question)
        
    history_text = ""
    for msg in history:
        role = "User" if msg["role"] == "USER" else "Assistant"
        history_text += f"{role}: {msg['content']}\n"
        
    prompt = f"""You are a Placement Assistant question resolver. 
The user is asking a question in a conversation.
Here is the recent conversation history:
{history_text}

Current question: {question}

Your task is to:
1. Determine if the current question is related to placements, careers, companies, CTC, hiring, or follow-ups to the previous placement conversation.
2. If it is a follow-up, rewrite it to be a standalone question containing all the necessary context (e.g., company name, role) mentioned previously. If it's not a follow-up, keep the question as is.
3. Identify the active company name that the user is currently asking about. This is CRITICAL. If the user explicitly mentions a company, extract its exact name. If they use a pronoun like "they", "their", "this company", or imply it as a follow-up (e.g., "What about eligibility?"), you MUST extract the company name from the recent conversation history. Return null ONLY if no company is being discussed at all.

Respond strictly in valid JSON format:
{{
  "is_placement_related": true or false,
  "resolved_query": "The standalone resolved question",
  "active_company": "Company Name" or null
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
        return ResolvedQueryContext(
            is_placement_related=bool(data.get("is_placement_related", True)),
            resolved_query=str(data.get("resolved_query", question)),
            active_company=data.get("active_company")
        )
    except Exception as e:
        print(f"Failed to resolve question: {e}")
        # fallback to treating it as standalone placement question
        return ResolvedQueryContext(is_placement_related=True, resolved_query=question, active_company=None)


def _classify_standalone_intent(question: str) -> ResolvedQueryContext:
    prompt = f"""You are a Placement Assistant. Is the following question related to placements, careers, companies, jobs, salaries, eligibility, selection processes, branches, or hiring?
Also, identify if a specific company is mentioned.

Question: {question}

Respond strictly in JSON:
{{
  "is_placement_related": true or false,
  "active_company": "Company Name" or null
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
        return ResolvedQueryContext(
            is_placement_related=bool(data.get("is_placement_related", True)),
            resolved_query=question,
            active_company=data.get("active_company")
        )
    except Exception as e:
        print(f"Failed to classify standalone intent: {e}")
        return ResolvedQueryContext(is_placement_related=True, resolved_query=question, active_company=None)
