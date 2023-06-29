import { hashTableSeperateChainingString as ht } from "../ds/Hashmap/index.js";

export const HASHMAP = {
	HT: () => {
		const a = ht();
		for (let i = 0; i < 100; i++) {
			a.add(`k${i + 1}`, `v${i + 1}`);
		}
		console.log(a.capacity, a.maxBucketSize);
		console.log(a.get("k27"));
	},
};
