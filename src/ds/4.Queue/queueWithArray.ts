import type { Queue } from "./types.js";
import { logger } from "src/lib/logger.js";
import { DEFAULT_NODE_TO_STRING, type DSParams } from "../types.js";

class QueueWithArray<T> {
	queue: T[] = [];

	#printParams: DSParams<T>;
	constructor(printParams: DSParams<T>) {
		this.#printParams = printParams;
	}

	send(data: T) {
		this.queue.unshift(data);
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
		const nodes = this.queue.map(this.#printParams.nodeDataToString);
		logger.info(`QUEUE: (Back): ${nodes.join(" --> ")} (Front)`);
	}
}

export const queueWithArray = <T>(params: Partial<DSParams<T>> = {}): Queue<T> => {
	const q = new QueueWithArray<T>({
		nodeDataToString: DEFAULT_NODE_TO_STRING,
		...params,
	});
	return q;
};
