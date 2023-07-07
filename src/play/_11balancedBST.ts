import {
	balancedBstWithNodeNumber as bbstNumber,
	balancedBstWithNodeString as bbstString,
} from "../ds/BalancedBinarySearchTree/index.js";

export const BBST = {
	BBST1: () => {
		const a = bbstNumber(false);
		a.insertValues([1, 2, 3, 4, 5, 6]);
		a.print();
		a.balanceRoot("left");
		a.print();
		a.balanceRoot("left");
		a.print();
	},
	BBST2: () => {
		const a = bbstString(false);
		a.insertValues([
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
		]);

		a.print();
		a.balanceRoot("right");
		a.print();
	},
	BBST: () => {
		const a = bbstString(false);
		a.insertValues([
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
		]);
		a.printGraph();
		a.balanceRoot("right");
		a.printGraph();
	},
};
