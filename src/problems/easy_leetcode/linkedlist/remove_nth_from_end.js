
/**
 * Definition for singly-linked list.
*/
function ListNode (val, next) {
  this.val = (val === undefined ? 0 : val);
  this.next = (next === undefined ? null : next);
}

const a = new ListNode(4);
const b = new ListNode(5);
const c = new ListNode(1);
const d = new ListNode(9);
a.next = b;
b.next = c;
c.next = d;

/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
const removeNthFromEnd = function (head, n) {
  let p1 = head;
  let p2 = null;
  let movements = 0;
  while (p1.next) {
    p1 = p1.next;
    movements += 1;
    if (movements >= n) {
      if (p2 === null) p2 = head;
      else p2 = p2.next;
    }
  }
  if (!p2) return head.next;
  else p2.next = p2.next.next;
  return head;
};

removeNthFromEnd(a, 4);
console.log(JSON.stringify(a), 'LIST');
