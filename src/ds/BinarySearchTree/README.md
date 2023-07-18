# Binary Search Tree
BST is a some variation of a binary tree, where for a given node, left value is smaller and right value is larger.

### Search Complexity

O(log(n)) if very few empty arr items.
Worst: if n items, we can have arr length = 2^n,
thus complexity = O(n)

```txt
    3
   / \
  9  20
    /  \
   15   7
```
Array Representation: `[3,9,20,null,null,15,7]`

Usually, balancing a Binary Search Tree is performed to speed up inserting/deleting.

> Note: Look for Balanced Binary Search Tree

## Weak Sort
Weak sort means the data structure is not perfectly sorted, but sorted in some sense.
So, a binary search tree is weakly sorted, as left is smaller and right is larger.

# Pre-order, post-order, in-order (depth first traversal)
It is the way in which we visit the nodes

## Pre Order
- visit the node, then visit left child and then visit right child
- node, left child, right child
- parent node is `pre` visited before left & right child

## In Order
- first visit left child, visit the node, then visit right child
- left child, node, right child
- parent node is visited `in` between left & right child

## Post Order
- first visit left child, then visit right child, then visit node
- left child, right child, node
- parent node is visited `post` visiting the left & right
- This is useful for memory cleanup, first delete the children then delete parent

- All of the DFS orders can be obtained using stack or recursion

## Level order (breadth first traversal)
- We print the nodes level-by-level(or row-by-row) (easiest to understand, not that easy to implement)
- i.e we visit every level from left to right and go the next level

- To do this, we use queue, visit node, add left to queue, add right to queue
- take from queue=A, and put left of A to queue again, add right of A to queue again
- Order: Parent, left, right, left.left, left.right, right.left, right.right, and so on