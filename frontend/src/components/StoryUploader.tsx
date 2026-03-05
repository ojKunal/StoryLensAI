import { useState } from "react";
import axios from "axios";

interface StoryUploaderProps {
  onAnalysis: (analysis: any) => void;
}

export default function StoryUploader({ onAnalysis }: StoryUploaderProps) {
  const [story, setStory] = useState("");
  const [loading, setLoading] = useState(false);

  const analyzeStory = async () => {
    if (!story.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/analyze", {
        story: story,
      });
      onAnalysis(res.data);
    } catch (error) {
      console.error("Error analyzing story:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Story Analysis
      </h2>
      <textarea
        className="w-full h-48 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={story}
        onChange={(e) => setStory(e.target.value)}
        placeholder="Paste your story here (up to 10K+ words)..."
      />
      <button
        onClick={analyzeStory}
        disabled={loading || !story.trim()}
        className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {loading ? "Analyzing..." : "Analyze Story"}
      </button>
    </div>
  );
}
