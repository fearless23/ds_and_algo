/**
 * @param {string[]} strs
 * @return {string}
 */
const longestCommonPrefix = function (strs) {
  let prefix = '';
  const min_length = Math.min(...strs.map(str => str.length));
  for (let i = 0; i < min_length; i++) {
    const char = strs[0][i];
    const all_equal = strs.filter(str => str[i] === char).length === strs.length;
    if (all_equal) prefix += char;
    else break;
  }
  return prefix;
};

console.log(longestCommonPrefix(['flower', 'flow', 'flight']));
