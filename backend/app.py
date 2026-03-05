
from flask import Flask, request, jsonify
from flask_cors import CORS

from services.story_analyzer import analyze_story
from services.youtube_script_generator import generate_script

app = Flask(__name__)
CORS(app)

@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.json
    story_text = data.get("story")

    if not story_text:
        return jsonify({"error": "No story provided"}), 400

    result = analyze_story(story_text)
    return jsonify(result)

@app.route("/generate-script", methods=["POST"])
def generate():
    data = request.json
    analysis = data.get("analysis")

    script = generate_script(analysis)
    return jsonify({"script": script})

if __name__ == "__main__":
    app.run(debug=True)
