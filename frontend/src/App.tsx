import StoryUploader from "./components/StoryUploader";
import AnalysisDisplay from "./components/AnalysisDisplay";
import ScriptGenerator from "./components/ScriptGenerator";
import ExtrapolationTool from "./components/ExtrapolationTool";
import YoutubeAnalyzer from "./components/YoutubeAnalyzer";
import { useState } from "react";

function App() {
  const [analysis, setAnalysis] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          StoryLens AI
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <StoryUploader onAnalysis={setAnalysis} />
            <YoutubeAnalyzer onAnalysis={setAnalysis} />
          </div>
          <div className="space-y-8">
            {analysis && <AnalysisDisplay analysis={analysis} />}
            {analysis && <ScriptGenerator analysis={analysis} />}
            {analysis && <ExtrapolationTool analysis={analysis} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
