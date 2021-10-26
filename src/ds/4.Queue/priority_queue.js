import { single_linked_list } from '../2.LinkedList/single_linked_list';

class Queue {
  constructor (compare_function = null) {
    // Can be implemented with array as well
    this.queue = single_linked_list();
    // Bindings
    this.enqueue = this.enqueue.bind(this);
    this.dequeue = this.dequeue.bind(this);
    this.peek = this.peek.bind(this);
    this.items = this.items.bind(this);
    this.print = this.print.bind(this);
    this.compare_function = compare_function || this._default_compare_function.bind(this);
  }

  _default_compare_function (priority, node_priority) {
    return node_priority < priority;
  }

  // Node with highest priority is added to front
  // For lowest priority to be added to front: multiply priority by -1
  enqueue (data, priority = 1) {
    this.queue.addWithPriority({ data, priority }, this.compare_function);
  }

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
    const nodes = this.queue.items().map(i => `${i.data}(${i.priority})`);
    logger.info(`${name}\n (Front): ${nodes.join(' --> ')} :(Back)`);
  }
}

export const priority_queue = () => {
  const q = new Queue();

  return {
    add: q.enqueue,
    get: q.dequeue,
    peek: q.peek,
    items: q.items,
    print: q.print,
  };
};
