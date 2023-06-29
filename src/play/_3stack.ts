import { logger } from "../lib/logger.js";
import { stackWithArrayString, stackWithSLLString } from "../ds/Stack/index.js";

export const STACK = {
	STACK_WITH_SLL: () => {
		const s = stackWithSLLString();
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
		const s = stackWithArrayString();
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
