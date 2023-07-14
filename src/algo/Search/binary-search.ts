/**
- c > 0  : our value is smaller -> search in left half
- c < 0  : our value is larger -> search in right half
- c ===0 : found the value
*/

export const binarySearch_recursion = (arr: number[], value: number) => {
	const search = (start: number, end: number): number | undefined => {
		if (end < start) return;
		const m = start + Math.floor((end - start) / 2);
		const c = (arr[m] as number) - value;
		if (c === 0) return m;
		if (c > 0) return search(start, m - 1);
		else return search(m + 1, end);
	};

	return search(0, arr.length - 1);
};

export const binarySearch_whileLoop = (arr: number[], value: number) => {
	let start = 0;
	let end = arr.length - 1;
	while (start <= end) {
		const m = start + Math.floor((end - start) / 2);
		const c = (arr[m] as number) - value;
		if (c === 0) return m;
		if (c > 0) end = m - 1;
		else start = m + 1;
	}
};

// a -> array
// v -> value
// s -> start
// e -> end
// m -> middle
// c -> compared
export const binarySearch = (a: number[], v: number) => {
	let s = 0;
	let e = a.length - 1;
	while (s <= e) {
		const m = s + Math.floor((e - s) / 2);
		const c = (a[m] as number) - v;
		if (c === 0) return m;
		if (c > 0) e = m - 1;
		else s = m + 1;
	}
};
