import { logger } from "src/lib/logger.js";

type Data = { data: string; parentIdx: number };

class UnionFind {
	nodes: Data[] = [];
	constructor(nodes: string[]) {
		this.nodes = nodes.map((data, index) => ({ data, parentIdx: index }));
	}

	#getNode(i: number) {
		if (i < 0 || i >= this.nodes.length) {
			throw new Error("index out of bounds");
		}
		const node = this.nodes[i] as Data;
		return node;
	}

	#getParent(i: number): Data {
		const node = this.#getNode(i);
		if (node.parentIdx === i) return node;
		else return this.#getParent(node.parentIdx);
	}

	#compressPath(i: number, newParentIdx: number) {
		// all nodes encountered till parent should point to parent
		const node = this.#getNode(i);
		const oldParentIdx = node.parentIdx;
		if (oldParentIdx !== newParentIdx) {
			node.parentIdx = newParentIdx;
			this.#compressPath(oldParentIdx, newParentIdx);
		}
	}

	union(i: number, j: number) {
		const a = this.#getParent(i);
		const b = this.#getParent(j);
		b.parentIdx = a.parentIdx;
	}

	find(i: number) {
		const r = this.#getParent(i);
		this.#compressPath(i, r.parentIdx);
		return r.data;
	}

	#groups() {
		const groups: { [key: string]: { parent: string; nodes: string[] } } = {};
		for (let i = 0; i < this.nodes.length; i++) {
			const node = this.#getNode(i);
			const parent = this.#getParent(i);
			const key = String(parent.data);
			if (!(key in groups)) groups[key] = { parent: key, nodes: [] };
			groups[key]?.nodes.push(node.data);
		}
		return Object.values(groups);
	}

	#immediateGroups() {
		const groups: { [key: string]: { parent: string; nodes: string[] } } = {};
		for (let i = 0; i < this.nodes.length; i++) {
			const node = this.#getNode(i);
			const key = this.nodes[node.parentIdx]?.data as string;
			if (!(key in groups)) groups[key] = { parent: key, nodes: [] };
			groups[key]?.nodes.push(node.data);
		}
		return Object.values(groups);
	}

	print(type: "groups" | "immediate" = "groups") {
		const data = type === "groups" ? this.#groups() : this.#immediateGroups();
		const content = data.map((i) => `[${i.nodes.join(", ")}] --> ${i.parent}`);
		logger.info(`UNION_FIND: \n${content.join("\n")}\n`);
	}
}

export const unionFind = (nodes: string[] = []) => {
	const bh = new UnionFind(nodes);
	return bh;
};
