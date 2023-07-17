import { mazeSolver } from "../algo/Recursion/mazeSolver.js";

const maze = [
	"########O#",
	"########O#",
	"OOOOOOOOO#",
	"O#######O#",
	"O#######O#",
	"O#######O#",
	"OO#OOOOOO#",
	"#O########",
];
const start = { x: 8, y: 0 };
const end = { x: 1, y: 7 };

export const Recursion = {
	mazeSolver: () => {
		const path = mazeSolver(maze, start, end);
		console.log("path", path);
	},
};
