export const quickSortReadable = (array: number[]) => {
	const swap = (i: number, j: number) => {
		if (i !== j) {
			const tmp = array[i] as number;
			array[i] = array[j] as number;
			array[j] = tmp;
		}
	};
	const pivotAndSwap = (first: number, last: number) => {
		// Condition: last > first
		const pivot = array[last] as number;
		let putSmallerOrEqualNumberAt = first;
		for (let i = first; i < last; i++) {
			if ((array[i] as number) <= pivot) {
				swap(i, putSmallerOrEqualNumberAt);
				putSmallerOrEqualNumberAt += 1;
			}
		}
		swap(last, putSmallerOrEqualNumberAt); // pivot
		return putSmallerOrEqualNumberAt;
	};
	const sort = (first: number, last: number) => {
		if (first >= last) return;
		const pivotIdx = pivotAndSwap(first, last);
		sort(first, pivotIdx - 1);
		sort(pivotIdx + 1, last);
	};

	sort(0, array.length - 1);
};

// minified version
export const quickSort = (arr: number[]) => {
	const swap = (i: number, j: number) => {
		if (i !== j) {
			const tmp = arr[i] as number;
			arr[i] = arr[j] as number;
			arr[j] = tmp;
		}
	};

	const sort = (first: number, last: number) => {
		if (first >= last) return;
		let j = first;
		for (let i = first; i < last; i++) {
			if ((arr[i] as number) <= (arr[last] as number)) {
				swap(i, j);
				j += 1;
			}
		}
		swap(last, j);
		sort(first, j - 1);
		sort(j + 1, last);
	};

	sort(0, arr.length - 1);
};
