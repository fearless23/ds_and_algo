import { logger } from "src/lib/logger.js";

export const heapVariant = { MIN: "MIN", MAX: "MAX" } as const;
type HeapVariant = keyof typeof heapVariant;

const getLeftIndex = (index: number) => 2 * index + 1;
const getRightIndex = (index: number) => 2 * index + 2;
const getParentIndex = (index: number) => Math.ceil(index / 2 - 1);

class BinaryHeap {
	// Can be implemented with LinkedList as well
	#heap: number[] = [];
	#heapVariant: HeapVariant;
	constructor(heapVariant: HeapVariant) {
		this.#heapVariant = heapVariant;
	}

	#canGoUp(curr: number, parent: number) {
		return this.#heapVariant === heapVariant.MAX ? curr > parent : curr < parent;
	}

	#canGoDown(curr: number, child: number) {
		return this.#heapVariant === heapVariant.MAX ? curr < child : curr > child;
	}

	#getNode(i: number) {
		const n = this.#heap[i];
		if (n == null) throw new Error("unknown index or null node");
		return n;
	}

	#swap(i: number, j: number) {
		const tmp = this.#getNode(i);
		this.#heap[i] = this.#getNode(j);
		this.#heap[j] = tmp;
		console.log("SWAPPED");
	}

	#bubbleUp(i: number) {
		const curr = this.#getNode(i);
		const parentIdx = getParentIndex(i);
		if (parentIdx < 0) return;

		const parent = this.#getNode(parentIdx);
		if (this.#canGoUp(curr, parent)) {
			this.#swap(parentIdx, i);
			this.#bubbleUp(parentIdx);
		}
	}

	#bubbleDown(i: number) {
		const lastIndex = this.#heap.length - 1;
		const curr = this.#getNode(i);
		const leftIdx = getLeftIndex(i);
		const rightIdx = getRightIndex(i);
		if (leftIdx > lastIndex) return; // no child
		// left child exists
		if (rightIdx > lastIndex) {
			// only left child
			const left = this.#getNode(leftIdx);
			if (this.#canGoDown(curr, left)) {
				this.#swap(i, leftIdx);
				this.#bubbleDown(leftIdx);
			}
		} else {
			// both left and right child exists
			const left = this.#getNode(leftIdx);
			const right = this.#getNode(rightIdx);
			if (this.#canGoDown(curr, left)) {
				this.#swap(i, leftIdx);
				this.#bubbleDown(leftIdx);
			} else if (this.#canGoDown(curr, right)) {
				this.#swap(i, rightIdx);
				this.#bubbleDown(rightIdx);
			}
		}
	}

	add(data: number) {
		this.#heap.push(data);
		this.#bubbleUp(this.#heap.length - 1);
	}

	removeAtIndex(index: number) {
		const lastIndex = this.#heap.length - 1;
		if (index < 0 || index > lastIndex) {
			throw new Error(`index out of bounds, range: [0, ${lastIndex}]`);
		}
		const lastItem = this.#heap.pop() as number;
		if (index === lastIndex) return lastItem;
		this.#heap[index] = lastItem;
		this.#bubbleUp(index);
		this.#bubbleDown(index);
	}

	addMany(data: number[]) {
		for (const item of data) this.add(item);
	}

	print() {
		const nodes = this.#heap;
		logger.info(`Binary Heap: ${nodes.join(", ")}`);
	}
}

export const binaryHeap = (variant: HeapVariant) => {
	const bh = new BinaryHeap(variant);
	return bh;
};
