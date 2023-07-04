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
