from services import SearchService
from fastapi import APIRouter, status, HTTPException, Depends, UploadFile

search_router = APIRouter()
search_service = SearchService()


@search_router.post("/search")
async def search_query(query: str, max_results: int = 10, include_domains = [], exclude_domains = []):
    try:
        response = await search_service.search(
            query=query,
            max_results=max_results,
            include_domains=include_domains,
            exclude_domains=exclude_domains,
        )
        
        
        print("routes/search > search_query")
        return {"status": status.HTTP_200_OK, "data": response}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
    