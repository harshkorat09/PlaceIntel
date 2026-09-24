import os
import sys

# Set up the python path to include the current directory
sys.path.insert(0, os.path.abspath("."))

from app.generation.question_resolver import resolve_question

history = [
    {"role": "USER", "content": "What is the CTC for PlaceIntel RAG Test Company?"},
    {"role": "ASSISTANT", "content": "The CTC for PlaceIntel RAG Test Company is 12.0 LPA."}
]

res = resolve_question("What is the minimum CGPA?", history)
print("Result 1:")
print(f"is_placement_related: {res.is_placement_related}")
print(f"resolved_query: {res.resolved_query}")
print(f"active_company: {res.active_company}")

res2 = resolve_question("Which branches are eligible?", history + [
    {"role": "USER", "content": "What is the minimum CGPA?"},
    {"role": "ASSISTANT", "content": "The minimum CGPA is 7.5"}
])
print("\nResult 2:")
print(f"is_placement_related: {res2.is_placement_related}")
print(f"resolved_query: {res2.resolved_query}")
print(f"active_company: {res2.active_company}")
