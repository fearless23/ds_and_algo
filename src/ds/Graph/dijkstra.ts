import { logger } from "src/lib/logger.js";
import type { Graph } from "../types.js";
import { drawMermaidGraphOfGraphMin } from "../utils.js";

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
		// TODO: implement this
		return { start, end };
	}

	printGraph() {
		const graph = drawMermaidGraphOfGraphMin(this.graph, (i) => i.to);
		logger.info("Graph", graph);
	}
}

export const graph = (graph: Graph<DijkstraEdge>) => new DijkstraDS(graph);
