export type Stack<T> = {
	push(data: T): void;
	take(): T | null;
	print(): void;
	peek(): { size: number; head: T | null };
};
