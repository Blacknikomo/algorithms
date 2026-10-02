/**
 * Find Minimum in Rotated Sorted Array — see README.md next to this file.
 */

/** TODO: describe the approach and its complexity. */
export function findMin(nums: readonly number[]): number {
    // { nums: [3, 4, 5, 1, 2], expected: 1 },
    // { nums: [4, 5, 6, 7, 8, 9, 10, -2, -1, 0, 1, 2, 3], expected: 0 },
    // { nums: [11, 13, 15, 17], expected: 11 },

  let result = nums[0];

  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    let mid = (left + right) >>> 1;
    const leftNumber = nums[left];
    const rightNumber = nums[right];
    const midNumber = nums[mid];
    
    result = Math.min(leftNumber, rightNumber, midNumber);
    
    if (leftNumber < rightNumber) {
      break;
    } 

    if (leftNumber > rightNumber) {
      if (leftNumber < midNumber) {
        left = mid
      } else {
        left++;
      }
    } 
    
    if (leftNumber == rightNumber) {
      break;
    }    
  }

  return result;
}

// O(n), not O(logn)