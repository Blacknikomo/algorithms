/**
 * Binary Search — see README.md next to this file.
 */

/** TODO: describe the approach and its complexity. */
export function binarySearch(nums: readonly number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;

  let result = -1;

  while (left <= right) {
    const mid = (left + right) >>> 1;
    
    if (nums[mid] === target) {
      right = mid - 1;
      result = mid;
    }

    if (nums[mid] > target) right = mid - 1;
    if (nums[mid] < target) left = mid + 1;

  }

  return result;
}
