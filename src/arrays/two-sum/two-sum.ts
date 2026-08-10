/**
 * Two Sum — see README.md next to this file.
 *
 * Two solutions on purpose: the brute-force one is the reference implementation
 * that the stress test checks the fast one against.
 */

/** O(n^2) time, O(1) space. Reference implementation — keep it obviously correct. */
export function twoSumBrute(nums: readonly number[], target: number): [number, number] | null {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if ((nums[i] as number) + (nums[j] as number) === target) {
        return [i, j];
      }
    }
  }
  return null;
}

/**
 * O(n) time, O(n) space.
 *
 * Walk once, and for every element ask the map whether its complement has
 * already been seen. Storing after the lookup is what prevents an element
 * from pairing with itself.
 */
export function twoSum(nums: readonly number[], target: number): [number, number] | null {
  const seen = new Map<number, number>(); // value -> index

  for (let i = 0; i < nums.length; i++) {
    const value = nums[i] as number;
    const complement = target - value;

    const j = seen.get(complement);
    if (j !== undefined) return [j, i];

    seen.set(value, i);
  }

  return null;
}
