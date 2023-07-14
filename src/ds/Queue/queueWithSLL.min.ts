class Node {
	next?: Node;
	constructor(public data: number) {}
}

// Minified version of Queue with SinglyLinkedList and number
class QueueWithSLLMin {
	#head?: Node;
	#tail?: Node;
	#size = 0;

	enqueue(data: number) {
		const node = new Node(data);
		if (!this.#tail) {
			this.#head = node;
			this.#tail = node;
			this.#size = 1;
			return;
		}

		this.#tail.next = node;
		this.#tail = node;
		this.#size += 1;
	}

	deque() {
		if (!this.#head) return undefined;
		const data = this.#head.data;
		if (this.#size === 1) {
			this.#head = undefined;
			this.#tail = undefined;
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

	get size() {
		return this.#size;
	}
}

export const queueWithSLLMin = () => new QueueWithSLLMin();
