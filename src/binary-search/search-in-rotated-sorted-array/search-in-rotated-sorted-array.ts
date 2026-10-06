/**
 * Search in Rotated Sorted Array — see README.md next to this file.
 */

/** TODO: describe the approach and its complexity. */
// [4, 5, 6, 7, 0, 1, 2]`, target `0` → `4`
// [4, 5, 6, 7, 0, 1, 2]`, target `3` → `-1`
// [4, 5, 6, 7, 8, 1, 2]`, target `8` → `-1`
// [7, 6, 5, 4, 3, 2, 1]`, target `3` → `4`
// [1, 2, 3, 4, 5, 6, 7]`, target `3` → `2`
// [1, 2, 3, 4, 5, 6, 7]`, target `0` → `-1`

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
      if (numL < target && target < numM) {
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    } else {
      if (numM < target && target < numH) {
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
