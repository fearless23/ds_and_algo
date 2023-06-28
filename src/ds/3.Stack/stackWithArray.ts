import { logger } from "../../lib/logger.js";
import { DEFAULT_NODE_TO_STRING, type DSParams } from "../types.js";
import type { Stack } from "./types.js";

class StackWithArray<T> {
	#stack: T[] = [];

	#printParams: DSParams<T>;
	constructor(printParams: DSParams<T>) {
		this.#printParams = printParams;
	}

	push(data: T) {
		this.#stack.push(data);
	}

	#getHead() {
		return this.#stack.at(-1) ?? null;
	}

	take() {
		if (this.#stack.length === 0) return null;
		const removed = this.#stack.pop() as T;
		return removed;
	}

	peek() {
		return {
			head: this.#getHead(),
			size: this.#stack.length,
		};
	}

	print() {
		const data = this.#stack.map(this.#printParams.nodeDataToString);
		logger.info(`STACK_WITH_SLL: (BOTTOM) ${data.join(" -- ")} --> TOP `);
	}
}

export const stackWithArray = <T>(params: Partial<DSParams<T>> = {}): Stack<T> => {
	const stack = new StackWithArray<T>({
		nodeDataToString: DEFAULT_NODE_TO_STRING,
		...params,
	});
	return stack;
};
