import { logger } from "src/lib/logger.js";
import { hashString, normalizeNumber } from "../utils.js";

type Item<T> = { key: string; value: T; hash: number };
type ProbeFunction = (i: number) => number;

const DELETE = "DELETE" as const;

/**
 * Convert key to hash, and then into [0, capacity) range
 */
export const getIndexOfKey = (key: string, capacity: number) => {
	const hash = hashString(key);
	const idx = normalizeNumber(hash, capacity);
	return { key, hash, idx };
};

type HashTableParams = { capacity: number; probe: ProbeFunction };

const loadFactor = 0.65; // after this increase Capacity
class HashTableOpenAddressing<T> {
	size = 0;
	capacity = 8;
	table: (Item<T> | null | typeof DELETE)[] = [];
	#probe: ProbeFunction;

	constructor(params: HashTableParams) {
		this.#probe = params.probe;
		this.capacity = params.capacity;
	}

	#getIndexForKey(key: string) {
		return getIndexOfKey(key, this.capacity);
	}

	#resizeTable() {
		console.log("--- RESIZED TABLE ---");
		this.capacity *= 2;
		const n = new HashTableOpenAddressing<T>({ capacity: this.capacity, probe: this.#probe });

		for (const item of this.table) {
			if (item == null) continue;
			// Note: when resizing, we ignore DELETE values, thus cleaning hashTable as well
			if (item === DELETE) continue;
			n.set(item.key, item.value);
		}
		this.table = n.table;
	}

	#nextIdx(originalIdx: number, iteration: number) {
		return (originalIdx + this.#probe(iteration)) % this.capacity;
	}

	/**
	 * Can we insert new item at this index
	 */
	#canAdd(idx: number) {
		return this.table[idx] == null;
	}

	#addItem(key: string, value: T) {
		const { idx, hash } = this.#getIndexForKey(key);
		if (this.table[idx] == null) {
			this.table[idx] = { key, value, hash };
		} else {
			let count = 0;
			let newIdx = idx;
			do {
				count += 1;
				newIdx = this.#nextIdx(idx, count);
			} while (!this.#canAdd(newIdx));
			console.log("probing count for ", key, " is ", count);
			this.table[newIdx] = { key, value, hash };
		}
	}

	#find(key: string) {
		const r = this.#getIndexForKey(key);

		let currIdx = r.idx;
		let count = 0;
		while (this.table[currIdx] != null) {
			const item = this.table[currIdx];
			if (item !== DELETE) {
				const matches = (item as Item<T>).hash === r.hash;
				if (matches) return { item: item as Item<T>, idx: currIdx };
			}
			// if not matches or item === DELETE => find in nextIdx
			count += 1;
			currIdx = this.#nextIdx(r.idx, count);
		}
		return null;
	}

	keys() {
		return this.table.filter((i) => i != null || i !== DELETE) as Item<T>[];
	}

	set(key: string, value: T) {
		this.#addItem(key, value);
		this.size += 1;
		if (this.size > this.capacity * loadFactor) this.#resizeTable();
	}

	get(key: string) {
		const r = this.#find(key);
		return r == null ? null : r.item.value;
	}

	delete(key: string) {
		const r = this.#find(key);
		if (r == null) return null;
		const { idx, item } = r;
		this.table[idx] = DELETE;
		return item.value;
	}

	print() {
		logger.info(
			"HashTable: ",
			this.table
				.map((i) => {
					if (i === "DELETE") return "@D";
					if (i == null) return "@E";
					return i.key;
				})
				.join(", "),
		);
	}
}

export class HashTableLinearProbe<T> extends HashTableOpenAddressing<T> {
	constructor() {
		super({
			capacity: 8,
			probe: (i) => i * 7,
		});
	}
}

export class HashTableQuadraticProbe<T> extends HashTableOpenAddressing<T> {
	constructor() {
		super({
			capacity: 8,
			probe: (x) => 0.5 * Math.pow(x, 2) + 0.5 * x,
		});
	}
}
