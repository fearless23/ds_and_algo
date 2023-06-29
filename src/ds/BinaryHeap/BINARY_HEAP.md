## Binary Heap

- Binary Tree: Tree where each node has max 2 child nodes.
- Heap: As we move down the tree, the values decreases(Max Heap) or increases(Min Heap)



## Implementation with nodes (i.e kind of linked-list)
Root(R): data, left(A), right(B)
A: data, left(X), right(Y)
B: data, left(P), right(Q)

## Implementation with Array
Root(R,i=0): data, left(A,i=1), right(B,i=2)
A(i=i): data, left(X,2i+1=3), right(Y,2i+2=4)
B(i=2): data, left(P,2i+1=5), right(Q,2i+2=6)


## Insert data
1. Insert at end, 
2. heapify start from last idx

## Delete data
1. Go to node
2. Delete it and replace it with last element
3. heapify starting at deleted node