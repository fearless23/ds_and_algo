import { logger } from "src/lib/logger.js";
import { bubbleSort, quickSort } from "../algo/Sorting/index.js";
const arr = [9, 3, 7, 4, 69, 420, 42];

export const Sorting = {
	BubbleSort: () => {
		bubbleSort(arr);
		logger.info(arr);
	},
	QuickSort: () => {
		quickSort(arr);
		logger.info(arr);
	},
};
