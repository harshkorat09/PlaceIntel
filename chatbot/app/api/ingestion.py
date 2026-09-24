from pathlib import Path
from tempfile import NamedTemporaryFile

from fastapi import APIRouter, File, HTTPException, UploadFile

from app.ingestion.ingest_pdf import ingest_pdf

router = APIRouter(prefix="/ingestion", tags=["ingestion"])

UPLOAD_DIR = Path("data/uploads")
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10 MB


@router.post("/placements/{placement_id}/notice")
async def upload_placement_notice(
    placement_id: int,
    file: UploadFile = File(...),
):
    """
    Receive a placement notice PDF, temporarily store it,
    and pass it through the existing RAG ingestion pipeline.
    """

    if not file.filename:
        raise HTTPException(
            status_code=400,
            detail="A file is required.",
        )

    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are supported.",
        )

    file_bytes = await file.read()

    if not file_bytes:
        raise HTTPException(
            status_code=400,
            detail="The uploaded file is empty.",
        )

    if len(file_bytes) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=413,
            detail="PDF file size must not exceed 10 MB.",
        )

    UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

    temp_path: Path | None = None

    try:
        with NamedTemporaryFile(
            dir=UPLOAD_DIR,
            suffix=".pdf",
            delete=False,
        ) as temp_file:
            temp_file.write(file_bytes)
            temp_path = Path(temp_file.name)

        result = ingest_pdf(
            placement_id=placement_id,
            file_path=temp_path,
        )

        return {
            "success": True,
            "data": result,
        }

    except ValueError as exc:
        raise HTTPException(
            status_code=400,
            detail=str(exc),
        ) from exc

    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail="Failed to ingest placement notice.",
        ) from exc

    finally:
        if temp_path and temp_path.exists():
            temp_path.unlink()