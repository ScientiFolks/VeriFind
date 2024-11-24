import requests
from bs4 import BeautifulSoup
import PyPDF2
import io
from .summarize_agent import SummarizeAgent

class ContentExtraction:
    def __init__(self, url):
        
        self.url = url

    def extract_content_factory(self):
        try:
            response = requests.get(self.url, timeout=10)
            content_type = response.headers.get('Content-Type', '').lower()

            if 'application/pdf' in content_type:
                return self.extract_pdf_content(response.content)
            elif 'text/html' in content_type:
                return self.extract_html_content(response.content)
            elif 'text/plain' in content_type:
                return self.extract_text_content(response.content)
            else:
                return "Unsupported content type"
        except Exception as e:
            return f"Error extracting content: {str(e)}"
        
    def extract_pdf_content(self, pdf_content):
        pdf_file = io.BytesIO(pdf_content)
        pdf_reader = PyPDF2.PdfReader(pdf_file)
        content = ""
        for page in pdf_reader.pages:
            content += page.extract_text()
        return content

    def extract_html_content(self, html_content):
        soup = BeautifulSoup(html_content, 'html.parser')
        return soup.get_text(separator=' ', strip=True)
    
    def extract_text_content(self, text_content):
        return text_content
        

from dotenv import load_dotenv
if __name__ == "__main__":
    load_dotenv()
    
    url = "https://arxiv.org/pdf/1706.03762"
    content_extractor = ContentExtraction(url)
    content = content_extractor.extract_content_factory()
    
    summarize_agent = SummarizeAgent(content)
    summary = summarize_agent.summarize()
    print(summary)
    ...