import type { Graph } from "src/ds/types.js";
import { graphString as makeGraph } from "../ds/Graph/index.js";
// import { graphMin as makeGraph } from "../ds/Graph/index.js";
import { logger } from "src/lib/logger.js";

const PP = {
	value: "J",
	//
	finder(node: string, value: string) {
		return node === value;
	},
	start: "A",
};

export const GRAPH = {
	BASIC_GRAPH: () => {
		// Basic Graph
		type BasicGraph = Graph<string, number>;
		const basicGraphData: BasicGraph = {
			nodes: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
			edges: [
				[1], // A
				[2], // B
				[5, 4], // C
				[0, 1], // D
				[6], // E
				[3], // F
				[7], // G
				[8], // H
				[9], // I
				[], // J
			],
		};
		const g = makeGraph(basicGraphData);
		// g.printGraph();
		const path = g.findPathBFS(PP);
		logger.info("path", path);
	},
};
