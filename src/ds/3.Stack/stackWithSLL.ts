import { logger } from "../../lib/logger.js";
import { DEFAULT_NODE_TO_STRING, type DSParams } from "../types.js";
import { singlyLinkedList } from "../2.LinkedList/singlyLinkedList.js";
import type { Stack } from "./types.js";

class StackWithSLL<T> {
	stack = singlyLinkedList<T>();
	#printParams: DSParams<T>;
	constructor(printParams: DSParams<T>) {
		this.#printParams = printParams;
	}

	push(data: T) {
		this.stack.addHead(data);
	}

	take() {
		return this.stack.removeHead();
	}

	peek() {
		const { head, size } = this.stack.peek();
		return { head: head?.data ?? null, size };
	}

	print() {
		const data = this.stack.items().map(this.#printParams.nodeDataToString);
		logger.info(`STACK_WITH_SLL: TOP --> ${data.join(" -- ")} (BOTTOM)`);
	}
}

export const stackWithSLL = <T>(params: Partial<DSParams<T>> = {}): Stack<T> => {
	const stack = new StackWithSLL<T>({
		nodeDataToString: DEFAULT_NODE_TO_STRING,
		...params,
	});
	return stack;
};
