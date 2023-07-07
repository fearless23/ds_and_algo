import { LINKED_LIST } from "./_2linkedList.js";
import { STACK } from "./_3stack.js";
import { QUEUE } from "./_4queue.js";
import { HEAP } from "./_5heap.js";
import { UNION_FIND } from "./_6unionFind.js";
import { TREE } from "./_7binarySearchTree.js";
import { HASHMAP } from "./_8hashMap.js";
import { FENWICK_TREE } from "./_9fenwickTree.js";
import { SUFFIX_ARRAY } from "./_10suffixArray.js";
import { BBST } from "./_11balancedBST.js";

export const DATA_STRUCTURES = {
	...LINKED_LIST,
	...STACK,
	...QUEUE,
	...HEAP,
	...UNION_FIND,
	...TREE,
	...HASHMAP,
	...FENWICK_TREE,
	...SUFFIX_ARRAY,
	...BBST,
} as const;
