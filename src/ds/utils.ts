export const hashString = (string: string) => {
	let hash = 0;
	for (let i = 0; i < string.length; i++) {
		const code = string.charCodeAt(i);
		hash = (hash << 5) - hash + code;
		hash = hash & hash; // Convert to 32bit integer
	}
	return hash;
};

export const normalizeNumber = (i: number, capacity: number) => {
	return (i & 0x7fffffff) % capacity;
};
