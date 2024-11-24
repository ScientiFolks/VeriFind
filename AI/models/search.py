# /models/search.py

from dataclasses import dataclass
from dotenv import load_dotenv
from configs import SearchConfig

from langchain_community.tools import TavilySearchResults
import os


class SearchResult():
    """
    A class used to represent the search results obtained from the Tavily search engine.
    
    Attributes
    ----------
    search_results : list[dict[any]]
        A list of search results obtained from the Tavily search engine.
    """
    def __init__(self, url: str, summarized_text: str, **kwargs):
        self.url = url
        self.summarized_text = summarized_text
        for key, value in kwargs.items():
            setattr(self, key, value)
    
    def __repr__(self):
        return f"SearchResult(url={self.url}, summarized_text={self.summarized_text})"

    def __str__(self):
        return f"SearchResult(url={self.url}, summarized_text={self.summarized_text})"
    
    def __eq__(self, other):
        return self.url == other.url
    

class SearchAgent():
    """
    A class used to represent a search method using the Tavily search engine.
    
    Methods
    -------
    ```python
    invoke_search(query: str, search_template: str = Config.SEARCH_TEMPLATE, max_results: int = Config.DEFAULT_MAX_RESULTS, include_domains: list = [], exclude_domains: list = [])
    ```
    Executes a search query using the Tavily search engine and returns the search results.
        
    """ 
    
    def invoke_search( 
        self,
        query: str,
        search_template: str = SearchConfig.SEARCH_TEMPLATE,
        max_results: int = SearchConfig.DEFAULT_MAX_RESULTS,
        include_domains = [],
        exclude_domains = [],
        **kwargs,
    ) -> SearchResult:
        """
        Executes a search query
        
        returns 
            the search results.
        
        search_results
            The search results obtained from the Tavily search engine.
        """
        
        print("models/search > SearchAgent::invoke_search")
        return self.__tavily_serach(
            query=query,
            search_template=search_template,
            max_results=max_results,
            include_domains=include_domains,
            exclude_domains=exclude_domains,
            **kwargs,
        )
        
    def __searxng_search(
        self,
        query: str,
        search_template: str = SearchConfig.SEARCH_TEMPLATE,
        max_results: int = SearchConfig.DEFAULT_MAX_RESULTS,
        include_domains = [],
        exclude_domains = [],
        **kwargs,
    ) -> SearchResult:
        ...
    
    def __tavily_serach(
        self,
        query: str,
        search_template: str = SearchConfig.SEARCH_TEMPLATE,
        max_results: int = SearchConfig.DEFAULT_MAX_RESULTS,
        include_domains = [],
        exclude_domains = [],
        **kwargs,
    ) -> SearchResult:
        """
        Executes a search query using the Tavily search engine and returns the search results.
        
        search_results
            The search results obtained from the Tavily search engine.
        """
        search = TavilySearchResults(
            max_results=max_results,
            search_depth="advanced",
            include_answer=True,
            include_raw_content=True,
            include_domains=include_domains,
            exclude_domains=exclude_domains,
            # name="...",            # overwrite default tool name
            # description="...",     # overwrite default tool description
            # args_schema=...,       # overwrite default args_schema: BaseModel
        )
        
        search_results = search.invoke(f"{query}; {search_template}")
        
        log_dir = "/AI/logs"
        log_file = os.path.join(log_dir, "search_results.log")

        if not os.path.exists(log_dir):
            os.makedirs(log_dir)

        with open(log_file, "w") as f:
            f.write(str(search_results))
        
        respon = search_results
        respon = self.__map_results_to_search_result(search_results)
        
        return respon

    def __map_results_to_search_result(self, search_results):
        respon = []
        for result in search_results:
            url = result.get("url", "No URL provided")
            content = result.get("content", "No content provided")
            respon.append(SearchResult(url=url, summarized_text=content))
        return respon
    
