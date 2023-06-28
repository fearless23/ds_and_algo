import { logger } from "src/lib/logger.js";
import { queueWithArray } from "../4.Queue/index.js";

class Node<T> {
	data: T;
	left: Node<T> | null = null;
	right: Node<T> | null = null;
	constructor(data: T) {
		this.data = data;
	}
}

/**
 * Compare function tells if a > b in some manner
 * - true: a > b
 * - false: a <= b
 */
type CompareFunction<T> = (a: T, b: T) => boolean;
type FindFunction<T> = (a: T, b: T) => boolean;
type BinarySearchTreeParams<T> = {
	duplicateAllowed: boolean;
	compare: CompareFunction<T>;
	find: FindFunction<T>;
};
export type OrderType = "PRE_ORDER" | "IN_ORDER" | "POST_ORDER" | "LEVEL_ORDER";
const createNode = <T>(data: T) => new Node(data);

class BinarySearchTree<T> {
	root: Node<T> | null = null;

	duplicateAllowed: boolean;
	#compare: CompareFunction<T>;
	#findFunction: FindFunction<T>;
	constructor(params: BinarySearchTreeParams<T>) {
		this.duplicateAllowed = params.duplicateAllowed;
		this.#compare = params.compare;
		this.#findFunction = params.find;
	}

	#decideAndInsert(start: Node<T>, data: T) {
		// 1. decide the direction to go in
		const dataBigger = this.#compare(data, start.data);
		const dir = dataBigger ? "right" : "left";
		const node = start[dir];
		if (node) {
			this.#decideAndInsert(node, data);
		} else {
			start[dir] = createNode(data);
			return; // EXIT
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
		const found = this.#findFunction(start.data, data);
		if (found) return start;
		// 1. pick a direction
		const dataBigger = this.#compare(data, start.data);
		const dir = dataBigger ? "right" : "left";
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
		const queue = queueWithArray<Node<T>>();
		queue.send(start);

		while (queue.peek().size !== 0) {
			const [node] = queue.take();
			if (node) nodes.push(node.data);
			if (node?.left) queue.send(node.left);
			if (node?.right) queue.send(node.right);
		}
	}

	find(data: T) {
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

type BSTWithNodeParams<T> = Omit<BinarySearchTreeParams<T>, "duplicateAllowed"> & {
	duplicateAllowed?: boolean;
};

export const bstWithNode = <T>(params: BSTWithNodeParams<T>) => {
	const BST = new BinarySearchTree({ duplicateAllowed: false, ...params });
	return BST;
};

export const numberBST = (duplicateAllowed = false) => {
	const bst = new BinarySearchTree<number>({
		duplicateAllowed,
		compare: (a: number, b: number) => a > b,
		find: (a: number, b: number) => a === b,
	});
	return bst;
};
