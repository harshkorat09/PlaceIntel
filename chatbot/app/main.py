from fastapi import FastAPI

app = FastAPI(
    title="PlaceIntel AI Service",
    description="RAG and AI service for the PlaceIntel platform",
    version="0.1.0",
)


@app.get("/health")
async def health_check():
    return {
        "success": True,
        "service": "placeintel-ai",
        "status": "healthy",
    }