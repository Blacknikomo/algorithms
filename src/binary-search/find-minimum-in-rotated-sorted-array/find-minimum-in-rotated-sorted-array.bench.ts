import { bench, describe } from 'vitest';
import { findMin, findMinFirstAttempt } from './find-minimum-in-rotated-sorted-array.ts';

// Run with `npm run bench`. Worst case for the first attempt on purpose: with the minimum
// just before the middle it moves `left` one step at a time, so it degrades to O(n),
// while the binary search stays at O(log n). Several sizes show how the gap grows.
const makeInput = (n: number) => {
  const sorted = Array.from({ length: n }, (_, i) => i);
  const minIndex = n / 2 - 1;
  return [...sorted.slice(n - minIndex), ...sorted.slice(0, n - minIndex)];
};

describe.each([100, 1_000, 5_000])('find min in rotated sorted array, n = %i', (n) => {
  const nums = makeInput(n);

  bench('binary search vs nums[hi] — O(log n)', () => {
    findMin(nums);
  });

  bench('first attempt — O(n) worst case', () => {
    findMinFirstAttempt(nums);
  });
});
