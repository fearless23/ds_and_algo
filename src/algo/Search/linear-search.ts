type FindFunction<T> = (item: T) => boolean;
const linearSearch = <T>(array: T[], find: FindFunction<T>) => {
	for (let i = 0; i < array.length; i++) {
		if (find(array[i] as T)) return i;
	}
};

export const linearSearchNumber = (array: number[], value: number) => {
	return linearSearch<number>(array, (a) => a === value);
};

export const linearSearchString = (array: string[], value: string) => {
	return linearSearch<string>(array, (a) => a === value);
};
