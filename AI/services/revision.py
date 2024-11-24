from fastapi import UploadFile
from models import RevisionAgent
from typing import List
import pymupdf

class RevisionService:
    def __init__(self) -> None:
        self.revision_agent = RevisionAgent()
        pass

    async def load_document(self, file: UploadFile) -> pymupdf.Document:
        """
            Load PDF / DOCX Model and convert it to Document
        """
        contents = await file.read()
        document = pymupdf.Document(stream=contents, filetype="pdf")
        return document
    
    async def revise_document_writing(self, document: pymupdf.Document) -> List[dict]: 
        """
            Give suggestions to improve the document writing
        """
        responses = []

        for page_id in range (document.page_count):
            page = document.load_page(page_id)
            response = self.revision_agent.revise_document(page.get_text())
            responses.append({
                "page_id" : page_id,
                "suggestions" : response.content
            })
        
        return responses
    
    async def revise_document(self, file: UploadFile) -> dict:
        """
            Give suggestions to revise the document from content validity and writing aspect
        """
        document = await self.load_document(file)
        responses = await self.revise_document_writing(document)

        suggestions = ""

        for response in responses:
            suggestions += (f"\n\n Page {response['page_id']+1} \n  {response['suggestions']}")

        suggestion_summary = self.revision_agent.summary_suggestion(suggestions)
        
        return {
            "summary": suggestion_summary.content,
            "suggestions": suggestions
        }
    
    async def revise_statement(self, statement: str) -> str:
        """
            Give suggestions to revise the statement from content validity and writing aspect
        """
        suggestions = self.revision_agent.revise_document(statement)

        return suggestions.content