import { logger } from "src/lib/logger.js";
import type { Graph } from "../types.js";
import { drawMermaidGraphOfGraphDijkstra } from "../utils.js";
// import { heapVariant, binaryHeap } from "../BinaryHeap/index.js";

type DijkstraEdge = { to: number; length: number };

// As a data-structure, we use graph.min with edge=DijkstraEdge
class DijkstraDS {
	constructor(public graph: Graph<DijkstraEdge>) {}

	#outOfBounds(idx: number) {
		if (idx < 0 || idx >= this.graph.length) throw new Error(`idx:${idx} out of bounds`);
	}

	#checkBounds(startIdx: number, endIdx: number) {
		this.#outOfBounds(startIdx);
		this.#outOfBounds(endIdx);
		if (startIdx === endIdx) throw new Error("start and end are same");
	}

	findShortestPath(start: number, end: number) {
		this.#checkBounds(start, end);
		type N = { seen?: boolean; d: number; prev?: number };
		const nodes: N[] = new Array(this.graph.length).fill(null);
		nodes[start] = { seen: false, d: 0 };
		// NOTE: we can keep seen, dist, prev as separate arrays as well

		const pickUnseenAndMin = () => {
			let minimum = Infinity;
			let idx = -1;
			for (let i = 0; i < nodes.length; i++) {
				if (!nodes[i]) continue;
				const { seen, d } = nodes[i] as N;
				if (!seen && d < minimum) {
					minimum = d;
					idx = i;
				}
			}
			return idx;
		};

		let pick = start;
		while (pick >= 0) {
			const node = nodes[pick] as N;
			// add all edges
			const edges = this.graph[pick] as DijkstraEdge[];
			for (const { to: next, length } of edges) {
				const d = length + node.d;
				const data = { d: length + node.d, idx: next, prev: pick };
				const current = nodes[next];
				// if current is not set or d < current.d
				if (current == null || d < current.d) nodes[next] = data;
			}
			// mark node as seen
			node.seen = true;
			pick = pickUnseenAndMin();
		}

		const endNode = nodes[end] as N;
		if (endNode === null) return { path: undefined, distance: undefined };

		let currNode = endNode;
		const path = [end];
		while (currNode !== null) {
			const prev = currNode.prev as number;
			if (prev == null) break;
			path.push(prev);
			currNode = nodes[prev] as N;
		}
		return { path: path.reverse(), distance: (nodes[end] as N).d };
	}

	printGraph() {
		const graph = drawMermaidGraphOfGraphDijkstra(this.graph);
		logger.info("Graph", graph);
	}
}

export const dijkstra = (graph: Graph<DijkstraEdge>) => new DijkstraDS(graph);
