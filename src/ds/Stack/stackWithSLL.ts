import { logger } from "../../lib/logger.js";
import type { DSParams, Stack } from "../types.js";
import { SinglyLinkedList } from "../LinkedList/index.js";

export type StackWithSLLParams<T> = DSParams<T>;
export class StackWithSLL<T> implements Stack<T> {
	#stack: SinglyLinkedList<T>;
	#nodeToString: DSParams<T>["nodeToString"];
	constructor(params: StackWithSLLParams<T>) {
		this.#nodeToString = params.nodeToString;
		this.#stack = new SinglyLinkedList<T>({ nodeToString: params.nodeToString });
	}

	push(data: T) {
		this.#stack.addHead(data);
	}

	take() {
		return this.#stack.removeHead();
	}

	peek() {
		const { head, size } = this.#stack.peek();
		return { head: head?.data ?? null, size };
	}

	print() {
		const data = this.#stack.items().map(this.#nodeToString);
		logger.info(`STACK_WITH_SLL: TOP --> ${data.join(" -- ")} (BOTTOM)`);
	}
}

export const stackWithSLLString = (): Stack<string> => {
	const stack = new StackWithSLL<string>({ nodeToString: (i) => i });
	return stack;
};

export const stackWithSLLNumber = (): Stack<number> => {
	const stack = new StackWithSLL<number>({ nodeToString: (i) => `${i}` });
	return stack;
};
