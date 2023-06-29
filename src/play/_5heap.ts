import { heapVariant, binaryHeapNumber as binaryHeap } from "../ds/BinaryHeap/index.js";

export const HEAP = {
	// BINARY_HEAP: () => {
	// 	const bh = binaryHeap(VARIANT_NAMES.MIN);
	// 	// init
	// 	bh.addMany([2, 7, 2, 11, 7, 13, 2]);
	// 	bh.print(logger);
	// 	bh.showIndexMap(logger);
	// 	// insert 3
	// 	bh.add(3);
	// 	bh.print(logger);
	// 	bh.showIndexMap(logger);
	// 	// reomve 2
	// 	bh.search_and_remove(202);
	// 	bh.print(logger);
	// 	bh.showIndexMap(logger);
	// 	// poll
	// 	bh.remove();
	// 	bh.print(logger);
	// 	bh.showIndexMap(logger);
	// },
	BINARY_HEAP: () => {
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
};
