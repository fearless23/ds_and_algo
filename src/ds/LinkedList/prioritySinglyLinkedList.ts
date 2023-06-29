import type { DSParams, CompareFunction } from "../types.js";
import { SinglyLinkedList } from "./singlyLinkedList.js";

export type PrioritySinglyLinkedListParams<T> = DSParams<T> & {
	compare: CompareFunction<T>;
};

export class PrioritySinglyLinkedList<T> extends SinglyLinkedList<T> {
	#compare: CompareFunction<T>;
	constructor(params: PrioritySinglyLinkedListParams<T>) {
		super(params);
		this.#compare = params.compare;
	}
	addWithPriority(data: T) {
		let current_node = this.head;
		let index = 0;
		while (current_node) {
			if (this.#compare(data, current_node.data) === 1) {
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

export const prioritySinglyLinkedListNumber = () => {
	const sll = new PrioritySinglyLinkedList<number>({
		nodeToString: (i) => `${i}`,
		compare: (data: number, node: number) => {
			return data - node;
		},
	});
	return sll;
};
