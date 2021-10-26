/*
Two Sum

Given an array of integers nums and an integer target,
return indices of the two numbers such that they add up to target.
You may assume that each input would have exactly one solution,
and you may not use the same element twice.
You can return the answer in any order.
*/

const two_sum = (nums, target) => {
  const numsMap = {};
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    if (!numsMap[num]) numsMap[num] = [];
    numsMap[num].push(i);
  }
  for (let i = 0; i < nums.length; i++) {
    const indices = numsMap[target - nums[i]];
    if (indices) {
      let j = indices[0];
      if (i === j) j = indices[1];
      if (j && i !== j) return [i, j];
    }
  }
};

const nums = [3, 2, 4];
const target = 6;

console.log(two_sum(nums, target));
