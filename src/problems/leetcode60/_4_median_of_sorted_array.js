
/*
nums1, nums2
You can first find the medians (m1,m2) of the two sorted arrays (the middle element) and compare.

If m1 === m2, then that is the median.
If m1 > m2, final median is either in the first half of the nums1
or the second half of the nums2

This method cuts your search space in half each iteration and is thus log(n + m)
example 1
2,60,100,120 --> 80 (first half)
3,10,40,50,80 --> 40 (second half)

2, 60 --> 31 (second half)
40, 50, 80 --> 65 (first half)

60   --> 60  (first half)
40, 50 --> 45 (second half)

60 --> 60
50 --> 50

2,3,10,40,50,60,80,100,120 --> 50

// example 2
2,60,100,120 --> 80 (first half)
3,10,50,80 --> 30 (second half)

2, 60 --> 31 (second half)
50, 80 --> 65 (first half)

60 --> 60  (first half)
50 --> 50 (second half)

2,3,10,50,60,80,100,120 --> 55
*/

const median = (nums) => {
  const n = nums.length;
  if (n === 0) return 0;
  if (n % 2 === 0) {
    return (nums[n / 2] + nums[(n / 2) - 1]) / 2;
  } else return nums[Math.floor(n / 2)];
};

const get_half = (start, end, half) => {
  const n = end - start + 1; // length
  if (half === 'FIRST') {
    if (n % 2 === 0) return [start, start + (n / 2) - 1];
    else return [start, start + Math.floor(n / 2)];
  }
  if (half === 'SECOND') {
    if (n % 2 === 0) return [start + (n / 2), end];
    else return [start + Math.floor(n / 2), end];
  }
};
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
const findMedianSortedArrays = function (nums1, nums2, merged_length) {
  if (!merged_length) merged_length = nums1.length + nums2.length;
  const m1 = median(nums1);
  const m2 = median(nums2);
  if (nums1.length === 0) return m2;
  if (nums2.length === 0) return m1;
  if (m1 === m2) return m1;

  if (nums1.length === 1 && nums2.length === 1) {
    // endcase, either middle or one of them
    console.log(nums1, nums2, merged_length);
    return merged_length % 2 === 0 ? (m1 + m2) / 2 : Math.min(m1, m2);
  }

  if (m1 > m2) {
    const x = get_half(0, nums1.length - 1, 'FIRST');
    const y = get_half(0, nums2.length - 1, 'SECOND');
    nums1 = nums1.slice(x[0], x[1] + 1);
    nums2 = nums2.slice(y[0], y[1] + 1);
  } else {
    const x = get_half(0, nums1.length - 1, 'SECOND');
    const y = get_half(0, nums2.length - 1, 'FIRST');
    nums1 = nums1.slice(x[0], x[1] + 1);
    nums2 = nums2.slice(y[0], y[1] + 1);
  }
  return findMedianSortedArrays(nums1, nums2, merged_length);
};

// console.log(findMedianSortedArrays([2, 60, 100, 120], [3, 10, 50, 80]));
console.log(findMedianSortedArrays([1, 2], [-1, 3]));
// -1,1,2,3,4 --> 1.5
