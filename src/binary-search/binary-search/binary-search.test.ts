import { describe, expect, it } from 'vitest';
import { binarySearch } from './binary-search.ts';

type Solver = (nums: readonly number[], target: number) => number;

// A second approach is one more row here.
const implementations: [string, Solver][] = [['binarySearch', binarySearch]];

describe.each(implementations)('%s', (_name, solve) => {
  it.each([
    { nums: [-1, 0, 3, 5, 9, 12], target: 9, expected: 4 },
    { nums: [-1, 0, 3, 5, 9, 12], target: 2, expected: -1 },
  ])('returns $expected for $target in $nums', ({ nums, target, expected }) => {
    expect(solve(nums, target)).toBe(expected);
  });

  it.each([
    { nums: [5], target: 5, expected: 0 },
    { nums: [5], target: 3, expected: -1 },
    { nums: [5], target: 7, expected: -1 },
  ])('handles a single element: $target in $nums → $expected', ({ nums, target, expected }) => {
    expect(solve(nums, target)).toBe(expected);
  });

  it.each([
    { nums: [-1, 0, 3, 5, 9, 12], target: -1, expected: 0, what: 'at the first position' },
    { nums: [-1, 0, 3, 5, 9, 12], target: 12, expected: 5, what: 'at the last position' },
    { nums: [1, 4], target: 4, expected: 1, what: 'in a two-element array' },
    { nums: [-9999, -50, -3], target: -50, expected: 1, what: 'among all-negative values' },
    { nums: [-9999, 0, 9999], target: 9999, expected: 2, what: 'at the upper bound of the range' },
    { nums: [-9999, 0, 9999], target: -9999, expected: 0, what: 'at the lower bound of the range' },
  ])('finds the target $what', ({ nums, target, expected }) => {
    expect(solve(nums, target)).toBe(expected);
  });

  it.each([
    { nums: [2, 4, 6, 8], target: 1, what: 'smaller than every element' },
    { nums: [2, 4, 6, 8], target: 9, what: 'larger than every element' },
    { nums: [2, 4, 6, 8], target: 5, what: 'between two elements' },
  ])('returns -1 when the target is $what', ({ nums, target }) => {
    expect(solve(nums, target)).toBe(-1);
  });

  it('finds every element of a large array and misses every gap', () => {
    // Odd numbers -9999..9999 (10 000 elements): value v sits at index (v + 9999) / 2,
    // and every even number in between is absent.
    const nums = Array.from({ length: 10_000 }, (_, i) => -9999 + 2 * i);
    for (let i = 0; i < nums.length; i++) {
      expect(solve(nums, nums[i] as number)).toBe(i);
    }
    for (let gap = -9998; gap <= 9998; gap += 2) {
      expect(solve(nums, gap)).toBe(-1);
    }
  });
});
