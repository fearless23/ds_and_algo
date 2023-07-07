import { logger } from "src/lib/logger.js";
import {
	balancedBstWithNodeNumber as bbstNumber,
	balancedBstWithNodeString as bbstString,
} from "../ds/BalancedBinarySearchTree/index.js";

const _NODES = [
	{
		data: "A",
		value: 4,
	},
	{
		data: "B",
		value: 2,
	},
	{
		data: "C",
		value: 5,
	},
	{
		data: "D",
		value: 1,
	},
	{
		data: "E",
		value: 3,
	},
];

export const BBST = {
	BBST1: () => {
		const a = bbstNumber(false);
		a.insertValues([1, 2, 3, 4, 5, 6]);
		a.print();
		a.balance();
		a.print();
	},
	BBST2: () => {
		const a = bbstString(false);
		a.insertValues(_NODES);
		a.print();
		a.balance();
		a.print();
	},
	BBST3: () => {
		const a = bbstString(false);
		a.insertValues(_NODES);
		a.printGraph();
		a.balance();
		a.printGraph();
	},
	AVL_TREE: () => {
		const a = bbstNumber(false);

		// Start
		a.insertValues([5, 3, 100, 2, 4, 3.5, 4.5]);
		logger.debug(a.balanceFactor);
		a.printGraph();

		// Balance
		a.balanceOnce();
		logger.debug(a.balanceFactor);
		a.printGraph();
	},
};
