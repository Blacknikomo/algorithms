/**
 * Search in Rotated Sorted Array — see README.md next to this file.
 */

export function searchRotated(nums: readonly number[], target: number): number {
  let result = -1;
  let low = 0;
  let high = nums.length - 1;

  while (low <= high) {
    const mid = (low + high) >>> 1;
    const numM = nums[mid];
    const numL = nums[low];
    const numH = nums[high];

    if (numM === target) result = mid;

    let isSortedL = numL <= numM;

    // [6, 7, 8, 9, 10, 0, 1, 2, 3, 4, 5]
    if (isSortedL) {
      if (numL <= target && target < numM) {
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    } else {
      if (numM < target && target <= numH) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }
  }

  return result;
}

/** Reference implementation — keep it obviously correct. */
export function searchRotatedBrute(nums: readonly number[], target: number): number {
  let result = -1;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === target) result = i;
  }

  return result;
}
