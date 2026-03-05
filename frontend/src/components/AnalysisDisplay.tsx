import React from "react";
import CharacterGraph from "./CharacterGraph";

interface AnalysisDisplayProps {
  analysis: any;
}

export default function AnalysisDisplay({ analysis }: AnalysisDisplayProps) {
  if (!analysis) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Story Analysis
      </h2>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">Themes</h3>
          <div className="flex flex-wrap gap-2">
            {analysis.themes?.map((theme: string, index: number) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
              >
                {theme}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">Characters</h3>
          <div className="space-y-3">
            {analysis.characters?.map((char: any, index: number) => (
              <div
                key={index}
                className="border border-gray-200 rounded-md p-3"
              >
                <h4 className="font-medium text-gray-800">{char.name}</h4>
                <p className="text-sm text-gray-600 mt-1">{char.profile}</p>
                <p className="text-sm text-gray-500 mt-1">
                  <strong>Emotional Arc:</strong> {char.emotional_arc}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            Emotional Arcs
          </h3>
          <ul className="list-disc list-inside space-y-1">
            {analysis.emotional_arcs?.map((arc: string, index: number) => (
              <li key={index} className="text-gray-600">
                {arc}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            Character Relationships
          </h3>
          <div className="space-y-2">
            {analysis.relationships?.map((rel: any, index: number) => (
              <div key={index} className="text-sm text-gray-600">
                <span className="font-medium">{rel.character1}</span> →{" "}
                <span className="font-medium">{rel.character2}</span>
                <span className="ml-2 text-gray-500">
                  ({rel.relationship_type})
                </span>
                <p className="mt-1">{rel.description}</p>
              </div>
            ))}
          </div>
        </div>

        {analysis.relationships && (
          <CharacterGraph relationships={analysis.relationships} />
        )}
      </div>
    </div>
  );
}
