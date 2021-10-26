/*
Rotate Image

You are given an n x n 2D matrix representing an image,
rotate the image by 90 degrees (clockwise).
You have to rotate the image in-place, which means you have to modify the input 2D matrix directly.
DO NOT allocate another 2D matrix and do the rotation.

Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
Output: [[7,4,1],[8,5,2],[9,6,3]]
*/

/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
const rotate = (matrix) => {
  const n = matrix.length;

  let size = n;
  let diagonal = 0;
  while (size > 1) {
    for (let x = diagonal; x < diagonal + size - 1; x++) {
      let i = diagonal;
      let j = x;
      let num = matrix[i][j];
      let swaps = 0;
      while (swaps < 4) {
        const tmp = i;
        i = j;
        j = n - tmp - 1;
        const next_num = matrix[i][j];
        matrix[i][j] = num;
        // console.log(`SWAP: ${num} --> ${next_num}`);
        num = next_num;
        swaps += 1;
      }
    }
    size -= 2;
    diagonal += 1;
  }
};

const matrix = [[5, 1, 9, 11], [2, 4, 8, 10], [13, 3, 6, 7], [15, 14, 12, 16]];

rotate(matrix);
// console.log(matrix);
