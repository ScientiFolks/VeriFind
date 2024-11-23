from fastapi import APIRouter, status, HTTPException, Depends, UploadFile
from services.revision import RevisionService

revision_router = APIRouter()
revision_service = RevisionService()

@revision_router.post("/pdf")
async def revise_pdf(file:UploadFile):
    response = await revision_service.revise_document(file)
    return {"status": status.HTTP_200_OK, "data": response}