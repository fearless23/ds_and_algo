/**
 * @param {string} s
 * @return {number}
 */
const lengthOfLongestSubstring = function (s) {
  console.log('string-----------', s);
  let largest = '';
  let str = '';
  let map = {};
  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    if (map[char]) {
      if (str.length > largest.length) largest = str;
      // approach 1
      // i = i - str.length;
      // str = '';
      // map = {};

      // approach 2
      let kept_str = '';
      map = {};
      let found = false;
      str.split('').forEach(x => {
        if (found) {
          kept_str += x;
          map[x] = true;
        }
        if (char === x) found = true;
      });
      map[char] = true;
      str = kept_str + char;
    } else {
      map[char] = true;
      str += char;
    }
  }
  if (str.length > largest.length) largest = str;
  return largest;
};
console.log(lengthOfLongestSubstring('abcabcbb'));
