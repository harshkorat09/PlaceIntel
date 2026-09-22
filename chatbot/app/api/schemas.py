from pydantic import BaseModel, Field


class ChatRequest(BaseModel):
    question: str = Field(..., min_length=1)


class SourceReference(BaseModel):
    notice: str
    pages: list[int]


class ChatResponse(BaseModel):
    answer: str
    sources: list[SourceReference]