import { describe, expect, it } from 'vitest';
import { createRng } from '@/shared/utils/random.ts';
import {
  calculateProductExceptSelf,
  calculateProductExceptSelfBrute,
  calculateProductExceptSelfOptimized,
} from './product-except-self';

// Every approach gets tested through the same list, so adding a second one costs
// a line here instead of a copy-pasted describe block.
const implementations: [string, typeof calculateProductExceptSelf][] = [
  ['Product except self', calculateProductExceptSelf],
  ['Product except self Optimized', calculateProductExceptSelfOptimized],
  ['Product except self BruteForce', calculateProductExceptSelfBrute],
];

describe.each(implementations)('%s', (_name, solve) => {
  it.each([
    { nums: [1, 2, 3, 4], expected: [24, 12, 8, 6] },
    { nums: [-1, 1, 0, -3, 3], expected: [0, 0, 9, 0, 0] },
  ])('finds $expected in $nums for target $target', ({ nums, expected }) => {
    expect(solve(nums)).toEqual(expected);
  });
});

// A rough timing check, not a benchmark — it lives here so the comparison is one click
// away in the Vitest explorer. For hz / p99 / variance, run `npm run bench`.
//
// Best-of-N rather than an average: the minimum is far less sensitive to the scheduler
// stealing a slice mid-run, which is what makes wall-clock assertions flake. (This is
// why it does not use `measureAverage` from @/shared/utils/measure.ts — that one reports
// the mean and returns void, so there is nothing to assert on.)
function fastestOf(rounds: number, fn: () => unknown): number {
  fn(); // warm up: let the JIT compile before anything is timed
  let best = Infinity;
  for (let i = 0; i < rounds; i++) {
    const start = performance.now();
    fn();
    best = Math.min(best, performance.now() - start);
  }
  return best;
}

describe('relative performance, n = 2000', () => {
  it('the running-prefix loop beats reduce-per-element', () => {
    // Floats near 1 instead of `randomArray`: integer input this long overflows to
    // Infinity within a few dozen multiplications, and then we would be timing NaN
    // arithmetic rather than real products.
    const rng = createRng(1);
    const nums = Array.from({ length: 2_000 }, () => 0.5 + rng());

    const prefixMs = fastestOf(20, () => calculateProductExceptSelf(nums));
    const bruteMs = fastestOf(20, () => calculateProductExceptSelfBrute(nums));

    console.log(
      `prefix ${prefixMs.toFixed(3)} ms vs brute ${bruteMs.toFixed(3)} ms ` +
        `(${(bruteMs / prefixMs).toFixed(2)}x)`,
    );

    // Both are O(n^2); the prefix version just does about half the multiplications.
    expect(prefixMs).toBeLessThan(bruteMs);
  });
});
