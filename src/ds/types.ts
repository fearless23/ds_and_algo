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

export type Direction = "left" | "right";

// type Edge = number; // simply idx of node
// type Edge = { to: number; weight: string }; // With direction only
// type Edge = { to: number; weight: string }; // With weight
// Nodes =Node[] = ["A","B","C"]
export type Graph<Edge> = Edge[][];
