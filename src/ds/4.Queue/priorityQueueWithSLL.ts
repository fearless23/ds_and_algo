import type { PriorityQueue } from "./types.js";
import { logger } from "src/lib/logger.js";
import type { DataWithPriority } from "../2.LinkedList/index.js";
import { DEFAULT_PNODE_TO_STRING, type DSParams } from "../types.js";
import { singlyLinkedListWithPriority } from "../2.LinkedList/index.js";

class PriorityQueueWithSLL<T> {
	queue = singlyLinkedListWithPriority<T>();
	#printParams: DSParams<DataWithPriority<T>>;

	constructor(params: DSParams<DataWithPriority<T>>) {
		this.#printParams = params;
	}

	// Node with highest priority is added to front
	// For lowest priority to be added to front: multiply priority by -1
	send(data: T, priority: number) {
		this.queue.addWithPriority({ data, priority });
	}

	take(i = 1) {
		const items = [];
		for (let j = 0; j < i; j++) {
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
		logger.info(`PRIORITY_QUEUE: (Front): ${nodes.join(" -- ")} :(Back)`);
	}
}

// Instead of passing compareFunction, use similar function to pass a priority as number to Data;
export const priorityQueueWithSLL = <T>(
	params: Partial<DSParams<DataWithPriority<T>>> = {},
): PriorityQueue<T> => {
	const sll = new PriorityQueueWithSLL<T>({
		nodeDataToString: DEFAULT_PNODE_TO_STRING,
		...params,
	});
	return sll;
};
