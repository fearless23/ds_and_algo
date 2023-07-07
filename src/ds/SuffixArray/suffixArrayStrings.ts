import { logger } from "../../lib/logger.js";

const SENTINELS = ["&", "#", "%", "$"];
const concatStrings = (texts: string[]) => {
	let finalString = "";
	for (let i = 0; i < texts.length; i++) {
		finalString += (texts[i] as string) + (SENTINELS[i] as string);
	}
	return finalString;
};

/*
Find sortedIndex related starting word in O(n) time
const wordsToSortedIndexMap = (texts: string[]) => {
	const map: { [key: number]: number } = {};
	let start = 0;
	let end = 0;
	for (let i = 0; i < texts.length; i++) {
		const text = texts[i] as string;
		end = start + text.length - 1;

		for (let j = start; j <= end; j++) {
			map[j] = i;
		}

		start = end + 2;
	}
	return map;
};
*/

type Item = {
	suffix: string;
	sortedIndex: number;
	prefix: string;
	lcp: number;
	wordIndex: number;
	word?: string;
};

const getLongestPrefix = (a: string, b: string) => {
	const smallest = Math.min(a.length, b.length);
	let longestPrefix = "";
	for (let i = 0; i < smallest; i++) {
		if (a[i] === b[i]) longestPrefix += a[i];
		else break;
	}
	return longestPrefix;
};

class SuffixArrayStrings {
	#texts: string[];
	#text: string;
	#table: Item[] = [];
	#duplicates = 0;
	constructor(texts: string[]) {
		this.#texts = texts;
		this.#text = concatStrings(texts);
		this.#table = this.#contruct();
	}

	#contruct() {
		const table: Item[] = [];
		for (let i = 0; i < this.#text.length; i++) {
			const suffix = this.#text.substring(i);
			table.push({ suffix, sortedIndex: i, prefix: "", lcp: 0, wordIndex: 0 });
		}
		table.sort((a, b) => a.suffix.localeCompare(b.suffix));

		for (let i = 0; i < table.length; i++) {
			const item = table[i] as Item;
			const wordIndex = this.#sortedIndexToWordIndex(item.sortedIndex);
			const prefix = getLongestPrefix(item?.suffix ?? "", table[i - 1]?.suffix ?? "");
			item.prefix = prefix;
			item.lcp = prefix.length;
			this.#duplicates += prefix.length;
			item.wordIndex = wordIndex;
			if (wordIndex > -1) item.word = this.#texts[wordIndex];
		}
		return table;
	}

	#createSlidingWindow(k: number, startIndex: number) {
		const wordsContained = new Set();
		let end = null;
		for (let i = startIndex; i < this.#table.length; i++) {
			const item = this.#table[i] as Item;
			wordsContained.add(item.word);
			if (wordsContained.size === k) {
				end = i;
				break;
			}
		}
		if (end == null) {
			return { success: false, longestSubstringLength: 0, longestSubstrings: [""] };
		}

		let min = Infinity;
		for (let i = startIndex + 1; i <= end; i++) {
			const item = this.#table[i] as Item;
			min = Math.min(min, item.lcp);
		}

		const prefixes = [];
		for (let i = startIndex + 1; i <= end; i++) {
			const { lcp, prefix } = this.#table[i] as Item;
			if (lcp === min) prefixes.push(prefix);
		}
		return { success: true, longestSubstringLength: min, longestSubstrings: prefixes };
	}

	getLongestSubstring(k: number) {
		// create a window such that it contains k distinct words
		if (k < 2) throw new Error("k can`t be less than 2");
		if (k > this.#texts.length) throw new Error(` k cant be greater than ${this.#texts.length}`);

		const start = this.#texts.length; // ignores sentinels starting

		let max = -Infinity;
		const items = [];
		for (let i = 0; i < this.#text.length; i++) {
			const r = this.#createSlidingWindow(k, start + i);
			const { longestSubstringLength, longestSubstrings, success } = r;
			if (!success) break;
			items.push({ length: longestSubstringLength, data: longestSubstrings });
			max = Math.max(max, longestSubstringLength);
		}

		const longestSubstrings = [];
		for (const { length, data } of items) {
			if (length === max) longestSubstrings.push(...data);
		}
		return longestSubstrings;
	}

	/**
	 * Given a sortedIndex `i` find which word it belongs to
	 */
	#sortedIndexToWordIndex(i: number) {
		let start = 0;
		let end = 0;
		for (let j = 0; j < this.#texts.length; j++) {
			const text = this.#texts[j] as string;
			end = start + text.length - 1;
			if (i >= start && i <= end) return j;
			else start = end + 2;
		}
		return -1;
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

	print() {
		logger.info("Suffix Array:\n");
		logger.table(this.#table);
	}
}

export const suffixArrayOfStrings = (texts: string[]) => {
	return new SuffixArrayStrings(texts);
};
