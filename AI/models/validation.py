# /models/validation.py
import pymupdf
from langchain_groq import ChatGroq
from langchain.agents import create_react_agent
from langchain.prompts import PromptTemplate
from langchain.agents.format_scratchpad.openai_tools import (
    format_to_openai_tool_messages,
)
from math import ceil
from langchain_community.tools.tavily_search import TavilySearchResults
from services import VerboseAgentExecutor, ValidationService
from contextlib import redirect_stdout
from langchain.agents import AgentExecutor
from io import StringIO
from typing import List

from dotenv import load_dotenv


class VerboseAgentExecutor(AgentExecutor):
    def invoke(self, inputs):
        verbose_output = StringIO()
        
        # Redirect verbose output to a string
        with redirect_stdout(verbose_output):
            result = super().invoke(inputs)
        
        # Capture verbose output
        verbose_text = verbose_output.getvalue()
        
        # Append verbose output to the result
        if isinstance(result, dict) and "output" in result:
            result["output"] += f"\n\nVerbose Output:\n{verbose_text}"
        else:
            result = {"output": f"Verbose Output:\n{verbose_text}"}
        
        return result

class ValidationAgent:
    def __init__(self):
        # Initialize your language model
        self.llm = ChatGroq(model_name="llama3-70b-8192")

        load_dotenv()

        # Define your tool(s)
        self.tavily_tool = TavilySearchResults(
                                            max_results=3,
                                            include_answer=True,
                                            include_raw_content=False,  
                                            include_images=False,       
                                            search_depth="basic"        
                                        )
        self.tools = [self.tavily_tool]

        # Create the prompt template
        self.prompt_template = PromptTemplate.from_template(
            """You are an AI research assistant. Your task is to analyze and validate scholarly documents.
            Answer the following questions as best you can. You have access to the following tools:

            {tools}
            

            Use the following format:

        Question: the input question you must answer
        Thought: you should always think about what to do
        Action: the action to take, should be one of [{tool_names}], `tavily_search_results_json`: Use this tool to search scholarly documents. Ensure to format the input properly.
        Action Input: the input to the action
        Observation: the result of the action
        ... (this Thought/Action/Action Input/Observation cannot repeat N times)
        Final Answer: the final answer to the original input question

        Begin!

        Question: {input}
        Thought:{agent_scratchpad}
            """
        )

        # Initialize the agent executor
        self.agent = create_react_agent(self.llm, self.tools, self.prompt_template)
        self.agent_executor = VerboseAgentExecutor(agent=self.agent, tools=self.tools, verbose=True, max_iterations=2, handle_parsing_errors=True)
    
    def process_page(self, page_content, reference_documents):
        prompt = f"""
        Analyze the following document text:

        {page_content}

        1. Compare it to these three scholarly works:

        {reference_documents}

        2. Highlight:
            - Areas of agreement
            - Discrepancies or novel ideas
            - Suggestions for improvement
        Stop reasoning as soon as you reach the final answer and do not attempt further actions.

        Answer with the following format:
        1. **Comparison with Scholarly Works**: List out the scholarly works that are being compared to the analyzed document, following the format [1], [2], [3], etc.
        2. **Areas of Agreement**: Summarize commonalities among the documents.
        3. **Discrepancies or Novel Ideas**: Highlight differences or unique contributions.
        4. **Suggestions for Improvement**: Provide recommendations for enhancing the analyzed document.
        5. **Final Answer**: Conclude with a final answer to the original input question.

        """
        return self.agent_executor.invoke({"input": prompt, "tools":self.tools, "tool_name": "tavily_search_results_json", "agent_scratchpad": lambda x: format_to_openai_tool_messages(
                x["intermediate_steps"]
            ),})

    def validate_document(self, processed_pages : List[str]) -> dict:
        batch_size = 1
        num_batches = ceil(len(processed_pages) / batch_size)
        results = []

        for batch_index in range(num_batches):
            # Slice the pages into a batch of three
            start_index = batch_index * batch_size
            end_index = start_index + batch_size
            page_batch = processed_pages[start_index:end_index]
            
            # Combine the pages in the batch into one text block
            batched_text = "\n".join(page_batch)
            
            # Process the batched text
            result = {
                "page_id" : batch_index,
                "suggestions" : self.process_pages(batched_text)["output"]
            }

            results.append(result)
        
        return results