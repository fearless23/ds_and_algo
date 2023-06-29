/** Convert node data to string representation for logging purposes */
export type NodeToString<T> = (data: T) => string;
export type DataWithPriority<T> = { priority: number; data: T };
export type DSParams<T> = {
	nodeToString: NodeToString<T>;
};

/**
 * Compare some `a` and `b` of type `T`
 * Output
 * - `<0`: `a` is smaller than `b`
 * - `0` : `a` is equal to `b`
 * - `>0` : `a` is bigger than `b`
 *
 * This is used in Priority Queue, Binary Heap variants etc...
 */
export type CompareFunction<T> = (a: T, b: T) => number;

/**
 * Take in some `a` and `b` of tpye `T`
 * Output:
 * - `true` : Found
 * - `false`: Not found
 */
export type FindFunction<T> = (a: T, b: T) => boolean;

export type OrderType = "PRE_ORDER" | "IN_ORDER" | "POST_ORDER" | "LEVEL_ORDER";

export type Stack<T> = {
	push(data: T): void;
	take(): T | null;
	print(): void;
	peek(): { size: number; head: T | null };
};

export type Queue<T> = {
	send(data: T): void;
	take(count?: number): T[];
	print(): void;
	peek(): { size: number; head: T | null };
};

export type QueueFS<T> = Queue<DataWithPriority<T>> & {
	sendPriority(data: T, priority: number): void;
};
