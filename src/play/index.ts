import { LINKED_LIST } from "./_2linked_list.js";
import { STACK } from "./_3stack.js";
import { QUEUE } from "./_4queue.js";
import { HEAP } from "./_5heap.js";
import { UNION_FIND } from "./_6union_find.js";
import { TREE } from "./_7tree.js";

export const DATA_STRUCTURES = {
	...LINKED_LIST,
	...STACK,
	...QUEUE,
	...HEAP,
	...UNION_FIND,
	...TREE,
} as const;
