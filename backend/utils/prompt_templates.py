
STORY_ANALYSIS_PROMPT = '''
Analyze the following story and extract the following elements in a structured JSON format:

{
  "themes": ["list of main themes"],
  "characters": [
    {
      "name": "character name",
      "profile": "detailed description",
      "emotional_arc": "description of emotional journey"
    }
  ],
  "emotional_arcs": ["overall emotional arcs of the story"],
  "relationships": [
    {
      "character1": "name",
      "character2": "name",
      "relationship_type": "e.g., friend, enemy, family",
      "description": "brief description"
    }
  ]
}

Ensure the output is valid JSON.

Story:
{story}
'''

YOUTUBE_SCRIPT_PROMPT = '''
Using the following story analysis, create an optimized YouTube video script.

The script should include:
- A compelling hook in the first 10 seconds
- Engaging narrative structure
- Build suspense and emotional engagement
- Clear call-to-action at the end
- Optimized for YouTube algorithm (click-worthy title, timestamps if needed)

Analysis:
{analysis}

Output the script as a string.
'''

EXTRAPOLATION_PROMPT = '''
Based on the story analysis and the user's request, generate the requested content.

Request: {request_type} (continuation, alternate_ending, youtube_script)

Analysis: {analysis}

Context from similar stories: {context}

Generate the content accordingly.
'''

YOUTUBE_TRANSCRIPT_PROMPT = '''
Analyze the following YouTube transcript and extract key elements for story generation.

Transcript:
{transcript}

Output structured analysis similar to story analysis.
'''
