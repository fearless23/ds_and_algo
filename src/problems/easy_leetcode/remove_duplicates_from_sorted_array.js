// Remove Duplicates from Sorted Array
/*
Given an integer array nums sorted in non-decreasing order,
remove the duplicates in-place such that each unique element
appears only once. The relative order of the elements should be kept the same.
Since it is impossible to change the length of the array in some languages,
you must instead have the result be placed in the first part of the array nums.
More formally, if there are k elements after removing the duplicates,
then the first k elements of nums should hold the final result.
It does not matter what you leave beyond the first k elements.
Return k after placing the final result in the first k slots of nums.
Do not allocate extra space for another array.
You must do this by modifying the input array in-place with O(1) extra memory.
*/

const arr = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];

const removeDuplicates = (nums = []) => {
  let last_modified_index = -1;
  for (const num of nums) {
    if (num !== nums[last_modified_index]) {
      last_modified_index += 1;
      nums[last_modified_index] = num;
    }
  }
  for (let i = last_modified_index + 1; i < arr.length; i++) {
    arr[i] = '-';
  }
  console.log(nums);
};
removeDuplicates(arr);
