/**
 * @param {number[]} nums
 * @param {number} target
 * @return {boolean}
 */
const search = function (nums, target) {
  const len = nums.length;
  if (len === 0) return -1;
  if (len === 1) return nums[0] === target;
  return exec(nums, target);
};

const exec = (nums, target) => {
  const xxx = (start, end) => {
    if (start >= end) return nums[start] === target;

    const len = end - start + 1;
    const middle_index = start + Math.floor(len / 2);
    const middle = nums[middle_index];
    console.log(`middle - ${middle}, start:${start}, end:${end}`);

    if (target === middle) return true;

    const le = middle_index - 1;
    const rs = middle_index + 1;

    if (middle >= nums[0]) {
      // left sorted array, right is unknown
      if (target > middle || target < nums[start]) return xxx(rs, end);
      else return xxx(start, le);
    } else {
      // right sorted array, left is unknown
      if (target < middle || target > nums[end]) return xxx(start, le);
      else return xxx(rs, end);
    }
  };
  return xxx(0, nums.length - 1);
};

const nums = [1, 0, 1, 1, 1];
const target = 0;
const result = search(nums, target);
console.log('result --> ', result);
