import {
	priorityQueueWithArray,
	priorityQueueWithSLL,
	queueWithArray,
	queueWithSLL,
} from "../ds/4.Queue/index.js";
import { logger } from "../lib/logger.js";

const show = <T>(items: { data: T; priority: number }[]) =>
	items.map((i) => `${i.data}(${i.priority})`);

export const QUEUE = {
	QUEUE_WITH_SLL: () => {
		const q = queueWithSLL<string>();
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
	},
	QUEUE_WITH_ARRAY: () => {
		const q = queueWithArray<string>();
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
	},
	PRIORITY_QUEUE_WITH_SLL: () => {
		const q = priorityQueueWithSLL<string>();
		q.send("Banana", 2);
		q.print();
		q.send("Grapes", 5);
		q.print();
		q.send("Mango", 3);
		q.print();
		const a = q.take();
		logger.info(`got ${show(a)}`);
		q.send("Chiku", 1);
		q.send("Apple", 5);
		q.send("Papita", 3);
		q.send("Paneer", 10);
		q.print();
		const b = q.take(3);
		logger.info(`got ${show(b)}`);
		q.print();
	},
	PRIORITY_QUEUE_WITH_ARRAY: () => {
		const q = priorityQueueWithArray<string>();
		q.send("Banana", 2);
		q.print();
		q.send("Grapes", 5);
		q.print();
		q.send("Mango", 3);
		q.print();
		const a = q.take();
		logger.info(`got ${show(a)}`);
		q.send("Chiku", 1);
		q.send("Apple", 5);
		q.send("Papita", 3);
		q.send("Paneer", 10);
		q.print();
		const b = q.take(3);
		logger.info(`got ${show(b)}`);
		q.print();
	},
};
