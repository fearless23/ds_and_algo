import type { Graph } from "../types.js";
import { logger } from "src/lib/logger.js";
import { drawMermaidGraphOfGraph } from "../utils.js";

type G = Graph<string, number>;

class GraphDS {
	constructor(public graph: G) {}

	findPathDFS(value: string, start?: string) {
		let startIdx = 0;
		if (start) startIdx = this.graph.nodes.findIndex((node) => node === start);
		if (startIdx === -1) return undefined;
		const endIdx = this.graph.nodes.findIndex((i) => i === value);
		if (endIdx === -1) return undefined;

		const seen = new Array(this.graph.nodes.length).fill(false);
		seen[startIdx] = true;
		// dfs
		const dfs = (startIdx: number, path: number[]): number[] | undefined => {
			const edges = this.graph.edges[startIdx] as number[];
			for (const next of edges) {
				if (seen[next]) continue;
				if (next === endIdx) {
					path.push(endIdx);
					return path;
				} else {
					path.push(next);
					const pathFound = dfs(next, path);
					if (pathFound) return pathFound;
					else path.pop();
				}
			}
			return undefined;
		};
		const path = dfs(startIdx, [startIdx]);
		return path?.map((i) => this.graph.nodes[i] as string);
	}

	findPathBFS<V>(value: string, start?: string) {
		let startIdx = 0;
		if (start) startIdx = this.graph.nodes.findIndex((node) => node === start);
		if (startIdx === -1) return undefined;
		const endIdx = this.graph.nodes.findIndex((i) => i === value);
		if (endIdx === -1) return undefined;

		const queue: { at: number; path: number[] }[] = [{ at: startIdx, path: [startIdx] }];
		while (queue.length > 0) {
			const { at, path } = queue.shift() as { at: number; path: number[] };
			const edges = this.graph.edges[at] as number[];
			for (const edge of edges) {
				if (edge === endIdx) {
					path.push(endIdx);
					return path?.map((i) => this.graph.nodes[i] as string);
				} else {
					queue.push({ at: edge, path: [...path, edge] });
				}
			}
		}
	}

	printGraph() {
		const graph = drawMermaidGraphOfGraph(
			this.graph,
			(i) => i,
			(i) => i,
		);
		logger.info("Graph", graph);
	}
}

export const graph = (graph: G) => new GraphDS(graph);
