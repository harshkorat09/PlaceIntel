import json
import re
from dataclasses import dataclass, field

from google import genai
from google.genai import types

from app.config import GEMINI_API_KEY, GENERATION_MODEL


client = genai.Client(
    api_key=GEMINI_API_KEY,
    http_options=types.HttpOptions(
        timeout=30_000,
    ),
)


SUPPORTED_INTENTS = [
    "PLACEMENT_LOOKUP",
    "PLACEMENT_FILTER",
    "PLACEMENT_AGGREGATION",
    "PLACEMENT_COMPARISON",
    "PLACEMENT_CRITERIA",
    "NOTICE_RAG",
    "HYBRID",
    "COMPANY_VISITS",
    "GENERAL_PLACEMENT",
    "OUT_OF_DOMAIN",
]

SUPPORTED_AGGREGATION_SUBTYPES = [
    "highest_ctc",
    "lowest_ctc",
    "ctc_above_threshold",
    "lowest_cgpa",
    "highest_cgpa",
    "company_count",
    "general_stats",
]


@dataclass
class ResolvedQueryContext:
    is_placement_related: bool
    resolved_query: str
    active_company: str | None
    intent: str = "PLACEMENT_LOOKUP"
    aggregation_subtype: str | None = None
    target_companies: list[str] = field(default_factory=list)
    target_skills: list[str] = field(default_factory=list)
    target_branches: list[str] = field(default_factory=list)


def _extract_company_from_history(history: list[dict]) -> str | None:
    """
    Recover a company name from recent conversation history.

    This is a deterministic fallback for follow-up questions.
    It does not hard-code a specific company. It looks for
    company names that were explicitly mentioned in recent
    user/assistant messages.

    The latest matching company is preferred.
    """

    company_patterns = [
        r"(?:about|for|from|at|with|compare)\s+([A-Za-z0-9][A-Za-z0-9 .&-]{1,80})",
        r"([A-Za-z0-9][A-Za-z0-9 .&-]{1,80})\s+(?:company|placement|drive)",
    ]

    # Search newest messages first.
    for message in reversed(history):
        content = str(message.get("content", "")).strip()

        if not content:
            continue

        for pattern in company_patterns:
            matches = re.findall(pattern, content, flags=re.IGNORECASE)

            if matches:
                candidate = matches[-1].strip(" .,?!")

                # Avoid returning generic words.
                ignored = {
                    "the",
                    "this",
                    "that",
                    "which",
                    "what",
                    "minimum",
                    "highest",
                    "company",
                    "placement",
                }

                if candidate.lower() not in ignored:
                    return candidate

    return None


