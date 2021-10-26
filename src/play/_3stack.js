import { DATA_STRUCTURES } from '../ds';

const stack_with_sll = DATA_STRUCTURES.STACK.stack_with_sll;
const stack_with_array = DATA_STRUCTURES.STACK.stack_with_array;

export const STACK = {
  STACK_WITH_SLL: (logger, payload = {}) => {
    const s = stack_with_sll(); ;
    s.push('Banana');
    s.push('Grapes');
    s.print();
    const a = s.pop();
    logger.info(`popped ${a}`);
    s.print();
    s.push('Mango');
    s.push('Apple');
    s.print();
    const b = s.pop();
    logger.info(`popped ${b}`);
    s.print(logger);
  },
  STACK_WITH_ARRAY: (logger, payload = {}) => {
    const s = stack_with_array(); ;
    s.push('Banana');
    s.push('Grapes');
    s.print(logger);
    const a = s.pop();
    logger.info(`popped ${a}`);
    s.print(logger);
    s.push('Mango');
    s.push('Apple');
    s.print(logger);
    const b = s.pop();
    logger.info(`popped ${b}`);
    s.print(logger);
  }
};
