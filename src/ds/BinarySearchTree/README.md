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