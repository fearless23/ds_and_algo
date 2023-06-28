import { heapVariant, binaryHeap } from "../ds/5.Heap/index.js";

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
		const bh = binaryHeap(heapVariant.MIN);
		bh.addMany([2, 3, 4, 8, 6, 9, 1500, 900, 10, 7, 9]);
		bh.print();
		bh.removeAtIndex(1);
		bh.print();
	},
};
