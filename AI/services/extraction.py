from fastapi import HTTPException, status
from models import ContentExtraction, SummarizeAgent

class ExtractionService:
    
    async def extract_and_summarize(self, url: str, title: str):
        try:
            content_extractor = ContentExtraction(url)
            content = content_extractor.extract_content_factory()
            
            if content == "Unsupported content type":
                raise HTTPException(
                    status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
                    detail="Unsupported content type"
                )
            print("services/extraction > extract_and_summarize 1")
            
            summarize_agent = SummarizeAgent(content, title=title)
            summary = summarize_agent.summarize()
            
            if not summary:
                raise HTTPException(
                    status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                    detail="Error summarizing content"
                )
            print("services/extraction > extract_and_summarize 2")
            
            keyword_extraction = summarize_agent.summary_keyword_extraction(summary)
            
            return {
                "title": title, 
                "url": url, 
                "summary": summary, 
                "keywords": keyword_extraction
            }
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
    
    