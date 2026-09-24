import requests
import json
import time

URL = "http://localhost:8000/chat"
user_id = 1

def run_scenario(scenario_name, questions):
    print(f"\n{'#'*60}\n{scenario_name}\n{'#'*60}")
    session_id = None
    for q in questions:
        print(f"\nQ: {q}")
        payload = {"question": q, "user_id": user_id}
        if session_id:
            payload["session_id"] = session_id
        start = time.time()
        resp = requests.post(URL, json=payload, timeout=30)
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
        "Which branches are eligible?",
        "What skills are required?",
        "How can I apply for this company?"
    ]
    
    scenario_2 = [
        "What is the minimum CGPA for TCS RAG Test?",
        "What is the CTC?"
    ]
    
    scenario_3 = [
        "What is the minimum CGPA for Microsoft?"
    ]
    
    scenario_4 = [
        "Are there any service bonds mentioned for tech placements?"
    ]

    run_scenario("SCENARIO 1: Deep follow-up context", scenario_1)
    run_scenario("SCENARIO 2: Explicit switch", scenario_2)
    run_scenario("SCENARIO 3: Missing Company", scenario_3)
    run_scenario("SCENARIO 4: Existing PDF retrieval", scenario_4)
