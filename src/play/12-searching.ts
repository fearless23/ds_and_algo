import { logger } from "src/lib/logger.js";
import { binarySearch, bfs, dfs } from "../algo/Search/index.js";
import { BSTNode, bst, printBstGraph as print } from "../ds/BinarySearchTree/index.js";

const arr = [9, 45, 5, 1, 6, 9, 12, 3];
const bb = bst();
bb.insertValues(arr);
const tree = bb.root as BSTNode;

const value = 3;

export const Searching = {
	BinarySearch: () => {
		const a = binarySearch(arr, value);
		console.log(a, arr[a as number] === value);
	},
	BFS: () => {
		print("tree", tree);
		const node = bfs(tree, value);
		logger.debug("bfs", node);
	},
	DFS: () => {
		print("tree", tree);
		const node = dfs(tree, value);
		logger.debug("dfs", node);
	},
};
