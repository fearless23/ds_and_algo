import { doublyLinkedList, singlyLinkedList } from "../ds/2.LinkedList/index.js";
// import { singlyLinkedList } from "../ds/2.LinkedList/singlyLinkedList.js";

// const { single_linked_list } = DATA_STRUCTURES.LINKED_LIST;

export const LINKED_LIST = {
	SINGLE_LINKED_LIST: () => {
		const sll = singlyLinkedList<number>();
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
		const sll = doublyLinkedList<number>();
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
