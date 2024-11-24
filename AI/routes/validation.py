from fastapi import APIRouter, status, HTTPException, Depends, UploadFile
from services import ValidationService

validation_router = APIRouter()
validation_service = ValidationService()

@validation_router.post("/pdf")
async def validate_pdf(file:UploadFile):
    try:
        response = await validation_service.validate_document(file)
        return {"status": status.HTTP_200_OK, "data": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@validation_router.post("/statement")
async def validate_statement(statement: str):
    try:
        response = await validation_service.validate_statement(statement)
        return {"status": status.HTTP_200_OK, "data": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))