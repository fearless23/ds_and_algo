const say = (n = '') => {
  const digits = n.split('');
  let group = { count: 0, number: digits[0] };
  let str = '';
  digits.forEach(i => {
    if (group.number !== i) {
      str += `${group.count}${group.number}`;
      group = { count: 0, number: i };
    }
    group.count += 1;
  });
  str += `${group.count}${group.number}`;
  return str;
};

/**
 * @param {number} n
 * @return {string}
 */
const countAndSay = function (n) {
  if (n < 1) return '0';

  let output = '1';
  for (let i = 1; i < n; i++) {
    console.log(output, 'output', i);
    output = say(output);
  }
  return output;
};

console.log(countAndSay(4));
