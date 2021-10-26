/*
Find the element that appears once in an array where every other element appears twice

Given an array of integers. All numbers occur twice except one number which occurs once.
Find the number in O(n) time & constant extra space.
*/

/**
 * @param {number[]} nums
 * @return {number}
 */
const singleNumber_1 = (nums) => {
  const count = {};
  for (const num of nums) {
    if (!count[num]) count[num] = 1;
    else delete count[num];
  }
  return Object.keys(count)[0];
};

console.log(singleNumber_1([7, 3, 5, 4, 5, 3, 4]));

/**
 * no extra memory used
 * @param {number[]} nums
 * @return {number}
 */
const singleNumber_2 = (nums) => {
  console.log(nums, 'nums');
  let res = nums[0];
  for (let i = 1; i < nums.length; i++) {
    console.log(res, 'res');
    res = res ^ nums[i];
  }
  return res;
};

/*
res = 7 ^ 3 ^ 5 ^ 4 ^ 5 ^ 3 ^ 4

Since XOR is associative and commutative, above
expression can be written as:
res = 7 ^ (3 ^ 3) ^ (4 ^ 4) ^ (5 ^ 5)
    = 7 ^ 0 ^ 0 ^ 0
    = 7 ^ 0
    = 7
*/

console.log(singleNumber_2([7, 3, 5, 4, 5, 3, 4]));
