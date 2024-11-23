from fastapi import FastAPI
from routes.revision import revision_router

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

# Include the revision routes
app.include_router(revision_router, prefix="/revision", tags=["revision"])