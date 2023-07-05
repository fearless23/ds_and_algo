import { logger } from "src/lib/logger.js";
import { getFSB } from "../utils.js";

const nextUp = (idx: number) => idx + getFSB(idx + 1);
const nextDown = (idx: number) => idx - getFSB(idx + 1);

// NOTE: Deleting and inserting from FenwickTree is not coverted in the video

class FenwickTree {
	#fenwick: number[];
	constructor(array: number[]) {
		this.#fenwick = [...array]; // Deep copy
		this.#construct();
	}

	#construct() {
		for (let i = 0; i < this.#fenwick.length; i++) {
			const next = nextUp(i);
			if (next < this.#fenwick.length) {
				this.#fenwick[next] += this.#fenwick[i] as number;
			}
		}
	}

	#findAllUpper(start: number) {
		if (start < 0 || start >= this.#fenwick.length) return [];
		let curr = start;
		const upper = [curr];
		while (nextUp(curr) < this.#fenwick.length) {
			curr = nextUp(curr);
			upper.push(curr);
		}
		return upper;
	}

	#findAllDown(start: number) {
		if (start < 0 || start >= this.#fenwick.length) return [];
		let curr = start;
		const down = [curr];

		while (nextDown(curr) >= 0) {
			curr = nextDown(curr);
			down.push(curr);
		}
		return down;
	}

	#sum(indices: number[]) {
		let sum = 0;
		for (const index of indices) sum += this.#fenwick[index] as number;
		return sum;
	}

	rangeSum(i: number, j: number) {
		const ad = this.#findAllDown(j);
		const bd = this.#findAllDown(i - 1);
		return this.#sum(ad) - this.#sum(bd);
	}

	update(i: number, change: number) {
		const indices = this.#findAllUpper(i);
		for (const idx of indices) {
			this.#fenwick[idx] += change;
		}
	}

	print() {
		const items = this.#fenwick.join(", ");
		logger.info(`FenwickTree: ${items}`);
	}
}

export const fenwickTree = (array: number[]) => {
	return new FenwickTree(array);
};
