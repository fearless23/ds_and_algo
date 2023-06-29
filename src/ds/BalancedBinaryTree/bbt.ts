export class BinarySearchTree {
	bst: number[] = [];

	insert(val: number) {
		let k = 0;
		while (this.bst[k]) {
			const curVal = this.bst[k] as number;
			if (val === curVal) break;
			k = 2 * k + 1; // GO LEFT
			if (val > curVal) k += 1; // GO RIGHT
		}
		this.bst[k] = val;
	}

	insertValues(values: number[]) {
		for (const k of values) this.insert(k);
	}

	search(value: number) {
		let i = 0;
		while (this.bst[i]) {
			if ((this.bst[i] as number) === value) break;
			if ((this.bst[i] as number) < value) i = 2 * i + 2;
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
