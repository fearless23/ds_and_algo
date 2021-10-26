/**
 * Definition for singly-linked list.
*/
function ListNode (val) {
  this.val = val;
  this.next = null;
}

/**
 * @param {ListNode} node
 * @return {void} Do not return anything, modify node in-place instead.
 */
//
const a = new ListNode(4);
const b = new ListNode(5);
const c = new ListNode(1);
const d = new ListNode(9);
a.next = b;
b.next = c;
c.next = d;

const deleteNode = node => {
  let p = node;
  while (p) {
    p.val = p.next.val;
    if (p.next.next === null) p.next = null;
    p = p.next;
  }
};

deleteNode(b);
console.log(JSON.stringify(a));
