from fastapi import APIRouter, status, HTTPException, Depends, UploadFile
from services import RevisionService

revision_router = APIRouter()
revision_service = RevisionService()

@revision_router.post("/pdf")
async def revise_pdf(file:UploadFile):
    try:
        response = await revision_service.revise_document(file)
        return {"status": status.HTTP_200_OK, "data": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@revision_router.post("/statement")
async def revise_statement(statement: str):
    try:
        response = await revision_service.revise_statement(statement)
        return {"status": status.HTTP_200_OK, "data": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))