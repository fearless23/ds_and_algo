# Quick Sort

Quick sort starts by picking a random pivot inside a array (usually middle),
then runs through entire array and numbers smaller or equal to pivot are added to left of pivot, and numbers larger than pivot are added to right of pivot.

## How to do this ?
- Lets start with [1,8,3,9,7,4]
- Lets pick last number as pivot
- we keep a track of count of smaller numbers than pivot, if we have 2 numbers smaller than pivot, that means our pivot will end at idx=2
- In above example, 1 & 3 are smaller than 4(pivot), so 4 should end at idx=2
- Also, somehow we have to move 1 & 3 to the left of idx=2 and others numbers to the right of idx=2
- so we start with j=0, if current number is smaller or equal, then we swap current number and number at idx=j and then we increment j.
- i=0: 1 is less than 4, j=0, swap `1`(idx=i=0) with `1`(idx=j=0), j=1(0+1)
- i=1: 8 is greater than 4, skip
- i=2: 3 is less than 4, j=1, swap `3`(idx=i=2) with `8`(idx=j=1), j=2(1+1)
- so, array becomes [1,3,8,9,4]
- i=3: 9 is greater than 4, skip
- i=4: 7 is greater than 4, skip
- since j=2, pivot will now go at j=2
- so, array becomes [1,3,4,8,9,7]
- So, j is idx for where the smaller than pivot number will go, and at the end pivot will go just after last swapper number.
- This array satisfies quick-sort, numbers to left of 4 are smaller or equal, and to the right are larger.
- Since, array is not copied or modified in place, we usually will be given a sub-array, i.e some startIdx and endIdx.
- so, j=startIdx;
- After this we can do this recursively for left sub-array & right sub-array.


## Example 2
- let have an array with 100 numbers,  0 to 99 randomly sorted
- only thing is last item of this array is 5.
- If we pick pivot as last item of array, pivot = 5,
- Since, 0,1,2,3,4 are smaller than 5, at the end of pivotAndSwap operation, 5 will end up at idx=5.
- Then, we can recursively, call for left and right of pivot.