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

from dotenv import load_dotenv

class ValidationAgent:
    def __init__(self, data_path):
        # Initialize your language model
        self.llm = ChatGroq(model_name="llama3-70b-8192")

        load_dotenv()

        self.doc = pymupdf.open(data_path)

        self.processed_pages = []

        self.result = None

        for page_id in range (self.doc.page_count):
            self.processed_pages.append(self.doc.load_page(page_id).get_text())
        
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

    def output_page(self):
        batch_size = 3
        num_batches = ceil(len(self.processed_pages) / batch_size)

        for batch_index in range(num_batches):
            # Slice the pages into a batch of three
            start_index = batch_index * batch_size
            end_index = start_index + batch_size
            page_batch = self.processed_pages[start_index:end_index]
            
            # Combine the pages in the batch into one text block
            batched_text = "\n".join(page_batch)
            
            # Process the batched text
            #print(f"Processing batch {batch_index + 1} (Pages {start_index + 1} to {min(end_index, len(processed_pages))})")
            self.result = self.processed_pages(batched_text)
            
            # Print the result for the batch
            print("================================================================")

            break

    def print_final_output(self):
        val_service = ValidationService()
        print(val_service.remove_lines_before_substring((val_service.clean_output(self.result["output"])), "Comparison with Scholarly Works"))