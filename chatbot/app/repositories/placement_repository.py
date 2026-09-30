"""
Structured placement retrieval from PostgreSQL.

Responsibilities:
- Retrieve placement records.
- Filter placements.
- Compare companies.
- Perform deterministic aggregation.
"""

import re

from app.database import get_connection


MAX_STRUCTURED_RESULTS = 3


def _tokenize(text: str) -> list[str]:
    """Return lowercased word tokens from text."""
    return re.findall(
        r"[a-zA-Z0-9]+",
        text.lower(),
    )


def retrieve_structured_placements(
    question: str,
    company_filter: str | None = None,
) -> list[dict]:
    """
    Retrieve structured placement records.

    If a company is known, retrieve its placement directly.
    Otherwise perform lightweight keyword matching.
    """

    if company_filter:
        return _fetch_placements(
            where_clause="LOWER(c.name) LIKE LOWER(%s)",
            params=[f"%{company_filter}%"],
            limit=MAX_STRUCTURED_RESULTS,
        )

    if not question.strip():
        return []

    tokens = _tokenize(question)

    if not tokens:
        return []

    conditions = []
    params: list[str] = []

    for token in tokens:
        if len(token) < 3:
            continue

        pattern = f"%{token}%"

        conditions.append(
            """
            (
                LOWER(c.name) LIKE %s
                OR LOWER(p.position) LIKE %s
                OR EXISTS (
                    SELECT 1
                    FROM "PlacementSkill" psq
                    JOIN "Skill" sq
                        ON sq.id = psq."skillId"
                    WHERE psq."placementId" = p.id
                      AND LOWER(sq.name) LIKE %s
                )
                OR EXISTS (
                    SELECT 1
                    FROM "PlacementBranch" pbq
                    JOIN "Branch" bq
                        ON bq.id = pbq."branchId"
                    WHERE pbq."placementId" = p.id
                      AND LOWER(bq.name) LIKE %s
                )
            )
            """
        )

        params.extend(
            [
                pattern,
                pattern,
                pattern,
                pattern,
            ]
        )

    if not conditions:
        return _fetch_placements(
            where_clause="TRUE",
            params=[],
            limit=MAX_STRUCTURED_RESULTS,
        )

    return _fetch_placements(
        where_clause=" OR ".join(conditions),
        params=params,
        limit=MAX_STRUCTURED_RESULTS,
    )


def get_all_active_placements() -> list[dict]:
    """
    Retrieve placements currently considered active.

    OPEN is the production status. If a test placement uses a
    different status, it should be changed in the database rather
    than making the aggregation layer treat arbitrary statuses
    as active.
    """

    return _fetch_placements(
        where_clause="p.status = 'OPEN'",
        params=[],
        limit=50,
    )


def get_placements_by_companies(
    company_names: list[str],
) -> list[dict]:
    """Retrieve placements for specific companies."""

    if not company_names:
        return []

    conditions = []
    params = []

    for name in company_names:
        conditions.append(
            "LOWER(c.name) LIKE LOWER(%s)"
        )
        params.append(
            f"%{name}%"
        )

    return _fetch_placements(
        where_clause=" OR ".join(conditions),
        params=params,
        limit=20,
    )


def filter_placements(
    skills: list[str] | None = None,
    branches: list[str] | None = None,
) -> list[dict]:
    """Filter placements by skills and/or branches."""

    if not skills and not branches:
        return get_all_active_placements()

    conditions = []
    params = []

    if skills:
        skill_conditions = []

        for skill in skills:
            skill_conditions.append(
                """
                EXISTS (
                    SELECT 1
                    FROM "PlacementSkill" ps2
                    JOIN "Skill" s2
                        ON s2.id = ps2."skillId"
                    WHERE ps2."placementId" = p.id
                      AND LOWER(s2.name) LIKE LOWER(%s)
                )
                """
            )

            params.append(
                f"%{skill}%"
            )

        conditions.append(
            "(" + " OR ".join(skill_conditions) + ")"
        )

    if branches:
        branch_conditions = []

        for branch in branches:
            branch_conditions.append(
                """
                EXISTS (
                    SELECT 1
                    FROM "PlacementBranch" pb2
                    JOIN "Branch" b2
                        ON b2.id = pb2."branchId"
                    WHERE pb2."placementId" = p.id
                      AND LOWER(b2.name) LIKE LOWER(%s)
                )
                """
            )

            params.append(
                f"%{branch}%"
            )

        conditions.append(
            "(" + " OR ".join(branch_conditions) + ")"
        )

    return _fetch_placements(
        where_clause=" AND ".join(conditions),
        params=params,
        limit=20,
    )


