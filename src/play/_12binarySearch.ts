import { binarySearch } from "./../algo/Search/index.js";
const arr = [1, 2, 3, 4, 6, 7];
const value = 5;

export const BinarySearch = {
	BinarySearch: () => {
		const a = binarySearch(arr, value);
		console.log(a, arr[a as number] === value);
	},
};
