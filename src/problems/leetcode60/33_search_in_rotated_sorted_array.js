/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
const search = function (nums, target) {
  const len = nums.length;
  if (len === 0) return -1;
  if (len === 1) return nums[0] === target ? 0 : -1;
  return exec(nums, target);
};

const exec = (nums, target) => {
  const xxx = (start, end) => {
    if (start === end) return nums[start] === target ? start : -1;
    if (start > end) return -1;

    const len = end - start + 1;
    const middle_index = start + Math.floor(len / 2);
    const middle = nums[middle_index];

    if (target === middle) return middle_index;

    const le = middle_index - 1;
    const rs = middle_index + 1;

    if (middle > nums[start]) {
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

const nums = [4, 5, 6, 7, 0, 1, 2];
const target = 0;
const result = search(nums, target);
console.log('result --> ', result);
