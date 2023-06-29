import { logger } from "src/lib/logger.js";
import type { Queue, DSParams } from "../types.js";

export type QueueWithArrayParams<T> = DSParams<T>;
export class QueueWithArray<T> {
	#state: T[] = [];

	#nodeToString: QueueWithArrayParams<T>["nodeToString"];
	constructor(params: QueueWithArrayParams<T>) {
		this.#nodeToString = params.nodeToString;
	}

	send(data: T) {
		this.#state.unshift(data);
	}

	take(count = 1) {
		const items: T[] = [];
		for (let j = 0; j < count; j++) {
			const item = this.#state.pop();
			if (!item) break;
			else items.push(item);
		}
		return items;
	}

	peek() {
		const d = this.#state.at(-1);
		const f = d ?? null;
		return { head: f, size: this.#state.length };
	}

	print() {
		const nodes = this.#state.map(this.#nodeToString);
		logger.info(`QUEUE: (Back): ${nodes.join(" --> ")} (Front)`);
	}
}

export const queueWithArray = <T>(params: QueueWithArrayParams<T>): Queue<T> => {
	return new QueueWithArray<T>(params);
};

export const queueWithArrayString = () => queueWithArray<string>({ nodeToString: (i) => i });
export const queueWithArrayNumber = () => queueWithArray<number>({ nodeToString: (i) => `${i}` });
