# Search

Search algorithm typically help find a certain item/value in a given data-structure.


## Linear Search
We start at a particular point and move forward by 1 step until we are able to find the item or reach the end.  
- Linear search takes `O(n)` time.  

## Better Linear Search
Pre-requisite: Sorted Array
We can improve slightly on our linear search by skipping some values if the given array is sorted.
We jump 10% of the array length, in worst case, we jump 9 times and do a linear search in last 10% of array.

- Lets assume it takes 1ms for lookup or 1ms for jump
- Linear Search in 100 length array = 100 lookups = 100ms
- Better Linear Search(10%) = 9 jumps + 10 lookups(last 10% array linear search) =~ 20ms
- Better Linear Search(20%) = 4 jumps + 20 lookups(last 10% array linear search) =~ 25ms
- Better Linear Search(5%) = 19 jumps + 5 lookups(last 10% array linear search) =~ 25ms
- Better Linear Search(25%) = 3 jumps + 25 lookups(last 10% array linear search) =~ 29ms

**But still, the time = O(n), Why ?**
If length increase from 100 to 300, time will also increase by 3 times.  
Thus, making time taken proportional to `n`.  

- Linear Search Time = c1 * n
- Better Search Time = c2 * n  (c2 < c1)
But, Big O = O(n) for both

**Example 1**  
Linear search in array, start at index=0 and keep finding until found or reach end of array.

## Binary Search
We start at a particular point and look either in left or right part of a data-structure and then we find the next starting point in the left (or right) portion and repeat the same process until 2 or less items remain.  
- Binary search takes `O(log`<sub>`2`</sub>`(n))` time

**Example 1**  
> Pre-requisite: Sorted Array  

1. Start at middle of sorted array, go left if number to find is smaller, else go right.
2. Go to middle of left portion and repeat the same process until 2 or less items remain.

- If n=16, linear search in worst scenario takes 16 units of time, thus time proportional to n
- If n=16, binary search in worst scenario takes 4 comparisons, i.e 16=2<sup>4</sup> = 4 units of time, thus time proportional to `log`<sub>`2`</sub>`(n)`


### Binary Array Division
Example with array of length(l)

| Len | Left Array | Middle Item |Right Array | Left Indices | Middle Index |Right Indices |
| --- | --- | ---| --- | --- | --- | ---
| 0*| -             | -     | -                   | -              | -  | -                |
| 1 | -             | item0 | -                   |    [] -> [0,0) | 0  |    [] -> [1,end] |
| 2 | []            | item0 | [item1]             |    [] -> [0,0) | 0  | [1,1] -> [1,end] | 
| 3 | [item0]       | item1 | [item2]             | [0,0] -> [0,1) | 1  | [2,2] -> [2,end] |
| 4 | [item0]       | item1 | [item2,item3]       | [0,0] -> [0,1) | 1  | [2,3] -> [2,end] |
| 5 | [item0,item1] | item2 | [item3,item4]       | [0,1] -> [0,2) | 2  | [3,4] -> [3,end] |
| 6 | [item0,item1] | item2 | [item3,item4,item5] | [0,1] -> [0,2) | 2  | [3,5] -> [3,end] |

- *: Terminal State
- l=0,1,2 have some edge cases, after that its pretty straight forward
- Length of 0 or 1 is terminal state i.e no further divisions possible
- lastIdx = li = end = l -1
- left start = 0
- left end = m-1 
- middle = m = Math.floor(li/2)
- right start = m + 1
- right end = l - 1


## Binary Search Pointers
- We use 2 pointers: start and end
- Find middle value and compare then 
  1. if found(equal): exit
  2. go left(value is smaller): move end pointer to middle-1
  3. go right(value is larger): move start pointer to middle+1
- Terminal: end < start


## BFS and DFS
Breadth first search - Level by level (or row by row)
Depth first search - search in one direction(usually left) first and then in another(usually right), then go back to parent.