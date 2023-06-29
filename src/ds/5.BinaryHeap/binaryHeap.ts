import { logger } from "src/lib/logger.js";
import type { DSParams, CompareFunction } from "../types.js";

export const heapVariant = { MIN: "MIN", MAX: "MAX" } as const;
type HeapVariant = keyof typeof heapVariant;

const getLeftIndex = (index: number) => 2 * index + 1;
const getRightIndex = (index: number) => 2 * index + 2;
const getParentIndex = (index: number) => Math.ceil(index / 2 - 1);
export type BinaryHeapParams<T> = DSParams<T> & {
	heapVariant: HeapVariant;
	compare: CompareFunction<T>;
};

export class BinaryHeap<T> {
	// Can be implemented with LinkedList as well
	#heap: T[] = [];
	#heapVariant: HeapVariant;
	#nodeToString: BinaryHeapParams<T>["nodeToString"];
	#compare: CompareFunction<T>;
	constructor(params: BinaryHeapParams<T>) {
		this.#nodeToString = params.nodeToString;
		this.#heapVariant = params.heapVariant;
		this.#compare = params.compare;
	}

	#canGoUp(curr: T, parent: T) {
		const isMax = this.#heapVariant === heapVariant.MAX;
		return isMax ? this.#compare(curr, parent) > 0 : this.#compare(parent, curr) > 0;
	}

	#canGoDown(curr: T, child: T) {
		// BubbleDown should take down the node if value is equal, as usually the node bubbledDown is the latest
		// This is for priorityQueue when 2 or more items of same priority, then one added later should be removed later
		const isMax = this.#heapVariant === heapVariant.MAX;
		return isMax ? this.#compare(child, curr) >= 0 : this.#compare(curr, child) >= 0;
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
				const idx = this.#compare(left, right) >= 0 ? leftIdx : rightIdx;
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

	add(data: T) {
		this.#heap.push(data);
		this.#bubbleUp(this.#heap.length - 1);
	}

	removeAtIndex(index: number) {
		const lastIndex = this.#heap.length - 1;
		if (index < 0 || index > lastIndex) {
			throw new Error(`index out of bounds, range: [0, ${lastIndex}]`);
		}
		const lastItem = this.#heap.pop() as T;
		if (index === lastIndex) return lastItem;
		const removed = this.#heap[index] as T;
		this.#heap[index] = lastItem;
		this.#bubbleUp(index);
		this.#bubbleDown(index);
		return removed;
	}

	addMany(data: T[]) {
		for (const item of data) this.add(item);
	}

	peek() {
		return {
			head: this.#heap[0] ?? null,
			size: this.#heap.length,
		};
	}

	items() {
		return this.#heap;
	}

	print() {
		const nodes = this.#heap.map(this.#nodeToString);
		logger.info(`Binary Heap: ${nodes.join(", ")}`);
	}
}

export const binaryHeapNumber = (heapVariant: HeapVariant) => {
	const bh = new BinaryHeap<number>({
		heapVariant,
		nodeToString: (i) => `${i}`,
		compare: (i, j) => i - j,
	});
	return bh;
};
