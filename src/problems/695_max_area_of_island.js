/**
 * @param {number[][]} grid
 * @return {number}
 */
const maxAreaOfIsland = function (grid) {
  const max_row = grid.length - 1; // max row index
  const max_col = grid[0].length - 1;
  const run = explore(grid, max_row, max_col);
  let max_area = 0;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === 1) {
        // explore than island
        const area = run(i, j);
        if (area > max_area) max_area = area;
      }
    }
  }

  return max_area;
};

const explore = (grid, max_row, max_col) => {
  const run = (i, j) => {
    if (i < 0 || i > max_row) return 0;
    if (j < 0 || j > max_col) return 0;
    if (grid[i][j] !== 1) return 0;

    grid[i][j] = 'V';
    return 1 + run(i - 1, j) + run(i, j + 1) + run(i + 1, j) + run(i, j - 1);
  };
  return run;
};

const g = [[1, 1, 0, 0, 0], [1, 1, 0, 0, 0], [0, 0, 0, 1, 1], [0, 0, 0, 1, 1]];
// const g = [[0, 1], [1, 1]];
const result = maxAreaOfIsland(g);
console.log('result --> ', result);
