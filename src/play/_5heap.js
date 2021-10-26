import { DATA_STRUCTURES } from '../ds';

const binary_heap = DATA_STRUCTURES.HEAP.binary_heap;
const VARIANTS = DATA_STRUCTURES.HEAP.VARIANT_NAMES;

export const HEAP = {
  BINARY_HEAP: (logger) => {
    const bh = binary_heap(VARIANTS.MIN);

    // init
    bh.addMany([2, 7, 2, 11, 7, 13, 2]);
    bh.print(logger);
    bh.showIndexMap(logger);

    // insert 3
    bh.add(3);
    bh.print(logger);
    bh.showIndexMap(logger);

    // reomve 2
    bh.search_and_remove(202);
    bh.print(logger);
    bh.showIndexMap(logger);

    // poll
    bh.remove();
    bh.print(logger);
    bh.showIndexMap(logger);
  },
};