def get_highest_ctc_placements() -> list[dict]:
    """
    Return placement(s) having the highest CTC.

    The aggregation is performed by PostgreSQL rather than
    asking the LLM to calculate the maximum.
    """

    connection = get_connection()

    try:
        with connection.cursor() as cursor:
            cursor.execute(
                """
                SELECT
                    p.id,
                    c.name AS company_name,
                    p.position,
                    p.ctc,
                    p."cgpaCutoff",
                    p.deadline,
                    p.status,
                    p.description,
                    COALESCE(
                        json_agg(DISTINCT b.name)
                        FILTER (
                            WHERE b.name IS NOT NULL
                        ),
                        '[]'::json
                    ) AS branches,
                    COALESCE(
                        json_agg(DISTINCT s.name)
                        FILTER (
                            WHERE s.name IS NOT NULL
                        ),
                        '[]'::json
                    ) AS skills
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
                WHERE p.ctc IS NOT NULL
                GROUP BY p.id, c.id
                ORDER BY p.ctc DESC
                LIMIT 3;
                """
            )

            rows = cursor.fetchall()

        return _rows_to_placements(rows)

    finally:
        connection.close()


def get_lowest_cgpa_placements() -> list[dict]:
    """
    Return placements with the lowest specified CGPA cutoff.
    """

    connection = get_connection()

    try:
        with connection.cursor() as cursor:
            cursor.execute(
                """
                SELECT
                    p.id,
                    c.name AS company_name,
                    p.position,
                    p.ctc,
                    p."cgpaCutoff",
                    p.deadline,
                    p.status,
                    p.description,
                    COALESCE(
                        json_agg(DISTINCT b.name)
                        FILTER (
                            WHERE b.name IS NOT NULL
                        ),
                        '[]'::json
                    ) AS branches,
                    COALESCE(
                        json_agg(DISTINCT s.name)
                        FILTER (
                            WHERE s.name IS NOT NULL
                        ),
                        '[]'::json
                    ) AS skills
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
                WHERE p."cgpaCutoff" IS NOT NULL
                GROUP BY p.id, c.id
                ORDER BY p."cgpaCutoff" ASC
                LIMIT 3;
                """
            )

            rows = cursor.fetchall()

        return _rows_to_placements(rows)

    finally:
        connection.close()


def _fetch_placements(
    where_clause: str,
    params: list,
    limit: int,
) -> list[dict]:
    """Execute the common structured placement query."""

    connection = get_connection()

    try:
        with connection.cursor() as cursor:
            cursor.execute(
                f"""
                SELECT
                    p.id,
                    c.name AS company_name,
                    p.position,
                    p.ctc,
                    p."cgpaCutoff",
                    p.deadline,
                    p.status,
                    p.description,
                    COALESCE(
                        json_agg(DISTINCT b.name)
                        FILTER (
                            WHERE b.name IS NOT NULL
                        ),
                        '[]'::json
                    ) AS branches,
                    COALESCE(
                        json_agg(DISTINCT s.name)
                        FILTER (
                            WHERE s.name IS NOT NULL
                        ),
                        '[]'::json
                    ) AS skills
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

        return _rows_to_placements(rows)

    finally:
        connection.close()


def _rows_to_placements(rows) -> list[dict]:
    """Convert database rows into placement dictionaries."""

    results = []

    for row in rows:
        (
            placement_id,
            company_name,
            position,
            ctc,
            cgpa_cutoff,
            deadline,
            status,
            description,
            branches_json,
            skills_json,
        ) = row

        deadline_str = (
            deadline.strftime("%Y-%m-%d")
            if deadline is not None
            else "Not specified"
        )

        results.append(
            {
                "placement_id": placement_id,
                "company_name": company_name,
                "position": position,
                "ctc": ctc,
                "cgpa_cutoff": (
                    float(cgpa_cutoff)
                    if cgpa_cutoff is not None
                    else None
                ),
                "deadline": deadline_str,
                "status": status,
                "description": description,
                "branches": (
                    list(branches_json)
                    if branches_json
                    else []
                ),
                "skills": (
                    list(skills_json)
                    if skills_json
                    else []
                ),
                "source_type": "structured",
            }
        )

    return results