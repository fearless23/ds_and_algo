/*
Valid Sudoku

Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules:

Each row must contain the digits 1-9 without repetition.
Each column must contain the digits 1-9 without repetition.
Each of the nine 3 x 3 sub-boxes of the grid must contain the digits 1-9 without repetition.
Note:

A Sudoku board (partially filled) could be valid but is not necessarily solvable.
Only the filled cells need to be validated according to the mentioned rules.

Example 1:

Input: board =
[["5","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]]
Output: true
*/

/**
 * @param {character[][]} board
 * @return {boolean}
 */
const isValidSudoku = function (board) {
  console.log(board, 'board');
  // rows
  for (const row of board) {
    const digits = {};
    for (const digit of row) {
      if (digit !== '.') {
        if (digits[digit]) return false;
        else digits[digit] = true;
      }
    }
    console.log(Object.keys(digits), 'row_digits');
  }

  // columns

  for (let i = 0; i < 9; i++) {
    const digits = {};
    for (let j = 0; j < 9; j++) {
      const digit = board[j][i];
      if (digit !== '.') {
        if (digits[digit]) return false;
        else digits[digit] = true;
      }
    }
    console.log(Object.keys(digits), `${i + 1} column_digits`);
  }

  // 3x3 boxes
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const digits = {};
      for (let x = 3 * i; x < 3 * (i + 1); x++) {
        for (let y = 3 * j; y < 3 * (j + 1); y++) {
          const digit = board[x][y];
          if (digit !== '.') {
            if (digits[digit]) return false;
            else digits[digit] = true;
          }
        }
      }
      console.log(Object.keys(digits), `box_digits ${i + 1}${j + 1}`);
    }
  }

  return true;
};
const board = [
  ['5', '3', '.', '.', '7', '.', '.', '.', '.'],
  ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
  ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
  ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
  ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
  ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
  ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
  ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
  ['.', '.', '.', '.', '8', '.', '.', '7', '9']
];
console.log(isValidSudoku(board));
