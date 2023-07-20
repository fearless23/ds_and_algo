import type { Graph, NodeToString } from "./types.js";
import type { Node as TrieNode } from "./Trie/index.js";
import type { Node } from "./BinarySearchTree/bstWithNode.js";

/**
 * Produces a unique integer for a given string
 */
export const hashString = (string: string) => {
	let hash = 0;
	for (let i = 0; i < string.length; i++) {
		const code = string.charCodeAt(i);
		hash = (hash << 5) - hash + code;
		hash = hash & hash; // Convert to 32bit integer
	}
	return hash;
};

/**
 * Secondary Hash of Double Hashing
 * TODO: it should be different from hashString
 */
export const hashString2 = (string: string) => {
	let hash = 0;
	for (let i = 0; i < string.length; i++) {
		const code = string.charCodeAt(i);
		hash = (hash << 5) - hash + code;
		hash = hash & hash; // Convert to 32bit integer
	}
	return hash;
};

/**
 * Normalize a number into [ 0, capacity ) range
 */
export const normalizeNumber = (i: number, capacity: number) => {
	return (i & 0x7fffffff) % capacity;
};

/**
 * Convert a integer to binary
 */
export const decimalToBinary = (int: number) => int.toString(2);

/**
 * Convert a binary number to integer
 */
export const binaryToInteger = (binary: string) => parseInt(binary, 2);

/**
 * First significant bit
 */
export const getFSB = (int: number) => int & (-1 * int);

/**
 * Adds two binary values `a` + `b`
 */
export const addBinary = (a: string, b: string) => {
	return (BigInt(`0b${a}`) + BigInt(`0b${b}`)).toString(2);
};

/**
 * Subtracts two binary values `a` - `b`
 */
export const subBinary = (a: string, b: string) => {
	return (BigInt(`0b${a}`) - BigInt(`0b${b}`)).toString(2);
};

export const mermaidPointer = (a: string, b: string, aId?: string, bId?: string) =>
	`${aId ?? a}((${a})) --> ${bId ?? b}((${b}))`;

export const mermaidPointerArrowText = (a: string, b: string, text: string) =>
	`${a}((${a})) --${text}--> ${b}((${b}))`;

export const mermaidPointerTrie = (
	a: string,
	b: string,
	aId: string,
	bId: string,
	aEnd?: boolean,
	bEnd?: boolean,
) => {
	const aText = aEnd ? `${aId}(((${a})))` : `${aId}((${a}))`;
	const bText = bEnd ? `${bId}(((${b})))` : `${bId}((${b}))`;
	return `${aText} --> ${bText}`;
};
export const insertInMermaidGraph = (text: string) => {
	return `\`\`\`mermaid
graph TB;
${text}
\`\`\``;
};

class BinaryTreeNode<T> {
	data: T;
	left: Node<T> | null = null;
	right: Node<T> | null = null;
	constructor(data: T) {
		this.data = data;
	}
}

export const drawMermaidGraphBinaryTree = <T>(
	root: BinaryTreeNode<T> | null,
	nodeToString: NodeToString<T>,
) => {
	if (!root) return "";
	const draw = (node: BinaryTreeNode<T>) => {
		let text = "";
		const s = nodeToString(node.data);
		if (node.left) {
			const l = nodeToString(node.left.data);
			text += `${mermaidPointer(s, l)}\n`;
			text += draw(node.left);
		}
		if (node.right) {
			const r = nodeToString(node.right.data);
			text += `${mermaidPointer(s, r)}\n`;
			text += draw(node.right);
		}
		return text;
	};
	const text = draw(root);
	return insertInMermaidGraph(text);
};

export const drawMermaidGraphBinaryHeap = <T>(heap: T[], nodeToString: NodeToString<T>) => {
	if (heap.length === 0) return "";
	const draw = (idx: number) => {
		let text = "";
		const s = nodeToString(heap[idx] as T);
		const leftIdx = 2 * idx + 1;
		const rightIdx = leftIdx + 1;
		if (heap[leftIdx] != null) {
			const l = nodeToString(heap[leftIdx] as T);
			text += `${mermaidPointer(s, l, String(idx), String(leftIdx))}\n`;
			text += draw(leftIdx);
		}
		if (heap[rightIdx] != null) {
			const r = nodeToString(heap[rightIdx] as T);
			text += `${mermaidPointer(s, r, String(idx), String(rightIdx))}\n`;
			text += draw(rightIdx);
		}
		return text;
	};
	const text = draw(0);
	return insertInMermaidGraph(text);
};

export const drawMermaidGraphTrie = (root: TrieNode) => {
	const draw = (node: TrieNode, level: number) => {
		let text = "";
		const s = node.data;
		for (const child of node.children) {
			if (child) {
				const l = child.data;
				text += `${mermaidPointerTrie(s, l, node.id, child.id, node.isWord, child.isWord)}\n`;
				text += draw(child, level + 1);
			}
		}
		return text;
	};
	const text = draw(root, 0);
	return insertInMermaidGraph(text);
};

export const drawMermaidGraphOfGraph = <Node, Edge>(
	graph: Graph<Edge>,
	nodes: Node[],
	nodeToString: NodeToString<Node>,
	getIndexFromEdge: (edge: Edge) => number,
) => {
	let text = "";
	for (let i = 0; i < graph.length; i++) {
		const nodeName = nodeToString(nodes[i] as Node); // this node connections
		const edges = graph[i] as Edge[];
		for (const c of edges) {
			const nodeIdx = getIndexFromEdge(c);
			const nodeName2 = nodeToString(nodes[nodeIdx] as Node);
			text += `${mermaidPointer(nodeName, nodeName2)}\n`;
		}
	}
	return insertInMermaidGraph(text);
};

export const drawMermaidGraphOfGraphMin = <Edge>(
	graph: Graph<Edge>,
	getIndexFromEdge: (edge: Edge) => number,
) => {
	let text = "";
	for (let i = 0; i < graph.length; i++) {
		const edges = graph[i] as Edge[];
		for (const c of edges) {
			const nodeIdx = getIndexFromEdge(c);
			text += `${mermaidPointer(String(i), String(nodeIdx))}\n`;
		}
	}
	return insertInMermaidGraph(text);
};

export const drawMermaidGraphOfGraphDijkstra = (graph: Graph<{ to: number; length: number }>) => {
	let text = "";
	for (let i = 0; i < graph.length; i++) {
		const edges = graph[i] as { to: number; length: number }[];
		for (const c of edges) {
			const nodeIdx = c.to;
			text += `${mermaidPointerArrowText(String(i), String(nodeIdx), String(c.length))}\n`;
		}
	}
	return insertInMermaidGraph(text);
};
