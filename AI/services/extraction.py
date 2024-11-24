from models import ContentExtraction, SummarizeAgent

class ExtractionService:
    
    async def extract_and_summarize(self, url: str, title: str):
        
        
        content_extractor = ContentExtraction(url)
        content = content_extractor.extract_content_factory()
        
        if content == "Unsupported content type":
            return {"title": title, "url": url, "summary": "Unsupported content type"}
        
        summarize_agent = SummarizeAgent(content, title=title)
        summary = summarize_agent.summarize()
        
        return {"title": title, "url": url, "summary": summary}
    
    