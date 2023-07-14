# Bubble Sort

In this sorting method, we make multiple passes and move largest value to end

## Pass 1 (start=0,comparisons=4)
Start at 0, if item at 0 is bigger than item at 1, swap, else move to next index.
And keep doing this until we reach end. This way we will move the biggest to end.

- Start: [1,3,7,4,2]
- i=0, compare 1 & 3 - no swap
- i=1, compare 3 & 7 - no swap
- i=2, compare 7 & 4 - swap 7 & 4 -> 4 at idx2 and 7 at idx3
- i=3, compare 7 & 2 - swap 7 & 2 -> 2 at idx3 and 7 at idx4
- Output = [1,3,4,2,7]

## Pass 2 (start=0,comparisons=3)
Since, biggest value `7` has reached the end. We do not need to compare it now.
- Start: [1,3,4,2,7]
- i=0, compare 1 & 3 - no swap
- i=1, compare 3 & 4 - no swap
- i=2, compare 4 & 2 - swap 4 & 2 -> 2 at idx2 and 4 at idx3
- Output = [1,3,2,4,7]

## Pass 3 (start=0,comparisons=2)
Since, `4` has reached the end. We do not need to compare it now.
- Start: [1,3,2,4,7]
- i=0, compare 1 & 3 - no swap
- i=1, compare 3 & 2 - swap 3 & 2 -> 2 at idx1 and 3 at idx2
- Output = [1,2,3,4,7]

## Pass 4 (start=0,comparisons=1)
- Start: [1,2,3,4,7]
- i=0, compare 1 & 2 - no swap
- Output = [1,2,3,4,7]

## Length & Passes
- Length=n, passes=n-1
- pass=1 -> comparisons=n-1 or n - p or 4
- pass=2 -> comparisons=n-2 or n - p or 3
- pass=3 -> comparisons=n-3 or n - p or 2
- pass=4 -> comparisons=n-4 or n - p or 1
- Total comparisons: Sum(1 to n - 1)

## Notes
> Note: we can exit early, if there hae been total zero swaps in a pass  
- Max Passes: n - 1 => n  
- Operations per pass: n - p comparisons => n - p  
- Total Time = Passes * Operations per pass = `(n-1)*n/2`
- Big O => Time complexity => n<sup>2</sup>