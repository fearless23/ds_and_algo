import { hashString, normalizeNumber } from "../utils.js";
import { SinglyLinkedList } from "../LinkedList/index.js";

type Node<T> = { key: string; value: T };
type Bucket<T> = SinglyLinkedList<Node<T>>;

export class HashTableSeperateChaining<T> {
	capacity = 8;
	maxBucketSize = 0;
	maxAllowedBucketSize = 5;
	table: Bucket<T>[] = [];

	normalizeHash(key: string) {
		const hash = hashString(key);
		return normalizeNumber(hash, this.capacity);
	}

	increaseCapacity() {
		this.capacity = this.capacity * 2;
	}

	#reNormalize() {
		const newTable = new HashTableSeperateChaining<T>();
		for (const item of this.table) {
			let pointer = item.head;
			while (pointer) {
				newTable.add(pointer.data.key, pointer.data.value);
				pointer = pointer.next;
			}
		}
		this.table = newTable.table;
	}

	#addItem(key: string, value: T) {
		if (key === "") return false;
		const idx = this.normalizeHash(key);
		const bucket = this.table[idx];
		if (bucket == null) {
			const bucket = new SinglyLinkedList<Node<T>>({ nodeToString: (i) => i.key });
			this.maxBucketSize = Math.max(1, this.maxBucketSize);
			this.table[idx] = bucket;
			bucket.addTail({ key, value });
			return true;
		} else {
			// OPTIONAL - find if key exists, only then add
			const found = bucket.findByValue<string>(key, (node, key) => node.data.key === key);
			if (found) return false;
			bucket.addTail({ key, value });
			this.maxBucketSize = Math.max(bucket.size, this.maxBucketSize);
			return true;
		}
	}

	add(key: string, value: T) {
		this.#addItem(key, value);
		if (this.maxBucketSize > this.maxAllowedBucketSize) {
			this.increaseCapacity();
			this.#reNormalize();
		}
	}

	get(key: string) {
		const idx = this.normalizeHash(key);
		const bucket = this.table[idx];
		if (bucket == null) return null;
		const node = bucket.findByValue<string>(key, (node, key) => node.data.key === key);
		if (node == null) return null;
		return node.data.value;
	}
}

export const hashTableSeperateChainingString = () => {
	return new HashTableSeperateChaining<string>();
};
