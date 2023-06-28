import type { PriorityQueue } from "./types.js";
import { logger } from "src/lib/logger.js";
import type { DataWithPriority } from "../2.LinkedList/index.js";
import { DEFAULT_PNODE_TO_STRING, type DSParams } from "../types.js";

class PriorityQueueWithArray<T> {
	queue: DataWithPriority<T>[] = [];
	#printParams: DSParams<DataWithPriority<T>>;

	constructor(params: DSParams<DataWithPriority<T>>) {
		this.#printParams = params;
	}

	#findInsertAt(priority: number) {
		for (let i = 0; i < this.queue.length; i++) {
			const item = this.queue[i] as DataWithPriority<T>;
			if (priority > item.priority) continue;
			else return i;
		}
		return "PUSH";
	}

	#addWithPriority(data: T, priority: number) {
		const insertAt = this.#findInsertAt(priority);
		if (insertAt === "PUSH") this.queue.push({ data, priority });
		else {
			const partA = this.queue.slice(0, insertAt);
			const partB = this.queue.slice(insertAt);
			this.queue = [...partA, { data, priority }, ...partB];
		}
	}

	// Node with highest priority is added to front
	// For lowest priority to be added to front: multiply priority by -1
	send(data: T, priority: number) {
		this.#addWithPriority(data, priority);
	}

	take(count = 1) {
		const items: DataWithPriority<T>[] = [];
		for (let j = 0; j < count; j++) {
			const item = this.queue.pop();
			if (!item) break;
			else items.push(item);
		}
		return items;
	}

	peek() {
		const d = this.queue.at(-1);
		const f = d ?? null;
		return { head: f, size: this.queue.length };
	}

	print() {
		const nodes = this.queue.map(this.#printParams.nodeDataToString);
		logger.info(`QUEUE: (Back): ${nodes.join(" -- ")} (Front)`);
	}
}

// Instead of passing compareFunction, use similar function to pass a priority as number to Data;
export const priorityQueueWithArray = <T>(
	params: Partial<DSParams<DataWithPriority<T>>> = {},
): PriorityQueue<T> => {
	const sll = new PriorityQueueWithArray<T>({
		nodeDataToString: DEFAULT_PNODE_TO_STRING,
		...params,
	});
	return sll;
};
