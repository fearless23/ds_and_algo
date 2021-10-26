/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

function ListNode (val, next) {
  this.val = (val === undefined ? 0 : val);
  this.next = (next === undefined ? null : next);
}

const a1 = new ListNode(9);
const b1 = new ListNode(9);
const c1 = new ListNode(9);
const d1 = new ListNode(9);
const e1 = new ListNode(9);
const f1 = new ListNode(9);
const g1 = new ListNode(9);
a1.next = b1;
b1.next = c1;
c1.next = d1;
d1.next = e1;
e1.next = f1;
f1.next = g1;

const a2 = new ListNode(9);
const b2 = new ListNode(9);
const c2 = new ListNode(9);
const d2 = new ListNode(9);
a2.next = b2;
b2.next = c2;
c2.next = d2;

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
const addTwoNumbers = function (l1, l2) {
  let l1p = l1;
  let l2p = l2;
  let carry = 0;
  let last_modified;
  // modifying l1
  while (l1p || l2p) {
    let sum = carry;
    if (l1p) sum += l1p.val;
    if (l2p) sum += l2p.val;

    carry = Math.floor(sum / 10);
    const val = sum - (carry * 10);
    if (l1p) {
      l1p.val = val;
      last_modified = 'L1';
    }
    if (l2p) {
      l2p.val = val;
      last_modified = 'L2';
    }

    if (l1p) l1p = l1p.next;
    if (l2p) l2p = l2p.next;
  }
  return last_modified === 'L2' ? l2 : l1;
};

const x = addTwoNumbers(a1, a2);
console.log(JSON.stringify(x), 'LIST');
