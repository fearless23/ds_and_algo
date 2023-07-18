import { logger } from "src/lib/logger.js";
import { drawMermaidGraphBinaryTree } from "../utils.js";

export class Node {
	left?: Node;
	right?: Node;
	constructor(public data: number) {}
}

class BinarySearchTree {
	root?: Node;

	#insert(start: Node, data: number) {
		if (start.data === data) return; // duplicates not allowed
		const direction = data > start.data ? "right" : "left";
		const node = start[direction];
		if (node) this.#insert(node, data);
		else {
			start[direction] = new Node(data);
			return;
		}
	}

	insert(data: number) {
		if (!this.root) this.root = new Node(data);
		else this.#insert(this.root, data);
	}

	insertValues(data: number[]) {
		for (const item of data) this.insert(item);
	}

	#findByValue(start: Node, data: number): Node | undefined {
		// This is technically pre-order
		const compared = data - start.data;
		if (compared === 0) return start;
		const dir = compared > 0 ? "right" : "left";
		const node = start[dir];
		if (!node) return undefined;
		return this.#findByValue(node, data);
	}

	findByValue(data: number) {
		if (!this.root) return undefined;
		return this.#findByValue(this.root, data);
	}
}

export const bst = () => {
	const bst = new BinarySearchTree();
	return bst;
};

export const printBst = (name: string, tree?: Node) => {
	if (!tree) logger.info(name, undefined);
	logger.info(name, JSON.stringify(tree, null, 4));
};

export const printBstGraph = (name: string, tree?: Node) => {
	if (!tree) logger.info(name, undefined);
	// @ts-ignore
	logger.info(drawMermaidGraphBinaryTree(tree, (i) => String(i)));
};
