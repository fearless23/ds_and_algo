import { DATA_STRUCTURES } from '../ds';

const union_find = DATA_STRUCTURES.UNION_FIND.union_find;

const make_union = (uf, logger) => (X, Y) => {
  uf.union(X, Y);
  uf.print(logger);
};

export const UNION_FIND = {
  UNION_FIND: (logger) => {
    try {
      const uf = union_find(['E', 'F', 'I', 'D', 'C', 'A', 'J', 'L', 'G', 'K', 'B', 'H']);
      const union = make_union(uf, logger);
      uf.print(logger);

      union('C', 'K');
      union('F', 'E');
      union('A', 'J');
      union('A', 'B');
      union('C', 'D');
      union('D', 'I');
      union('L', 'F');
      union('C', 'A');
      union('A', 'B');
      union('H', 'G');
      logger.debug(uf.groups(), 'GROUPS');

      union('H', 'F');
      union('H', 'B');
      logger.debug(uf.groups(), 'GROUPS');
    } catch (error) {
      logger.error(error, 'UNION_FIND');
    }
  },
};