def resolve_question(
    question: str,
    history: list[dict],
) -> ResolvedQueryContext:
    """
    Resolve placement questions before retrieval.

    Responsibilities:
      1. Determine placement relevance.
      2. Classify the query intent.
      3. Resolve follow-up references.
      4. Extract companies, skills and branches.
      5. Classify aggregation sub-type when applicable.
    """

    history_text = ""

    # Only send a bounded amount of recent history to the LLM.
    recent_history = history[-6:]

    for msg in recent_history:
        role = "User" if msg["role"] == "USER" else "Assistant"
        history_text += f"{role}: {msg['content']}\n"

    history_block = (
        f"Recent conversation:\n{history_text.strip()}\n\n"
        if history_text.strip()
        else ""
    )

    prompt = f"""You are a Placement Intelligence query analyzer for a university placement system.

{history_block}
Current question:
{question}

──────────────────────────────────────────────────────────────
TASK 1 – PLACEMENT RELEVANCE
──────────────────────────────────────────────────────────────

Decide whether the question is related to any of:
- placement drives, companies, CTC/package, eligibility, CGPA,
  branches, skills, job roles, hiring, selection process,
  placement notices, interview process, company visits.

If yes → is_placement_related: true
If no  → is_placement_related: false, intent: OUT_OF_DOMAIN

──────────────────────────────────────────────────────────────
TASK 2 – FOLLOW-UP RESOLUTION
──────────────────────────────────────────────────────────────

If the current question is a follow-up that references something
from the conversation (e.g. "What is their CGPA cutoff?",
"What about the selection process?", "How many rounds does it have?"),
resolve the reference to the most recently discussed company or topic.

Always set resolved_query to a fully standalone sentence that can be
answered without reading the conversation history.

Example:
  History: User asked about TCS CTC.
  Current: "What is the minimum CGPA?"
  resolved_query: "What is the minimum CGPA for TCS?"
  active_company: "TCS"

──────────────────────────────────────────────────────────────
TASK 3 – INTENT CLASSIFICATION
──────────────────────────────────────────────────────────────

Choose exactly ONE of:

PLACEMENT_LOOKUP
  Specific details about one company/placement.
  Examples: CTC, CGPA cutoff, deadline, branches, skills, description.

PLACEMENT_FILTER
  Find placements matching given criteria.
  Examples: "companies accepting CSE", "placements requiring Python".

PLACEMENT_AGGREGATION
  Statistical or ranking questions across ALL placements.
  Examples: "highest CTC", "which company pays the most",
  "lowest CGPA cutoff", "how many companies are hiring".
  → Also set aggregation_subtype (see Task 4).

PLACEMENT_COMPARISON
  Explicit comparison of two or more companies.
  Examples: "compare TCS and Infosys", "TCS vs Wipro".
  → Always populate target_companies with ALL named companies.

PLACEMENT_CRITERIA
  Criteria-based recommendation or suitability questions.
  Examples: "which company is best for high salary",
  "which suits me if I have 7 CGPA".

NOTICE_RAG
  Questions requiring placement notice PDF content.
  Examples: "selection process", "interview rounds", "test format",
  "application instructions", "bond details".

HYBRID
  Questions needing BOTH structured placement data AND notice content.
  Examples: "Tell me everything about TCS placement",
  "Compare TCS and Infosys including their selection process".

COMPANY_VISITS
  Questions about scheduled company visit dates.

GENERAL_PLACEMENT
  General greetings or broad questions about the placement system.

OUT_OF_DOMAIN
  Questions unrelated to placement intelligence.

──────────────────────────────────────────────────────────────
TASK 4 – AGGREGATION SUBTYPE (only when intent = PLACEMENT_AGGREGATION)
──────────────────────────────────────────────────────────────

Choose ONE of:
  highest_ctc         – which company / placement offers the highest CTC / package / salary
  lowest_ctc          – which offers the lowest CTC
  ctc_above_threshold – companies offering CTC above a stated value (e.g. "above 10 LPA")
  lowest_cgpa         – placement with the lowest CGPA cutoff requirement
  highest_cgpa        – placement with the highest CGPA cutoff requirement
  company_count       – how many companies are hiring / participating
  general_stats       – any other statistical question

If intent is NOT PLACEMENT_AGGREGATION, set aggregation_subtype to null.

──────────────────────────────────────────────────────────────
TASK 5 – ENTITY EXTRACTION
──────────────────────────────────────────────────────────────

Extract:
  active_company    – primary company (inherit from history for follow-ups)
  target_companies  – ALL companies named in question + history for comparison
  target_skills     – skills named (e.g. Python, Java, ML)
  target_branches   – branches named

IMPORTANT – BRANCH EXPANSION:
Always expand abbreviations to full branch names:
  CSE     → Computer Science Engineering
  ECE     → Electronics and Communication Engineering
  EEE     → Electrical and Electronics Engineering
  ME      → Mechanical Engineering
  CE      → Civil Engineering
  IT      → Information Technology
  AIDS    → Artificial Intelligence and Data Science
  AIML    → Artificial Intelligence and Machine Learning

IMPORTANT – COMPARISON COMPANIES:
For PLACEMENT_COMPARISON, always populate target_companies with
ALL companies extracted from the current question AND from conversation
history if the current question references them implicitly
(e.g. "compare them" when two companies were just discussed).

──────────────────────────────────────────────────────────────
OUTPUT FORMAT (return ONLY valid JSON, no markdown)
──────────────────────────────────────────────────────────────

{{
  "is_placement_related": true,
  "intent": "PLACEMENT_LOOKUP",
  "aggregation_subtype": null,
  "resolved_query": "standalone question text",
  "active_company": "Company Name or null",
  "target_companies": [],
  "target_skills": [],
  "target_branches": []
}}
"""

    fallback_company = _extract_company_from_history(history)

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

        intent = data.get("intent", "PLACEMENT_LOOKUP")
        if intent not in SUPPORTED_INTENTS:
            intent = "PLACEMENT_LOOKUP"

        is_related = bool(data.get("is_placement_related", True))
        if intent == "OUT_OF_DOMAIN" or not is_related:
            is_related = False
            intent = "OUT_OF_DOMAIN"

        # ── aggregation_subtype ──────────────────────────────────
        raw_subtype = data.get("aggregation_subtype")
        aggregation_subtype: str | None = None
        if intent == "PLACEMENT_AGGREGATION" and raw_subtype in SUPPORTED_AGGREGATION_SUBTYPES:
            aggregation_subtype = raw_subtype
        elif intent == "PLACEMENT_AGGREGATION":
            # Default if LLM didn't return a known value
            aggregation_subtype = "highest_ctc"

        # ── company extraction ───────────────────────────────────
        active_company = data.get("active_company") or fallback_company or None

        target_companies: list[str] = data.get("target_companies", []) or []

        # If the LLM found a single company but did not set active_company
        if not active_company and len(target_companies) == 1:
            active_company = target_companies[0]

        # For comparisons, pull from history if target_companies is empty
        if intent == "PLACEMENT_COMPARISON" and not target_companies:
            # Try to harvest from history using the regex fallback
            hist_company = _extract_company_from_history(history)
            if hist_company:
                # We may only find one company this way; still use it
                target_companies = [hist_company]
                active_company = hist_company

        # ── resolved_query ───────────────────────────────────────
        resolved_query = str(data.get("resolved_query", question)).strip()

        # Ensure company name is in the resolved query for follow-ups
        if (
            active_company
            and active_company.lower() not in resolved_query.lower()
            and len(target_companies) == 0
        ):
            resolved_query = (
                f"{resolved_query.rstrip('?')} "
                f"for {active_company}?"
            )

        return ResolvedQueryContext(
            is_placement_related=is_related,
            intent=intent,
            aggregation_subtype=aggregation_subtype,
            resolved_query=resolved_query,
            active_company=active_company,
            target_companies=target_companies,
            target_skills=data.get("target_skills", []) or [],
            target_branches=data.get("target_branches", []) or [],
        )

    except Exception as exc:
        print(f"[RESOLVER] LLM call failed: {exc}")

        return ResolvedQueryContext(
            is_placement_related=True,
            intent="PLACEMENT_LOOKUP",
            aggregation_subtype=None,
            resolved_query=(
                f"{question.rstrip('?')} "
                f"for {fallback_company}?"
                if fallback_company
                else question
            ),
            active_company=fallback_company,
        )