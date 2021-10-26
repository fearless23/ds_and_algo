/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
const wordBreak = function (s, wordDict, memo = {}) {
  console.log(s, JSON.stringify(memo));
  if (s in memo) return memo[s];
  if (s === '') return true;

  for (const word of wordDict) {
    if (s.indexOf(word) === 0) {
      const there = wordBreak(s.slice(word.length), wordDict, memo);
      if (there) {
        memo[s] = true;
        return true;
      }
    }
  }
  memo[s] = false;
  return false;
};

wordBreak('leetcode', ['leet', 'code']);
