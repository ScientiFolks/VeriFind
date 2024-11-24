from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from langchain_community.graph_vectorstores.extractors import KeybertLinkExtractor
from langchain_core.documents import Document


class SummarizeAgent:
    def __init__(self,  content, title="",):
        self.content = content
        self.title = title
    
    def summarize(self, max_token_limit=2048) -> str:
        """method to summarize the content
        
        Args:
            max_token_limit (int, optional): maximum token limit for batch  summarization. Defaults to 2048.
            
        Returns:
            str: summary of the content
        """
        print("SummarizeAgent > summarize")
        chat_groq = ChatGroq(
            model="llama3-8b-8192",
            temperature=0.2,
            max_tokens=512,
            timeout=50,  # 60 seconds timeout
            max_retries=2,
            # other params...
        )
        
        system = """You are a helpful assistant. Your task is to review a document and provide a detailed summary of its content. 
Focus on capturing the main ideas, key points, and important details."""
        
        tokens = self.content.split()
        summaries = []
        chunk_size = max_token_limit - 100 # 100 tokens for the prompt
        
        for i in range(0, len(tokens), chunk_size):
            chunk = " ".join(tokens[i:i+chunk_size])
            human = "Summarize the following text about {title}, focusing on key points and academic relevance:\n\n{chunk}"
            prompt = ChatPromptTemplate.from_messages([("system", system), ("human", human)])
            summarize_agent = prompt | chat_groq
            try:
                response = summarize_agent.invoke({"title": self.title, "chunk": chunk})
                summaries.append(response.content)
            except Exception as e:
                summaries.append(f"Error summarizing content: {str(e)}")
                
        return " ".join(summaries)
    
    
    def summary_keyword_extraction(self, summary: str) -> list[str]:
        """method to extract keywords from the summary

        Args:
            summary (str): summary of the content

        Returns:
            list[str]: list of keywords extracted from the summary
        """
        print("SummarizeAgent > keyword_extraction")
        keyword_extractor = KeybertLinkExtractor()
        document = Document(page_content=summary)
        links = keyword_extractor.extract_one(document)
        return [link.tag for link in links]
    