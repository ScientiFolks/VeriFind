from services import ExtractionService
from fastapi import APIRouter, status, HTTPException
from pydantic import BaseModel, HttpUrl

extraction_router = APIRouter()
extraction_service = ExtractionService()

class SummazationRequest(BaseModel):
    url: HttpUrl
    title: str
    
class SummarizationResponse(BaseModel):
    title: str
    url: HttpUrl
    summary: str

@extraction_router.post("/summarize-extraction", response_model=SummarizationResponse)
async def extract_and_summarize(request: SummazationRequest):
    try:
        print(request)
        response = await extraction_service.extract_and_summarize(request.url, request.title)
        print("routes/extraction > extract_pdf")
        return response
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))
    
