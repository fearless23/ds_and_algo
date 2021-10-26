const max_heap_invariant = (A, B) => A >= B; // MAX HEAP, root is largest
const min_heap_variant = (A, B) => A <= B; // MIN HEAP, root is smallest

const VARIANTS = {
  MIN: min_heap_variant,
  MAX: max_heap_invariant,
};

export const VARIANT_NAMES = {
  MIN: 'MIN',
  MAX: 'MAX',
};

class BinaryHeap {
  constructor (variant_name) {
    // Can be implemented with LinkedList as well
    /** @type {number[]} */
    this.heap = [];
    this.indexMap = {}; // for better searching
    this.variant = VARIANTS[variant_name];
    this.variant_name = variant_name;
    // // Bindings
    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
    this.showIndexMap = this.showIndexMap.bind(this);
    this.search_and_remove = this.search_and_remove.bind(this);
    this.addMany = this.addMany.bind(this);
    this.isLeaf = this.isLeaf.bind(this);
    this.items = this.items.bind(this);
    this.print = this.print.bind(this);
  }

  _getLeftIndex (index) { return 2 * index + 1; }
  _getRightIndex (index) { return 2 * index + 2; }
  _getParentIndex (index) { return Math.ceil((index / 2) - 1); }
  _getLastIndex () { return this.heap.length - 1; }
  _indexOutOfBounds (index) { return index >= this.heap.length; }
  _totalLeafNodes () { return Math.ceil(this.heap.length / 2); }
  _smallestLeafNode () { return Math.floor(this.heap.length / 2); }
  _satisfy_heap_property (A, B) { return this.variant(A, B); }
  _addAtEnd (data) {
    this.heap.push(data);
    if (!this.indexMap[data]) this.indexMap[data] = new Set([]);
    this.indexMap[data].add(this._getLastIndex());
  }

  _switch (i, j) {
    const i_node = this.heap[i];
    const j_node = this.heap[j];
    this.heap[i] = j_node;
    this.heap[j] = i_node;

    try {
      this.indexMap[i_node].delete(i);
      this.indexMap[i_node].add(j);

      this.indexMap[j_node].delete(j);
      this.indexMap[j_node].add(i);
    } catch (error) {
      console.error(error, this._switch.name);
    }
  }

  _getNodeIndex (data) {
    return this.indexMap[data];
  }

  _shuffleUpFromIndex (index) {
    if (index === 0) {
      return { next_switch: false, next_index: 0, switched: false };
    }
    const item = this.heap[index];
    const parent_index = this._getParentIndex(index);
    const parent_item = this.heap[parent_index];
    const should_switch = !this._satisfy_heap_property(parent_item, item);
    if (should_switch) {
      this._switch(index, parent_index);
      console.log(`switching up ${item} with ${parent_item}`);
    }

    const next_switch = parent_index !== 0 && should_switch;
    const next_index = next_switch ? parent_index : index;
    return { next_switch, next_index, switched: should_switch };
  }

  _shuffleDownFromIndex (index) {
    if (index === this._getLastIndex()) {
      return { next_switch: false, next_index: this._getLastIndex(), switched: false };
    }
    const item = this.heap[index];
    const left_index = this._getLeftIndex(index);
    const right_index = this._getRightIndex(index);

    const left_item = this.heap[left_index];
    const right_item = this.heap[right_index];

    if (left_item === undefined) {
      // reached leaf node
      return { next_switch: false, next_index: index, switched: false };
    }

    if (right_item === undefined) {
      const should_switch = !this._satisfy_heap_property(item, left_item);
      if (should_switch) {
        this._switch(index, left_index);
        console.log(`switching down ${item} with ${left_item}`);
      }
      const next_switch = left_index !== this._getLastIndex() && should_switch;
      const next_index = next_switch ? left_index : index;
      return { next_switch, next_index, switched: should_switch };
    } else {
      let selected_item;
      let selected_index;
      if (this.variant_name === VARIANT_NAMES.MIN) {
        // if min heap, smallest of left/right should be selected for shuffle
        const is_left_small = left_item <= right_item;
        selected_item = is_left_small ? left_item : right_item;
        selected_index = is_left_small ? left_index : right_index;
      }
      if (this.variant_name === VARIANT_NAMES.MAX) {
        // if max heap, largest of left/right should be selected for shuffle
        const is_left_big = left_item >= right_item;
        selected_item = is_left_big ? left_item : right_item;
        selected_index = is_left_big ? left_index : right_index;
      }

      const should_switch = !this._satisfy_heap_property(item, selected_item);
      if (should_switch) {
        this._switch(index, selected_index);
        console.log(`switching down ${item} with ${selected_item}`);
      }
      const next_switch = selected_index !== this._getLastIndex() && should_switch;
      const next_index = next_switch ? selected_index : index;
      return { next_switch, next_index, switched: should_switch };
    }
  }

