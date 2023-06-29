import { logger } from "src/lib/logger.js";
import { PrioritySinglyLinkedList } from "../2.LinkedList/index.js";
import type { DSParams, Queue, CompareFunction, DataWithPriority, QueueFS } from "../types.js";

export type PriorityQueueWithSLLParams<T> = DSParams<T> & {
	compare: CompareFunction<T>;
};

export class PriorityQueueWithSLL<T> implements Queue<T> {
	#state: PrioritySinglyLinkedList<T>;

	#nodeToString: PriorityQueueWithSLLParams<T>["nodeToString"];
	constructor(params: PriorityQueueWithSLLParams<T>) {
		this.#nodeToString = params.nodeToString;
		this.#state = new PrioritySinglyLinkedList<T>({
			nodeToString: params.nodeToString,
			compare: params.compare,
		});
	}

	send(data: T) {
		this.#state.addWithPriority(data);
	}

	take(i = 1) {
		const items = [];
		for (let j = 0; j < i; j++) {
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
		logger.info(`PRIORITY_QUEUE: (Front): ${nodes.join(" -- ")} :(Back)`);
	}
}

export class PriorityQueueWithSLLFixedStructure<T> extends PriorityQueueWithSLL<
	DataWithPriority<T>
> {
	sendPriority(data: T, priority: number) {
		this.send({ data, priority });
	}
}

export const priorityQueueWithSLLStringFS = (): QueueFS<string> => {
	return new PriorityQueueWithSLLFixedStructure<string>({
		nodeToString: (i) => `${i.data}(${i.priority})`,
		compare: (data, node) => data.priority - node.priority,
	});
};

export const priorityQueueWithSLLNumberFS = (): QueueFS<number> => {
	return new PriorityQueueWithSLLFixedStructure<number>({
		nodeToString: (i) => `${i.data}(${i.priority})`,
		compare: (data, node) => data.priority - node.priority,
	});
};

export const priorityQueueWithSLLNumber = (): Queue<number> => {
	return new PriorityQueueWithSLL<number>({
		nodeToString: (i) => `${i}`,
		compare: (data: number, node: number) => data - node,
	});
};
