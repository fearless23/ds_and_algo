import { logger } from "src/lib/logger.js";
import type { Graph } from "src/ds/types.js";
import {
	graphMin as makeGraphMin,
	graphString as makeGraphString,
	dijkstra,
} from "../ds/Graph/index.js";

type BasicGraph = Graph<number>;
type Data = { nodes: string[]; graph: BasicGraph };

const DATA: Data[] = [
	{
		nodes: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
		graph: [
			[1], // 0
			[2], // 1
			[5, 4], // 2
			[0, 1], // 3
			[6], // 4
			[3], // 5
			[7], // 6
			[8], // 7
			[9], // 8
			[], // 9
		],
	},
	{
		nodes: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"],
		graph: [
			[1], // 0
			[4, 2, 3], // 1
			[5, 6], // 2
			[7, 8, 4], // 3
			[9, 10], // 4
			[], // 5
			[], // 6
			[], // 7
			[], // 8
			[], // 9
			[], // 10
		],
	},
];

export const GRAPH = {
	BASIC_GRAPH: () => {
		const { graph, nodes } = DATA[1] as Data;
		const g = makeGraphString(graph, nodes);
		g.printGraph();
		const bfs = g.findPathBFS2({ startIdx: 0, endIdx: 10 });
		const dfs = g.findPathDFS2({ startIdx: 0, endIdx: 10 });
		logger.info("paths", { bfs, dfs });

		const bfs$ = g.printBFS(0);
		const dfs$ = g.printDFS(0);
		logger.info("paths", { bfs: bfs$, dfs: dfs$ });
	},
	GRAPH_MIN: () => {
		const { graph } = DATA[1] as Data;
		const g = makeGraphMin(graph);
		g.printGraph();
		const bfs = g.findPathBFS(0, 10);
		const dfs = g.findPathDFS(0, 10);
		logger.info("paths", { bfs, dfs });

		const bfs$ = g.printBFS(0);
		const dfs$ = g.printDFS(0);
		logger.info("paths", { bfs: bfs$, dfs: dfs$ });
	},
	DIJKSTRA: () => {
		const graph = [
			[{ to: 1, length: 1 }], // 0
			[
				{ to: 2, length: 2 },
				{ to: 3, length: 6 },
				{ to: 4, length: 4 },
			], // 1
			[
				{ to: 5, length: 5 },
				{ to: 6, length: 6 },
			], // 2
			[
				{ to: 7, length: 8 },
				{ to: 8, length: 7 },
				{ to: 9, length: 0.1 },
			], // 3
			[
				{ to: 9, length: 3 },
				{ to: 10, length: 9 },
			], // 4
			[], // 5
			[], // 6
			[], // 7
			[], // 8
			[], // 9
			[], // 10
		];
		const g = dijkstra(graph);
		g.printGraph();
		const shortestPath = g.findShortestPath(0, 9);
		logger.info({ shortestPath });
	},
};
