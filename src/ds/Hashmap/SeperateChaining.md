# HashTable with SeperateChaining

consider following scenarios from HashFunction.md

### Scenario1 - capacity=8
1. { key: 'jar', hash: 104987, idx: 3 }
2. { key: 'bar', hash: 97299, idx: 3 }
3. { key: 'car', hash: 98260, idx: 4 }
4. { key: 'tar', hash: 114597, idx: 5 }
5. { key: 'ear', hash: 100182, idx: 6 }
6. { key: 'far', hash: 101143, idx: 7 }

### Scenario2 - capacity=16
1. { key: 'jar', hash: 104987, idx: 11 }
2. { key: 'bar', hash: 97299, idx: 3 }
3. { key: 'car', hash: 98260, idx: 4 }
4. { key: 'tar', hash: 114597, idx: 5 }
5. { key: 'ear', hash: 100182, idx: 6 }
6. { key: 'far', hash: 101143, idx: 7 }

## HashTable
- To create hashTable for Scenario1, we use Array of LinkedList|null.
- So, `HashTable` is an Array of LinkedList|null, and LinkedList contains `{key, value, hash?}`
- Each items of hashTable will be an LinkedList or empty
- To avoid hash collisions (i.e same idx), we use LinkedList, this way of avoiding hash collisions called `SeperateChaining`.

## SeperateChaining
- We store the values at calculated index inside hashTable(=array), 
  1. Create new LinkedList, add `jar` and add this LinkedList at idx=3
  2. Add `bar` to LinkedList at idx=3
  3. `car` has idx=4, idx=4 is empty, so we create new LinkedList and then add `car`, then add that LinkedList at idx=4.

### Increasing Capacity
- When length of `LinkedList` is large than some threshold, we increase capacity and re-calculate indeces (see capacity=16 table above, it has different indeces as compared to capacity=8 table)
  - If we have 500 hashes and capacity=8, the average linked list length will be 63.
  - We should avoid having long LinkedLists, thus we should increase capacity when length of linked list increases a certain point.

### Javascript Notes
In Javascript, array do not have capacity, so we only care about length of linkedList. If any of linkedList increases more than a certain length, we re-normalize hash values
