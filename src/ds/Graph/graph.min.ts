import type { Graph } from "../types.js";
import { logger } from "src/lib/logger.js";
import { drawMermaidGraphOfGraph } from "../utils.js";

type G = Graph<string, number>;
type Q = { curr: number; path: number[] };

class GraphDS {
	constructor(public graph: G) {}

	#findPathSetup(value: string, start?: string) {
		let startIdx = 0;
		if (start) startIdx = this.graph.nodes.findIndex((node) => node === start);
		if (startIdx === -1) return {};
		const endIdx = this.graph.nodes.findIndex((i) => i === value);
		if (endIdx === -1) return {};
		const seen: boolean[] = new Array(this.graph.nodes.length).fill(false);
		seen[startIdx] = true;
		return { startIdx, endIdx, seen };
	}

	#idxToNodeName(indices: number[]) {
		return indices.map((i) => this.graph.nodes[i] as string);
	}

	findPathDFS(value: string, start?: string) {
		const { seen, startIdx, endIdx } = this.#findPathSetup(value, start);
		if (seen == null) return undefined;
		const path = [startIdx];
		// dfs
		const dfs = (startIdx: number): number[] | undefined => {
			const edges = this.graph.edges[startIdx] as number[];
			for (const next of edges) {
				if (seen[next]) continue;
				if (next === endIdx) {
					path.push(endIdx);
					return path;
				} else {
					path.push(next);
					const pathFound = dfs(next);
					if (pathFound) return pathFound;
					else path.pop();
				}
			}
			return undefined;
		};
		const _path = dfs(startIdx);
		return _path && this.#idxToNodeName(_path);
	}

	findPathBFS(value: string, start?: string) {
		const { seen, startIdx, endIdx } = this.#findPathSetup(value, start);
		if (seen == null) return undefined;

		const queue: Q[] = [{ curr: startIdx, path: [startIdx] }];
		while (queue.length > 0) {
			const { curr, path } = queue.shift() as Q;
			const edges = this.graph.edges[curr] as number[];
			for (const edge of edges) {
				if (edge === endIdx) {
					path.push(endIdx);
					return this.#idxToNodeName(path);
				} else if (!seen[edge]) {
					seen[edge] = true;
					queue.push({ curr: edge, path: [...path, edge] });
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
