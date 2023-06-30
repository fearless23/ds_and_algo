import { logger } from "src/lib/logger.js";
import { hashString, normalizeNumber } from "../utils.js";

type Item<T> = { key: string; value: T; hash: number };
type ProbeFunction = (i: number) => number;

/**
 * Convert key to hash, and then into [0, capacity) range
 */
export const getIndexOfKey = (key: string, capacity: number) => {
	const hash = hashString(key);
	const idx = normalizeNumber(hash, capacity);
	return { key, hash, idx };
};

const loadFactor = 0.65; // after this increase Capacity
export class HashTableOpenAddressing<T> {
	size = 0;
	capacity = 8;
	table: Item<T>[] = [];
	#probe: ProbeFunction;

	constructor(params: { capacity: number; probe: ProbeFunction }) {
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
			n.#addItem(item.key, item.value);
		}
		this.table = n.table;
	}

	#nextIdx(originalIdx: number, iteration: number) {
		return (originalIdx + this.#probe(iteration)) % this.capacity;
	}

	#addItem(key: string, value: T) {
		const { idx, hash } = this.#getIndexForKey(key);
		if (this.table[idx] == null) {
			this.table[idx] = { key, value, hash };
		} else {
			// calculate new idx
			let count = 1;
			let newIdx = this.#nextIdx(idx, count);
			while (this.table[newIdx] != null) {
				count += 1;
				newIdx = this.#nextIdx(idx, count);
			}
			console.log("probing count for ", key, " is ", count);
			this.table[newIdx] = { key, value, hash };
		}
	}

	add(key: string, value: T) {
		this.#addItem(key, value);
		this.size += 1;
		if (this.size > this.capacity * loadFactor) {
			this.#resizeTable();
		}
	}

	print() {
		logger.info("HT: ", this.table.map((i) => i.key).join(", "));
	}
}

export const hashTableLinearProbe = <T>() => {
	return new HashTableOpenAddressing<T>({
		capacity: 8,
		probe: (i) => i * 7,
	});
};
