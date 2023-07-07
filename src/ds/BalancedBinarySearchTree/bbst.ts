import { BinarySearchTree, type BinarySearchTreeParams, Node } from "../BinarySearchTree/index.js";

class BalancedBinarySearchTree<T> extends BinarySearchTree<T> {
	#rotate(start: Node<T>, dir: "left" | "right") {
		const oppDir = dir === "right" ? "left" : "right";
		const node = start[oppDir];
		if (node == null) return null;
		start[oppDir] = node[dir];
		node[dir] = start;
		return node;
	}

	balanceRoot(dir: "left" | "right") {
		if (!this.root) return;
		const newNode = this.#rotate(this.root, dir);
		if (newNode) this.root = newNode;
	}
}

export const balancedBst = <T>(params: BinarySearchTreeParams<T>) => {
	return new BalancedBinarySearchTree(params);
};

export const balancedBstWithNodeString = (duplicateAllowed = false) => {
	const bst = new BalancedBinarySearchTree<{ data: string; value: number }>({
		nodeToString: (i) => `${i.data}`,
		duplicateAllowed,
		compare: (a, b) => a.value - b.value,
	});
	return bst;
};

export const balancedBstWithNodeNumber = (duplicateAllowed = false) => {
	const bst = new BalancedBinarySearchTree<number>({
		nodeToString: (i) => `${i}`,
		duplicateAllowed,
		compare: (a, b) => a - b,
	});
	return bst;
};
