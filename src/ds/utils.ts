/**
 * Produces a unique integer for a given string
 */
export const hashString = (string: string) => {
	let hash = 0;
	for (let i = 0; i < string.length; i++) {
		const code = string.charCodeAt(i);
		hash = (hash << 5) - hash + code;
		hash = hash & hash; // Convert to 32bit integer
	}
	return hash;
};

/**
 * Secondary Hash of Double Hashing
 * TODO: it should be different from hashString
 */
export const hashString2 = (string: string) => {
	let hash = 0;
	for (let i = 0; i < string.length; i++) {
		const code = string.charCodeAt(i);
		hash = (hash << 5) - hash + code;
		hash = hash & hash; // Convert to 32bit integer
	}
	return hash;
};

/**
 * Normalize a number into [ 0, capacity ) range
 */
export const normalizeNumber = (i: number, capacity: number) => {
	return (i & 0x7fffffff) % capacity;
};

/**
 * Convert a integer to binary
 */
export const decimalToBinary = (int: number) => int.toString(2);

/**
 * Convert a binary number to integer
 */
export const binaryToInteger = (binary: string) => parseInt(binary, 2);

/**
 * First significant bit
 */
export const getFSB = (int: number) => int & (-1 * int);

/**
 * Adds two binary values `a` + `b`
 */
export const addBinary = (a: string, b: string) => {
	return (BigInt(`0b${a}`) + BigInt(`0b${b}`)).toString(2);
};

/**
 * Subtracts two binary values `a` - `b`
 */
export const subBinary = (a: string, b: string) => {
	return (BigInt(`0b${a}`) - BigInt(`0b${b}`)).toString(2);
};
