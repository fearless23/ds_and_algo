
class Stack {
  constructor () {
    this.head = null;
    this.stack = [];
  }

  push (data) {
    // insert in front of array
    this.stack.unshift(data);
    this.head = data;
  }

  pop () {
    // remove first item and return
    const removed = this.stack.shift();
    this.head = this.stack[0];
    return removed;
  }

  peek () {
    return {
      head: this.stack[0],
      size: this.stack.length,
    };
  }

  print (logger, name = 'stack') {
    logger.info(`${name}: HEAD -- ${this.stack.join('-->')} --TAIL`);
  }
}

export const stack_with_array = () => new Stack();
