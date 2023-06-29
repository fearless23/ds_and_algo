class Node<T> {
	data: T;
	left: Node<T> | null;
	right: Node<T> | null;
	constructor(data: T) {
		this.data = data;
		this.left = null;
		this.right = null;
	}
}

class BinaryTreeSLL<T> {
	root: Node<T> | null;
	constructor() {
		this.root = null;
	}

	insert(data: T) {
		const newNode = new Node(data);

		// Empty Tree
		if (!this.root) {
			this.root = newNode;
			return;
		}

		// Tree has root...Recursively add newNode
		this.addNode(this.root, newNode);
	}

	addNode(startNode: Node<T>, newNode: Node<T>) {
		if (newNode.data <= startNode.data) {
			if (startNode.left) {
				this.addNode(startNode.left, newNode);
			} else {
				startNode.left = newNode;
			}
		} else {
			if (startNode.right) {
				this.addNode(startNode.right, newNode);
			} else {
				startNode.right = newNode;
			}
		}
	}

	insertValues(vals: T[]) {
		for (const k of vals) this.insert(k);
	}

	// search(val) {}
}

const x = new BinaryTreeSLL();
x.insertValues([6, 3, 5, 2, 5, 4, 7, 4]);
console.log(x.root);
