import { logger } from "../../lib/logger.js";
import type { DSParams, CompareFunction } from "../types.js";
import { drawMermaidGraphBinaryHeap } from "../utils.js";

export const heapVariant = { MIN: "MIN", MAX: "MAX" } as const;
type HeapVariant = keyof typeof heapVariant;

const getLeftIndex = (index: number) => 2 * index + 1;
const getRightIndex = (index: number) => 2 * index + 2;
const getParentIndex = (index: number) => Math.ceil(index / 2 - 1);
export type BinaryHeapParams<T> = DSParams<T> & {
	heapVariant: HeapVariant;
	compare: CompareFunction<T>;
};

class BinaryHeap {
	// Can be implemented with LinkedList as well
	#heap: number[] = [];
	#heapVariant: HeapVariant;

	constructor(heapVariant: HeapVariant) {
		this.#heapVariant = heapVariant;
	}

	#canGoUp(curr: number, parent: number) {
		const isMax = this.#heapVariant === heapVariant.MAX;
		return isMax ? curr > parent : parent > curr;
	}

	#canGoDown(curr: number, child: number) {
		const isMax = this.#heapVariant === heapVariant.MAX;
		return isMax ? child >= curr : curr >= child;
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
			const canGoLeft = this.#canGoDown(curr, left);
			const canGoRight = this.#canGoDown(curr, right);
			if (canGoLeft && canGoRight) {
				const idx = left >= right ? leftIdx : rightIdx;
				this.#swap(i, idx);
				this.#bubbleDown(idx);
			} else if (canGoRight && !canGoLeft) {
				this.#swap(i, rightIdx);
				this.#bubbleDown(rightIdx);
			} else if (!canGoRight && canGoLeft) {
				this.#swap(i, leftIdx);
				this.#bubbleDown(leftIdx);
			}
		}
	}

	#find(currIdx: number, value: number): number | undefined {
		const currValue = this.#heap[currIdx];
		if (currValue == null) return;
		if (currValue === value) return currIdx;

		const goDown = this.#heapVariant === heapVariant.MAX ? value < currValue : value > currValue;
		if (goDown) {
			const foundInLeft = this.#find(getLeftIndex(currIdx), value);
			if (foundInLeft) return foundInLeft;
			const foundInRight = this.#find(getRightIndex(currIdx), value);
			if (foundInRight) return foundInRight;
		}
	}

	add(data: number) {
		this.#heap.push(data);
		this.#bubbleUp(this.#heap.length - 1);
	}

	find(value: number) {
		const found = this.#find(0, value);
		return found == null ? false : true;
	}

	remove(value: number) {
		const index = this.#find(0, value);
		if (index == null) return false;
		const lastIndex = this.#heap.length - 1;
		const lastItem = this.#heap.pop() as number;
		// removal
		if (index === lastIndex) return true;
		this.#heap[index] = lastItem;
		this.#bubbleUp(index);
		this.#bubbleDown(index);
		return true;
	}

	peek() {
		return this.#heap[0];
	}

	print() {
		logger.info(`Binary Heap: ${this.#heap.join(", ")}`);
	}

	printGraph() {
		logger.info(drawMermaidGraphBinaryHeap(this.#heap, (i) => String(i)));
	}
}

export const binaryHeap = (heapVariant: HeapVariant) => {
	const bh = new BinaryHeap(heapVariant);
	return bh;
};
