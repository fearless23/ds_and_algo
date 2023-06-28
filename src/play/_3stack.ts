import { logger } from "../lib/logger.js";
import { stackWithArray, stackWithSLL } from "../ds/3.Stack/index.js";

export const STACK = {
	STACK_WITH_SLL: () => {
		const s = stackWithSLL<string>();
		s.push("Banana");
		s.push("Grapes");
		s.print();
		logger.info(`took ${s.take()}`);
		s.print();
		s.push("Mango");
		s.push("Apple");
		s.print();
		logger.info(`took ${s.take()}`);
		s.print();
	},
	STACK_WITH_ARRAY: () => {
		const s = stackWithArray();
		s.push("Banana");
		s.push("Grapes");
		s.print();
		logger.info(`took ${s.take()}`);
		s.print();
		s.push("Mango");
		s.push("Apple");
		s.print();
		logger.info(`took ${s.take()}`);
		s.print();
	},
};
