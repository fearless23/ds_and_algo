import { logger } from "src/lib/logger.js";
import { queueWithArray } from "../4.Queue/index.js";
import type { CompareFunction, DSParams, OrderType } from "../types.js";

class Node<T> {
	data: T;
	left: Node<T> | null = null;
	right: Node<T> | null = null;
	constructor(data: T) {
		this.data = data;
	}
}
const createNode = <T>(data: T) => new Node(data);

export type BinarySearchTreeParams<T> = DSParams<T> & {
	duplicateAllowed: boolean;
	compare: CompareFunction<T>;
};

export class BinarySearchTree<T> {
	root: Node<T> | null = null;

	duplicateAllowed: boolean;
	#nodeToString: BinarySearchTreeParams<T>["nodeToString"];
	#compare: CompareFunction<T>;
	constructor(params: BinarySearchTreeParams<T>) {
		this.duplicateAllowed = params.duplicateAllowed;
		this.#compare = params.compare;
		this.#nodeToString = params.nodeToString;
	}

	#decideAndInsert(start: Node<T>, data: T) {
		const direction = this.#compare(data, start.data) > 0 ? "right" : "left";
		const node = start[direction];
		if (node) this.#decideAndInsert(node, data);
		else {
			start[direction] = createNode(data);
			return;
		}
	}

	insert(data: T) {
		if (this.root === null) this.root = createNode(data);
		else this.#decideAndInsert(this.root, data);
	}

	insertValues(data: T[]) {
		for (const item of data) this.insert(item);
	}

	#findFrom(start: Node<T>, data: T): Node<T> | null {
		const compared = this.#compare(data, start.data);
		if (compared === 0) return start;
		const dir = compared > 0 ? "right" : "left";
		const node = start[dir];
		if (!node) return null;
		return this.#findFrom(node, data);
	}

	/**
	 * Similar to a BFS
	 */
	#preOrder(start: Node<T> | null, nodes: T[]) {
		if (start === null) return;
		nodes.push(start.data);
		this.#preOrder(start.left, nodes);
		this.#preOrder(start.right, nodes);
	}

	#inOrder(start: Node<T> | null, nodes: T[]) {
		if (start === null) return;
		this.#inOrder(start.left, nodes);
		nodes.push(start.data);
		this.#inOrder(start.right, nodes);
	}

	#postOrder(start: Node<T> | null, nodes: T[]) {
		if (start === null) return;
		this.#postOrder(start.left, nodes);
		this.#postOrder(start.right, nodes);
		nodes.push(start.data);
	}

	#levelOrder(start: Node<T> | null, nodes: T[]) {
		if (start === null) return;
		const queue = queueWithArray<Node<T>>({
			nodeToString: (i) => this.#nodeToString(i.data),
		});
		queue.send(start);
		while (queue.peek().size !== 0) {
			const [node] = queue.take();
			if (node) nodes.push(node.data);
			if (node?.left) queue.send(node.left);
			if (node?.right) queue.send(node.right);
		}
	}

	findByValue(data: T) {
		if (!this.root) return null;
		return this.#findFrom(this.root, data);
	}

	print() {
		logger.debug(JSON.stringify(this.root, null, 4));
	}

	getOrder(type: OrderType) {
		const nodes: T[] = [];
		switch (type) {
			case "PRE_ORDER": {
				this.#preOrder(this.root, nodes);
				break;
			}
			case "IN_ORDER": {
				this.#inOrder(this.root, nodes);
				break;
			}
			case "POST_ORDER": {
				this.#postOrder(this.root, nodes);
				break;
			}
			case "LEVEL_ORDER": {
				this.#levelOrder(this.root, nodes);
				break;
			}
			default: {
				break;
			}
		}
		return nodes;
	}

	printOrder(type: OrderType) {
		const nodes = this.getOrder(type);
		logger.debug(type, ":", nodes.join(", "));
	}
}

export const bstWithNodeString = (duplicateAllowed = false) => {
	const bst = new BinarySearchTree<{ data: string; value: number }>({
		nodeToString: (i) => `${i}`,
		duplicateAllowed,
		compare: (a, b) => a.value - b.value,
	});
	return bst;
};

export const bstWithNodeNumber = (duplicateAllowed = false) => {
	const bst = new BinarySearchTree<number>({
		nodeToString: (i) => `${i}`,
		duplicateAllowed,
		compare: (a, b) => a - b,
	});
	return bst;
};
