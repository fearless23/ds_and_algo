import { logger } from "../../lib/logger.js";
import type { DSParams, Queue } from "../types.js";
import { SinglyLinkedList } from "../LinkedList/index.js";

export type QueueWithSLLParams<T> = DSParams<T>;
export class QueueWithSLL<T> {
	#state: SinglyLinkedList<T>;

	#nodeToString: QueueWithSLLParams<T>["nodeToString"];
	constructor(params: QueueWithSLLParams<T>) {
		this.#nodeToString = params.nodeToString;
		this.#state = new SinglyLinkedList<T>({ nodeToString: params.nodeToString });
	}

	send(data: T) {
		this.#state.addTail(data);
	}

	take(count = 1) {
		const items: T[] = [];
		for (let j = 0; j < count; j++) {
			const item = this.#state.removeHead();
			if (item === null) break;
			else items.push(item);
		}
		return items;
	}

	peek() {
		const d = this.#state.peek();
		const f = d.head?.data ?? null;
		return { head: f, size: d.size };
	}

	print() {
		const nodes = this.#state.items().map(this.#nodeToString);
		logger.info(`QUEUE: (Front): ${nodes.join(" --> ")} (Back)`);
	}
}

export const queueWithSLL = <T>(params: QueueWithSLLParams<T>): Queue<T> => {
	return new QueueWithSLL<T>(params);
};

export const queueWithSLLString = () => queueWithSLL<string>({ nodeToString: (i) => i });
export const queueWithSLLNumber = () => queueWithSLL<number>({ nodeToString: (i) => `${i}` });
