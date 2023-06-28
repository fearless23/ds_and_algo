import { queueWithArray as queueImpl } from "../4.Queue/index.js";

class Node<DataType> {
	data: DataType;
	left: Node<DataType> | null;
	right: Node<DataType> | null;
	constructor(data: DataType) {
		this.data = data;
		this.left = null;
		this.right = null;
	}
}

const create_node = <T>(data: T) => new Node<T>(data);

class BinarySearchTree<T> {
	root: Node<T> | null;
	constructor() {
		this.root = null;

		// Bindings
		this.insert = this.insert.bind(this);
		this.find = this.find.bind(this);
		this.insertMany = this.insertMany.bind(this);
		this.print = this.print.bind(this);
	}

	_addToSubTree(parentNode: Node<T> | null, data: T) {
		if (!parentNode) return null;

		const parentNodeData = parentNode.data;
		if (parentNodeData === data) return null;

		if (data > parentNodeData) {
			const nextNode = parentNode.right;
			if (nextNode) {
				console.log("going right");
				return nextNode;
			} else {
				console.log(`create right child of ${parentNodeData}`);
				parentNode.right = create_node(data);
				return nextNode;
			}
		}

		if (data < parentNodeData) {
			const nextNode = parentNode.left;
			if (nextNode) {
				console.log("going left");
				return nextNode;
			} else {
				console.log(`create left child of ${parentNodeData}`);
				parentNode.left = create_node(data);
				return nextNode;
			}
		}
	}

	_preOrder(startNode = this.root, order = []) {
		if (startNode === null) return;
		order.push(startNode.data);
		this._preOrder(startNode.left, order);
		this._preOrder(startNode.right, order);
	}

	_inOrder(startNode = this.root, order = []) {
		if (startNode === null) return;
		this._inOrder(startNode.left, order);
		order.push(startNode.data);
		this._inOrder(startNode.right, order);
	}

	_postOrder(startNode = this.root, order = []) {
		if (startNode === null) return;
		this._postOrder(startNode.left, order);
		this._postOrder(startNode.right, order);
		order.push(startNode.data);
	}

	_levelOrder(startNode = this.root, order = []) {
		if (startNode === null) return;
		const queue = queueImpl();
		queue.add(startNode);

		while (queue.items().length !== 0) {
			const [node] = queue.get();
			if (node) order.push(node.data);
			if (node.left) queue.add(node.left);
			if (node.right) queue.add(node.right);
		}
	}

	insert(data) {
		console.log(`======= INSERT ${data} =======`);
		if (this.root === null) {
			this.root = create_node(data);
			console.log(`added ${data} as root`);
			console.log("================================\n");
			return true;
		}

		let pointer = this.root;
		while (pointer) {
			pointer = this._addToSubTree(pointer, data);
		}
		console.log("================================\n");
	}

	insertMany(data = []) {
		for (const i of data) {
			this.insert(i);
		}
	}

	find(data) {
		if (!this.root) return null;
		let pointer = this.root;
		let running = true;
		while (running && pointer) {
			const pointerData = pointer.data;
			if (data === pointerData) running = false;
			if (data > pointerData) pointer = pointer.right;
			if (data < pointerData) pointer = pointer.left;
		}
		return pointer;
	}

	print(logger, orderType, name = "BST") {
		if (!orderType) {
			const root = JSON.stringify(this.root, null, 2);
			logger.info(`${name} ${root}`);
		}
		const root = this.root;
		const order = [];
		if (orderType === "PRE_ORDER") {
			this._preOrder(root, order);
		}
		if (orderType === "IN_ORDER") {
			this._inOrder(root, order);
		}
		if (orderType === "POST_ORDER") {
			this._postOrder(root, order);
		}
		if (orderType === "LEVEL_ORDER") {
			this._levelOrder(root, order);
		}
		logger.info(`${name} ${orderType}: ${order.join(", ")}`);
	}
}

export const binary_search_tree = () => {
	const BST = new BinarySearchTree();

	return {
		insert: BST.insert,
		find: BST.find,
		insertMany: BST.insertMany,
		print: BST.print,
	};
};
