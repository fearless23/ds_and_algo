import { logger } from "src/lib/logger.js";
import type { Queue } from "./types.js";
import { singlyLinkedList } from "../2.LinkedList/singlyLinkedList.js";
import { DEFAULT_NODE_TO_STRING, type DSParams } from "../types.js";

class QueueWithSLL<T> {
	queue = singlyLinkedList<T>();

	#printParams: DSParams<T>;
	constructor(printParams: DSParams<T>) {
		this.#printParams = printParams;
	}

	send(data: T) {
		this.queue.addTail(data);
	}

	take(count = 1) {
		const items: T[] = [];
		for (let j = 0; j < count; j++) {
			const item = this.queue.removeHead();
			if (item === null) break;
			else items.push(item);
		}
		return items;
	}

	peek() {
		const d = this.queue.peek();
		const f = d.head?.data ?? null;
		return { head: f, size: d.size };
	}

	print() {
		const nodes = this.queue.items().map(this.#printParams.nodeDataToString);
		logger.info(`QUEUE: (Front): ${nodes.join(" --> ")} (Back)`);
	}
}

export const queueWithSLL = <T>(params: Partial<DSParams<T>> = {}): Queue<T> => {
	const q = new QueueWithSLL<T>({
		nodeDataToString: DEFAULT_NODE_TO_STRING,
		...params,
	});
	return q;
};
