/**
 * @param {number[]} nums
 * @return {number}
 */
const rob = function (nums) {
  if (!nums) return 0;
  if (nums.length < 4) return Math.max(...nums);

  const rob_house = rob_next(nums);

  const x = { sum: nums[0], start: 2, end: nums.length - 2, ids: [0] };
  const y = { sum: 0, start: 1, end: nums.length, ids: [] };

  let so_far = [x, y];

  let max = 0;
  let ids;

  while (so_far.length) {
    const new_starts = [];
    so_far.forEach(obj => {
      // console.log('----------------------------');
      // console.log('obj -->', JSON.stringify(obj, null, 2));
      const results = rob_house(obj);
      if (results.ended) {
        if (results.sum > max) {
          max = results.sum;
          ids = results.ids;
        }
      } else {
        results.forEach(result => {
          new_starts.push(result);
        });
      }
      // console.log('obj result -->', JSON.stringify(new_objects, null, 2));
      // console.log('----------------------------');
    });
    so_far = new_starts;
  }
  console.log('ids', ids);
  return max;
};

const rob_next = (nums) => ({ sum, start, end, ids }) => {
  if (start > end) {
    return { sum, ids, ended: true };
  }

  const a = { sum: sum + nums[start], start: start + 2, end, ids: [...ids, start] };
  const b = { sum, start: start + 1, end, ids };

  return [a, b];
};

/**
 * use max_arc
 * @param {number[]} nums
 * @return {number}
 */
const rob2 = function (nums) {
  const len = nums.length;
  if (len < 4) return Math.max(...nums);

  // recursive method
  const max_arc = (start, end) => {
    if (start === end) return nums[end];
    if (start > end) return 0;
    // pick start
    const a = nums[start] + max_arc(start + 2, end);
    const b = max_arc(start + 1, end);
    return Math.max(a, b);
  };

  const sum1 = nums[0] + max_arc(2, len - 2);
  const sum2 = max_arc(1, len - 1);
  return Math.max(sum1, sum2);
};

// fastest --> dynamic programming
const rob3 = function (nums) {
  if (nums.length <= 3) return Math.max(...nums);
  const r = robHelper(nums);
  const money1 = r(0, nums.length - 2); // pick first house, leave last
  const money2 = r(1, nums.length - 1); // leave last house, pick last
  return Math.max(money1, money2);
  // T.C: O(N)
  // S.C: O(N)
};

/*
dp[i] is the max amount of money that can be robbed without alerting the police at house i

dp[i] = max(dp[i-1], dp[i-2] + nums[i])
because if we rob the previous house, we can't rob the current house, but, else,
we can rob the current house and still take the money robbed until the previous, previous house
*/
const robHelper = (nums) => (start, end) => {
  // houses: 1,2,3,4,5
  // max robbed in 5 house, let max = m5
  // if there were 4 houses, let max = m4
  // if we add 6th house, find m6
  // sum1 = (m4 + 6th house) (if we loot house 6, we cant loot house 5,so m4 is used)
  // sum2 = m5
  // max = max(sum1, sum2_
  // mi = max ( (m_i-2 + ith house ), m_i-1)
  // NOTE: start and end both can be chosen
  // start = 3, end = 5; l = 3
  const len = end - start + 1;
  const max = [];
  for (let i = 0; i < len; i++) {
    const mi_1 = max[i - 1] || 0;
    const mi_2 = max[i - 2] || 0;
    max[i] = Math.max(mi_1, mi_2 + nums[i + start]);
  }
  return max[len - 1];
};

const money = [2, 7, 9, 3, 1];
const result = rob3(money);
console.log('max -->', result);
