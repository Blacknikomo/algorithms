import { describe, expect, it } from 'vitest';
import { createRng, shuffle } from '@/shared/utils/random.ts';
import { topKFrequent } from './top-k-frequent-elements.ts';

type Solver = (nums: readonly number[], k: number) => number[];

// A second approach is one more row here.
const implementations: [string, Solver][] = [['topKFrequent', topKFrequent]];

/** "In any order": compare sorted copies. A duplicated value still changes the length. */
const sorted = (values: readonly number[]): number[] => [...values].sort((a, b) => a - b);

describe.each(implementations)('%s', (_name, solve) => {
  it.each([
    { nums: [1, 1, 1, 2, 2, 3], k: 2, expected: [1, 2] },
    { nums: [1], k: 1, expected: [1] },
    { nums: [4, 4, 4, 6, 6, 1, 1, 1, 1, 7], k: 2, expected: [1, 4] },
  ])('returns $expected for $nums, k = $k (statement example)', ({ nums, k, expected }) => {
    expect(sorted(solve(nums, k))).toEqual(sorted(expected));
  });

  it.each([
    { nums: [5, 5, 5], k: 1, expected: [5], covers: 'all equal' },
    { nums: [4, 3, 2, 1], k: 4, expected: [1, 2, 3, 4], covers: 'all distinct, k = n' },
    { nums: [3, 1, 2, 3], k: 3, expected: [1, 2, 3], covers: 'k = number of distinct values' },
    { nums: [1, 1, 1, 2, 3], k: 1, expected: [1], covers: 'a tie below the cut does not matter' },
    { nums: [2, 1, 2, 3, 1, 2], k: 2, expected: [1, 2], covers: 'equal values are not adjacent' },
    { nums: [1, 2, 3, 3, 3], k: 1, expected: [3], covers: 'most frequent value comes last' },
    { nums: [100, 100, 1, 1, 1], k: 1, expected: [1], covers: 'frequency, not value, decides' },
    { nums: [-1, -1, -2, -3, -3, -3], k: 2, expected: [-3, -1], covers: 'negative values' },
    { nums: [0, 0, 1], k: 1, expected: [0], covers: 'zero is a value like any other' },
    { nums: [-10000, 10000, 10000], k: 1, expected: [10000], covers: 'range boundaries' },
  ])('returns $expected for $nums, k = $k — $covers', ({ nums, k, expected }) => {
    expect(sorted(solve(nums, k))).toEqual(sorted(expected));
  });

  it('finds the 10 most frequent among ~10^5 shuffled values', () => {
    // Value v appears exactly v times for v = 1..446 (99 681 elements in all), so the
    // top 10 are 437..446 and every frequency is distinct.
    const nums = shuffle(
      createRng(20261002),
      Array.from({ length: 446 }, (_, i) => Array<number>(i + 1).fill(i + 1)).flat(),
    );
    expect(nums.length).toBe(99_681);
    expect(sorted(solve(nums, 10))).toEqual([437, 438, 439, 440, 441, 442, 443, 444, 445, 446]);
  });

  it('handles 10^5 copies of one value', () => {
    expect(solve(Array<number>(100_000).fill(-10000), 1)).toEqual([-10000]);
  });
});
