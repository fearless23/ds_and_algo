import type { Graph } from "../types.js";
import { logger } from "src/lib/logger.js";
import { drawMermaidGraphOfGraph } from "../utils.js";

type G = Graph<string, number>;

class GraphDS {
	constructor(public graph: G) {}

	#findPathSetup(start: string, end: string) {
		const startIdx = this.graph.nodes.findIndex((node) => node === start);
		if (startIdx === -1) return {};
		const endIdx = this.graph.nodes.findIndex((i) => i === end);
		if (endIdx === -1) return {};
		const seen: boolean[] = new Array(this.graph.nodes.length).fill(false);
		seen[startIdx] = true;
		return { startIdx, endIdx, seen };
	}

	#idxToNodeName(indices: number[]) {
		return indices.map((i) => this.graph.nodes[i] as string);
	}

	printBFS(start: string) {
		const startIdx = this.graph.nodes.findIndex((i) => i === start);
		if (startIdx === -1) return undefined;
		const seen: boolean[] = new Array(this.graph.nodes.length).fill(false);
		seen[startIdx] = true;
		const queue: number[] = [startIdx];
		const order = [];
		while (queue.length > 0) {
			const at = queue.shift() as number;
			order.push(at);
			const edges = this.graph.edges[at] as number[];
			for (const edge of edges) {
				if (seen[edge] === false) {
					seen[edge] = true;
					queue.push(edge);
				}
			}
		}
		return this.#idxToNodeName(order);
	}

	printDFS(start: string) {
		const startIdx = this.graph.nodes.findIndex((i) => i === start);
		if (startIdx === -1) return undefined;
		const seen: boolean[] = new Array(this.graph.nodes.length).fill(false);
		seen[startIdx] = true;

		const order: number[] = [];
		const dfs = (currIdx: number) => {
			order.push(currIdx);
			const edges = this.graph.edges[currIdx] as number[];
			for (const next of edges) {
				if (seen[next] === false) {
					seen[next] = true;
					dfs(next);
				}
			}
		};
		dfs(startIdx);
		return this.#idxToNodeName(order);
	}

	findPathDFS(start: string, end: string) {
		const { seen, startIdx, endIdx } = this.#findPathSetup(start, end);
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

	findPathBFS(start: string, end: string) {
		const { seen, startIdx, endIdx } = this.#findPathSetup(start, end);
		if (seen == null) return undefined;
		const prev = new Array(seen.length).fill(null);
		const queue: number[] = [startIdx];

		while (queue.length > 0) {
			const at = queue.shift() as number;
			const edges = this.graph.edges[at] as number[];

			for (const edge of edges) {
				prev[edge] = at;
				if (edge === endIdx) {
					break;
				} else {
					if (seen[edge] === false) {
						seen[edge] = true;
						queue.push(edge);
					}
				}
			}
		}

		if (prev[endIdx] === null) return undefined;

		let curr = endIdx;
		const path = [];
		while (prev[curr] !== null) {
			path.unshift(curr);
			curr = prev[curr];
		}
		path.unshift(startIdx);
		return this.#idxToNodeName(path);
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
