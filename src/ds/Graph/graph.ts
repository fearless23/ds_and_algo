import type { DSParams, Graph, NodeToString } from "../types.js";
import { logger } from "src/lib/logger.js";
import { drawMermaidGraphOfGraph } from "../utils.js";

export type GraphDSParams<Node, Edge> = DSParams<Node> & {
	getIndexFromEdge: (edge: Edge) => number;
	graph?: Graph<Node, Edge>;
};

type FindPathParams<Node, V> = { value: V; finder: (node: Node, value: V) => boolean; start: V };
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
		const startIdx = this.graph.nodes.findIndex((i) => params.finder(i, params.start));
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

	#idxEdges(idx: number) {
		return (this.graph.edges[idx] as Edge[]).map((c) => this.getIndexFromEdge(c));
	}

	/**
	 * Prints nodes in BFS order start as some node
	 */
	printBFS<V>(params: Omit<FindPathParams<Node, V>, "value">) {
		const startIdx = this.graph.nodes.findIndex((i) => params.finder(i, params.start));
		if (startIdx === -1) return undefined;
		const seen: boolean[] = new Array(this.graph.nodes.length).fill(false);
		seen[startIdx] = true;
		const queue: number[] = [startIdx];
		const order = [];
		while (queue.length > 0) {
			const at = queue.shift() as number;
			order.push(at); // visited
			const edges = (this.graph.edges[at] as Edge[]).map((i) => this.getIndexFromEdge(i));
			for (const edge of edges) {
				if (seen[edge] === false) {
					seen[edge] = true;
					queue.push(edge);
				}
			}
		}
		return this.#idxToNodeName(order);
	}

	/**
	 * Prints nodes in DFS order start as some node
	 */
	printDFS<V>(params: Omit<FindPathParams<Node, V>, "value">) {
		const startIdx = this.graph.nodes.findIndex((i) => params.finder(i, params.start));
		if (startIdx === -1) return undefined;
		const seen: boolean[] = new Array(this.graph.nodes.length).fill(false);
		seen[startIdx] = true;

		const order: number[] = [];
		const dfs = (currIdx: number) => {
			order.push(currIdx);
			const edges = this.#idxEdges(currIdx);
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

	/**
	 * find path from start node to some end node, searching in DFS manner
	 * - It uses individual paths
	 */
	findPathDFS1<V>(params: FindPathParams<Node, V>) {
		const { seen, startIdx, endIdx } = this.#findPathSetup<V>(params);
		if (seen == null) return undefined;
		const dfs = (currIdx: number, path: number[]): number[] | undefined => {
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
					const pathFound = dfs(next, [...path, next]);
					if (pathFound) return pathFound;
				}
			}

			return undefined;
		};
		const _path = dfs(startIdx, [startIdx]);
		return _path && this.#idxToNodeName(_path);
	}

	/**
	 * find path from start node to some end node, searching in DFS manner
	 * - It uses global path, thus uses less memory
	 */
	findPathDFS2<V>(params: FindPathParams<Node, V>) {
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

	/**
	 * find path from start node to some end node, searching in BFS manner
	 * - It uses individual paths, thus uses more memory
	 */
	findPathBFS1<V>(params: FindPathParams<Node, V>) {
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

	/**
	 * find path from start node to some end node, searching in BFS manner
	 * - It uses prev array to keep track of parent, thus uses less memory
	 */
	findPathBFS2<V>(params: FindPathParams<Node, V>) {
		const { seen, startIdx, endIdx } = this.#findPathSetup<V>(params);
		if (seen == null) return undefined;
		const prev = new Array(seen.length).fill(null);
		const queue: number[] = [startIdx];

		while (queue.length > 0) {
			const at = queue.shift() as number;
			const edges = (this.graph.edges[at] as Edge[]).map((i) => this.getIndexFromEdge(i));
			console.log("looking at", {
				at: this.nodeToString(this.graph.nodes[at] as Node),
				edges: this.#idxToNodeName(edges),
			});

			for (const edge of edges) {
				prev[edge] = at;
				if (edge === endIdx) {
					console.log("Found end-------->");
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
		return path;
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
