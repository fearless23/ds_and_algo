/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
const wordBreak = function (s, wordDict) {
  let str = s;
  for (let i = 0; i < wordDict.length; i++) {
    const x = find_a_word(str, wordDict[i]);
    str = x.str;
    if (str === '') return true;
  }
  return str.length === 0;
};

const find_and_remove = (s, word) => {
  const i = s.indexOf(word);
  if (i === -1) return { found: false, str: s };
  else {
    const str = s.slice(0, i) + s.slice(i + word.length);
    return { found: true, str };
  }
};

const find_a_word = (s, word) => {
  console.log('word: ', word);
  const r = find_and_remove(s, word);
  let count = 0;
  let str = r.str;
  let found = r.found;
  while (found) {
    count += 1;
    const x = find_and_remove(str, word);
    str = x.str;
    found = x.found;
  }
  console.log(`${s} --> ${str}`);
  console.log('______________________________');
  return { count, str };
};

// const str = 'leetcode';
// const dict = ['leet', 'code'];

const str = 'bb';
const dict = ['a', 'b', 'bbb', 'bbbb'];
const result = wordBreak(str, dict);
console.log('result --> ', result);
