/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * Definition for singly-linked list.
*/
function ListNode (val, next) {
  this.val = (val === undefined ? 0 : val);
  this.next = (next === undefined ? null : next);
}

const a1 = new ListNode(1);
const b1 = new ListNode(2);
const c1 = new ListNode(4);
a1.next = b1;
b1.next = c1;

const a2 = new ListNode(1);
const b2 = new ListNode(3);
const c2 = new ListNode(4);
a2.next = b2;
b2.next = c2;

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
const mergeTwoLists = function (l1, l2) {
  let l1p = l1;
  let l2p = l2;
  let final_head = null;
  let pointer = null;
  while (l1p || l2p) {
    let next;
    let type = 'L1';
    if (!l1p) {
      next = l2p;
      type = 'L2';
    } else if (!l2p) {
      next = l1p;
      type = 'L1';
    } else {
      if (l1p.val <= l2p.val) {
        next = l1p;
        type = 'L1';
      } else {
        next = l2p;
        type = 'L2';
      }
    }
    if (type === 'L1') l1p = l1p.next;
    if (type === 'L2') l2p = l2p.next;

    if (!pointer) {
      final_head = next;
      pointer = next;
    } else {
      pointer.next = next;
      pointer = next;
    }
  }
  console.log(JSON.stringify(final_head), 'MERGED');
  return final_head;
};

mergeTwoLists(a1, a2);
