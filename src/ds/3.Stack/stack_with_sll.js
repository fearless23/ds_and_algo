import { single_linked_list } from './../2.LinkedList/single_linked_list';
class Stack {
  constructor () {
    this.stack = single_linked_list();
  }

  push (data) {
    this.stack.addHead(data);
  }

  pop () {
    return this.stack.removeHead();
  }

  peek () {
    return this.stack.peek();
  }

  items () {
    return this.stack.items();
  }

  print (logger, name = 'stack') {
    const nodes = this.stack.items();
    if (logger) logger.info(`${name}: \n${nodes.join('\n')}`);
    else console.log(`${name}: \n${nodes.join('\n')}`);
  }
}

export const stack_with_sll = () => new Stack();
