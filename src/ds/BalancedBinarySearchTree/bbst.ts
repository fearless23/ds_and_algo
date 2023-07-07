import { BinarySearchTree, type BinarySearchTreeParams, Node } from "../BinarySearchTree/index.js";

class BalancedBinarySearchTree<T> extends BinarySearchTree<T> {
	// #balanceFactor = 0;

	#rotateRoot(dir: "left" | "right") {
		if (!this.root) return null;
		const oppDir = dir === "right" ? "left" : "right";
		const node = this.root[oppDir];
		if (node == null) return null;

		this.root[oppDir] = node[dir];
		node[dir] = this.root;
		this.root = node;
		console.log(`Tree rotated ${dir}`);
	}

	#findHeight(start: Node<T> | null = this.root): number {
		if (!start) return -1;
		return 1 + Math.max(this.#findHeight(start.left), this.#findHeight(start.right));
	}

	get balanceFactor() {
		if (!this.root) return 0;
		const right = this.#findHeight(this.root.right);
		const left = this.#findHeight(this.root.left);
		return right - left;
	}

	balance() {
		if (!this.root) return;
		let bf = this.balanceFactor;
		while (bf > 1 || bf < -1) {
			if (bf > 1) this.#rotateRoot("left");
			else if (bf < -1) this.#rotateRoot("right");
			bf = this.balanceFactor;
		}
	}

	balanceOnce() {
		if (!this.root) return;
		const bf = this.balanceFactor;
		if (bf > 1) this.#rotateRoot("left");
		else if (bf < -1) this.#rotateRoot("right");
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
