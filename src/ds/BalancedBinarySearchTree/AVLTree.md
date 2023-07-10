# AVL Tree
AVL Tree is one of many types of Balanced Binary Search Tree (BBST), which allow for `O(log(n))` insert, delete and search operations.



## Balance Factor
Balanced Factor (BF), is difference b/w heights of right and left sub-tree.
```
BF(node) = Height(node.right) - Height(node.left)
```

## AVL Tree invariant
- BF of root in AVL Tree must be `-1`, `0` or `1`

## Change in BF with rotation
- rotate right 
  - left subtree height = x - 1
  - right subtree height = y + 1
  - change in balanceFactor = y + 1 - (x - 1) = y - x + 2
  - So, change is +2
- rotate right
  - left subtree height = x + 1
  - right subtree height = y - 1
  - change in balanceFactor = y - 1 - (x + 1) = y - x - 2
  - So, change is -2

## 