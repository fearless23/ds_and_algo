# Graph
Graph is a non-linear data structure consisting of nodes and edges. Edge connects 2 nodes.

We have seen some graph already, like tree, binary search tree, trie,
- Tree is a special type of graph which we do not have cycles, binary trees have at most 2 children, 
- We already have seen traversals for trees (bfs,dfs) and graphs (mazeSolver)


## Types of Graphs
- cyclic: path starting from a node can land back to same node 
- acyclic: !cyclic, tree
- connected: every node connected via some path to another node
- directed: the edges have direction
- un-directed: !directed
- weighted: edges have weights associated with them like maps and routes
- DAG: Directed and Acyclic graph


## How graphs are stored
- First, we should have list of nodes in graph, as array of nodes and their values
- Then, we create another array(Adjacency List) of same size, where each item represents the node connections.
- Nodes=[A,B,C,D]
- AL=[[{to:C},{to:D}],[],[{to:B}],[{to:C}]]
- We can see A points to C & D, B points to nothing, C points to B, D points to C
- If we have weights associated, we can put that also with `to` like `{ to:C, w:20 }`

## Examples of storing graph in javascript
```ts
// connection = { to:number, weight:number }
type Graph = {
  nodes: N[]
  connections: { to: number, weight?: number }[][]
};
const graph = {
  nodes: ["A","B","C","D"],
  connections: [
    [{ to: 1 }], // connections of A
    [{ to: 2 }],  // connections of B
    [], //  // connections of C
    [{ to: 0 }, { to: 1 }], //  // connections of A
  ],
}
```
```ts
// connection = number
type Graph = {
  nodes: N[];
  connections: number[][];
}
const graph = {
  nodes: ["A","B","C","D"],
  connections: [
    [1],
    [2],
    [],
    [0,1],
  ],
}
```
```ts
// storing nodes and connections in single array
type Graph = { node:N, connections: { to:number, weight?:number }[] }[]
const graph = [
  { node: "A", connections: [{ to: 1 }] },
  { node: "B", connections: [{ to: 2 }] },
  { node: "C", connections: [] },
  { node: "D", connections: [{ to: 0 }, { to: 1 }] },
];
```
```ts
// storing nodes and connections in single array
type Graph = { node:N, connections: number[] }[]
const graph = [
  { node: "A", connections: [1] },
  { node: "B", connections: [2] },
  { node: "C", connections: [] },
  { node: "D", connections: [0, 1] },
];
```

## BFS and DFS on graph
The general idea of BFS, DFS stays as we have done for trees(binaryTree etc..), the coding would slightly be different as we use adjacency list here instead of node. Since, we can re-visit the already visited node, we might need to keep track of visited in array or hash-map(object).