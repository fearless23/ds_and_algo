# Trie
Trie is a tree data structure usually containing alphabets(characters) as nodes, used for storing and searching words.

## Trie node properties
0. Root node is always empty
1. Each node has a value equal to some char
2. Every node in trie can have multiple children, for example 26 for english alphabets, or it could be 52 if including upper case as separate characters or more if using some other language words say hindi.
3. Every node indicates, if it is end of the word or not, either by `isWord=true` or one of child being `*`. `isWord=true` is better approach to indicate end of word.

## Example
- Store following words: cat, cattle, map, mat, car, card

1. Root node
2. adding cat: add `c`, find `c`(not found), add `c` as child of root
3. adding cat: add `a` as child of `c`
4. adding cat: add `t` as child of `a` and add `isWord=true`
5. adding cattle: add `c`, find `c`(found), skip
6. adding cattle: add `a`, find `a`(found), skip
7. adding cattle: add `t`, find `t`(found), skip
8. adding cattle: add `t`, find `t`(not found), add `t` as child of earlier `t`
9. adding cattle: add `l`, find `l`(not found), add `l` as child of earlier `t`
10. adding cattle: add `e`, find `e`(not found), add `e` as child of `l`, mark `isWord=true`
11. and so on

As long as we keep finding char, we keep going and once we do not found, remaining chars can be added to the trie.

## Important
We can store the children of any node in an array and then find the char, but this way we will have to use O(n) time.
Since, we are storing 26 characters, we can fix the indexes like `a` idx is 0, `z` index is 25