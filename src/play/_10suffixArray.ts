import { logger } from "../lib/logger.js";
import { suffixArrayOfString, suffixArrayOfStrings } from "../ds/SuffixArray/index.js";

// const words1 = ["AABC", "BCDC", "BCDE", "CDED"];
const words2 = ["abca", "bcad", "daca"];

// const word1 = "abracadabra";
const word2 = "ababbaabaa";

export const SUFFIX_ARRAY = {
	SUFFIX_ARRAY: () => {
		const a = suffixArrayOfString(word2);
		a.print();
		logger.debug("totalSubstrings", a.totalSubstrings);
		logger.debug("duplicateSubstrings", a.duplicateSubstrings);
		logger.debug("uniqueSubstrings", a.uniqueSubstrings);
		logger.debug("lrs", a.lrs);
	},
	SUFFIX_ARRAY2: () => {
		const a = suffixArrayOfStrings(words2);
		a.print();
		const b = a.getLongestSubstring(2);
		console.log(b);
	},
};
