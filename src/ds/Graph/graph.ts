import type { DSParams, Graph, NodeToString } from "../types.js";
import { logger } from "src/lib/logger.js";
import { drawMermaidGraphOfGraph } from "../utils.js";

export type GraphDSParams<Node, Edge> = DSParams<Node> & {
	getIndexFromEdge: (edge: Edge) => number;
	graph?: Graph<Node, Edge>;
};

type FindPathParams<Node, V> = { value: V; finder: (node: Node, value: V) => boolean; start?: V };
class GraphDS<Node, Edge> {
	graph: Graph<Node, Edge> = {
		nodes: [],
		edges: [],
	};
	nodeToString: NodeToString<Node>;
	getIndexFromEdge: (connection: Edge) => number;
	constructor(params: GraphDSParams<Node, Edge>) {
		if (params.graph) this.graph = params.graph;
		this.nodeToString = params.nodeToString;
		this.getIndexFromEdge = params.getIndexFromEdge;
	}
	addNodeAndConnections(node: Node, connections: Edge[]) {
		this.graph.nodes.push(node);
		this.graph.edges.push(connections);
	}

	// NOTE: findByValue - loop over this.graph.nodes to find the node by value

	#findPathSetup<V>(params: FindPathParams<Node, V>) {
		let startIdx = 0;
		if (params.start) {
			const t = params.start;
			startIdx = this.graph.nodes.findIndex((i) => params.finder(i, t));
		}
		if (startIdx === -1) return {};
		const endIdx = this.graph.nodes.findIndex((i) => params.finder(i, params.value));
		if (endIdx === -1) return {};
		const seen: boolean[] = new Array(this.graph.nodes.length).fill(false);
		seen[startIdx] = true;
		return { startIdx, endIdx, seen };
	}

	#idxToNodeName(indices: number[]) {
		return indices?.map((i) => this.nodeToString(this.graph.nodes[i] as Node));
	}

	findPathDFS<V>(params: { value: V; finder: (node: Node, value: V) => boolean; start?: V }) {
		const { seen, startIdx, endIdx } = this.#findPathSetup<V>(params);
		if (seen == null) return undefined;
		const path = [startIdx];
		const dfs = (currIdx: number): number[] | undefined => {
			const edges = (this.graph.edges[currIdx] as Edge[]).map((c) => this.getIndexFromEdge(c));
			console.log("looking at", {
				path: this.#idxToNodeName(path),
				edges: this.#idxToNodeName(edges),
			});
			// find if end is in any of edges
			if (edges.find((i) => i === endIdx)) {
				console.log("found end --------------->\n");
				path.push(endIdx);
				return path;
			}

			// go to each of next node and find
			for (const next of edges) {
				if (seen[next] === false) {
					seen[next] = true;
					// NOT SHARING PATH
					// const pathFound = dfs(next, [...path, next]);
					// if (pathFound) return pathFound;
					// SHARING PATH
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

	findPathBFS<V>(params: { value: V; finder: (node: Node, value: V) => boolean; start?: V }) {
		const { seen, startIdx, endIdx } = this.#findPathSetup<V>(params);
		if (seen == null) return undefined;
		const queue: { at: number; path: number[] }[] = [{ at: startIdx, path: [startIdx] }];

		while (queue.length > 0) {
			const { at, path } = queue.shift() as { at: number; path: number[] };
			const edges = (this.graph.edges[at] as Edge[]).map((i) => this.getIndexFromEdge(i));
			console.log("looking at", {
				path: this.#idxToNodeName(path),
				edges: this.#idxToNodeName(edges),
			});

			for (const edge of edges) {
				if (edge === endIdx) {
					console.log("Found end-------->");
					path.push(endIdx);
					return this.#idxToNodeName(path);
				} else {
					if (seen[edge] === false) {
						seen[edge] = true;
						queue.push({ at: edge, path: [...path, edge] });
					}
				}
			}
		}
	}

	print() {
		const data = this.graph.nodes.map((node, index) => {
			const connections = this.graph.edges[index] as Edge[];
			const nodeName = this.nodeToString(node);
			const connectionNames = connections?.map((c) => {
				const idx = this.getIndexFromEdge(c);
				return this.nodeToString(this.graph.nodes[idx] as Node);
			});
			return [nodeName, connectionNames];
		});
		logger.info("Graph", JSON.stringify(data, null, 4));
	}

	printGraph() {
		const graph = drawMermaidGraphOfGraph(this.graph, this.nodeToString, this.getIndexFromEdge);
		logger.info("Graph", graph);
	}
}

export const graph = <N, C>(params: GraphDSParams<N, C>) => {
	return new GraphDS(params);
};

// nodes are strings and connections as number index
export const graphString = (graph: Graph<string, number>) => {
	return new GraphDS({
		graph,
		getIndexFromEdge: (i) => i,
		nodeToString: (i) => i,
	});
};
