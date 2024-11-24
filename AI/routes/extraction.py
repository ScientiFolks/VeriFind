from services import ExtractionService
from fastapi import APIRouter, status, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel, HttpUrl

extraction_router = APIRouter()
extraction_service = ExtractionService()

class SummazationRequest(BaseModel):
    url: HttpUrl
    title: str
    
class SummarizationResponse(BaseModel):
    title: str
    url: str
    summary: str
    keywords: list[str]

@extraction_router.post(
    "/summarize-extraction", 
    response_model=SummarizationResponse,
    status_code=status.HTTP_200_OK
)
async def extract_and_summarize(request: SummazationRequest):
    try:
        response = await extraction_service.extract_and_summarize(request.url, request.title)
        print("routes/extraction > extract_pdf")
        # Convert HttpUrl to string in the response
        response['url'] = str(response['url'])
    
        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content=response
        )
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))
    
