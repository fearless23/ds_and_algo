import { logger } from "../../lib/logger.js";
import type { DSParams, CompareFunction, Queue, DataWithPriority, QueueFS } from "../types.js";
import { heapVariant, BinaryHeap } from "../BinaryHeap/index.js";

export type PriorityQueueWithBinaryHeapParams<T> = DSParams<T> & {
	compare: CompareFunction<T>;
};

export class PriorityQueueWithBinaryHeap<T> {
	#state: BinaryHeap<T>;

	#nodeToString: PriorityQueueWithBinaryHeapParams<T>["nodeToString"];
	constructor(params: PriorityQueueWithBinaryHeapParams<T>) {
		this.#nodeToString = params.nodeToString;
		this.#state = new BinaryHeap<T>({ ...params, heapVariant: heapVariant.MAX });
	}

	send(data: T) {
		this.#state.add(data);
	}

	take(i = 1) {
		const items: T[] = [];
		for (let j = 0; j < i; j++) {
			const item = this.#state.removeAtIndex(0);
			if (item == null) break;
			else items.push(item);
		}
		return items;
	}

	peek() {
		return this.#state.peek();
	}

	print() {
		const nodes = this.#state.items().map(this.#nodeToString);
		logger.info(`PRIORITY_QUEUE (BinaryHeap): <Root> ${nodes.join(" -- ")}`);
	}
}

export class PriorityQueueWithBinaryHeapFixedStructure<T> extends PriorityQueueWithBinaryHeap<
	DataWithPriority<T>
> {
	sendPriority(data: T, priority: number) {
		this.send({ data, priority });
	}
}

export const priorityQueueWithBinaryHeapStringFS = (): QueueFS<string> => {
	return new PriorityQueueWithBinaryHeapFixedStructure<string>({
		nodeToString: (i) => `${i.data}(${i.priority})`,
		compare: (data, node) => data.priority - node.priority,
	});
};

export const priorityQueueWithBinaryHeapNumberFS = (): QueueFS<number> => {
	return new PriorityQueueWithBinaryHeapFixedStructure<number>({
		nodeToString: (i) => `${i.data}(${i.priority})`,
		compare: (data, node) => data.priority - node.priority,
	});
};

export const priorityQueueWithBinaryHeapNumber = (): Queue<number> => {
	return new PriorityQueueWithBinaryHeap<number>({
		nodeToString: (i) => `${i}`,
		compare: (data: number, node: number) => data - node,
	});
};
