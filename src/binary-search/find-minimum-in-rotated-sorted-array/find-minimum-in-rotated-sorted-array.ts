/**
 * Find Minimum in Rotated Sorted Array — see README.md next to this file.
 */

/**
 * Binary search on "is nums[mid] greater than nums[hi]": if yes, the minimum is to the
 * right of mid; otherwise it is mid or to its left. O(log n) time, O(1) space.
 */
export function findMin(nums: readonly number[]): number {
  let low = 0;
  let high = nums.length - 1;

  while (low < high) {
    const mid = (low + high) >>> 1;
    const numR = nums[high];
    const numM = nums[mid];

    if (numM > numR) low = mid + 1;
    else high = mid;
  }

  // - `[3, 4, 5, 1, 2]` → `1` (rotated 3 times)
  // - `[4, 5, 6, 7, 0, 1, 2]` → `0` (rotated 4 times)
  // - `[11, 13, 15, 17]` → `11` (rotated `n` times, so it is sorted)




  return nums[low];
}






























/**
 * First attempt: narrows from the left, but often by a single step (`left++`), so it
 * degrades to O(n) time when the minimum sits just before the middle. O(1) space.
 */
export function findMinFirstAttempt(nums: readonly number[]): number {
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
