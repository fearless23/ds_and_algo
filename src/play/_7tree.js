import { DATA_STRUCTURES } from '../ds';

const binary_search_tree = DATA_STRUCTURES.TREE.binary_search_tree;

const make_insert = (logger, BST) => (data) => {
  BST.insert(data);
  // BST.print(logger);
};

export const TREE = {
  BINARY_SEARCH_TREE: (logger) => {
    const BST = binary_search_tree();
    const insert = make_insert(logger, BST);

    insert(7);
    insert(20);
    insert(5);
    insert(15);
    insert(10);
    insert(4);
    insert(4);
    insert(33);
    insert(2);
    insert(25);
    insert(6);
    // BST.print(logger);

    BST.print(logger, 'BST', 'PRE_ORDER');
    BST.print(logger, 'BST', 'IN_ORDER');
    BST.print(logger, 'BST', 'POST_ORDER');
    BST.print(logger, 'BST', 'LEVEL_ORDER');
  },
};
