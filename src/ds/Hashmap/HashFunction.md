# Hash Function

- Hash Function convert a data of type `T` into some `integer`
- Hash Collision: When hash of two values is same

1. If hash of two values is same, then the values may or may not be same.
2. If hash of two values is not same, then the vaules are not same at all.

So, when finding if two values are same or not, first check their hash.


<!-- Sample hash function, which convert string to hash(integer) -->
```ts
export const hashString = (string: string) => {
	let hash = 0;
	for (let i = 0; i < string.length; i++) {
		const code = string.charCodeAt(i);
		hash = (hash << 5) - hash + code;
		hash = hash & hash; // Convert to 32bit integer
	}
	return hash;
};
```
Next, let`s assume the hash produced by hash function is some large number

1. key: 'jar' --> hash: 104987
2. key: 'bar' --> hash: 97299
3. key: 'car' --> hash: 98260
4. key: 'tar' --> hash: 114597
5. key: 'ear' --> hash: 100182
6. key: 'far' --> hash: 101143


We can store these hash values as index of an array, but that will be in-efficient.
So, we start with an array of capacity=8 and normalize hash values within 0 to 7
If we have more keys, we increase the capacity=16, normalize hash values again in range of 0 to 15

Normalizing an integer is like taking a mod capacity
Example1: normalized = n=i % capacity >=0 ? n: capacity-n, (this is simple, the remainder can be negative)
Example2: normalized = (i & 0x7FFFFFFF) % capacity (this handles negative numbers and large number)
Both produce same normalizedHashIndex


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


- Storing the above scenario in some array of item is called `HashTable`
- To avoid collisions like jar and bar have same idx=3 (Scenario1), we use different techniques like
1. SeperateChaining
2. OpenAddressing