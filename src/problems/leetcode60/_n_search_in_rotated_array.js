const split = (arr) => {
  const m = Math.floor(arr.length / 2);
  const l = arr.slice(0, m);
  const r = arr.slice(m);
  return { l, r };
};

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
const search = (nums, target) => {
  console.log('-----------------------');
  console.log(nums, 'nums');
  let f = two_arrays(nums, target);
  console.log(f, 'result');
  console.log('-----------------------');

  while (Array.isArray(f)) {
    console.log(f, 'nums');
    f = two_arrays(f, target);
    console.log(f, 'result');
    console.log('-----------------------');
  }
  return f;
};

const two_arrays = (arr = [], t = 0) => {
  const { l, r } = split(arr);

  if(l.length <= 1) //
  
};

// const nums = [4, 5, 6, 7, 0, 1, 2];
const nums = [4];
const target = 0;
// console.log('FINAL', search(nums, target));
console.log('FINAL', split(nums));
