import { bubbleSort } from "../algo/Sorting/index.js";
const arr = [1, 3, 2, 4, 5, 6];

export const Sorting = {
	BubbleSort: () => {
		bubbleSort(arr);
		console.log(arr);
	},
};
