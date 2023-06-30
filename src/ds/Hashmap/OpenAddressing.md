# HashTable with OpenAddressing

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

## Hash Table
- To create hashTable from given keys, hashes and idx, we use Array of item|null.
- So, `HashTable` is an Array of item|null, and item contains {key, value, hash?}
- We store the values at calculated index inside hashTable(=array), 
  1. add `jar` at idx=3
  2. add `bar` at idx=3, but it is already occupied, so to avoid this colliosion we use `OpenAddressing`

## Open Addressing
We start with normalizedIdx as usual, if that idx is occupied, then we add some value to hash and re-calculate normalizedIdx we keep doing this until we find empty slot.
For Scenario1, this is how we use OpenAddressing
1. `jar`-idx=3, add at idx=3 (Array[3]= {key:jar,value:"someValue",hash:104987 })
2. `bar`-idx=3, cannot be added at idx=3, so we calculate newIdx
3. newIdx = (idx of `bar`=3 + probe(key, iteration) ) % capacity
4. if newIdx is also occupied, we redo Step 3 with iteration+1, until we find an empty idx.
5. Important: probe() fn should produce such value that we are not stuck in an loop.


## Probing Functions

### Linear Probing Function
- Generic linear probing function = ax + b
- a, b are constants, x is the iteration
- b do not matter since eventually we will mod with capacity, thus function comes to be `ax` only
- newIdx = ( idx + a*x ) % capacity

Probing iterations (idx=3,capacity=8)
p#1= newIdx = (3 + a ) % 8
p#2= newIdx = (3 + 2a ) % 8
p#3= newIdx = (3 + 3a ) % 8
p#4= newIdx = (3 + 4a ) % 8

For linear probe to cover entire range of capacity and not get stuck in a smaller loop, value of a & capacity should be co-primes

In above case, 
if capacity=8, and a=4 - we get loop of { 3 & 7 }
if capacity=8, and a=17 - we get perfect loop of 0 to 7, covering entire range
if capacity=8, and a=16 - we get loop {3} only outputting 3
if capacity=8, and a=7 - we get perfect loop of 0 to 7, covering entire range

Note1: with a=17, we cover entire range still in a scenario, where array is fully occupied we will stuck in a infinite loop even though entire range is covered, so we should increase capacity before this happens.

## To avoid infinite loop or shorter loop
1. Choose a constant value such that capacity & constant value are co-prime -> Loop = full range
2. Increase capacity before array is full -> this avoids infinite loop

IMPORTANT: So, let choose capacity to be 2^n and constant=7, then double capacity when array is more than 65% full.