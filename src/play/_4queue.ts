import type { DataWithPriority, Queue, QueueFS } from "../ds/types.js";
import {
	priorityQueueWithArrayStringFS,
	priorityQueueWithSLLStringFS,
	priorityQueueWithBinaryHeapStringFS,
	queueWithArrayString,
	queueWithSLLString,
} from "../ds/Queue/index.js";
import { logger } from "../lib/logger.js";

const show = (items: DataWithPriority<string>[]) => items.map((i) => `${i.data}(${i.priority})`);

const operation = (q: Queue<string>) => {
	q.send("Banana");
	q.send("Grapes");
	q.print();
	const a = q.take();
	logger.info(`got ${a}`);
	q.print();
	q.send("Mango");
	q.send("Apple");
	q.print();
	const b = q.take(2);
	logger.info(`got ${b}`);
	q.print();
};

const operationWtihPriority = (q: QueueFS<string>) => {
	q.sendPriority("Banana", 2);
	q.print();
	q.sendPriority("Grapes", 5);
	q.print();
	q.sendPriority("Mango", 3);
	q.print();
	const a = q.take();
	logger.info(`got ${show(a)}`);
	q.sendPriority("Chiku", 1);
	q.sendPriority("Apple", 5);
	q.sendPriority("Papita", 3);
	q.sendPriority("Paneer", 10);
	q.print();
	const b = q.take(3);
	logger.info(`got ${show(b)}`);
	q.print();
};

export const QUEUE = {
	QUEUE_WITH_SLL: () => {
		const q = queueWithSLLString();
		operation(q);
	},
	QUEUE_WITH_ARRAY: () => {
		const q = queueWithArrayString();
		operation(q);
	},
	PRIORITY_QUEUE_WITH_SLL: () => {
		const q = priorityQueueWithSLLStringFS();
		operationWtihPriority(q);
	},
	PRIORITY_QUEUE_WITH_ARRAY: () => {
		const q = priorityQueueWithArrayStringFS();
		operationWtihPriority(q);
	},
	PRIORITY_QUEUE_WITH_BH: () => {
		const q = priorityQueueWithBinaryHeapStringFS();
		operationWtihPriority(q);
	},
};
