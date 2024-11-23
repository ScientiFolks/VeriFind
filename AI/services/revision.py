from fastapi import UploadFile
from models.revision import RevisionAgent
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
    
    async def revise_document_writing(self, document: pymupdf.Document): 
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
    
    async def revise_document(self, file: UploadFile):
        """
            Give suggestions to revise the document from content validity and writing aspect
        """
        document = await self.load_document(file)
        responses = await self.revise_document_writing(document)

        return responses