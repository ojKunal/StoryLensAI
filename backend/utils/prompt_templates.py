
STORY_ANALYSIS_PROMPT = '''
Analyze the following story and extract:

1. Main themes
2. Character profiles
3. Emotional arcs
4. Relationship network

Return structured JSON.

Story:
{story}
'''

YOUTUBE_SCRIPT_PROMPT = '''
Using the following story analysis create a YouTube storytelling script.

Requirements:
- Hook in first 10 seconds
- Engaging narrative
- Suspense
- CTA at end

Analysis:
{analysis}
'''
