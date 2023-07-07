import { logger } from "../../lib/logger.js";

type Item = { suffix: string; sortedIndex: number; prefix: string; lcp: number };

const getLongestPrefix = (a: string, b: string) => {
	const smallest = Math.min(a.length, b.length);
	let longestPrefix = "";
	for (let i = 0; i < smallest; i++) {
		if (a[i] === b[i]) longestPrefix += a[i];
		else break;
	}
	return longestPrefix;
};

class SuffixArray {
	#text: string;
	#table: Item[] = [];
	#duplicates = 0;
	constructor(text: string) {
		this.#text = text;
		this.#table = this.#construct();
	}

	#construct() {
		const table: Item[] = [];
		for (let i = 0; i < this.#text.length; i++) {
			const suffix = this.#text.substring(i);
			table.push({ suffix, sortedIndex: i, prefix: "", lcp: 0 });
		}
		table.sort((a, b) => a.suffix.localeCompare(b.suffix));

		for (let i = 0; i < table.length; i++) {
			const item = table[i] as Item;
			const prefix = getLongestPrefix(item?.suffix ?? "", table[i - 1]?.suffix ?? "");
			item.prefix = prefix;
			item.lcp = prefix.length;
			this.#duplicates += prefix.length;
		}
		return table;
	}

	get totalSubstrings() {
		const n = this.#text.length;
		return (n * (n + 1)) / 2;
	}

	get uniqueSubstrings() {
		return this.totalSubstrings - this.#duplicates;
	}

	get duplicateSubstrings() {
		return this.#duplicates;
	}

	get lrs() {
		let max = -Infinity;
		for (const item of this.#table) {
			max = Math.max(max, item.lcp);
		}
		const prefixes = [];
		for (const item of this.#table) {
			if (item.lcp === max) prefixes.push(item.prefix);
		}
		return prefixes;
	}

	print() {
		logger.info("Suffix Array:\n");
		logger.table(this.#table);
	}
}

export const suffixArrayOfString = (text: string) => {
	return new SuffixArray(text);
};
