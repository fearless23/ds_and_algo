/** Convert node data to string representation for logging purposes */
export type NodeDataToString<T> = (data: T) => string;

export const DEFAULT_NODE_TO_STRING = <T>(data: T) => String(data);
export const DEFAULT_PNODE_TO_STRING = <T>(data: { data: T; priority: number }) =>
	`${String(data.data)}(${data.priority})`;

export type DSParams<T> = {
	nodeDataToString: NodeDataToString<T>;
};
