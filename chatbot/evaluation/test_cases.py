from dataclasses import dataclass


@dataclass(frozen=True)
class EvaluationCase:
    """
    Represents one RAG evaluation scenario.

    expected_facts:
        Facts that should be supported by the retrieved notice.

    expected_source:
        Expected source notice when the question is answerable.

    expected_pages:
        Pages where the supporting information exists.

    should_retrieve:
        Whether the question is expected to have relevant
        placement information in the knowledge base.

    expected_answer_keywords:
        Important terms we expect to see in a correct answer.
        This is only a lightweight heuristic, not a complete
        semantic evaluation.
    """

    id: str
    question: str
    expected_facts: list[str]
    expected_source: str | None
    expected_pages: list[int]
    should_retrieve: bool
    expected_answer_keywords: list[str]


SOURCE = "TCS_NQT_Notice_2026_-_19.02.2026.pdf"


EVALUATION_CASES = [

    # ---------------------------------------------------------
    # TC01 - Package
    # ---------------------------------------------------------

    EvaluationCase(
        id="TC01",
        question="What is the CTC package for the TCS Prime category?",
        expected_facts=[
            "Prime package varies by candidate category and experience.",
            "UG 0–1 year: 9.09–9.30 LPA.",
            "PG 0–1 year: 11.59–11.80 LPA.",
            "UG 1–2 years: 9.45–9.66 LPA.",
            "PG 1–2 years: 12.05–12.26 LPA.",
        ],
        expected_source=SOURCE,
        expected_pages=[1],
        should_retrieve=True,
        expected_answer_keywords=[
            "Prime",
            "LPA",
        ],
    ),

    # ---------------------------------------------------------
    # TC02 - Academic eligibility
    # ---------------------------------------------------------

    EvaluationCase(
        id="TC02",
        question="What academic percentage is required for TCS NQT 2026?",
        expected_facts=[
            "Minimum 60% or equivalent CGPA is required.",
            "The requirement applies to Class 10th, 12th, Diploma if applicable, Graduation, and PG if applicable.",
        ],
        expected_source=SOURCE,
        expected_pages=[1],
        should_retrieve=True,
        expected_answer_keywords=[
            "60%",
            "CGPA",
        ],
    ),

    # ---------------------------------------------------------
    # TC03 - Degree eligibility
    # ---------------------------------------------------------

    EvaluationCase(
        id="TC03",
        question="Which degrees are eligible for the TCS NQT 2026 recruitment?",
        expected_facts=[
            "B.Tech",
            "B.E",
            "M.Tech",
            "M.E",
            "MCA",
            "M.Sc (M.S)",
            "Any specialization from an AICTE/UGC recognised university.",
        ],
        expected_source=SOURCE,
        expected_pages=[1],
        should_retrieve=True,
        expected_answer_keywords=[
            "B.Tech",
            "B.E",
            "M.Tech",
            "MCA",
        ],
    ),

    # ---------------------------------------------------------
    # TC04 - Experience and age
    # ---------------------------------------------------------

    EvaluationCase(
        id="TC04",
        question="How much work experience and what age limit are allowed for TCS NQT 2026?",
        expected_facts=[
            "Candidates with up to 2 years of experience are eligible.",
            "Age limit is 18 to 28 years.",
        ],
        expected_source=SOURCE,
        expected_pages=[1],
        should_retrieve=True,
        expected_answer_keywords=[
            "2 years",
            "18",
            "28",
        ],
    ),

    # ---------------------------------------------------------
    # TC05 - Test pattern
    # ---------------------------------------------------------

    EvaluationCase(
        id="TC05",
        question="What is the TCS NQT integrated test pattern and total duration?",
        expected_facts=[
            "Part A is the Foundation Section and is mandatory for all.",
            "Part A duration is 75 minutes.",
            "Numerical Ability, Verbal Ability, and Reasoning Ability are 25 minutes each.",
            "Part B is mandatory for Prime and Digital.",
            "Part B duration is 115 minutes.",
            "Advanced Quantitative and Reasoning Ability is 25 minutes.",
            "Advanced Coding is 90 minutes.",
            "Total duration is 190 minutes.",
        ],
        expected_source=SOURCE,
        expected_pages=[1, 2],
        should_retrieve=True,
        expected_answer_keywords=[
            "75",
            "115",
            "90",
            "190",
        ],
    ),

    # ---------------------------------------------------------
    # TC06 - Registration deadline
    # ---------------------------------------------------------

    EvaluationCase(
        id="TC06",
        question="When does registration close for TCS NQT 2026?",
        expected_facts=[
            "The last date to register is 20 March 2026.",
        ],
        expected_source=SOURCE,
        expected_pages=[1],
        should_retrieve=True,
        expected_answer_keywords=[
            "20 March 2026",
        ],
    ),

    # ---------------------------------------------------------
    # TC07 - Application process
    # ---------------------------------------------------------

    EvaluationCase(
        id="TC07",
        question="What are the important steps for applying to the TCS NQT drive?",
        expected_facts=[
            "Register or log in through the TCS NextStep Portal.",
            "Choose the IT category for new users.",
            "Click Apply For Drive.",
            "Select the skill for evaluation.",
            "Choose In-Centre test mode and select 3 preferred test centres.",
            "Select 3 preferred job cities.",
            "Confirm Track Your Application shows Applied for Drive.",
        ],
        expected_source=SOURCE,
        expected_pages=[2],
        should_retrieve=True,
        expected_answer_keywords=[
            "Apply For Drive",
            "3 preferred test centres",
            "3 preferred job cities",
        ],
    ),

    # ---------------------------------------------------------
    # TC08 - Important recruitment notice
    # ---------------------------------------------------------

    EvaluationCase(
        id="TC08",
        question="Does the TCS notice say candidates have to pay money during recruitment?",
        expected_facts=[
            "The notice says TCS does not ask candidates to deposit any money at any stage of recruitment.",
        ],
        expected_source=SOURCE,
        expected_pages=[2],
        should_retrieve=True,
        expected_answer_keywords=[
            "does not",
            "money",
        ],
    ),

    # ---------------------------------------------------------
    # TC09 - Missing information / hallucination test
    # ---------------------------------------------------------

    EvaluationCase(
        id="TC09",
        question="What exact interview questions will TCS ask each candidate?",
        expected_facts=[
            "The provided notice does not specify exact interview questions.",
        ],
        expected_source=SOURCE,
        expected_pages=[1, 2],
        should_retrieve=True,
        expected_answer_keywords=[
            "not",
            "notice",
        ],
    ),

    # ---------------------------------------------------------
    # TC10 - Completely unrelated question
    # ---------------------------------------------------------

    EvaluationCase(
        id="TC10",
        question="What is the weather in Anand today?",
        expected_facts=[
            "The placement knowledge base does not contain weather information.",
            "The assistant should not answer using general world knowledge.",
        ],
        expected_source=None,
        expected_pages=[],
        should_retrieve=False,
        expected_answer_keywords=[
            "placement",
        ],
    ),
]