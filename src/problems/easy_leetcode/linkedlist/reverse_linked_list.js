/**
 * Definition for singly-linked list.
*/
function ListNode (val, next) {
  this.val = (val === undefined ? 0 : val);
  this.next = (next === undefined ? null : next);
}

const a = new ListNode(4);
const b = new ListNode(1);
const c = new ListNode(5);
const d = new ListNode(9);
const e = new ListNode(7);
a.next = b;
b.next = c;
c.next = d;
d.next = e;

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
const reverseList = function (head) {
  if (!head) return head;
  head.old = head.next;
  head.next = null;
  let p = head;
  while (p.old) {
    const next = p.old;
    delete p.old;
    next.old = next.next;
    next.next = p;
    p = next;
  }
  delete p.old;
  return p;
};
console.log('4-->1-->5-->9-->7');
const h = reverseList(a);
console.log(JSON.stringify(h), 'LIST');
