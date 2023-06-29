import { doublyLinkedListNumber, singlyLinkedListNumber } from "../ds/LinkedList/index.js";

export const LINKED_LIST = {
	SINGLE_LINKED_LIST: () => {
		const sll = singlyLinkedListNumber();
		sll.addTail(0);
		sll.print();
		sll.addTail(1);
		sll.print();
		sll.addTails([2, 3, 4, 5, 6, 7]);
		sll.print();
		sll.removeAtIndex(4);
		sll.print();
		sll.removeAtIndex(4);
		sll.print();
		sll.removeAtIndex(4);
		sll.print();
	},
	DOUBLE_LINKED_LIST: () => {
		const sll = doublyLinkedListNumber();
		sll.addTail(0);
		sll.print();
		sll.addTail(1);
		sll.print();
		sll.addTails([2, 3, 4, 5, 6, 7]);
		sll.print();
		sll.removeAtIndex(4);
		sll.print();
		sll.removeAtIndex(4);
		sll.print();
		sll.removeAtIndex(4);
		sll.print();
	},
};
