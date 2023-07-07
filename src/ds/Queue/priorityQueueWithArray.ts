import { logger } from "../../lib/logger.js";
import type { DSParams, CompareFunction, Queue, DataWithPriority, QueueFS } from "../types.js";

export type PriorityQueueWithArrayParams<T> = DSParams<T> & {
	compare: CompareFunction<T>;
};

export class PriorityQueueWithArray<T> {
	queue: T[] = [];
	#nodeToString: PriorityQueueWithArrayParams<T>["nodeToString"];
	#compare: CompareFunction<T>;
	constructor(params: PriorityQueueWithArrayParams<T>) {
		this.#nodeToString = params.nodeToString;
		this.#compare = params.compare;
	}

	#findInsertAt(data: T) {
		for (let i = 0; i < this.queue.length; i++) {
			const item = this.queue[i] as T;
			if (this.#compare(data, item)) continue;
			else return i;
		}
		return "PUSH";
	}

	#addWithPriority(data: T) {
		const insertAt = this.#findInsertAt(data);
		if (insertAt === "PUSH") this.queue.push(data);
		else {
			const partA = this.queue.slice(0, insertAt);
			const partB = this.queue.slice(insertAt);
			this.queue = [...partA, data, ...partB];
		}
	}

	send(data: T) {
		this.#addWithPriority(data);
	}

	take(count = 1) {
		const items: T[] = [];
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
		const nodes = this.queue.map(this.#nodeToString);
		logger.info(`QUEUE: (Back): ${nodes.join(" -- ")} (Front)`);
	}
}

export class PriorityQueueWithArrayFixedStructure<T> extends PriorityQueueWithArray<
	DataWithPriority<T>
> {
	sendPriority(data: T, priority: number) {
		this.send({ data, priority });
	}
}

// CONCRETE IMPLEMENTATION`s
export const priorityQueueWithArrayStringFS = (): QueueFS<string> => {
	return new PriorityQueueWithArrayFixedStructure<string>({
		nodeToString: (i) => `${i.data}(${i.priority})`,
		compare: (data, node) => data.priority - node.priority,
	});
};

export const priorityQueueWithArrayNumberFS = (): QueueFS<number> => {
	return new PriorityQueueWithArrayFixedStructure<number>({
		nodeToString: (i) => `${i.data}(${i.priority})`,
		compare: (data, node) => data.priority - node.priority,
	});
};

export const priorityQueueWithArrayNumber = (): Queue<number> => {
	return new PriorityQueueWithArray<number>({
		nodeToString: (i) => `${i}`,
		compare: (data: number, node: number) => data - node,
	});
};
