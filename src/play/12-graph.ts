import type { Graph } from "src/ds/types.js";
import { graphString as makeGraph } from "../ds/Graph/index.js";

export const GRAPH = {
	BASIC_GRAPH: () => {
		// Basic Graph
		type BasicGraph = Graph<string, number>;
		const basicGraphData: BasicGraph = {
			nodes: ["A", "B", "C", "D"],
			connections: [
				[1], // A
				[2], // B
				[], // C
				[0, 1], // D
			],
		};
		const g = makeGraph(basicGraphData);
		g.printGraph();
	},
};
