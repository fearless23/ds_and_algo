/**
 * @param {number[]} nums
 * @return {number}
 */
const lengthOfLIS = function (nums) {
  const end = nums.length - 1;
  const memo = {};

  const run = (start, min) => {
    const key = `${start}_${min}`;
    if (key in memo) return memo[key];

    const len = end - start + 1;
    const num = nums[start];

    if (len === 0) return [];
    if (len === 1) {
      const r = num > min ? [num] : [];
      memo[key] = r;
      return r;
    }

    const include = run(start + 1, Math.max(num, min));
    if (num > min) {
      if (include.length === 0) include.push(num);
      else {
        if (num < include[0]) include.unshift(num);
      }
    }

    const skip = run(start + 1, min); // [2,3]

    const a = include.length;
    const b = skip.length;

    let result;
    if (a > b) result = include;
    else if (a < b) result = skip;
    else {
      // a === b
      // return one with highest first number
      if (a === 0) result = [];
      if (skip[0] < num) result = include;
      else result = skip;
    }
    memo[key] = result;
    return result;
  };
  return run(0, -Infinity).length;
};

const lengthOfLIS_EXPLAINED = function (nums) {
  const end = nums.length - 1;
  const memo = {};

  const run = (start, min) => {
    const key = `${start}_${min}`;
    if (key in memo) return memo[key];

    const len = end - start + 1;
    const num = nums[start];

    if (len === 0) return [];
    if (len === 1) {
      const resu = num > min ? [num] : [];
      console.log(`${nums.slice(start)} -- ${min} --> `, resu);
      memo[key] = resu;
      return resu;
    }

    const include = run(start + 1, Math.max(num, min));
    if (num > min) {
      if (include.length === 0) include.push(num);
      else {
        const f = include[0];
        if (num < f) include.unshift(num);
      }
    }

    const skip = run(start + 1, min); // [2,3]

    const a = include.length;
    const b = skip.length;

    let result;

    if (a > b) result = include;
    else if (a < b) result = skip;
    else {
      // a === b
      // return one with highest first number
      if (a === 0) return [];
      if (skip[0] < num) result = include;
      else result = skip;
    }

    console.log(`${nums.slice(start)} -- ${min} --> `, result);
    memo[key] = result;
    return result;
  };
  const x = run(0, -Infinity);
  console.log('final --> ', x);
  return x.length;
};

const arr = [10, 9, 2, 5, 3, 7, 101, 18];
// const result = lengthOfLIS(arr);
const result = lengthOfLIS_EXPLAINED(arr);
console.log('result --> ', result);
// [10, ++ longest] or [9,2,5,3,7,101,18]
