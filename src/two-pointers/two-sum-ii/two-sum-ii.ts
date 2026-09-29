/**
 * Two Sum II - Input Array Is sorted — see README.md next to this file.
 */

/** TODO: describe the approach and its complexity. Constraint: O(1) extra space. */
export function twoSumII(numbers: readonly number[], target: number): number[] {
  const result: number[] = [];

  let l = 0;
  let r = numbers.length - 1;

  while (l < r) {
    if (numbers[l] + numbers[r] == target) {
      result.push(l + 1);
      result.push(r + 1);
      break;
    }

    if (numbers[l] + numbers[r] > target) {
      r--;
    }

    if (numbers[l] + numbers[r] < target) {
      l++;
    }
  }

  return result
}

/** Reference implementation — keep it obviously correct. */
export function twoSumIIBrute(numbers: readonly number[], target: number): number[] {
  throw new Error('twoSumIIBrute: not implemented');
}
