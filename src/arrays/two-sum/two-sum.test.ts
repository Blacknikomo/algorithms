import { describe, expect, it } from 'vitest';
import { createRng, randomArray, randomInt } from '@/shared/utils/random.ts';
import { twoSum, twoSumBrute } from './two-sum.ts';

type Solver = (nums: readonly number[], target: number) => [number, number] | null;

// Every approach gets tested through the same list, so adding a second one costs
// a line here instead of a copy-pasted describe block.
const implementations: [string, Solver][] = [
  ['twoSum (hash map)', twoSum],
  ['twoSumBrute (reference)', twoSumBrute],
];

describe.each(implementations)('%s', (_name, solve) => {
  it.each([
    { nums: [2, 7, 11, 15], target: 9, expected: [0, 1] },
    { nums: [3, 2, 4], target: 6, expected: [1, 2] },
    { nums: [3, 3], target: 6, expected: [0, 1] },
    { nums: [-1, -2, -3, -4, -5], target: -8, expected: [2, 4] },
  ])('finds $expected in $nums for target $target', ({ nums, target, expected }) => {
    expect(solve(nums, target)).toEqual(expected);
  });

  it.each([
    { nums: [], target: 0 },
    { nums: [1], target: 1 },
    { nums: [1, 2, 3], target: 100 },
  ])('returns null when no pair adds up to $target', ({ nums, target }) => {
    expect(solve(nums, target)).toBeNull();
  });

  it('does not use the same element twice', () => {
    expect(solve([5, 1, 2], 10)).toBeNull();
  });
});

// Stress test: random inputs, fast solution checked against the reference one.
// A fixed seed keeps a failure reproducible.
describe('twoSum vs twoSumBrute', () => {
  it('agrees with the reference implementation on random input', () => {
    const rng = createRng(20260810);

    for (let round = 0; round < 500; round++) {
      const nums = randomArray(rng, randomInt(rng, 0, 12), -10, 10);
      const target = randomInt(rng, -20, 20);

      const fast = twoSum(nums, target);
      const reference = twoSumBrute(nums, target);

      // Indices may differ (several valid pairs), so compare the property that matters:
      // either both find nothing, or both return a genuinely valid pair.
      if (reference === null) {
        expect(fast, `nums=${JSON.stringify(nums)} target=${target}`).toBeNull();
      } else {
        expect(fast, `nums=${JSON.stringify(nums)} target=${target}`).not.toBeNull();
        const [i, j] = fast as [number, number];
        expect(i).not.toBe(j);
        expect((nums[i] as number) + (nums[j] as number)).toBe(target);
      }
    }
  });
});
