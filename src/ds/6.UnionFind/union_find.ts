/**
  DEFINATION
  Union find is a data structure that keep track of elements
  which are split into one or more disjoint sets.
  Its has two primary operations: find & union
 */

class UnionFind {
	constructor(node_names) {
		/** @type {number[]} */
		this.nodes = [];
		/** @type {{[key:string]:number}} */
		this.nameToIndex = {};
		/** @type {{[key:number]:string}} */
		this.indexToName = {};

		this._init(node_names);
		this.union = this.union.bind(this);
		this.find = this.find.bind(this);
		this.groups = this.groups.bind(this);
		this.print = this.print.bind(this);
	}

	/**
	 * Initialize with set of different nodes like ['A','B','C']
	 * @param {string[]} node_names
	 */
	_init(node_names) {
		for (let index = 0; index < node_names.length; index++) {
			const name = node_names[index];
			this.nodes.push(index);
			this.nameToIndex[name] = index;
			this.indexToName[index] = name;
		}
	}

	_get_node_by_index(index = 0) {
		const parent = this.nodes[index];
		const name = this.indexToName[index];
		return { name, index, parent, is_root: parent === index };
	}

	_get_node_by_name(name = "") {
		const index = this.nameToIndex[name];
		return this._get_node_by_index(index);
	}

	/**
	 *
	 * @param {number} index
	 * @param {number} new_parent
	 */
	_update_node(index, new_parent) {
		this.nodes[index] = new_parent;
	}

	_find_root(node_name) {
		try {
			let pointer = this._get_node_by_name(node_name);
			while (!pointer.is_root) {
				pointer = this._get_node_by_index(pointer.parent);
			}

			// Path Compression: All nodes start from starting to root should point to root directly
			let pointer_2 = this._get_node_by_name(node_name);
			while (pointer_2.parent !== pointer.index) {
				console.log(`path compression: ${pointer_2.index} -> ${pointer.index}`);
				this._update_node(pointer_2.index, pointer.index);
				pointer_2 = this._get_node_by_index(pointer.parent);
			}
			return pointer;
		} catch (error) {
			throw new Error(`[${this._find_root.name}] - ${error.message}`);
		}
	}

	union(X, Y) {
		/**
		 * Whenever we call find or _find_root function, paths are compressed
		 */
		try {
			const root_X = this._find_root(X);
			const root_Y = this._find_root(Y);
			if (root_X.name === root_Y.name) return { merged: false };
			this.nodes[root_Y.index] = root_X.index;
			return { merged: true };
		} catch (error) {
			throw new Error(`[union] - ${error.message}`);
		}
	}

	find(X) {
		const r = this._find_root(X);
		return r.name;
	}

	groups() {
		const data = {};
		for (let i = 0; i < this.nodes.length; i++) {
			const node_name = this.indexToName[i];
			const g = this._find_root(node_name);
			const group = g.name;

			if (!data[group]) data[group] = { group: group, nodes: [] };
			data[group].nodes.push(node_name);
		}
		return Object.values(data);
	}

	print(logger, name = "Union Find") {
		const nodes = this.nodes;
		logger.info(`${name} ${nodes.join(" --> ")}`);
	}
}

export const union_find = (nodes = []) => {
	const bh = new UnionFind(nodes);

	return {
		union: bh.union,
		find: bh.find,
		groups: bh.groups,
		print: bh.print,
	};
};
