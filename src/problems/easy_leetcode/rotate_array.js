/*
Rotate Array

Solution
Given an array, rotate the array to the right by k steps, where k is non-negative.

Input: nums = [1,2,3,4,5,6,7], k = 3
Output: [5,6,7,1,2,3,4]
*/

const nums = [1, 2, 3, 4, 5, 6, 7]; // k=3
// const nums = [-1, -100, 3, 99]; // k = 2
// const nums = [1, 2]; // k = 1

const rotateArray = (nums = [], k = 1) => {
  let shuffles = 0;
  let num_to_move = nums[0];

  let loop_start_index = 0;
  let i = 0;

  while (shuffles <= nums.length) {
    const j = (i + k) % nums.length;
    const tmp = nums[j];
    nums[j] = num_to_move;
    i = j;
    shuffles += 1;
    num_to_move = tmp;
    console.log(i, loop_start_index);
    if (i === loop_start_index && shuffles < nums.length) {
      loop_start_index++;
      i = loop_start_index;
      num_to_move = nums[loop_start_index];
    }
  }
};

rotateArray(nums, 3);
console.log(nums);

/*
LENGTH: 10
K=1 --> 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
K=2 --> 1,3,5,7,9; 2,4,6,8,10
K=3 --> 1, 4, 7, 10, 3, 6, 9, 2, 5, 8;
K=4 --> 1,5,9,3,7;; 2,6,10,4,8
K=5 --> 1,6; 2,7; 3,8; 4,9; 5,10;
K=6 --> 1,7,3,9,5; 2,8,4,10,6
K=7 --> 1,8,5,2,9,6,3,10,7,4
*/
