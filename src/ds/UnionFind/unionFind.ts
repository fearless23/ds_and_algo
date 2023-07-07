import { logger } from "../../lib/logger.js";
import type { DSParams } from "../types.js";
import { insertInMermaidGraph, mermaidPointer } from "../utils.js";

type Node<T> = { data: T; parentIdx: number };
export type UnionFindParams<T> = DSParams<T> & {
	nodes: T[];
};

export class UnionFind<T> {
	nodes: Node<T>[] = [];
	#nodeToString: UnionFindParams<T>["nodeToString"];
	constructor(params: UnionFindParams<T>) {
		this.#nodeToString = params.nodeToString;
		this.nodes = params.nodes.map((data, index) => ({ data, parentIdx: index }));
	}

	#getNode(i: number) {
		if (i < 0 || i >= this.nodes.length) {
			throw new Error("index out of bounds");
		}
		const node = this.nodes[i] as Node<T>;
		return node;
	}

	#getParent(i: number): Node<T> {
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
			groups[key]?.nodes.push(this.#nodeToString(node.data));
		}
		return Object.values(groups);
	}

	#immediateGroups() {
		const groups: { [key: string]: { parent: string; nodes: string[] } } = {};
		for (let i = 0; i < this.nodes.length; i++) {
			const node = this.#getNode(i);
			const key = this.nodes[node.parentIdx]?.data as string;
			if (!(key in groups)) groups[key] = { parent: key, nodes: [] };
			groups[key]?.nodes.push(this.#nodeToString(node.data));
		}
		return Object.values(groups);
	}

	print(type: "groups" | "immediate" = "groups") {
		const data = type === "groups" ? this.#groups() : this.#immediateGroups();
		const content = data.map((i) => `[${i.nodes.join(", ")}] --> ${i.parent}`);
		logger.info(`UNION_FIND: \n${content.join("\n")}\n`);
	}

	printGraph(type: "groups" | "immediate" = "groups") {
		const data = type === "groups" ? this.#groups() : this.#immediateGroups();

		let text = "";
		for (const { nodes, parent } of data) {
			for (const node of nodes) {
				text += `${mermaidPointer(node, parent)}\n`;
			}
		}
		const graph = insertInMermaidGraph(text);
		logger.info(`UNION_FIND: \n${graph}\n`);
	}
}

export const unionFindString = (nodes: string[]) => {
	return new UnionFind<string>({
		nodeToString: (i) => i,
		nodes,
	});
};
