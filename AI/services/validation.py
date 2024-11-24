from models import ValidationAgent, RevisionAgent
from services import RevisionService
from fastapi import UploadFile
import pymupdf
import re


class ValidationService:
    def __init__(self) -> None:
        self.validation_agent = ValidationAgent()
        self.revision_service = RevisionService()
        self.revision_agent = RevisionAgent()

    async def remove_lines_before_substring(self, text, substring):
        lines = text.splitlines()
        for i, line in enumerate(lines):
            if substring in line:
                return "\n".join(lines[i:]) 
        return text
    
    async def clean_output(self, raw_output):
        iterations = re.split(r"(I will analyze the document.*)", raw_output, flags=re.DOTALL)
        
        if len(iterations) > 1:
            last_iteration = iterations[-2] + iterations[-1]  
        else:
            last_iteration = raw_output
        
        cleaned_output = re.sub(r"(Action:.*|Action Input:.*|Invalid Format:.*|Thought:.*)", "", last_iteration).strip()

        final_output = await self.remove_lines_before_substring(
            cleaned_output.replace("> Finished chain.", ""), 
            "Comparison with Scholarly Works"
        )
        return final_output
    

    
    async def validate_document(self, file: UploadFile):
        doc = await self.revision_service.load_document(file)
        processed_pages = []

        for page_id in range(doc.page_count):
            processed_pages.append(doc.load_page(page_id).get_text())

        responses = self.validation_agent.validate_document(processed_pages)

        suggestions = ""

        for response in responses:
            response["suggestions"] = await self.clean_output(response["suggestions"])
            suggestions += f"\n\n Page {response['page_id']+1} \n  {response['suggestions']}"

        suggestion_summary = self.revision_agent.summary_suggestion(suggestions)
        
        return {
            "summary": suggestion_summary.content,
            "suggestions": responses
        }

    
    async def validate_statement(self, statement: str) -> str:
        response = self.validation_agent.validate_document([statement])
        final_response = self.clean_output(response[0]["output"])

        return final_response