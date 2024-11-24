import os

class SearchConfig():
    SEARCH_TEMPLATE: str = "Search only from documents, articels, papers, journals, books and pdf and must have title" 
    DEFAULT_MAX_RESULTS: int = 5
    DEFAULT_SEARX_HOST: str = os.getenv("SEARX_HOST", "http://127.0.0.1:8888")  # from env
