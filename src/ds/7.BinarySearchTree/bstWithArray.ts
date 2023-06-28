import { logger } from "src/lib/logger.js";

type BinarySearchTreeParams = { duplicateAllowed: boolean };

/**
 * Storing BST as array is very bad for memory size
 *
 * @example
 * ```ts
 * const bst = bstWithArray();
 * bst.insertValues([1, 2, 3, 4, 5, 6]);
 * bst.print();
 * ```
 */

class BinarySearchTree {
	bst: number[] = [];
	duplicateAllowed: boolean;
	constructor(params: BinarySearchTreeParams) {
		this.duplicateAllowed = params.duplicateAllowed;
	}
	// NOTE: smaller goes left, bigger goes right

	insert(value: number) {
		let k = 0;
		while (this.bst[k] != null) {
			const curVal = this.bst[k] as number;
			if (!this.duplicateAllowed && value === curVal) break;
			if (value <= curVal) k = 2 * k + 1; // GO LEFT
			else k = 2 * k + 2; // GO RIGHT
		}
		this.bst[k] = value;
	}

	insertValues(values: number[]) {
		for (const k of values) this.insert(k);
	}

	// Complexity, see note 1 in MD File
	search(value: number) {
		let i = 0;
		while (this.bst[i] != null) {
			const p = this.bst[i] as number;
			if (p === value) break;
			if (p > value) i = 2 * i + 1; // GO LEFT
			else i = 2 * i + 2; // GO RIGHT
		}
		return this.bst[i] == null ? -1 : i;
	}

	print() {
		const r = [];
		for (const item of this.bst) {
			r.push(item ?? "-");
		}
		const list = r.join(", ");
		logger.debug("BST_WITH_ARRAY:", `[${list}]`);
	}
}

export const bstWithArray = (params: Partial<BinarySearchTreeParams> = {}) => {
	const bst = new BinarySearchTree({
		duplicateAllowed: false,
		...params,
	});
	return bst;
};
