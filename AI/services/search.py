from models import SearchResult, SearchAgent
from configs import SearchConfig

class SearchService:
    def __init__(self) -> None:
        self.search_agent = SearchAgent()

    async def search(
        self,
        query: str,
        search_template: str = SearchConfig.SEARCH_TEMPLATE,
        max_results: int = SearchConfig.DEFAULT_MAX_RESULTS,
        include_domains = [],
        exclude_domains = [],     
    ) -> SearchResult:
        """
            Search the query and return the search results
        """
        print("service/search> SearchService::search")
        return self.search_agent.invoke_search(
            query=query,
            search_template=search_template,
            max_results=max_results,
            include_domains=include_domains,
            exclude_domains=exclude_domains,
        )