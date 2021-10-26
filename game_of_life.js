/**
 * @param {number[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
const gameOfLife = function (board) {
  const new_board = [];
  for (const row of board) {
    new_board.push([...row]);
  }

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      const live = find_live_neighbours(board, i, j);

      if (board[i][j] === 1) {
        if (live < 2 || live > 3) new_board[i][j] = 0;
      } else {
        if (live === 3) new_board[i][j] = 1;
      }
    }
  }

  console.log(board);
  return new_board;
};

const find_live_neighbours = (board, i, j) => {
  let live = 0;

  for (const [di, dj] of dirs) {
    const ni = i + di;

    const row = board[ni];
    if (row) {
      const nj = j + dj;
      if (row[nj] === 1) live += 1;
    }
    if (live > 3) break;
  }

  return live;
};

const dirs = [
  [-1, 0], // top
  [1, 0], // bottom
  [0, 1], // right
  [0, -1], // left

  [-1, -1], // top left
  [-1, 1], // top right

  [1, -1], // bottom left
  [1, 1], // bottom right
];

const b = [[0, 1, 0], [0, 0, 1], [1, 1, 1], [0, 0, 0]];
const result = gameOfLife(b);
console.log('result ->', result);
