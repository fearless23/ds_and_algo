import { DATA_STRUCTURES } from '../ds';

const queue = DATA_STRUCTURES.QUEUE.queue;
const priority_queue = DATA_STRUCTURES.QUEUE.priority_queue;

const show = (items) => items.map(i => `${i.data}(${i.priority})`);

export const QUEUE = {
  NORMAL_QUEUE: (logger) => {
    const q = queue(); ;
    q.add('Banana');
    q.add('Grapes');
    q.print(logger);
    const a = q.get();
    logger.info(`got ${a}`);
    q.print(logger);
    q.add('Mango');
    q.add('Apple');
    q.print(logger);
    const b = q.get(3);
    logger.info(`got ${b}`);
    q.print(logger);
  },
  PRIORITY_QUEUE: (logger) => {
    const q = priority_queue(); ;
    q.add('Banana', 2);
    q.print(logger);
    q.add('Grapes', 5);
    q.print(logger);
    q.add('Mango', 3);
    q.print(logger);
    const a = q.get();
    logger.info(`got ${show(a)}`);
    q.add('Chiku', 1);
    q.add('Apple', 5);
    q.add('Papita', 3);
    q.add('Paneer', 10);
    q.print(logger);
    const b = q.get(3);
    logger.info(`got ${show(b)}`);
    q.print(logger);
  }
};
