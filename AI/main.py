from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import revision_router, search_router, validation_router

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the revision routes
app.include_router(revision_router, prefix="/revision", tags=["revision"])
# Include the search routes
app.include_router(search_router, prefix="/search", tags=["search"])
# Include the validation routes
app.include_router(validation_router, prefix="/validation", tags=["validation"])
