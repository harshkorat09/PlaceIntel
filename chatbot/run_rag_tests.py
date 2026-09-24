import requests
import json
import time

URL = "http://localhost:8000/chat"

def test_query(test_name, question):
    print(f"\n{'='*50}\n{test_name}\nQ: {question}\n{'-'*50}")
    try:
        start = time.time()
        resp = requests.post(URL, json={"question": question}, timeout=30)
        end = time.time()
        
        if resp.status_code == 200:
            data = resp.json()
            print(f"A: {data['answer']}")
            print(f"\nSources:")
            for s in data.get('sources', []):
                print(f"  - {s['notice']} (Pages: {s['pages']})")
            print(f"\n[Time: {end-start:.2f}s]")
        else:
            print(f"Error {resp.status_code}: {resp.text}")
    except Exception as e:
        print(f"Exception: {e}")

if __name__ == "__main__":
    # Test 1: Structured only
    test_query("TEST 1: Structured Data Only", "What is the CTC for PlaceIntel RAG Test Company?")
    
    # Test 2: PDF Data Only
    test_query("TEST 2: PDF Data Only", "Are there any service bonds mentioned for tech placements?")
    
    # Test 3: Hybrid
    test_query("TEST 3: Hybrid Data", "What is the CTC for PlaceIntel RAG Test Company and what is its selection process or test format?")
    
    # Test 4: Hallucination Check
    test_query("TEST 4: Unsupported Information", "What is the CTC for Microsoft?")
