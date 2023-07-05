# Fenwick Tree 
a.k.a Binary Indexed Tree  

Lets take an example of an array  
A = [1,-5,45,78,2,90,-32,2,3]  

Task = `Range_Sum` = Get sum of numbers from index 2 to 6 or `sum[2,7)`  

## Method 1
Loop over array from 2 to 6 and add the numbers as follows  
sum = A[2] + A[3] + A[4] + A[5] + A[6]  
sum = 45 + 78 + 2 + 90 + -32  
sum = 183  

- For larger ranges, the sum will take O(n) for every `Range_Sum`
- This is suitable if we need range sum once

## Method 2 - Dynamic Programming
Loop over entire array and calculate prefix sums as follows

A = [1,-5,45,78,2,90,-32,2,3]  
P = [0,1,-4,41,119,121,211,179,181,184]  

`Range_Sum` = `sum[2,7)` = P[7] - P[2] = 183  

- Finding range sum is constant time
- constructing P is linear O(n)
- Updating P after Deleting, adding or updating number in original array will be expensive will be O(n) too


## Method 3 - Fenwick Tree
Fenwick tree is an improvement over prefix sum array (`P`) in method 2.
- Construction of Fenwick Tree is O(n)
- Updating P after Deleting, adding or updating number in original array will be `O(log(N))` which is improvement over method 2
- Fenwick Tree is also represented like a array, but the indexes of Fenwick Tree (array) are responsible for some of indexes below it.
- Fenwick index are represented by there binary value and it starts at index=1

#### Fenwick Tree indexes
Array  index=8 ->  9th item -> Fenwick index=9  -> represented as `1001` in binary
Array  index=3 ->  4rd item -> Fenwick index=4  -> represented as `100` in binary
Array index=13 -> 14th item -> Fenwick index=14 -> represented as `1110` in binary

#### Binary indexes represent what ?
Binary representation convert to first significant digit (FSB) and back to decimal
`1001` has first significant digit at position 1 -> 1   -> 1
 `100` has first significant digit at position 3 -> 100 -> 4
`1110` has first significant digit at position 2 -> 10  -> 2

The number (R=responsibility) that we get is the number of items the current item is responsible for including self (only going down)
1 -> item is responsible for self only
4 -> item is responsible for 4 items below itself including self
2 -> item is responsible for 2 items below itself including self

Odd numbers (ex: 1,3,5,7,9) have 1 as FSB at position 1 thus, R=1 -> i.e only responsible for self
Numbers that are powers of 2 (ex: 2,4,8,16) , have 1 as FSB at last position, thus R=number itself -> i.e responsible for all indexes below itself.

### What does a index responsible for other indexes means ?
Responsibility means the current index will cover for `R` number of cells when creating Fenwick Tree or updating original array or calculating RangeSums. Since, R can be 1 - 2^n, the updating of Fenwick tree is faster (O(log(N))) rather than O(N) in method2.

## 2 Important Operations
### 1. Finding which cells are responsible for current cell ?
So far, we figured out how many cells is our current cell responsible for. Now, lets find out how many cells are
responsible for our current cell.
We know that current cell is responsible for cells below it. So, all the cells responsible for our current cell will be higher than our current cell.
to find those, just keep adding FSB value to cell binary value
**Example 1**
Fenwick index=9  -> `1001` -> `1` (FSB) -> next = 1001 + 1 -> `1010` -> index=10
Fenwick index=10  -> `1010` -> `10` (FSB) -> next = 1010 + 10 -> `1100` -> index=12
Fenwick index=12  -> `1100` -> `100` (FSB) -> next = 1100 + 100 -> `10000` -> index=16
we keep on going like this, until we go out of bounds...
**Example 2**
Fenwick index=1  -> `1` -> `1` (FSB) -> next = 1 + 1 -> `10` -> index=2
Fenwick index=2  -> `10` -> `10` (FSB) -> next = 10 + 10 -> `100` -> index=4
Fenwick index=4  -> `100` -> `100` (FSB) -> next = 100 + 100 -> `1000` -> index=8
we keep on going like this, until we go out of bounds...



### 2. How to cover a range ?
If we start at index=9 and want to reach index=1(first), we can cover that in least possible steps. In regular array we will go from 9 to 1 or 1 to 9 one-by-one as seen in method1 or method2. But, in Fenwick tree we know each cells covers for itself and others cells below it, we can cover range from 9 to 1 in less steps.
9 cover itself -> 8 cover for 8 to 1
so, 9 -> (idx=9)+(idx=8)
We can do similar thing as did above, here we will subtract FSB

**Example 1**
Fenwick index=9  -> `1001` -> `1` (FSB) -> next = 1001 - 1 -> `1000` -> index=8
Fenwick index=8  -> `1000` -> `1000` (FSB) -> next = 1000 - 1000 -> `0` -> index=0 (out of bounds)
Thus, 9 = 9 -> 8

**Example 2**
Fenwick index=13  -> `1101` -> `1` (FSB) -> next = 1101 - 1 -> `1100` -> index=12
Fenwick index=12  -> `1100` -> `100` (FSB) -> next = 1100 - 100 -> `1000` -> index=8
Fenwick index=8  -> `1000` -> `1000` (FSB) -> next = 1000 - 1000 -> `0` -> index=0 (out of bounds)
Thus, 13 = 13 -> 12 -> 8

## Constrcut Fenwick Tree
A = [1,-5,45,78,2,90,-32,2,3]  
Let`s start with FenwickTree (F) as copy of A itself  
F = [1,-5,45,78,2,90,-32,2,3]  

Fenwick index=1 -> `1` -> is covered by (2,4,8)
We will update FenwickIndex=2, because FenwickIndex=1 is already copied from A.
FenwickIndex[2] = FenwickIndex[2] + FenwickIndex[1]
F = [1,-4,45,78,2,90,-32,2,3]  

Fenwick index=2 -> `10` -> is covered by (4,8)
We will update FenwickIndex=4, FenwickIndex[4] = FenwickIndex[4] + FenwickIndex[2]
F = [1,-4,45,74,2,90,-32,2,3]  

and keep on going until last item
