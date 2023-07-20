import { logger } from "src/lib/logger.js";
import type { Graph } from "src/ds/types.js";
import { graphMin as makeGraph } from "../ds/Graph/index.js";

type BasicGraph = Graph<string, number>;

const _basicGraphData: BasicGraph = {
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

const _basicGraphData2: BasicGraph = {
	nodes: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"],
	edges: [
		[1], // A
		[4, 2, 3], // B
		[5, 6], // C
		[7, 8, 4], // D
		[9, 10], // E
		[], // F
		[], // G
		[], // H
		[], // I
		[], // J
		[], // K
	],
};

export const GRAPH = {
	BASIC_GRAPH: () => {
		const g = makeGraph(_basicGraphData2);
		g.printGraph();
		const bfs = g.findPathBFS("A", "K");
		const dfs = g.findPathDFS("A", "K");
		logger.info("paths", { bfs, dfs });

		const bfs$ = g.printBFS("A");
		const dfs$ = g.printDFS("A");
		logger.info("paths", { bfs: bfs$, dfs: dfs$ });
	},
};
