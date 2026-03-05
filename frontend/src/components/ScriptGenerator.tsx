import React, { useState } from "react";
import axios from "axios";

interface ScriptGeneratorProps {
  analysis: any;
}

export default function ScriptGenerator({ analysis }: ScriptGeneratorProps) {
  const [script, setScript] = useState("");
  const [loading, setLoading] = useState(false);

  const generateScript = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/generate-script", {
        analysis: JSON.stringify(analysis),
      });
      setScript(res.data.script);
    } catch (error) {
      console.error("Error generating script:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        YouTube Script Generator
      </h2>
      <button
        onClick={generateScript}
        disabled={loading}
        className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed mb-4"
      >
        {loading ? "Generating..." : "Generate YouTube Script"}
      </button>
      {script && (
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            Generated Script
          </h3>
          <div className="bg-gray-50 p-4 rounded-md whitespace-pre-wrap text-gray-800">
            {script}
          </div>
        </div>
      )}
    </div>
  );
}
