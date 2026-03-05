from langchain.document_loaders import YoutubeLoader
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate
from langchain.chat_models import ChatOpenAI
from config import settings
from utils.prompt_templates import YOUTUBE_TRANSCRIPT_PROMPT

llm = ChatOpenAI(
    openai_api_key=settings.OPENAI_API_KEY,
    model=settings.MODEL_NAME,
    temperature=0.3
)

def analyze_youtube_transcript(url):
    """Load and analyze YouTube transcript"""
    try:
        loader = YoutubeLoader.from_youtube_url(url, add_video_info=True)
        docs = loader.load()
        transcript = docs[0].page_content
        
        # Analyze transcript similar to story
        analysis_chain = LLMChain(
            llm=llm,
            prompt=PromptTemplate(
                input_variables=["transcript"],
                template=YOUTUBE_TRANSCRIPT_PROMPT
            )
        )
        
        result = analysis_chain.run(transcript=transcript)
        return {"transcript": transcript, "analysis": result}
    except Exception as e:
        return {"error": str(e)}