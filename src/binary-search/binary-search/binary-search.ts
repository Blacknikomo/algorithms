/**
 * Binary Search — see README.md next to this file.
 */

/** TODO: describe the approach and its complexity. */
export function binarySearch(nums: readonly number[], target: number): number {
  let result = -1;
  let low = 0;
  let high = nums.length;

  while (low < high) {
    const mid = (low + high) >>> 1;

    if (nums[mid] > target) {
      high = mid;
    } else if (nums[mid] < target) {
      low = mid + 1;
    }

    if (nums[mid] === target) {
      result = mid;
      break;
    }
  }

  return result;
}
