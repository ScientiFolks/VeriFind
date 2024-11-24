from models import ValidationAgent
from io import StringIO
from contextlib import redirect_stdout
from langchain.agents import AgentExecutor
import re

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

class ValidationService:
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