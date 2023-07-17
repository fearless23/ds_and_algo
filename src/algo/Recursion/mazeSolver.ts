/*
Given a maze of rows(r) & columns(c), there is a start and end points,
Your are given walls(#) and walking path(O), find a path and return it

Maze = [
  "########O#",
  "########O#",
  "########O#",
  "########O#",
  "########O#",
  "########O#",
  "#OOOOOOOO#",
  "#O########",
]
c=10, r=8
start: 8,0
end: 1,7
Output should be [
  [8,0],
  [8,1],
  [8,2],
  [8,3],
  [8,4],
  [8,5],
  [8,6],
  [7,6],
  [6,6],
  [5,6],
  [4,6],
  [3,6],
  [2,6],
  [1,6],
  [1,7],
]
// Note: you always start at a valid point inside maze.
*/

// import { randomUUID } from "crypto";

// const WALK = "O";
const WALL = "#";
type Maze = string[];
type Point = { x: number; y: number };
const DIR = [
	[0, -1], // up
	[1, 0], // right
	[0, 1], // down
	[-1, 0], // left
] as const;

export const mazeSolverReadable = (maze: Maze, start: Point, end: Point) => {
	const columns = maze[0]?.length as number;
	const rows = maze.length;
	const seen: boolean[][] = [];
	for (let i = 0; i < rows; i++) {
		seen.push(new Array(columns).fill(false));
	}

	const setSeen = (p: Point) => {
		(seen[p.y] as boolean[])[p.x] = true;
	};
	// Note: We can move in 4 directions from a given point, check if we can land at this new point called p
	const isValidPoint = (p: Point) => {
		if (p.x < 0 || p.y < 0 || p.x >= columns || p.y >= rows) return false; // out of bounds
		if ((maze[p.y] as string)[p.x] === WALL) return false; // wall
		return true;
	};
	const isSeen = (p: Point) => (seen[p.y] as boolean[])[p.x] === true;
	const isEnd = (p: Point) => p.y === end.y && p.x === end.x;

	const findValidDirections = (curr: Point) => {
		// If we are at a current point `c`, in which directions we can move
		const newPoints: Point[] = [];
		let foundEnd = false;
		for (const dir of DIR) {
			const newPoint = { x: curr.x + dir[0], y: curr.y + dir[1] };
			if (isValidPoint(newPoint)) {
				if (!isSeen(newPoint)) {
					newPoints.push(newPoint);
					if (isEnd(newPoint)) {
						foundEnd = true;
						break;
					}
				}
			}
		}
		return { foundEnd, newPoints };
	};

	const findPath = (curr: Point, path: Point[]): Point[] | null => {
		setSeen(curr);
		const { foundEnd, newPoints } = findValidDirections(curr);
		if (foundEnd) {
			path.push(end);
			return path;
		}
		for (const point of newPoints) {
			setSeen(point);
			const pathForNext = [...path, point];
			const newPath = findPath(point, pathForNext);
			if (newPath == null) continue; // we can push and pop to avoid copying
			return newPath;
		}
		return null;
	};

	return findPath(start, [start]);
};

// minified version
export const mazeSolver = (maze: Maze, start: Point, end: Point) => {
	const seen: boolean[][] = [];
	for (let i = 0; i < maze.length; i++) {
		seen.push(new Array(maze[0]?.length).fill(false));
	}
	const setSeen = (p: Point) => {
		(seen[p.y] as boolean[])[p.x] = true;
	};
	const isOk = (p: Point) => {
		// @ts-ignore
		if (p.x < 0 || p.y < 0 || p.x >= maze[0]?.length || p.y >= maze.length) return false;
		// @ts-ignore
		if (maze[p.y][p.x] === WALL) return false;
		// @ts-ignore
		if (seen[p.y][p.x] === true) return false;
		return true;
	};
	const isEnd = (p: Point) => p.y === end.y && p.x === end.x;

	const findPath = (curr: Point, path: Point[]): Point[] | null => {
		setSeen(curr);
		for (const dir of DIR) {
			const next = { x: curr.x + dir[0], y: curr.y + dir[1] };
			if (!isOk(next)) continue;
			setSeen(next);
			path.push(next);
			if (isEnd(next)) return path;
			const newPath = findPath(next, path);
			if (newPath != null) return newPath;
			path.pop();
		}
		return null;
	};

	return findPath(start, [start]);
};
