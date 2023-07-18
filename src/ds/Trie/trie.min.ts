const a = "a".charCodeAt(0);

export class Node {
	children: Node[] = [];
	isWord?: boolean;
	constructor(public data: string) {}
}

// minified version
class Trie {
	root = new Node("ROOT");

	insertWord(word: string) {
		if (word === "") return;
		let curr: Node = this.root;
		for (const char of word) {
			const idx = char.charCodeAt(0) - a;
			let child = curr.children[idx];
			if (!child) {
				child = new Node(char);
				curr.children[idx] = child;
			}
			curr = child;
		}
		curr.isWord = true;
	}
}

export const trie = () => new Trie();
