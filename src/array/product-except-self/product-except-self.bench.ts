import { bench, describe } from 'vitest';
import { createRng } from '@/shared/utils/random.ts';
import {
  calculateProductExceptSelf,
  calculateProductExceptSelfBrute,
  calculateProductExceptSelfOptimized,
} from './product-except-self.ts';

// Run with `npm run bench`. Several sizes on purpose: the two quadratic approaches differ
// only by a constant factor, so the number that matters is how each one grows against the
// linear one as n climbs.
//
// Values sit in [0.5, 1.5) instead of coming from `randomArray`: integer inputs of this
// length overflow to Infinity within the first few dozen multiplications, and the
// benchmark would then be timing Infinity/NaN arithmetic instead of real products.
const rng = createRng(1);
const makeInput = (length: number) => Array.from({ length }, () => 0.5 + rng());

describe.each([100, 1_000, 4_000])('product except self, n = %i', (n) => {
  const nums = makeInput(n);

  bench('two-pass prefix/suffix arrays — O(n)', () => {
    calculateProductExceptSelfOptimized(nums);
  });

  bench('running prefix + inner suffix loop — O(n^2)', () => {
    calculateProductExceptSelf(nums);
  });

  bench('reduce over the whole array per element — O(n^2)', () => {
    calculateProductExceptSelfBrute(nums);
  });
});
