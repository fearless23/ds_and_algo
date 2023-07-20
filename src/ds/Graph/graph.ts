import type { DSParams, Graph, NodeToString } from "../types.js";
import { logger } from "src/lib/logger.js";
import { drawMermaidGraphOfGraph } from "../utils.js";

export type GraphDSParams<Node, Edge> = DSParams<Node> & {
	getIndexFromEdge: (edge: Edge) => number;
	graph: Graph<Edge>;
	nodes: Node[];
};

type FindPathParams = { endIdx: number; startIdx: number };
class GraphDS<Node, Edge> {
	nodes: Node[] = [];
	graph: Graph<Edge> = [];
	nodeToString: NodeToString<Node>;
	getIndexFromEdge: (connection: Edge) => number;
	// getWeightFromEdge: (connection: Edge) => number;
	size = 0;
	constructor(params: GraphDSParams<Node, Edge>) {
		this.graph = params.graph;
		this.nodes = params.nodes;
		this.size = this.graph.length;
		this.nodeToString = params.nodeToString;
		this.getIndexFromEdge = params.getIndexFromEdge;
	}
	addNodeAndConnections(node: Node, connections: Edge[]) {
		this.nodes.push(node);
		this.graph.push(connections);
		this.size += 1;
	}

	// NOTE: findByValue - loop over this.graph.nodes to find the node by value

	#findPathSetup({ startIdx, endIdx }: FindPathParams) {
		this.#outOfBounds(startIdx);
		this.#outOfBounds(endIdx);
		if (startIdx === endIdx) throw new Error("start and end are same");
		const seen: boolean[] = new Array(this.nodes.length).fill(false);
		seen[startIdx] = true;
		return { startIdx, endIdx, seen };
	}

	#idxToNodeName(indices: number[]) {
		return indices?.map((i) => this.nodeToString(this.nodes[i] as Node));
	}

	#idxEdges(idx: number) {
		return (this.graph[idx] as Edge[]).map((c) => this.getIndexFromEdge(c));
	}

	#outOfBounds(idx: number) {
		if (idx < 0 || idx >= this.nodes.length) {
			throw new Error(`idx:${idx} out of bounds`);
		}
	}

	/**
	 * Prints nodes in BFS order start as some node
	 */
	printBFS(startIdx: number) {
		this.#outOfBounds(startIdx);
		const seen: boolean[] = new Array(this.graph.length).fill(false);
		seen[startIdx] = true;
		const queue: number[] = [startIdx];
		const order = [];
		while (queue.length > 0) {
			const at = queue.shift() as number;
			order.push(at); // visited
			const edges = this.#idxEdges(at);
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
	printDFS(startIdx: number) {
		this.#outOfBounds(startIdx);
		const seen: boolean[] = new Array(this.graph.length).fill(false);
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
	findPathDFS1(params: FindPathParams) {
		const { seen, startIdx, endIdx } = this.#findPathSetup(params);
		const dfs = (currIdx: number, path: number[]): number[] | undefined => {
			const edges = this.#idxEdges(currIdx);
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
	findPathDFS2(params: FindPathParams) {
		const { seen, startIdx, endIdx } = this.#findPathSetup(params);
		const path = [startIdx];
		const dfs = (currIdx: number): number[] | undefined => {
			const edges = this.#idxEdges(currIdx);
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
	findPathBFS1(params: FindPathParams) {
		const { seen, startIdx, endIdx } = this.#findPathSetup(params);
		const queue: { at: number; path: number[] }[] = [{ at: startIdx, path: [startIdx] }];

		while (queue.length > 0) {
			const { at, path } = queue.shift() as { at: number; path: number[] };
			const edges = this.#idxEdges(at);
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
	findPathBFS2(params: FindPathParams) {
		const { seen, startIdx, endIdx } = this.#findPathSetup(params);
		const prev = new Array(seen.length).fill(null);
		const queue: number[] = [startIdx];

		while (queue.length > 0) {
			const at = queue.shift() as number;
			const edges = this.#idxEdges(at);
			console.log("looking at", {
				at: this.nodeToString(this.nodes[at] as Node),
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
			path.push(curr);
			curr = prev[curr];
		}
		path.push(startIdx);
		return this.#idxToNodeName(path.reverse());
	}

	print() {
		const data = this.nodes.map((node, index) => {
			const nodeName = this.nodeToString(node);
			const connections = this.#idxEdges(index);
			const connectionNames = connections.map((idx) => {
				return this.nodeToString(this.nodes[idx] as Node);
			});
			return [nodeName, connectionNames];
		});
		logger.info("Graph", JSON.stringify(data, null, 4));
	}

	printGraph() {
		const graph = drawMermaidGraphOfGraph(
			this.graph,
			this.nodes,
			this.nodeToString,
			this.getIndexFromEdge,
		);
		logger.info("Graph", graph);
	}
}

export const graph = <N, C>(params: GraphDSParams<N, C>) => {
	return new GraphDS(params);
};

// nodes are strings and connections as number index
export const graphString = (graph: Graph<number>, nodes: string[]) => {
	return new GraphDS({
		graph,
		nodes,
		getIndexFromEdge: (i) => i,
		nodeToString: (i) => i,
	});
};
