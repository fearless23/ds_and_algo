import type { DSParams, Graph, NodeToString } from "../types.js";
import { logger } from "src/lib/logger.js";
import { drawMermaidGraphOfGraph } from "../utils.js";

export type GraphDSParams<Node, Edge> = DSParams<Node> & {
	getIndexFromEdge: (edge: Edge) => number;
	graph?: Graph<Node, Edge>;
};

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

	findPathDFS<V>(params: { value: V; finder: (node: Node, value: V) => boolean; start?: V }) {
		// To find path, we will start at node and try to find the mentioned node
		let startIdx = 0;
		if (params.start) {
			const t = params.start;
			startIdx = this.graph.nodes.findIndex((i) => params.finder(i, t));
		}
		if (startIdx === -1) return undefined;
		const endIdx = this.graph.nodes.findIndex((i) => params.finder(i, params.value));
		if (endIdx === -1) return undefined;
		const seen = new Array(this.graph.nodes.length).fill(false);
		seen[startIdx] = true;
		// dfs
		const dfs = (startIdx: number, path: number[]): number[] | undefined => {
			const edges = (this.graph.edges[startIdx] as Edge[]).map((c) => this.getIndexFromEdge(c));
			// find if end is in any of edges
			if (edges.find((i) => i === endIdx)) {
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
		const path = dfs(startIdx, [startIdx]);
		return path?.map((i) => this.nodeToString(this.graph.nodes[i] as Node));
	}

	findPathBFS<V>(params: { value: V; finder: (node: Node, value: V) => boolean; start?: V }) {
		// TODO: implement this
		let startIdx = 0;
		if (params.start) {
			const t = params.start;
			startIdx = this.graph.nodes.findIndex((i) => params.finder(i, t));
		}
		if (startIdx === -1) return undefined;
		const endIdx = this.graph.nodes.findIndex((i) => params.finder(i, params.value));
		// visit every node in bfs manner, but keep track of what`s been visited...
		// bfs
		const queue: { at: number; path: number[] }[] = [{ at: startIdx, path: [startIdx] }];
		while (queue.length > 0) {
			const { at, path } = queue.shift() as { at: number; path: number[] };
			const edges = (this.graph.edges[at] as Edge[]).map((i) => this.getIndexFromEdge(i));
			for (const edge of edges) {
				if (edge === endIdx) {
					path.push(endIdx);
					return path?.map((i) => this.nodeToString(this.graph.nodes[i] as Node));
				} else {
					queue.push({ at: edge, path: [...path, edge] });
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
