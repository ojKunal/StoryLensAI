
import json
from langchain.chat_models import ChatOpenAI
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate
from langchain.output_parsers import StructuredOutputParser, ResponseSchema
from config import settings
from utils.prompt_templates import STORY_ANALYSIS_PROMPT

llm = ChatOpenAI(
    openai_api_key=settings.OPENAI_API_KEY,
    model=settings.MODEL_NAME,
    temperature=0.3
)

# Define response schema for structured output
response_schemas = [
    ResponseSchema(name="themes", description="List of main themes"),
    ResponseSchema(name="characters", description="List of character objects with name, profile, emotional_arc"),
    ResponseSchema(name="emotional_arcs", description="List of overall emotional arcs"),
    ResponseSchema(name="relationships", description="List of relationship objects")
]

output_parser = StructuredOutputParser.from_response_schemas(response_schemas)
format_instructions = output_parser.get_format_instructions()

analysis_prompt = PromptTemplate(
    template=STORY_ANALYSIS_PROMPT + "\n{format_instructions}",
    input_variables=["story"],
    partial_variables={"format_instructions": format_instructions}
)

analysis_chain = LLMChain(
    llm=llm,
    prompt=analysis_prompt,
    output_parser=output_parser
)

def analyze_story(story_text: str):
    result = analysis_chain.run(story=story_text)
    
    # Ensure result is a dict
    if isinstance(result, str):
        try:
            result = json.loads(result)
        except:
            result = {"error": "Failed to parse analysis"}
    
    return result
