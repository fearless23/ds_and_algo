import { BSTNode as Node } from "./../../ds/BinarySearchTree/index.js";

/*
If Node is BinarySearchTree node, we can use property of BST 
that left is smaller or equal and right is larger.
- Same is implemented in findByValue method of bstWithNode

In the following, bfs and dfs, applies to a general binary tree to show
how a typical bfs or dfs search works.
but for specific binary trees use more specific search methods
- BST: use findByValue
- Heap: use findInHeap
- BBST: use findByValue method
*/

export const bfs = (tree: Node, value: number) => {
	const queue = [tree];
	while (queue.length > 0) {
		const head = queue.shift() as Node;
		console.log("CHECKING", head.data);
		if (head.data === value) return head;
		if (head.left) queue.push(head.left);
		if (head.right) queue.push(head.right);
	}
};

export const dfs = (tree: Node | undefined, value: number): Node | undefined => {
	if (!tree) return;
	console.log("CHECKING", tree.data);
	if (tree.data === value) return tree;
	let node = dfs(tree.left, value);
	if (node) return node;
	node = dfs(tree.right, value);
	if (node) return node;
};
