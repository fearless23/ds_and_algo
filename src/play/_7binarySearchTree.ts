import type { OrderType } from "../ds/types.js";
import { bstWithArray, bstWithNodeNumber } from "../ds/BinarySearchTree/index.js";

const orders: OrderType[] = ["PRE_ORDER", "IN_ORDER", "POST_ORDER", "LEVEL_ORDER"];

const advanced = () => {
	const baseBST = bstWithNodeNumber();
	baseBST.insertValues([
		90, 1, 1200, 7, 20, 33, 2, 25, 6, 100, 3, 4, 890, 817, 86, 1987, 5, 15, 10, 4,
	]);
	const parentOrders: { [key: string]: string } = {};
	const childOrders: { [key2: string]: string } = {};
	for (const type of orders) {
		const order = baseBST.getOrder(type);
		const newBST = bstWithNodeNumber();
		newBST.insertValues(order);
		const orderString = order.join(",");
		// @ts-ignore
		parentOrders[type] = orderString;
		orders.forEach((i) => {
			childOrders[`${type.padEnd(11, " ")}:${i.padStart(11, " ")}`] = newBST.getOrder(i).join(",");
		});
	}

	const matches: string[] = [];
	// const notMatches: string[] = [];
	Object.entries(parentOrders).map(([parent, a]) => {
		Object.entries(childOrders).map(([child, b]) => {
			if (a === b) matches.push(`${parent.padEnd(11, " ")} --> ${child}`);
			// else notMatches.push(`${parent}--> ${child}`);
		});
	});
	console.log(`--- MATCHES (${matches.length}) ---
${matches.join("\n")}
`);
	// console.log("NOT MATCHES-->\n", notMatches.join("\n"));
};

export const TREE = {
	BST_WITH_ARRAY: () => {
		const bst = bstWithArray();
		bst.insertValues([1, 2, 3, 4, 5, 6]);
		bst.print();
	},
	BINARY_SEARCH_TREE_SAMPLE: () => {
		// This is to show efficiency over bstWithArray
		const bst = bstWithNodeNumber();
		bst.insertValues([1, 2, 3, 4, 5, 6]);
		bst.print();
	},
	BINARY_SEARCH_TREE: () => {
		const bst = bstWithNodeNumber();
		bst.insertValues([7, 20, 5, 15, 10, 4, 33, 2, 25, 6]);
		bst.printOrder("PRE_ORDER");
		bst.printOrder("IN_ORDER");
		bst.printOrder("POST_ORDER");
		bst.printOrder("LEVEL_ORDER");
	},
	BST_ADVANCED: () => {
		advanced();
	},
	EXPERIMENT: () => {
		const bst = bstWithNodeNumber();
		bst.insertValues([7, 2, 9, 0, 3]);
		bst.printOrder("PRE_ORDER");
		bst.printOrder("IN_ORDER");
		bst.printOrder("POST_ORDER");
		bst.printOrder("LEVEL_ORDER");
	},
};
