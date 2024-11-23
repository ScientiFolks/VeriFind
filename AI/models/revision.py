from langchain_core.prompts import ChatPromptTemplate
from langchain_core.messages.ai import AIMessage
from langchain_groq import ChatGroq
from dotenv import load_dotenv

load_dotenv()

class RevisionAgent:
    def __init__(self) -> None:
        self.__init_revise_agent()
        self.__init_summary_agent()
        
    def __init_revise_agent(self) -> None:
        chat = ChatGroq(temperature=0, model_name="llama3-8b-8192")
        system = """You are a helpful assistant. You will be gift a document to review and suggest improvements for from a writing perspective. 
                    Please focus on the following aspects:

                    Clarity: Identify any ambiguous or unclear sections and suggest ways to make them more straightforward.
                    Grammar and Style: Highlight grammatical errors, awkward phrasing, and inconsistencies in tone or style. Provide corrections or rephrasings.
                    Structure and Organization: Suggest improvements in the flow of ideas, logical progression, and transitions between sections or paragraphs.
                    Conciseness: Identify redundant or overly wordy sections and suggest ways to make the text more concise without losing meaning.
                    Engagement: Suggest ways to make the writing more engaging, persuasive, or appealing to the intended audience.

                    Feel free to structure your suggestions by sections or paragraph numbers."""
        human = """ Please provide specific feedback along with examples or rewritten versions where applicable. Only include the suggestions content without any bridging. Here's the document:
                {document}"""
        prompt = ChatPromptTemplate.from_messages([("system", system), ("human", human)])

        self.revise_agent = prompt | chat   

    def __init_summary_agent(self) -> None:
        chat = ChatGroq(temperature=0, model_name="llama3-8b-8192")
        system = "You are a helpful assistant."
        human = "{text} from this {suggestions}"
        prompt = ChatPromptTemplate.from_messages([("system", system), ("human", human)])

        self.summary_agent = prompt | chat

    def revise_document(self, document: str) -> AIMessage:
        return self.revise_agent.invoke({"document": document})
    
    def summary_suggestion(self, suggestions) -> AIMessage:
        return self.summary_agent.invoke({"text": "Write summary for suggestion each page", "suggestions": suggestions})