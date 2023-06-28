export type Queue<T> = {
	send(data: T): void;
	take(count?: number): T[];
	print(): void;
	peek(): { size: number; head: T | null };
};

export type DataWithPriority<T> = { data: T; priority: number };

export type PriorityQueue<T> = {
	send(data: T, priority: number): void;
	take(count?: number): DataWithPriority<T>[];
	print(): void;
	peek(): { size: number; head: DataWithPriority<T> | null };
};
