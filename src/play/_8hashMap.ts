import {
	hashTableSeperateChainingString as hashTable,
	hashTableLinearProbe,
} from "../ds/Hashmap/index.js";

export const HASHMAP = {
	HT: () => {
		const a = hashTable();
		for (let i = 0; i < 100; i++) {
			a.add(`k${i + 1}`, `v${i + 1}`);
		}
		console.log(a.capacity, a.maxBucketSize);
		console.log(a.get("k27"));
	},
	HTLP: () => {
		const a = hashTableLinearProbe<string>();
		for (let i = 0; i < 20; i++) {
			a.add(`k${i + 1}`, `v${i + 1}`);
		}
		console.log(a.capacity, a.size);
		a.print();
		// console.log(a.get("k27"));
	},
};
