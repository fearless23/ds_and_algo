import { logger } from "src/lib/logger.js";
import type { Graph } from "../types.js";
import { drawMermaidGraphOfGraphMin } from "../utils.js";

class GraphDS {
	constructor(public graph: Graph<number>) {}

	#outOfBounds(idx: number) {
		if (idx < 0 || idx >= this.graph.length) throw new Error(`idx:${idx} out of bounds`);
	}

	#checkBounds(startIdx: number, endIdx: number) {
		this.#outOfBounds(startIdx);
		this.#outOfBounds(endIdx);
		if (startIdx === endIdx) throw new Error("start and end are same");
	}

	printBFS(startIdx: number) {
		this.#outOfBounds(startIdx);
		const seen: boolean[] = new Array(this.graph.length).fill(false);
		seen[startIdx] = true;
		const queue: number[] = [startIdx];
		const order = [];
		while (queue.length > 0) {
			const at = queue.shift() as number;
			order.push(at);
			const edges = this.graph[at] as number[];
			for (const edge of edges) {
				if (seen[edge] === false) {
					seen[edge] = true;
					queue.push(edge);
				}
			}
		}
		return order;
	}

	printDFS(startIdx: number) {
		this.#outOfBounds(startIdx);
		const seen: boolean[] = new Array(this.graph.length).fill(false);
		seen[startIdx] = true;

		const order: number[] = [];
		const dfs = (currIdx: number) => {
			order.push(currIdx);
			const edges = this.graph[currIdx] as number[];
			for (const next of edges) {
				if (seen[next] === false) {
					seen[next] = true;
					dfs(next);
				}
			}
		};
		dfs(startIdx);
		return order;
	}

	findPathDFS(start: number, end: number) {
		this.#checkBounds(start, end);
		const seen: boolean[] = new Array(this.graph.length).fill(false);
		seen[start] = true;
		const path = [start];
		// dfs
		const dfs = (startIdx: number): number[] | undefined => {
			const edges = this.graph[startIdx] as number[];
			for (const next of edges) {
				if (seen[next]) continue;
				if (next === end) {
					path.push(end);
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
		return dfs(start);
	}

	findPathBFS(start: number, end: number) {
		this.#checkBounds(start, end);
		const seen: boolean[] = new Array(this.graph.length).fill(false);
		seen[start] = true;
		const prev = new Array(seen.length).fill(null);
		const queue: number[] = [start];

		while (queue.length > 0) {
			const at = queue.shift() as number;
			const edges = this.graph[at] as number[];

			for (const edge of edges) {
				prev[edge] = at;
				if (edge === end) {
					break;
				} else {
					if (seen[edge] === false) {
						seen[edge] = true;
						queue.push(edge);
					}
				}
			}
		}

		if (prev[end] === null) return undefined;

		let curr = end;
		const path = [];
		while (prev[curr] !== null) {
			path.push(curr);
			curr = prev[curr];
		}
		path.push(start);
		return path.reverse();
	}

	printGraph() {
		const graph = drawMermaidGraphOfGraphMin(this.graph, (i) => i);
		logger.info("Graph", graph);
	}
}

export const graph = (graph: Graph<number>) => new GraphDS(graph);
