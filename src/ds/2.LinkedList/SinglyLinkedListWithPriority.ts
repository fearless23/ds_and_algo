import { DEFAULT_PNODE_TO_STRING, type DSParams } from "../types.js";
import { SinglyLinkedList } from "./singlyLinkedList.js";

class SinglyLinkedListWithPriority<T> extends SinglyLinkedList<DataWithPriority<T>> {
	addWithPriority(data: DataWithPriority<T>) {
		// const priority = data.priority;
		let current_node = this.head;
		let index = 0;
		while (current_node) {
			if (current_node.data.priority < data.priority) {
				current_node = null;
			} else {
				current_node = current_node.next;
				index += 1;
			}
		}
		const size = this.size;
		if (index === size) return this.addTail(data);
		else return this.addAtIndex(index, data);
	}
}

export type DataWithPriority<T> = { priority: number; data: T };

export const singlyLinkedListWithPriority = <T>(
	params: Partial<DSParams<DataWithPriority<T>>> = {},
) => {
	const sll = new SinglyLinkedListWithPriority<T>({
		nodeDataToString: DEFAULT_PNODE_TO_STRING,
		...params,
	});
	return sll;
};
