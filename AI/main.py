from fastapi import FastAPI
from routes import revision_router, search_router, validation_router

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

# Include the revision routes
app.include_router(revision_router, prefix="/revision", tags=["revision"])
# Include the search routes
app.include_router(search_router, prefix="/search", tags=["search"])
# Include the validation routes
app.include_router(validation_router, prefix="/validation", tags=["validation"])
