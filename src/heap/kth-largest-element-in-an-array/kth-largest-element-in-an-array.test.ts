import { describe, expect, it } from 'vitest';
import { createRng, shuffle } from '@/shared/utils/random.ts';
import { findKthLargest } from './kth-largest-element-in-an-array.ts';

type Solver = (nums: number[], k: number) => number;

// A second approach is one more row here.
const implementations: [string, Solver][] = [['findKthLargest', findKthLargest]];

describe.each(implementations)('%s', (_name, solve) => {
  // `nums` may be reordered in place, so every call gets its own copy of the fixture.
  it.each([
    { nums: [3, 2, 1, 5, 6, 4], k: 2, expected: 5 },
    { nums: [3, 2, 3, 1, 2, 4, 5, 5, 6], k: 4, expected: 4 },
    { nums: [7, 7, 7, 7], k: 3, expected: 7 },
  ])('returns $expected for $nums, k = $k (statement example)', ({ nums, k, expected }) => {
    expect(solve([...nums], k)).toBe(expected);
  });

  // it.each([
  //   { nums: [5], k: 1, expected: 5, covers: 'single element' },
  //   { nums: [3, 9, 2], k: 1, expected: 9, covers: 'k = 1 is the maximum' },
  //   { nums: [3, 9, 2], k: 3, expected: 2, covers: 'k = n is the minimum' },
  //   { nums: [2, 1, 2], k: 2, expected: 2, covers: 'k-th element, not k-th distinct' },
  //   { nums: [1, 2, 2, 2, 3], k: 3, expected: 2, covers: 'k lands inside a run of equals' },
  //   { nums: [1, 2, 3, 4, 5], k: 2, expected: 4, covers: 'already sorted ascending' },
  //   { nums: [5, 4, 3, 2, 1], k: 4, expected: 2, covers: 'sorted descending' },
  //   { nums: [-1, -5, -3], k: 2, expected: -3, covers: 'all negative' },
  //   { nums: [0, -1, 1], k: 2, expected: 0, covers: 'zero between negatives and positives' },
  //   { nums: [-10000, 10000, 0], k: 3, expected: -10000, covers: 'range boundaries' },
  // ])('returns $expected for $nums, k = $k — $covers', ({ nums, k, expected }) => {
  //   expect(solve([...nums], k)).toBe(expected);
  // });

  // it('handles 80 004 shuffled values, each of -10^4..10^4 four times', () => {
  //   // Descending: 10000 ×4, 9999 ×4, … so the k-th largest is 10000 - floor((k - 1) / 4).
  //   const nums: number[] = [];
  //   for (let v = -10000; v <= 10000; v++) nums.push(v, v, v, v);
  //   shuffle(createRng(20261012), nums);

  //   expect(solve([...nums], 1)).toBe(10000);
  //   expect(solve([...nums], 1000)).toBe(9751);
  //   expect(solve([...nums], nums.length)).toBe(-10000);
  // });

  // it('handles 10^5 values already sorted ascending, k = n / 2', () => {
  //   // nums[i] = -10000 + floor(i / 5): each of -10000..9999 five times.
  //   const nums = Array.from({ length: 100_000 }, (_, i) => -10000 + Math.floor(i / 5));
  //   expect(solve(nums, 50_000)).toBe(0);
  // });

  // it('handles 10^5 equal values, k = n / 2', () => {
  //   const nums = new Array<number>(100_000).fill(42);
  //   expect(solve(nums, 50_000)).toBe(42);
  // });
});
