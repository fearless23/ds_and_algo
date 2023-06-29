# Hash Function

- Hash Function convert a data of type `T` into some `integer`
- Hash Collision: When hash of two values is same

1. If hash of two values is same, then the values may or may not be same.
2. If hash of two values is not same, then the vaules are not same at all.

So, when finding if two values are same or not, first check their hash.
Next, let`s assume the hash produced by hash function is some large number

hash 1 = 123005678
hash 2 = 323005672
hash 3 = 326789005681
hash 4 = 123005694

We can store these hash values as index of an array, but that will be in-efficient.
So, we start with an array of capacity=8 and normalize hash values within 0 to 7
If we have more keys, we increase the capacity=16, normalize hash values again in range of 0 to 15

Normalizing an integer is like taking a mod capacity
Example1: normalized = n=i % capacity >=0 ? n: capacity-n, (this is simple, the remainder can be negative)
Example2: normalized = (i & 0x7FFFFFFF) % capacity (this handles negative numbers and large number)
Both produce same normalizedHashIndex

mod > capacity=8
index for hash1 = 123005678 % 8 = 6
index for hash2 = 323005672 % 8 = 0
index for hash3 = 326789005681 % 8 = 1
index for hash4 = 123005694 % 8 = 6

mod > capacity=16
index for hash1 = 123005678 % 16 = 14
index for hash2 = 323005672 % 16 = 8
index for hash3 = 326789005681 % 16 = 1
index for hash4 = 123005694 % 16 = 14

We store the values at calculated index, if we have hash collisons, we use SinglyLinkedList to store 
values whose hashes are same.
If above scenario, hash1 & hash4 are stored at index 6 of an array but item at index 6 will be a linked list.
First item of linked list will be hash1, and next will be hash4.
Even if we have singleItem in array at index `n`, we can store it a linkedList with one item and add more whose normalizedIdx are same.

If we have 500 hashes and capacity=8, the average linked list length will be 63.
We should avoid having long LinkedLists, thus we should increase capacity when length of linked list increases a certain point.

In Javascript, array do not have capacity, so we only care about length of linkedList. If any of linkedList increases more than a certain length, we re-normalize hash values

Storing the hash in array, where each item is a linkedList is also known as `HashTable`