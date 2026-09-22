from fastapi import FastAPI

from app.api.chat import router as chat_router


app = FastAPI(
    title="PlaceIntel AI Service",
    description="RAG and AI service for the PlaceIntel platform",
    version="0.1.0",
)


app.include_router(chat_router)


@app.get("/health")
async def health_check():
    return {
        "success": True,
        "service": "placeintel-ai",
        "status": "healthy",
    }