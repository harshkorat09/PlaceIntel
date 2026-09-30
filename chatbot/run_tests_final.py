import requests
import time

URL = "http://localhost:8000/chat"
user_id = 1

def run_scenario(scenario_name, questions):
    print(f"\n{'='*60}\n{scenario_name}\n{'='*60}")
    session_id = None
    for q in questions:
        print(f"\nQ: {q}")
        payload = {"question": q, "user_id": user_id}
        if session_id:
            payload["session_id"] = session_id
        start = time.time()
        resp = requests.post(URL, json=payload, timeout=45)
        end = time.time()
        if resp.status_code == 200:
            data = resp.json()
            session_id = data.get("session_id")
            print(f"A: {data['answer']}")
            print(f"Sources:")
            for s in data.get('sources', []):
                print(f"  - {s['notice']} (Pages: {s['pages']})")
            print(f"[Time: {end-start:.2f}s | Session: {session_id}]")
        else:
            print(f"Error {resp.status_code}: {resp.text}")


if __name__ == "__main__":
    scenario_1 = [
        "What is the CTC for PlaceIntel RAG Test Company?",
        "What is the minimum CGPA?",
        "Which companies accept CSE?",
        "Which companies require Python?",
        "Which company has the highest CTC?",
        "Compare TCS and Infosys.",
        "Which company is better if I prioritize higher CTC?",
        "What is the TCS selection process?",
        "Which company has the highest CTC and what is its selection process?",
        "Which one has the lower CGPA requirement?",
        "What is the CEO name for PlaceIntel RAG Test Company?",
        "What is the capital of France?",
        "What is the minimum CGPA for PlaceIntel RAG Test Company?",
        "What about the eligibility for that company?"
    ]

    run_scenario("SCENARIO 1: Comprehensive Intent Test", scenario_1)
