/**
 * 3Sum — see README.md next to this file.
 */

/**
 *
 * {
      nums: [-1, 0, 1, 2, -1, -4],
      expected: [
        [-1, -1, 2],
        [-1, 0, 1],
      ],
    },

 */

/** TODO: describe the approach and its complexity. Target: O(n^2) time, no Set for deduplication. */
/**
 *
 * Description and logics:
 * Iterate item by item. For each item find the 2 sum to the left and to the right from the current item.
 * Check if the item left is the same to current one to avoid duplication
 *
 */
export function threeSum(nums: readonly number[]): number[][] {
  // if (nums.length < 3) return [];
  const sorted = nums.toSorted((a, b) => a - b);
  const result: number[][] = [];

  for (let i = 0; i < sorted.length - 2; i++) {
    if (sorted[i] > 0) break;
    if (i > 0 && sorted[i] === sorted[i - 1]) continue;

    const num = sorted[i];
    let left = i + 1;
    let right = sorted.length - 1;

    while (left < right) {
      const leftNum = sorted[left];
      const rightNum = sorted[right];
      const sum = leftNum + rightNum + num;

      if (sum == 0) {
        result.push([num, leftNum, rightNum]);
        left++;
        right--;

        while (left < right && sorted[left] === sorted[left - 1]) left++;
      } else if (sum > 0) {
        right--;
      } else {
        left++;
      }
    }
  }

  return result;
}

/** Reference implementation — keep it obviously correct. */
export function threeSumBrute(nums: readonly number[]): number[][] {
  throw new Error('threeSumBrute: not implemented');
}
