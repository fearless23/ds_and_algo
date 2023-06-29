export class BinarySearchTree {
	constructor(dupAllowed = false) {
		this.bst = [];
		this.dupAllowed = dupAllowed;
	}

	insert(val) {
		let k = 0;
		while (this.bst[k]) {
			const curVal = this.bst[k];
			if (!this.dupAllowed && val === curVal) break;
			k = 2 * k + 1; // GO LEFT
			if (val > curVal) k += 1; // GO RIGHT
		}
		this.bst[k] = val;
	}

	insertValues(vals) {
		for (const k of vals) this.insert(k);
	}

	// Complexity, see note 1 in MD File
	search(val) {
		let i = 0;
		while (this.bst[i]) {
			if (this.bst[i] === val) break;
			if (this.bst[i] < val) i = 2 * i + 2;
			else i = 2 * i + 1;
		}
		return !this.bst[i] ? -1 : i;
	}

	print() {
		const y = [];
		let e = 0;
		for (let i = 0; i < this.bst.length; i++) {
			if (this.bst[i]) y[i] = this.bst[i];
			if (this.bst[i] === 0) y[i] = 0;
			if (!this.bst[i]) {
				y[i] = "_";
				e++;
			}
		}
		console.log("BST:", y.join(", "));
		console.log("L:", this.bst.length, "E:", e);
		console.log("\n\n");
	}
}
