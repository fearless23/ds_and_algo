export const bubbleSort_readable = (array: number[]) => {
	// arr sorted in place
	const swapAt = (i: number) => {
		const tmp = array[i] as number;
		array[i] = array[i + 1] as number;
		array[i + 1] = tmp;
	};
	const n = array.length;
	const maxPasses = n - 1;
	for (let pass = 0; pass < maxPasses; pass++) {
		let swapsCount = 0;
		const comparisons = n - pass - 1;
		for (let i = 0; i < comparisons; i++) {
			const p = array[i] as number;
			const q = array[i + 1] as number;
			if (p > q) {
				swapsCount++;
				swapAt(i);
			}
		}
		if (swapsCount === 0) break;
	}
};

// Minified version
export const bubbleSort = (a: number[]) => {
	// arr sorted in place
	const swap = (i: number) => {
		const t = a[i] as number;
		a[i] = a[i + 1] as number;
		a[i + 1] = t;
	};
	for (let p = 0; p < a.length - 1; p++) {
		let s = 0;
		for (let i = 0; i < a.length - p - 1; i++) {
			if ((a[i] as number) > (a[i + 1] as number)) {
				swap(i);
				s++;
			}
		}
		if (s === 0) break;
	}
};
