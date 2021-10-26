/**
 * @param {number[]} nums
 * @return {number}
 */
const findMin = function (nums) {
  const min = (i, e) => {
    const len = e - i + 1;
    if (len === 1) return nums[i];
    if (len === 2) return Math.min(nums[i], nums[e]);
    const m = i + Math.floor(len / 2);
    const mid = nums[m];
    const left = nums[i];
    const right = nums[e];

    if (mid > left) return (left > right) ? min(m, e) : left;
    else return min(i, m);
  };
  return min(0, nums.length - 1);
};

const nums = [4, 5, 6, 7, -1, 0, 1, 2];
const result = findMin(nums);
console.log('result --> ', result);
