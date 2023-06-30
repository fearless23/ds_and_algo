import {
	hashTableSeperateChainingString as hashTable,
	HashTableLinearProbe,
	HashTableQuadraticProbe,
} from "../ds/Hashmap/index.js";

export const HASHMAP = {
	HT: () => {
		const a = hashTable();
		for (let i = 0; i < 100; i++) {
			a.set(`k${i + 1}`, `v${i + 1}`);
		}
		console.log(a.capacity, a.maxBucketSize);
		console.log(a.get("k27"));
	},
	HTLP: () => {
		const a = new HashTableLinearProbe<string>();
		for (let i = 0; i < 20; i++) {
			a.set(`k${i + 1}`, `v${i + 1}`);
		}
		console.log(a.capacity, a.size);
		a.delete("k20");
		a.print();
		console.log(a.get("k20"));
		console.log(a.get("k27"));
	},

	HTQP: () => {
		const a = new HashTableQuadraticProbe<string>();
		for (let i = 0; i < 20; i++) {
			a.set(`k${i + 1}`, `v${i + 1}`);
		}
		console.log(a.capacity, a.size);
		a.delete("k20");
		a.print();
		console.log(a.get("k20"));
		console.log(a.get("k27"));
	},
};
