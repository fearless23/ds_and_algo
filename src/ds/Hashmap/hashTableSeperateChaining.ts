import { hashString, normalizeNumber } from "../utils.js";
import { SinglyLinkedList } from "../LinkedList/index.js";

type Item<T> = { key: string; value: T; hash: number };
type Bucket<T> = SinglyLinkedList<Item<T>>;

/**
 * Convert key to hash, and then into [0, capacity) range
 */
export const getIndexOfKey = (key: string, capacity: number) => {
	const hash = hashString(key);
	const idx = normalizeNumber(hash, capacity);
	return { key, hash, idx };
};

export class HashTableSeperateChaining<T> {
	size = 0;
	capacity = 8;
	maxBucketSize = 0;
	maxAllowedBucketSize = 5;
	table: Bucket<T>[] = [];

	constructor(capacity = 8) {
		this.capacity = capacity;
	}

	#getIndexForKey(key: string) {
		return getIndexOfKey(key, this.capacity);
	}

	#resizeTable() {
		console.log("---RESIZING BUCKET---");
		this.capacity = this.capacity * 2;
		const newTable = new HashTableSeperateChaining<T>(this.capacity);
		for (const item of this.table) {
			if (item == null) continue;
			let pointer = item.head;
			while (pointer) {
				newTable.set(pointer.data.key, pointer.data.value);
				pointer = pointer.next;
			}
		}
		this.table = newTable.table;
		this.maxBucketSize = newTable.maxBucketSize;
	}

	#addItem(key: string, value: T) {
		if (key === "") return false;
		const { idx, hash } = this.#getIndexForKey(key);
		const bucket = this.table[idx];
		if (bucket == null) {
			const bucket = new SinglyLinkedList<Item<T>>({ nodeToString: (i) => i.key });
			this.maxBucketSize = Math.max(1, this.maxBucketSize);
			this.table[idx] = bucket;
			bucket.addTail({ key, value, hash });
			return true;
		} else {
			// OPTIONAL - find if key exists, only then add
			const found = bucket.findByValue<string>(key, (node, key) => node.data.key === key);
			if (found) return false;
			bucket.addTail({ key, value, hash });
			this.maxBucketSize = Math.max(bucket.size, this.maxBucketSize);
			return true;
		}
	}

	set(key: string, value: T) {
		this.#addItem(key, value);
		this.size += 1;
		if (this.maxBucketSize > this.maxAllowedBucketSize) {
			this.#resizeTable();
		}
	}

	get(key: string) {
		const { idx, hash } = this.#getIndexForKey(key);
		const bucket = this.table[idx];
		if (bucket == null) return null;
		const node = bucket.findByValue<number>(hash, (node, hash) => node.data.hash === hash);
		if (node == null) return null;
		return node.data.value;
	}

	delete(key: string) {
		const { idx, hash } = this.#getIndexForKey(key);
		const bucket = this.table[idx];
		if (bucket == null) return null;
		const node = bucket.removeByValue<number>(hash, (node, hash) => node.data.hash === hash);
		if (node == null) return null;
		return node.value;
	}
}

export const hashTableSeperateChainingString = () => {
	return new HashTableSeperateChaining<string>();
};
