import type { DSParams, Graph, NodeToString } from "../types.js";
import { logger } from "src/lib/logger.js";
import { drawMermaidGraphOfGraph } from "../utils.js";

export type GraphDSParams<N, C> = DSParams<N> & {
	getIndexFromConnection: (connection: C) => number;
	graph?: Graph<N, C>;
};

class GraphDS<N, C> {
	graph: Graph<N, C> = {
		nodes: [],
		connections: [],
	};
	nodeToString: NodeToString<N>;
	getIndexFromConnection: (connection: C) => number;
	constructor(params: GraphDSParams<N, C>) {
		if (params.graph) this.graph = params.graph;
		this.nodeToString = params.nodeToString;
		this.getIndexFromConnection = params.getIndexFromConnection;
	}
	addNodeAndConnections(node: N, connections: C[]) {
		this.graph.nodes.push(node);
		this.graph.connections.push(connections);
	}
	print() {
		const data = this.graph.nodes.map((node, index) => {
			const connections = this.graph.connections[index] as C[];
			const nodeName = this.nodeToString(node);
			const connectionNames = connections?.map((c) => {
				const idx = this.getIndexFromConnection(c);
				return this.nodeToString(this.graph.nodes[idx] as N);
			});
			return [nodeName, connectionNames];
		});
		logger.info("Graph", JSON.stringify(data, null, 4));
	}

	printGraph() {
		const graph = drawMermaidGraphOfGraph(
			this.graph,
			this.nodeToString,
			this.getIndexFromConnection,
		);
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
		getIndexFromConnection: (i) => i,
		nodeToString: (i) => i,
	});
};
