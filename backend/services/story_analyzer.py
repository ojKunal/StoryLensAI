
from langchain.chat_models import ChatOpenAI
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate
from config import settings
from utils.prompt_templates import STORY_ANALYSIS_PROMPT

llm = ChatOpenAI(
    openai_api_key=settings.OPENAI_API_KEY,
    model=settings.MODEL_NAME,
    temperature=0.3
)

analysis_chain = LLMChain(
    llm=llm,
    prompt=PromptTemplate(
        input_variables=["story"],
        template=STORY_ANALYSIS_PROMPT
    )
)

def analyze_story(story_text: str):
    result = analysis_chain.run(story=story_text)
    return {"analysis": result}
