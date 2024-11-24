from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate

class SummarizeAgent:
    def __init__(self,  content, title="",):
        self.content = content
        self.title = title
    
    def summarize(self, max_token_limit=2048):
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