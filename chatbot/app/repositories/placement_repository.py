"""
Structured placement retrieval from PostgreSQL.

Queries Placement records joined with Company, Branch, and Skill
using keyword matching against the user's question.
Returns up to MAX_STRUCTURED_RESULTS records.
"""

import re

from app.database import get_connection


MAX_STRUCTURED_RESULTS = 3


def _tokenize(text: str) -> list[str]:
    """Return lowercased word tokens from text."""
    return re.findall(r"[a-zA-Z0-9]+", text.lower())


def retrieve_structured_placements(question: str, company_filter: str | None = None) -> list[dict]:
    """
    Retrieve structured placement records relevant to the user question.

    Strategy:
        - If company_filter is provided, fetch placements exactly for that company.
        - Otherwise, Tokenise the question.
        - Match tokens against company name, position, branch names,
          and skill names using case-insensitive ILIKE in PostgreSQL.
        - Return up to MAX_STRUCTURED_RESULTS records ordered by
          company name + position relevance.

    Args:
        question: The student's question.
        company_filter: Optional specific company name.

    Returns:
        List of placement dicts containing structured fields.
    """

    if company_filter:
        return _fetch_placements(
            where_clause="LOWER(c.name) = LOWER(%s)",
            params=[company_filter],
            limit=MAX_STRUCTURED_RESULTS,
        )

    if not question.strip():
        return []

    tokens = _tokenize(question)
    if not tokens:
        return []

    # Build WHERE conditions: match on company name OR position
    # OR any branch OR any skill using token fragments.
    # We use ilike-style % patterns so partial word matching works.
    conditions = []
    params: list[str] = []

    for token in tokens:
        if len(token) < 3:
            # Skip very short tokens (e.g. "a", "is", "in")
            continue
        pattern = f"%{token}%"
        conditions.append(
            "(LOWER(c.name) LIKE %s OR LOWER(p.position) LIKE %s)"
        )
        params.extend([pattern, pattern])

    if not conditions:
        # Fall back to returning recent active placements when
        # no meaningful keyword was found.
        return _fetch_placements(where_clause="TRUE", params=[], limit=MAX_STRUCTURED_RESULTS)

    where_clause = " OR ".join(conditions)
    return _fetch_placements(
        where_clause=where_clause,
        params=params,
        limit=MAX_STRUCTURED_RESULTS,
    )


def _fetch_placements(
    where_clause: str,
    params: list,
    limit: int,
) -> list[dict]:
    """
    Execute the structured placement JOIN query and return results.
    """

    connection = get_connection()

    try:
        with connection.cursor() as cursor:
            cursor.execute(
                f"""
                SELECT
                    p.id,
                    c.name                    AS company_name,
                    p.position,
                    p.ctc,
                    p."cgpaCutoff",
                    p.deadline,
                    p.status,
                    p.description,
                    COALESCE(
                        json_agg(DISTINCT b.name)
                        FILTER (WHERE b.name IS NOT NULL),
                        '[]'::json
                    )                         AS branches,
                    COALESCE(
                        json_agg(DISTINCT s.name)
                        FILTER (WHERE s.name IS NOT NULL),
                        '[]'::json
                    )                         AS skills
                FROM "Placement" p
                JOIN "Company" c
                    ON c.id = p."companyId"
                LEFT JOIN "PlacementBranch" pb
                    ON pb."placementId" = p.id
                LEFT JOIN "Branch" b
                    ON b.id = pb."branchId"
                LEFT JOIN "PlacementSkill" ps
                    ON ps."placementId" = p.id
                LEFT JOIN "Skill" s
                    ON s.id = ps."skillId"
                WHERE {where_clause}
                GROUP BY p.id, c.id
                ORDER BY p.id DESC
                LIMIT %s;
                """,
                params + [limit],
            )

            rows = cursor.fetchall()

        results = []

        for row in rows:
            placement_id, company_name, position, ctc, cgpa_cutoff, \
                deadline, status, description, branches_json, skills_json = row

            deadline_str = (
                deadline.strftime("%Y-%m-%d")
                if deadline is not None
                else "Not specified"
            )

            branches = list(branches_json) if branches_json else []
            skills = list(skills_json) if skills_json else []

            results.append(
                {
                    "placement_id": placement_id,
                    "company_name": company_name,
                    "position": position,
                    "ctc": ctc,
                    "cgpa_cutoff": float(cgpa_cutoff) if cgpa_cutoff is not None else None,
                    "deadline": deadline_str,
                    "status": status,
                    "description": description,
                    "branches": branches,
                    "skills": skills,
                    "source_type": "structured",
                }
            )

        return results

    finally:
        connection.close()
