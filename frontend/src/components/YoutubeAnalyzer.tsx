import React, { useState } from "react";
import axios from "axios";

interface YoutubeAnalyzerProps {
  onAnalysis: (analysis: any) => void;
}

export default function YoutubeAnalyzer({ onAnalysis }: YoutubeAnalyzerProps) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const analyzeYoutube = async () => {
    if (!url.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/youtube-analyze", {
        url: url,
      });
      onAnalysis(res.data.analysis);
    } catch (error) {
      console.error("Error analyzing YouTube:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        YouTube Transcript Analysis
      </h2>
      <input
        type="url"
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 mb-4"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter YouTube URL..."
      />
      <button
        onClick={analyzeYoutube}
        disabled={loading || !url.trim()}
        className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {loading ? "Analyzing..." : "Analyze YouTube Video"}
      </button>
    </div>
  );
}
