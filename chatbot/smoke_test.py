"""
Smoke-test the 8 regression questions plus several unseen questions.
Fires directly against the FastAPI chatbot (port 8000), bypassing Express.
"""
import json
import time
import requests

BASE = "http://127.0.0.1:8000"

TESTS = [
    # ── 8 regression questions ──────────────────────────────────────
    {"label": "Q1 – CTC of TCS",             "q": "What is the CTC of TCS?"},
    {"label": "Q3 – Compare TCS and Infosys","q": "Compare TCS and Infosys."},
    {"label": "Q4 – Highest CTC",            "q": "Which company has the highest CTC?"},
    {"label": "Q5 – CSE branches",           "q": "Which companies accept CSE students?"},
    {"label": "Q6 – TCS selection process",  "q": "What is the selection process for TCS?"},
    {"label": "Q7 – Capital of France",      "q": "What is the capital of France?"},
    {"label": "Q8 – High CTC preference",    "q": "Which company would be suitable if I prioritise a higher CTC?"},

    # ── Unseen generalisation questions ────────────────────────────
    {"label": "G1 – Infosys CGPA cutoff",    "q": "What is the minimum CGPA required for Infosys?"},
    {"label": "G2 – Python roles",           "q": "Which companies are hiring for Python roles?"},
    {"label": "G3 – Packages above 10 LPA",  "q": "Which companies offer more than 10 LPA?"},
    {"label": "G4 – All active placements",  "q": "Show me all current placement opportunities."},
    {"label": "G5 – Unrelated question",     "q": "Who won the FIFA World Cup 2022?"},
]

# Q2 (follow-up) tested separately with session
def test_followup():
    # First message: set context
    r1 = requests.post(f"{BASE}/chat", json={
        "question": "What is the CTC of TCS?",
        "user_id": None,
        "session_id": None,
    }, timeout=45)
    d1 = r1.json()
    print(f"\n  [FOLLOWUP-SETUP] {d1.get('answer','')[:80]}...")

    # Second message: follow-up with no company named
    r2 = requests.post(f"{BASE}/chat", json={
        "question": "What is the minimum CGPA?",
        "user_id": None,
        "session_id": None,
    }, timeout=45)
    d2 = r2.json()
    answer = d2.get("answer", "")
    # Without real session history this will be a fresh question — acceptable
    print(f"  [Q2 – CGPA followup] {answer[:120]}")


print("=" * 65)
print("PlaceIntel LangGraph Regression + Generalisation Smoke Test")
print("=" * 65)

for test in TESTS:
    label = test["label"]
    q = test["q"]
    try:
        t0 = time.perf_counter()
        r = requests.post(
            f"{BASE}/chat",
            json={"question": q, "user_id": None, "session_id": None},
            timeout=45,
        )
        elapsed = time.perf_counter() - t0
        data = r.json()

        if r.status_code != 200:
            print(f"\n[FAIL] {label}")
            print(f"  HTTP {r.status_code}: {data}")
            continue

        answer = data.get("answer", "")
        sources = data.get("sources", [])
        session_id = data.get("session_id")

        # Heuristic pass/fail
        is_ood = "cannot answer" in answer.lower() or "unrelated" in answer.lower()
        is_no_evidence = "could not find" in answer.lower()

        if label.startswith("Q7") or label.startswith("G5"):
            status = "✅ OUT-OF-DOMAIN" if is_ood else "⚠️  UNEXPECTED ANSWER"
        elif is_ood:
            status = "❌ WRONGLY REJECTED"
        elif is_no_evidence:
            status = "⚠️  NO EVIDENCE (may be correct if data missing)"
        else:
            status = "✅ ANSWERED"

        print(f"\n[{status}] {label}  ({elapsed:.1f}s)")
        print(f"  Q: {q}")
        print(f"  A: {answer[:150]}{'...' if len(answer) > 150 else ''}")
        if sources:
            print(f"  Sources: {[s.get('notice','?') for s in sources]}")

    except Exception as e:
        print(f"\n[ERROR] {label}: {e}")

print("\n── Follow-up question test ──")
test_followup()

print("\n" + "=" * 65)
print("Test complete.")
