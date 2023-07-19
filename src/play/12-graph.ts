import type { Graph } from "src/ds/types.js";
// import { graphString as makeGraph } from "../ds/Graph/index.js";
import { graphMin as makeGraph } from "../ds/Graph/index.js";
import { logger } from "src/lib/logger.js";

type BasicGraph = Graph<string, number>;
const finder = (node: string, value: string) => {
	return node === value;
};

const _PP1 = {
	start: "A",
	value: "J",
	finder,
};

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
		[2, 3, 4], // B
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

const _PP2 = {
	start: "A",
	value: "K",
	finder,
};

export const GRAPH = {
	BASIC_GRAPH: () => {
		const g = makeGraph(_basicGraphData2);
		// g.printGraph();
		const path = g.findPathDFS(_PP2.value, _PP2.start);
		logger.info("path", path);
	},
};
