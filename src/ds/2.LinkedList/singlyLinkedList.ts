import { logger } from "../../lib/logger.js";
import { type DSParams, DEFAULT_NODE_TO_STRING } from "../types.js";

class Node<DataType> {
	data: DataType;
	next: Node<DataType> | null;
	constructor(data: DataType) {
		this.data = data;
		this.next = null;
	}
}

export class SinglyLinkedList<T> {
	head: Node<T> | null = null;
	tail: Node<T> | null = null;
	size = 0;
	#printParams: DSParams<T>;
	constructor(printParams: DSParams<T>) {
		this.#printParams = printParams;
	}

	#init(node: Node<T>) {
		this.head = node;
		this.tail = node;
		this.size = 1;
	}

	#createNode(data: T) {
		const new_node = new Node(data);
		return new_node;
	}

	#getNodeAtIndex(i: number) {
		if (i < 0) return null;
		let curr = this.head;
		let curr_index = 0;
		while (curr_index !== i) {
			if (!curr) return null;
			curr = curr.next;
			curr_index += 1;
		}
		return curr;
	}

	#addNodeAfterTail(data: T) {
		const node = this.#createNode(data);
		if (this.size === 0) return this.#init(node);

		(this.tail as Node<T>).next = node;
		this.tail = node;
		this.size += 1;
	}

	#removeNodeAtTail() {
		if (this.size === 0) return null;

		const tail = this.tail as Node<T>;
		const before_tail_node = this.#getNodeAtIndex(this.size - 2);
		if (!before_tail_node) {
			this.head = null;
			this.tail = null;
		} else {
			before_tail_node.next = null;
			this.tail = before_tail_node;
		}
		this.size -= 1;
		return tail.data;
	}

	#addNodeBeforeHead(data: T) {
		const node = this.#createNode(data);
		if (this.size === 0) return this.#init(node);

		node.next = this.head;
		this.head = node;
		this.size += 1;
	}

	#removeNodeAtHead() {
		if (this.size === 0) return null;
		const data = (this.head as Node<T>).data;
		if (this.size === 1) {
			this.head = null;
			this.tail = null;
			this.size = 0;
			return data;
		}
		this.head = (this.head as Node<T>).next;
		this.size -= 1;
		return data;
	}

	#addNodeAtIndex(index: number, data: T) {
		if (index < 0 || index >= this.size) {
			throw new Error(`index out of bounds, should be b/w 0 & ${this.size - 1}`);
		}

		const node = this.#createNode(data);
		if (this.size === 0) return this.#init(node);

		const prev_node = this.#getNodeAtIndex(index - 1);
		if (!prev_node) {
			node.next = this.head;
			this.head = node;
		} else {
			node.next = prev_node.next;
			prev_node.next = node;
		}
		this.size += 1;
	}

	#removeNodeAtIndex(index: number) {
		if (index < 0 || index >= this.size) {
			throw new Error(`index out of bounds, should be b/w 0 & ${this.size - 1}`);
		}
		if (this.size === 0) return null;
		if (index === 0) return this.#removeNodeAtHead();
		if (index === this.size - 1) return this.#removeNodeAtTail();
		// Case: A -> B -> C
		const A = this.#getNodeAtIndex(index - 1) as Node<T>;
		const B = A.next as Node<T>;
		A.next = B.next;
		this.size -= 1;
		return B.data;
	}

	// #addWithPriority(data: T, compare_function) {
	// 	const node = this.#createNode(data);
	// 	if (this.size === 0) return this.#init(node);

	// 	const priority = data.priority;
	// 	let current_node = this.head;
	// 	let index = 0;
	// 	while (current_node) {
	// 		if (compare_function(priority, current_node.data.priority)) {
	// 			current_node = null;
	// 		} else {
	// 			current_node = current_node.next;
	// 			index += 1;
	// 		}
	// 	}
	// 	if (index === this.size) return this._addNodeAfterTail(data);
	// 	else return this._addNodeAtIndex(index, data);
	// }

	#getNodes() {
		const nodes = [];
		let current_node = this.head;
		while (current_node) {
			nodes.push(current_node.data);
			current_node = current_node.next;
		}
		return nodes;
	}

	/*
   --------- PUBLIC METHODS ----------
  */

	addTail(data: T) {
		this.#addNodeAfterTail(data);
	}
	addTails(data: T[]) {
		data.forEach((i) => this.#addNodeAfterTail(i));
	}
	removeTail() {
		this.#removeNodeAtTail();
	}
	addHead(data: T) {
		this.#addNodeBeforeHead(data);
	}
	removeHead() {
		return this.#removeNodeAtHead();
	}
	addAtIndex(index: number, data: T) {
		this.#addNodeAtIndex(index, data);
	}
	removeAtIndex(index: number) {
		return this.#removeNodeAtIndex(index);
	}
	items() {
		return this.#getNodes();
	}
	peek() {
		return {
			head: this.head,
			tail: this.tail,
			size: this.size,
		};
	}

	print() {
		const { nodeDataToString } = this.#printParams;
		const nodeData = this.#getNodes().map(nodeDataToString);
		logger.info(`SLL: ${nodeData.join(" ---> ")}`);
	}
}

export const singlyLinkedList = <T>(params: Partial<DSParams<T>> = {}) => {
	const sll = new SinglyLinkedList<T>({
		nodeDataToString: DEFAULT_NODE_TO_STRING,
		...params,
	});
	return sll;
};
