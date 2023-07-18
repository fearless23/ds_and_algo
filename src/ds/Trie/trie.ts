import { randomUUID } from "crypto";
import { logger } from "../../lib/logger.js";
import { drawMermaidGraphTrie } from "../utils.js";

const a = "a".charCodeAt(0);
const getIndex = (char: string) => char.charCodeAt(0) - a;

export class Node {
	children: Node[] = [];
	isWord?: boolean;
	// id is for printing only
	constructor(public data: string, public id: string) {}
}
const createNode = (data: string) => new Node(data, randomUUID().slice(0, 5));

export class Trie {
	root = createNode("ROOT");

	#findChar(parent: Node, char: string) {
		const idx = getIndex(char);
		const node = parent.children[idx];
		return { node, idx };
	}

	#findAt(parent: Node, idx: number) {
		const node = parent.children[idx];
		return { node, idx };
	}

	#addChar(parent: Node, char: string) {
		const node = createNode(char);
		const idx = getIndex(char);
		parent.children[idx] = node;
		return { idx, node };
	}

	#addCharAtIdx(parent: Node, char: string, idx: number) {
		const node = createNode(char);
		parent.children[idx] = node;
		return { idx, node };
	}

	insertWord(word: string) {
		if (word === "") return;
		let parent: Node = this.root;
		for (const char of word) {
			const { node: child, idx } = this.#findChar(parent, char);
			if (child) {
				parent = child;
			} else {
				const { node: child } = this.#addCharAtIdx(parent, char, idx);
				parent = child;
			}
		}
		parent.isWord = true;
	}

	print() {
		logger.info(JSON.stringify(this.root, null, 4));
	}

	printGraph() {
		logger.info(drawMermaidGraphTrie(this.root));
	}
}

export const trie = () => new Trie();
