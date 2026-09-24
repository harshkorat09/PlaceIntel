from fastapi import FastAPI

from app.api.chat import router as chat_router
from app.api.ingestion import router as ingestion_router


app = FastAPI(
    title="PlaceIntel AI Service",
    description="RAG and AI service for the PlaceIntel platform",
    version="0.1.0",
)


# ---------------------------------------------------------
# API Routers
# ---------------------------------------------------------

# Chatbot / RAG endpoint
app.include_router(chat_router)

# Placement notice ingestion endpoint
app.include_router(ingestion_router)


# ---------------------------------------------------------
# Health Check
# ---------------------------------------------------------

@app.get("/health")
async def health_check():
    return {
        "success": True,
        "service": "placeintel-ai",
        "status": "healthy",
    }