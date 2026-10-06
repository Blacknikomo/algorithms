import { bench, describe } from 'vitest';
import { searchRotated, searchRotatedBrute } from './search-in-rotated-sorted-array.ts';

// Run with `npm run bench`. Sorted 0..n-1 rotated at the middle; the target is the last
// element, so a left-to-right scan pays the full O(n). Several sizes show how the gap grows.
const makeInput = (n: number) => {
  const k = Math.floor(n / 2);
  return Array.from({ length: n }, (_, i) => (i + k) % n);
};

describe.each([100, 1_000, 5_000])('search in rotated sorted array, n = %i', (n) => {
  const nums = makeInput(n);
  const target = nums[n - 1] as number;

  bench('searchRotated — target O(log n)', () => {
    searchRotated(nums, target);
  });

  bench('searchRotatedBrute — O(n)', () => {
    searchRotatedBrute(nums, target);
  });
});
