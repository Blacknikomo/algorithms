import { describe, expect, it } from 'vitest';
import { createRng, randomInt, shuffle } from '@/shared/utils/random.ts';
import { searchRotated, searchRotatedBrute } from './search-in-rotated-sorted-array.ts';

type Solver = (nums: readonly number[], target: number) => number;

// A second approach is one more row here.
const implementations: [string, Solver][] = [
  ['searchRotated', searchRotated],
  ['searchRotatedBrute (reference)', searchRotatedBrute],
];

describe.each(implementations)('%s', (_name, solve) => {
  it.each([
    { nums: [4, 5, 6, 7, 0, 1, 2], target: 0, expected: 4 },
    { nums: [4, 5, 6, 7, 0, 1, 2], target: 3, expected: -1 },
    { nums: [1], target: 0, expected: -1 },
  ])('returns $expected for $target in $nums', ({ nums, target, expected }) => {
    expect(solve(nums, target)).toBe(expected);
  });

  it.each([
    { name: 'a single element that matches', nums: [1], target: 1, expected: 0 },
    { name: 'two elements, target second', nums: [3, 1], target: 1, expected: 1 },
    { name: 'two elements, target first', nums: [3, 1], target: 3, expected: 0 },
    { name: 'a non-rotated array', nums: [1, 2, 3, 4, 5], target: 4, expected: 3 },
    { name: 'a non-rotated array without the target', nums: [1, 3, 5], target: 2, expected: -1 },
    { name: 'target at the first position', nums: [4, 5, 6, 7, 0, 1, 2], target: 4, expected: 0 },
    { name: 'target at the last position', nums: [4, 5, 6, 7, 0, 1, 2], target: 2, expected: 6 },
    { name: 'target is the maximum', nums: [4, 5, 6, 7, 0, 1, 2], target: 7, expected: 3 },
    { name: 'minimum at the last position', nums: [2, 3, 4, 5, 1], target: 1, expected: 4 },
    { name: 'minimum at the second position', nums: [5, 1, 2, 3, 4], target: 5, expected: 0 },
    {
      name: 'negative and boundary values',
      nums: [10000, -10000, -5, 0],
      target: -10000,
      expected: 1,
    },
    {
      name: 'a missing target that falls in a gap',
      nums: [5, 6, 1, 2, 3],
      target: 4,
      expected: -1,
    },
  ])('handles $name', ({ nums, target, expected }) => {
    expect(solve(nums, target)).toBe(expected);
  });
});

// Large input calls the fast solution only, so a slow reference cannot time it out.
describe('searchRotated on large input', () => {
  it('finds every value in 5000 elements rotated at 1234', () => {
    // nums = [1234, …, 4999, 0, …, 1233], so value v sits at index (v - 1234 + n) % n.
    const n = 5000;
    const k = 1234;
    const nums = Array.from({ length: n }, (_, i) => (i + k) % n);
    for (let v = 0; v < n; v++) {
      expect(searchRotated(nums, v), `target ${v}`).toBe((v - k + n) % n);
    }
    expect(searchRotated(nums, -1)).toBe(-1);
    expect(searchRotated(nums, n)).toBe(-1);
  });
});

// Stress test: random inputs, fast solution checked against the reference one.
// A fixed seed keeps a failure reproducible.
describe('searchRotated vs searchRotatedBrute', () => {
  it('agrees with the reference implementation on random input', () => {
    const rng = createRng(20261005);
    const pool = Array.from({ length: 41 }, (_, i) => i - 20);

    for (let round = 0; round < 500; round++) {
      // Distinct values: a random subset of [-20, 20], sorted, then rotated at a random k.
      const sorted = shuffle(rng, [...pool])
        .slice(0, randomInt(rng, 1, 12))
        .sort((a, b) => a - b);
      const k = randomInt(rng, 0, sorted.length - 1);
      const nums = [...sorted.slice(k), ...sorted.slice(0, k)];
      const target = randomInt(rng, -25, 25);

      expect(searchRotated(nums, target), `nums=${JSON.stringify(nums)} target=${target}`).toBe(
        searchRotatedBrute(nums, target),
      );
    }
  });
});
