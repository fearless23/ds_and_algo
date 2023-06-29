import { logger } from "../../lib/logger.js";
import type { Stack, DSParams } from "../types.js";

export type StackWithArrayParams<T> = DSParams<T>;
export class StackWithArray<T> implements Stack<T> {
	#stack: T[] = [];

	#nodeToString: DSParams<T>["nodeToString"];
	constructor(params: StackWithArrayParams<T>) {
		this.#nodeToString = params.nodeToString;
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
		const data = this.#stack.map(this.#nodeToString);
		logger.info(`STACK_WITH_SLL: (BOTTOM) ${data.join(" -- ")} --> TOP `);
	}
}

export const stackWithArrayString = (): Stack<string> =>
	new StackWithArray<string>({ nodeToString: (i) => i });

export const stackWithArrayNumber = (): Stack<number> =>
	new StackWithArray<number>({ nodeToString: (i) => `${i}` });
