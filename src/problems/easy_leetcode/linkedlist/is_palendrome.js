/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
const isPalindrome = function (head) {
  let p = head;
  const chars = [];
  while (p) {
    chars.push(p.val);
    p = p.next;
  }

  for (let i = 0; i < Math.floor(chars.length / 2); i++) {
    if (chars[i] !== chars[chars.length - 1 - i]) return false;
  }
  return true;
  // Time: O(1.5*n), Memory: O(n)
};
