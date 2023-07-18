import { trie } from "../ds/Trie/index.js";
const words = ["cat", "cattle", "map", "mat", "car", "card"];

export const TRIE = {
	TRIE: () => {
		const a = trie();
		for (const word of words) a.insertWord(word);
	},
};
