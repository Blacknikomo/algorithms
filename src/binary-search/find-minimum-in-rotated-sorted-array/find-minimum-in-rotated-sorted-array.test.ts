import { describe, expect, it } from 'vitest';
import { findMin } from './find-minimum-in-rotated-sorted-array.ts';

type Solver = (nums: readonly number[]) => number;

// A second approach is one more row here.
const implementations: [string, Solver][] = [['findMin', findMin]];

describe.each(implementations)('%s', (_name, solve) => {
  it.each([
    { nums: [3, 4, 5, 1, 2], expected: 1 },
    { nums: [4, 5, 6, 7, 0, 1, 2], expected: 0 },
    { nums: [11, 13, 15, 17], expected: 11 },
  ])('returns $expected for $nums', ({ nums, expected }) => {
    expect(solve(nums)).toBe(expected);
  });

  it.each([
    { nums: [1], expected: 1, what: 'a single element' },
    { nums: [-5000], expected: -5000, what: 'a single element at the lower bound' },
    { nums: [1, 2], expected: 1, what: 'two elements, not rotated' },
    { nums: [2, 1], expected: 1, what: 'two elements, rotated once' },
    { nums: [2, 3, 4, 5, 1], expected: 1, what: 'the minimum at the last position' },
    { nums: [5, 1, 2, 3, 4], expected: 1, what: 'the minimum at index 1' },
    { nums: [4, 5, 6, 1, 2, 3], expected: 1, what: 'the minimum exactly in the middle' },
    { nums: [-2, -10, -8, -3], expected: -10, what: 'all-negative values' },
    { nums: [5000, -5000, 0], expected: -5000, what: 'both bounds of the value range' },
  ])('handles $what', ({ nums, expected }) => {
    expect(solve(nums)).toBe(expected);
  });

  it('finds the minimum of a 5000-element array under every rotation', () => {
    // Sorted base -5000, -4998, …, 4998; rotating keeps -5000 as the minimum.
    const n = 5000;
    const base = Array.from({ length: n }, (_, i) => -5000 + 2 * i);
    for (let k = 1; k <= n; k++) {
      const nums = [...base.slice(n - k), ...base.slice(0, n - k)];
      expect(solve(nums), `rotated ${k} times`).toBe(-5000);
    }
  });
});
