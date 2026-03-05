
from flask import Flask, request, jsonify
from flask_cors import CORS

from services.story_analyzer import analyze_story
from services.youtube_script_generator import generate_script
from services.rag_engine import store_story_analysis, extrapolate_story
from services.youtube_analyzer import analyze_youtube_transcript

app = Flask(__name__)
CORS(app)

@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.json
    story_text = data.get("story")

    if not story_text:
        return jsonify({"error": "No story provided"}), 400

    result = analyze_story(story_text)
    
    # Store in vector DB for RAG
    store_story_analysis(story_text, result)
    
    return jsonify(result)

@app.route("/generate-script", methods=["POST"])
def generate():
    data = request.json
    analysis = data.get("analysis")

    script = generate_script(analysis)
    return jsonify({"script": script})

@app.route("/extrapolate", methods=["POST"])
def extrapolate():
    data = request.json
    analysis = data.get("analysis")
    request_type = data.get("type", "continuation")  # continuation, alternate_ending, youtube_script

    if not analysis:
        return jsonify({"error": "No analysis provided"}), 400

    result = extrapolate_story(analysis, request_type)
    return jsonify({"extrapolation": result})

@app.route("/youtube-analyze", methods=["POST"])
def youtube_analyze():
    data = request.json
    url = data.get("url")

    if not url:
        return jsonify({"error": "No URL provided"}), 400

    result = analyze_youtube_transcript(url)
    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)
