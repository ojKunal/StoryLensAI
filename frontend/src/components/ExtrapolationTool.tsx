import React, { useState } from "react";
import axios from "axios";

interface ExtrapolationToolProps {
  analysis: any;
}

export default function ExtrapolationTool({
  analysis,
}: ExtrapolationToolProps) {
  const [type, setType] = useState("continuation");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const extrapolate = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/extrapolate", {
        analysis: analysis,
        type: type,
      });
      setResult(res.data.extrapolation);
    } catch (error) {
      console.error("Error extrapolating:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Story Extrapolation (RAG)
      </h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Extrapolation Type
        </label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="continuation">Story Continuation</option>
          <option value="alternate_ending">Alternate Ending</option>
          <option value="youtube_script">YouTube Script</option>
        </select>
      </div>
      <button
        onClick={extrapolate}
        disabled={loading}
        className="bg-purple-500 text-white px-6 py-2 rounded-md hover:bg-purple-600 disabled:bg-gray-400 disabled:cursor-not-allowed mb-4"
      >
        {loading ? "Generating..." : "Generate Extrapolation"}
      </button>
      {result && (
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            Generated Content
          </h3>
          <div className="bg-gray-50 p-4 rounded-md whitespace-pre-wrap text-gray-800">
            {result}
          </div>
        </div>
      )}
    </div>
  );
}
