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
  const result: number[][] = []
  // [-1, 0, 1, 2, -1, -4] -> [-4, -1, -1, 0, 1, 2],
  const sorted = nums.toSorted((a, b) => a - b)

  if (sorted.length < 3) {
    return result
  }

  for (let i = 0; i < sorted.length - 2; i++) {
    // All numbers are positive and could not give 0
    if (sorted[i - 1] > 0) break;
    
    // Avoid duplication
    if (i > 0 && sorted[i - 1] === sorted[i]) continue;

    let lIndex = i + 1;
    let rIndex = sorted.length - 1;

    
    while (lIndex < rIndex) {
      const lValue = sorted[lIndex];
      const rValue = sorted[rIndex];
      const current = sorted[i];

      const sum = lValue + rValue + current;

      if (sum > 0) {
        rIndex--;
        continue;
      }

      if (sum < 0) {
        lIndex++;
        continue;
      }

      if (sum == 0) {
        result.push([lValue + 0, current + 0, rValue + 0])
        lIndex++;
        rIndex--;

        while (lIndex < rIndex && sorted[lIndex] === sorted[lIndex - 1]) {
          lIndex++;
        }
      }

    }
  }

  return result
}

/** Reference implementation — keep it obviously correct. */
export function threeSumBrute(nums: readonly number[]): number[][] {
  throw new Error('threeSumBrute: not implemented');
}
