import os
import pymupdf
from langchain_groq import ChatGroq
from langchain.agents import AgentExecutor, create_react_agent
from langchain.prompts import PromptTemplate
from langchain.agents.format_scratchpad.openai_tools import (
    format_to_openai_tool_messages,
)
import re
from io import StringIO
from contextlib import redirect_stdout
from math import ceil
from langchain_community.tools.tavily_search import TavilySearchResults
from langchain_core.prompts import ChatPromptTemplate

import sys
import os
import asyncio

# Add the parent directory of 'services' to the path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from dotenv import load_dotenv
from models import SearchAgent

load_dotenv()


doc = pymupdf.open("models/TextPreprocessingApproachesinCNNforDisasterReportsDataset.pdf")

processed_pages = []

for page_id in range (doc.page_count):
    processed_pages.append(doc.load_page(page_id).get_text())

llm = ChatGroq(model_name="llama3-70b-8192")

# TavilySearch function
tavily_tool = TavilySearchResults(
    max_results=3,
    include_answer=True,
    include_raw_content=False,  
    include_images=False,       
    search_depth="basic"        
)



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
    
tools = [tavily_tool]
prompt_template = PromptTemplate.from_template(
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

# Create the agent
agent = create_react_agent(llm, tools, prompt_template)
agent_executor = VerboseAgentExecutor(agent=agent, tools=tools, verbose=True, max_iterations=2, handle_parsing_errors=True)


def clean_output(raw_output):
    iterations = re.split(r"(I will analyze the document.*)", raw_output, flags=re.DOTALL)
    
    if len(iterations) > 1:
        last_iteration = iterations[-2] + iterations[-1]  
    else:
        last_iteration = raw_output
    
    cleaned_output = re.sub(r"(Action:.*|Action Input:.*|Invalid Format:.*|Thought:.*)", "", last_iteration).strip()
    return cleaned_output.replace("> Finished chain.", "")

def remove_lines_before_substring(text, substring):
    lines = text.splitlines()
    for i, line in enumerate(lines):
        if substring in line:
            return "\n".join(lines[i:]) 
    return text

def process_page(page_content, references):
    prompt = f"""
    Analyze the following document text:

    {page_content}

    1. Compare it to these three scholarly works:

    {references}

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
    return agent_executor.invoke({"input": prompt, "tools":tools, "tool_name": "tavily_search_results_json", "agent_scratchpad": lambda x: format_to_openai_tool_messages(
            x["intermediate_steps"]
        ),})

def summarize_text(document):
    chat = ChatGroq(temperature=0, model_name="llama3-8b-8192")
    system = """You are a helpful assistant. Your task is to review a document and provide a detailed summary of its content. 
                Focus on capturing the main ideas, key points, and important details in a concise manner.
                Ensure the summary is no more than 50 words and remains true to the original intent and information of the document."""
    human = """Summarize the following document in no more than 50 words, focusing on the main ideas and key points:
            {document}"""
    prompt = ChatPromptTemplate.from_messages([("system", system), ("human", human)])
    
    summarize_agent = prompt | chat
    return summarize_agent.invoke({"document": document})

batch_size = 3
num_batches = ceil(len(processed_pages) / batch_size)

result = None
searching_engine = SearchAgent()

for batch_index in range(num_batches):
    # Slice the pages into a batch of three
    start_index = batch_index * batch_size
    end_index = start_index + batch_size
    page_batch = processed_pages[start_index:end_index]
    
    # Combine the pages in the batch into one text block
    batched_text = "\n".join(page_batch)
    
    # Process the batched text
    #print(f"Processing batch {batch_index + 1} (Pages {start_index + 1} to {min(end_index, len(processed_pages))})")
    #result = process_page(batched_text)

    summary = summarize_text(batched_text).content

    print(summary)
    print("================================================================")
    summary = summary.split("\n",1)[1]
    search_query = summary + "Search for four titles of scholarly documents and the author/organization writing them most related to the summary above."
    search_result = searching_engine.invoke_search(search_query, max_results=4)

    urls = ""
    
    for i, result in enumerate(search_result):
        if (result.url != None) and (i != 0):
            urls += f"[{i}] {result.url}\n"
    
    print(urls)

    if urls.strip() == "":
        print("No available resources found.")
    else:
        result = process_page(batched_text, urls)

    #print(result)
    
    # Print the result for the batch
    print("================================================================")

    #break

print(remove_lines_before_substring((clean_output(result["output"])), "Comparison with Scholarly Works"))

