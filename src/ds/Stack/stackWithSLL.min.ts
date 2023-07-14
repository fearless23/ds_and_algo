class Node {
	next?: Node;
	constructor(public data: number) {}
}

// Minified version of stack with SLL and numbers
class StackWithSLLMin {
	#head?: Node;
	#size = 0;

	push(data: number) {
		const node = new Node(data);
		if (!this.#head) {
			this.#head = node;
			this.#size = 1;
			return;
		}

		node.next = this.#head;
		this.#head = node;
		this.#size += 1;
	}

	take() {
		if (!this.#head) return undefined;
		const data = this.#head.data;
		if (this.#size === 1) {
			this.#head = undefined;
			this.#size = 0;
			return data;
		}
		this.#head = this.#head.next;
		this.#size -= 1;
		return data;
	}

	peek() {
		return this.#head?.data;
	}
}

export const stackWithSLLMin = () => new StackWithSLLMin();
