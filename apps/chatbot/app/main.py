from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="PlaceIntel Chatbot", version="0.1.0")

class ChatRequest(BaseModel):
    question: str

@app.get("/health")
def health():
    return {"service": "placeintel-chatbot", "status": "ok"}

@app.post("/chat")
def chat(payload: ChatRequest):
    return {"answer": "Chatbot retrieval is ready to be connected.", "source_notice": None}
