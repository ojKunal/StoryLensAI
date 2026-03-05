import json
import chromadb
from sentence_transformers import SentenceTransformer
from langchain.vectorstores import Chroma
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.docstore.document import Document
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate
from langchain.chat_models import ChatOpenAI
from config import settings
from utils.prompt_templates import EXTRAPOLATION_PROMPT

# Initialize ChromaDB client
client = chromadb.PersistentClient(path="./chroma_db")

# Embedding model
embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

# Create or get collection
collection = client.get_or_create_collection(name=settings.CHROMA_COLLECTION)

vectorstore = Chroma(
    client=client,
    collection_name=settings.CHROMA_COLLECTION,
    embedding_function=embeddings
)

def store_story_analysis(story_text, analysis):
    """Store story and its analysis in vector store"""
    doc = Document(
        page_content=story_text,
        metadata={"analysis": json.dumps(analysis)}
    )
    vectorstore.add_documents([doc])

def retrieve_similar_stories(query, k=3):
    """Retrieve similar stories for context"""
    docs = vectorstore.similarity_search(query, k=k)
    return [doc.page_content for doc in docs]

def extrapolate_story(analysis, request_type):
    """Generate extrapolation using RAG"""
    llm = ChatOpenAI(
        openai_api_key=settings.OPENAI_API_KEY,
        model=settings.MODEL_NAME,
        temperature=0.7
    )
    
    # Get context from similar stories
    context_docs = vectorstore.similarity_search(json.dumps(analysis), k=3)
    context = "\n".join([doc.page_content for doc in context_docs])
    
    extrapolation_chain = LLMChain(
        llm=llm,
        prompt=PromptTemplate(
            template=EXTRAPOLATION_PROMPT,
            input_variables=["request_type", "analysis", "context"]
        )
    )
    
    result = extrapolation_chain.run({
        "request_type": request_type,
        "analysis": json.dumps(analysis),
        "context": context
    })
    
    return result