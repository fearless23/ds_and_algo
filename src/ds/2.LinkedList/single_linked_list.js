// import { is_data_valid } from './_typeChecks';
// import { getNodeByType, getNodeByIndex } from './_helpers';

class Node {
  constructor (data) {
    /** @type {number} */
    this.data = data;
    /** @type {Node} */
    this.next = null;
  }
}

class SingleLinkedList {
  constructor () {
    this.head = null;
    this.tail = null;
    this.size = 0;

    // binding public method
    this.addTail = this.addTail.bind(this);
    this.addTails = this.addTails.bind(this);
    this.removeTail = this.removeTail.bind(this);
    this.addHead = this.addHead.bind(this);
    this.removeHead = this.removeHead.bind(this);
    this.addAtIndex = this.addAtIndex.bind(this);
    this.removeAtIndex = this.removeAtIndex.bind(this);
    this.items = this.items.bind(this);
    this.peek = this.peek.bind(this);
    this.print = this.print.bind(this);
    this._addWithPriority = this._addWithPriority.bind(this);
  }

  _init (node) {
    this.head = node;
    this.tail = node;
    this.size += 1;
  }

  _createNode (data) {
    const new_node = new Node(data);
    return new_node;
  }

  _getNodeAtIndex (i) {
    if (i < 0) return null;
    let curr_index = 0;
    let curr = this.head;
    while (curr_index !== i) {
      curr = curr.next;
      curr_index += 1;
    }
    return curr;
  }

  _addNodeAfterTail (data) {
    const node = this._createNode(data);
    if (this.size === 0) return this._init(node);

    this.tail.next = node;
    this.tail = node;
    this.size += 1;
  }

  _removeNodeAtTail () {
    if (this.size === 0) return null;

    /** @type {Node} */
    const to_remove = this.tail;

    const before_tail_node = this._getNodeAtIndex(this.size - 2);
    if (!before_tail_node) {
      this.head = null;
      this.tail = null;
    } else {
      before_tail_node.next = null;
      this.tail = before_tail_node;
    }
    this.size -= 1;
    return to_remove.data;
  }

  _addNodeBeforeHead (data) {
    const node = this._createNode(data);
    if (this.size === 0) return this._init(node);

    node.next = this.head;
    this.head = node;
    this.size += 1;
  }

  _removeNodeAtHead () {
    if (this.size === 0) return null;
    /** @type {Node} */
    const to_remove = this.head;
    this.head = this.head.next;
    if (this.size === 1) this.tail = null;
    this.size -= 1;
    return to_remove.data;
  }

  _addNodeAtIndex (index, data) {
    if (index < 0 || index >= this.size) {
      throw new Error(`index out of bounds, should be b/w 0 & ${this.size - 1}`);
    }

    const node = this._createNode(data);
    if (this.size === 0) return this._init(node);

    const prev_node = this._getNodeAtIndex(index - 1);
    if (!prev_node) {
      node.next = this.head;
      this.head = node;
    } else {
      node.next = prev_node.next;
      prev_node.next = node;
    }
    this.size += 1;
  }

  _removeNodeAtIndex (index) {
    if (index < 0 || index >= this.size) {
      throw new Error(`index out of bounds, should be b/w 0 & ${this.size - 1}`);
    }
    if (this.size === 0) return null;
    if (index === 0) return this._removeNodeAtHead();
    if (index === this.size - 1) return this._removeNodeAtTail();
    const prev_node = this._getNodeAtIndex(index - 1);
    /** @type {Node} */
    const to_remove = prev_node.next;
    prev_node.next = prev_node.next.next;
    this.size -= 1;
    return to_remove.data;
  }

  /**
   * Only used for Priority Queue
   * @param {{data:number, priority: number}} data
   */
  _addWithPriority (data, compare_function) {
    if (this.size === 0) {
      const node = this._createNode(data);
      return this._init(node);
    }

    const priority = data.priority;
    let current_node = this.head;
    let index = 0;
    while (current_node) {
      if (compare_function(priority, current_node.data.priority)) {
        current_node = null;
      } else {
        current_node = current_node.next;
        index += 1;
      }
    }
    if (index === this.size) return this._addNodeAfterTail(data);
    else return this._addNodeAtIndex(index, data);
  }

  /**
   *
   * @returns {number}
   */
  getHead () { return this.head && this.head.data; }

  /**
   *
   * @returns {number}
   */
  getTail () { return this.tail && this.tail.data; }

  _getNodes () {
    const nodes = [];
    /** @type {Node} */
    let current_node = this.head;
    while (current_node) {
      nodes.push(current_node.data);
      current_node = current_node.next;
    }
    return nodes;
  }

  /*
   --------- PUBLIC METHODS ----------
  */

  addTail (data) { this._addNodeAfterTail(data); }
  addTails (data = []) { data.forEach(i => this._addNodeAfterTail(i)); }
  removeTail () { this._removeNodeAtTail(); }
  addHead (data) { this._addNodeBeforeHead(data); }
  removeHead () { return this._removeNodeAtHead(); }
  addAtIndex (index, data) { this._addNodeAtIndex(index, data); }
  removeAtIndex (index) { return this._removeNodeAtIndex(index); }
  items () { return this._getNodes(); }
  peek () {
    return {
      head: this.getHead(),
      tail: this.getTail(),
      size: this.size,
    };
  }

  print (logger, name = 'SLL') {
    const nodes = this._getNodes();
    logger.info(`${name}: ${nodes.join(' ---> ')}`);
  }
}

export const single_linked_list = () => {
  const sll = new SingleLinkedList();

  return {
    addTail: sll.addTail,
    addTails: sll.addTails,
    removeTail: sll.removeTail,
    addHead: sll.addHead,
    removeHead: sll.removeHead,
    addAtIndex: sll.addAtIndex,
    removeAtIndex: sll.removeAtIndex,
    items: sll.items,
    peek: sll.peek,
    print: sll.print,
    addWithPriority: sll._addWithPriority
  };
};
