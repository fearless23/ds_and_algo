import { single_linked_list } from '../2.LinkedList/single_linked_list';

class Queue {
  constructor () {
    // Can be implemented with array as well
    this.queue = single_linked_list();
    // Bindings
    this.enqueue = this.enqueue.bind(this);
    this.dequeue = this.dequeue.bind(this);
    this.peek = this.peek.bind(this);
    this.items = this.items.bind(this);
    this.print = this.print.bind(this);
  }

  enqueue (data) { this.queue.addTail(data); }
  dequeue (i = 1) {
    const items = [];
    for (let j = 0; j < i; j++) {
      const item = this.queue.removeHead();
      if (item === null) break;
      else items.push(item);
    }
    return items;
  }

  peek () { return this.queue.peek().head; }
  items () { return this.queue.items(); }
  print (logger, name = 'Queue') {
    const nodes = this.queue.items();
    logger.info(`${name}\n (Front): ${nodes.join(' --> ')} :(Back)`);
  }
}

export const queue = () => {
  const q = new Queue();

  return {
    add: q.enqueue,
    get: q.dequeue,
    peek: q.peek,
    items: q.items,
    print: q.print,
  };
};
