import { DATA_STRUCTURES } from '../ds';

const single_linked_list = DATA_STRUCTURES.LINKED_LIST.single_linked_list;

export const LINKED_LIST = {
  SINGLE_LINKED_LIST: (logger) => {
    const sll = single_linked_list(); ;
    sll.addTail(0);
    sll.print(logger);
    sll.addTail(1);
    sll.print(logger);
    sll.addTails([2, 3, 4, 5, 6, 7]);
    sll.print(logger);
    sll.removeAtIndex(4);
    sll.print(logger);
    sll.removeAtIndex(4);
    sll.print(logger);
    sll.removeAtIndex(4);
    sll.print(logger);
  }
};
