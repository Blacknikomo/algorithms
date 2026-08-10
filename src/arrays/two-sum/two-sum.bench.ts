import { bench, describe } from 'vitest';
import { createRng, randomArray } from '@/shared/utils/random.ts';
import { twoSum, twoSumBrute } from './two-sum.ts';

// Run with `npm run bench`. Worst case on purpose: the answer is the last pair,
// so neither implementation gets to exit early.
const rng = createRng(1);
const nums = randomArray(rng, 1_000, 0, 1_000_000);
const target = (nums[nums.length - 2] as number) + (nums[nums.length - 1] as number);

describe('two sum, n = 1000', () => {
  bench('hash map — O(n)', () => {
    twoSum(nums, target);
  });

  bench('brute force — O(n^2)', () => {
    twoSumBrute(nums, target);
  });
});
