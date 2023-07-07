# AVL Tree
AVL Tree is one of many types of Balanced Binary Search Tree (BBST), which allow for `O(log(n))` insert, delete and search operations.

## Tree Height
- Height of tree is number of edges b/w root and furthest leaf
- Height of leaf node = 0 (because no edges)
- Height(node) = Max of [`Left subtree height`, `right subtree height`] + 1
- Height(node) = Max of [`Height(node.left)`, `Height(node.right)` ] + 1
- Find null node height
```txt
leaf node Height = Max of [Height(leaf.left), Height(leaf.right) ] + 1  
leaf node Height = Max of [Height(null), Height(null) ] + 1  
leaf node Height = Height(null) + 1  
0 = Height(null) + 1
Height(null) = -1 <--important
```
- `Height(null) = -1`

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