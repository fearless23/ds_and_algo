import { hashTableSeperateChainingString as ht } from "../ds/Hashmap/index.js";

export const HASHMAP = {
	HT: () => {
		const a = ht();
		a.add("name", "jassi");
		a.add("name2", "jaspreet");
		a.add("name", "jaspreet");
		console.log(a.get("name"));
	},
};
