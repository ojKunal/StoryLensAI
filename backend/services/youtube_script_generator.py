
from langchain.chat_models import ChatOpenAI
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate
from config import settings
from utils.prompt_templates import YOUTUBE_SCRIPT_PROMPT

llm = ChatOpenAI(
    openai_api_key=settings.OPENAI_API_KEY,
    model=settings.MODEL_NAME,
    temperature=0.7
)

script_chain = LLMChain(
    llm=llm,
    prompt=PromptTemplate(
        input_variables=["analysis"],
        template=YOUTUBE_SCRIPT_PROMPT
    )
)

def generate_script(analysis):
    script = script_chain.run(analysis=analysis)
    return script
