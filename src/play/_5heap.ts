import { heapVariant, binaryHeapNumber as binaryHeap } from "../ds/BinaryHeap/index.js";

export const HEAP = {
	BINARY_HEAP1: () => {
		const bh = binaryHeap(heapVariant.MAX);

		console.log("---1---");
		bh.addMany([2, 5, 3]);
		bh.print();
		console.log("removed", bh.removeAtIndex(0));
		bh.print();

		console.log("---2---");
		bh.addMany([1, 5, 3, 10]);
		bh.print();
		console.log("removed", bh.removeAtIndex(0));
		bh.print();
	},

	BINARY_HEAP: () => {
		const bh = binaryHeap(heapVariant.MAX);

		console.log("---1---");
		bh.addMany([2, 5, 3]);
		bh.printGraph();
		console.log("removed", bh.removeAtIndex(0));
		bh.printGraph();

		console.log("---2---");
		bh.addMany([1, 5, 3, 10]);
		bh.printGraph();
		console.log("removed", bh.removeAtIndex(0));
		bh.printGraph();
	},
};
