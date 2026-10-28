/**
 * Search in Rotated Sorted Array — see README.md next to this file.
 */

/** TODO: describe the approach and its complexity. */
export function searchRotated(nums: readonly number[], target: number): number {
  throw new Error('searchRotated: not implemented');
}

/** Reference implementation — keep it obviously correct. */
export function searchRotatedBrute(nums: readonly number[], target: number): number {
  let result = -1;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === target) result = i;
  }

  return result;
}
