import { logger } from "../lib/logger.js";
import { fenwickTree } from "../ds/FenwickTree/index.js";

const array = [3, 4, -2, 7, 3, 11, 5, -8, -9, 2, 4, -8];

export const FENWICK_TREE = {
	FENWICK_TREE: () => {
		const a = fenwickTree(array);
		a.print();
		logger.debug(a.rangeSum(0, 2));
		a.update(2, +10);
		a.print();
		logger.debug(a.rangeSum(0, 2));
		logger.debug(a.rangeSum(3, 5));
	},
};
