/*
Contains Duplicate

Given an integer array nums, return true if any value appears at least twice in the array,
and return false if every element is distinct.

Example 1:

Input: nums = [1,2,3,1]
Output: true
Example 2:

Input: nums = [1,2,3,4]
Output: false
*/

/**
 * @param {number[]} nums
 * @return {boolean}
 */
const containsDuplicate = (nums) => {
  const occurences = {};
  for (const num of nums) {
    if (!occurences[num]) occurences[num] = 1;
    else return true;
  }
  return false;
};

console.log(containsDuplicate([1, 2, 1, 1, 1, 1, 1, 1, 1]));
