import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

interface Relationship {
  character1: string;
  character2: string;
  relationship_type: string;
  description: string;
}

interface CharacterGraphProps {
  relationships: Relationship[];
}

export default function CharacterGraph({ relationships }: CharacterGraphProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!relationships || !svgRef.current) return;

    // Clear previous graph
    d3.select(svgRef.current).selectAll("*").remove();

    // Prepare data
    const nodes = Array.from(
      new Set(relationships.flatMap((rel) => [rel.character1, rel.character2]))
    ).map((name) => ({ id: name, name }));

    const links = relationships.map((rel) => ({
      source: rel.character1,
      target: rel.character2,
      type: rel.relationship_type,
    }));

    const svg = d3.select(svgRef.current);
    const width = 400;
    const height = 300;

    svg.attr("width", width).attr("height", height);

    // Create simulation
    const simulation = d3
      .forceSimulation(nodes as any)
      .force(
        "link",
        d3
          .forceLink(links)
          .id((d: any) => d.id)
          .distance(100)
      )
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2));

    // Draw links
    const link = svg
      .append("g")
      .selectAll("line")
      .data(links)
      .enter()
      .append("line")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", 2);

    // Draw nodes
    const node = svg
      .append("g")
      .selectAll("circle")
      .data(nodes)
      .enter()
      .append("circle")
      .attr("r", 20)
      .attr("fill", "#69b3a2");

    // Add labels
    const labels = svg
      .append("g")
      .selectAll("text")
      .data(nodes)
      .enter()
      .append("text")
      .text((d: any) => d.name)
      .attr("text-anchor", "middle")
      .attr("dy", ".35em")
      .attr("font-size", "12px")
      .attr("fill", "white");

    // Update positions
    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node.attr("cx", (d: any) => d.x).attr("cy", (d: any) => d.y);

      labels.attr("x", (d: any) => d.x).attr("y", (d: any) => d.y);
    });
  }, [relationships]);

  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium text-gray-700 mb-2">
        Character Relationship Graph
      </h3>
      <svg ref={svgRef} className="border border-gray-200 rounded-md"></svg>
    </div>
  );
}
