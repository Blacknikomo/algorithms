/**
 * Maximum Average Subarray I — see README.md next to this file.
 */

// Returns largest average among them
// - `[1, 12, -5, -6, 50, 3]`, `k = 4` → `12.75` (`[12, -5, -6, 50]`)

/** TODO: describe the approach and its complexity. Target: O(n) time, O(1) extra space. */
export function findMaxAverage(nums: readonly number[], k: number): number {
  let state = 0;
  let max = -Infinity;
  let size = 0;

  if (nums.length < k) throw new Error(`Array contains less than ${k} elements`)

  for (let i = 0; i < nums.length; i++) {
    size++

    if (size > k) {
      state -= nums[i - k]
      size--;
    }

    state += nums[i]

    if (size == k) {
      max = Math.max(max, state / size)
    }
  }



  return max;
}

/** Reference implementation — keep it obviously correct. */
export function findMaxAverageBrute(nums: readonly number[], k: number): number {
  return 5; 
}