  _shuffleUp (index = this._getLastIndex()) {
    let should_switch = true;
    let final_index = index;
    let switches = 0;
    while (should_switch) {
      const { next_switch, next_index, switched } = this._shuffleUpFromIndex(final_index);
      should_switch = next_switch;
      final_index = next_index;
      if (switched) switches += 1;
    }
    return { final_index, switches };
  }

  _shuffleDown (index = 0) {
    let should_switch = true;
    let final_index = index;
    let switches = 0;
    while (should_switch) {
      const { next_switch, next_index, switched } = this._shuffleDownFromIndex(final_index);
      should_switch = next_switch;
      final_index = next_index;
      if (switched) switches += 1;
    }
    return { final_index, switches };
  }

  _removeAtIndex (index) {
    // remove at Root: O(log(n))
    // remove at index: O(log(n)) (Search + Remove)
    if (index === this._getLastIndex()) {
      const removed_node = this.heap.pop();
      this.indexMap[removed_node].delete(index);
      return { removed_node, final_index: this._getLastIndex(), switches: 0 };
    }
    /*
      See add method, how binary heap works as priority queue as well.
      so, removing usually works like polling or dequeue, i.e removing root node
    */
    // switch last and first node
    this._switch(index, this._getLastIndex());
    const removed_node = this.heap.pop();
    this.indexMap[removed_node].delete(this._getLastIndex());

    // if root node => shuffleDown
    if (index === 0) {
      const response = this._shuffleDown(0);
      return { removed_node, ...response };
    }
    // if leaf nodes => shuffleUp
    if (this.isLeaf(index)) {
      const response = this._shuffleUp(index);
      return { removed_node, ...response };
    }
    // if middle nodes => decide
    // first try
    const response = this._shuffleUp(index);
    const response_2 = this._shuffleDown(response.final_index);
    const switches = response.switches + response.switches;
    return { removed_node, switches, final_index: response_2.final_index };
  }

  add (data) {
    /*
      Adding to heap and then shuffling up, either min or max heap, the one with
      maximum priorty goes to root or other nodes
      If, two nodes have same value/priority the one added later can be after the first one.
      So, Binary Heap works as Priority Queue as well
    */
    this._addAtEnd(data);
    const response = this._shuffleUp(this._getLastIndex());
    return response;
  }

  remove (index = 0) {
    // remove at index: O(log(n)) (Remove)
    return this._removeAtIndex(index);
  }

  search_and_remove (data) {
    // remove at index: O(n) (Search + Remove)
    // with indexMap: remove at index: O(log(n)) (Search + Remove)
    let data_index = null;
    // with index_map
    const nodesSet = this.indexMap[data];
    if (nodesSet) {
      const nodes = [...nodesSet];
      data_index = nodes[0];
    }

    /*
    without index_map
    for (let i = 0; i < this.heap.length; i++) {
      const current_data = this.heap[i];
      if (data === current_data) data_index = i;
    }
    */
    if (data_index === null || data_index === undefined) {
      const error = `${data} not found in heap`;
      console.error(error);
      return { error };
    } else return this._removeAtIndex(data_index);
  }

  showIndexMap (logger) {
    const l = {};
    for (const data in this.indexMap) {
      const indexes = [...this.indexMap[data]];
      l[data] = indexes.join(',');
    }
    logger.debug(l, 'Heap Index Map');
    return l;
  }

  addMany (list = []) {
    for (const data of list) {
      this._addAtEnd(data);
      this._shuffleUp(this._getLastIndex());
    }
  }

  isLeaf (index) {
    const left_index = this._getLeftIndex(index);
    return this._indexOutOfBounds(left_index);
  }

  items () { return this.heap; }
  print (logger, name = 'Binary Heap') {
    const nodes = this.heap;
    logger.info(`${name} ?? ${nodes.join(' --> ')}`);
  }
}

export const binary_heap = (variant) => {
  const bh = new BinaryHeap(variant);

  return {
    add: bh.add,
    remove: bh.remove,
    search_and_remove: bh.search_and_remove,
    showIndexMap: bh.showIndexMap,
    isLeaf: bh.isLeaf,
    items: bh.items,
    print: bh.print,
    addMany: bh.addMany,
  };
};
