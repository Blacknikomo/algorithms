import { describe, expect, it } from 'vitest';
import { createRng, randomArray, randomInt } from '@/shared/utils/random.ts';
import { findMaxAverage, findMaxAverageBrute } from './maximum-average-subarray-i.ts';

type Solver = (nums: readonly number[], k: number) => number;

const implementations: [string, Solver][] = [
  ['findMaxAverage', findMaxAverage],
  // ['findMaxAverageBrute (reference)', findMaxAverageBrute],
];

// Answers within 1e-5 are accepted: toBeCloseTo(x, 5) checks |diff| < 0.5e-5.
const DIGITS = 5;

describe.each(implementations)('%s', (_name, solve) => {
  it.each([
    { nums: [1, 12, -5, -6, 50, 3], k: 4, expected: 12.75 },
    { nums: [5], k: 1, expected: 5 },
    { nums: [-4, -2, -7], k: 2, expected: -3 },
  ])('returns $expected for $nums, k = $k (statement example)', ({ nums, k, expected }) => {
    expect(solve(nums, k)).toBeCloseTo(expected, DIGITS);
  });

  it.each([
    { nums: [-5, -3, -9], k: 1, expected: -3, covers: 'all negative, k = 1' },
    { nums: [-10, -8, -9, -20], k: 3, expected: -9, covers: 'all negative, wider window' },
    { nums: [0, 0, 0], k: 2, expected: 0, covers: 'all zeros' },
    { nums: [7, 7, 7, 7], k: 2, expected: 7, covers: 'all equal' },
    { nums: [1, 2, 3, 4], k: 4, expected: 2.5, covers: 'k = n, a single window' },
    { nums: [3, -1, 7, 2], k: 1, expected: 7, covers: 'k = 1 picks the largest element' },
    { nums: [10, 10, 1, 1, 1], k: 2, expected: 10, covers: 'best window at the start' },
    { nums: [1, 1, 1, 1, 10, 10], k: 2, expected: 10, covers: 'best window at the end' },
    {
      nums: [0, 4, 0, 3, 3],
      k: 2,
      expected: 3,
      covers: 'best window does not contain the largest element',
    },
    { nums: [1, 2, 1], k: 3, expected: 4 / 3, covers: 'non-terminating average' },
    { nums: [10000, 10000, -10000], k: 2, expected: 10000, covers: 'upper range boundary' },
    { nums: [-10000, -10000], k: 2, expected: -10000, covers: 'lower range boundary' },
  ])('returns $expected for $nums, k = $k — $covers', ({ nums, k, expected }) => {
    expect(solve(nums, k)).toBeCloseTo(expected, DIGITS);
  });

  it('finds a single positive window among 10^5 minimum values', () => {
    const nums = Array<number>(100_000).fill(-10000);
    nums.fill(10000, 70_000, 70_100);
    expect(solve(nums, 100)).toBeCloseTo(10000, DIGITS);
  });

  it('handles k = n = 10^5 at the lower boundary', () => {
    expect(solve(Array<number>(100_000).fill(-10000), 100_000)).toBeCloseTo(-10000, DIGITS);
  });
});

// describe('findMaxAverage vs findMaxAverageBrute', () => {
//   it('agrees with the reference implementation on random input', () => {
//     const rng = createRng(20260930);

//     for (let round = 0; round < 500; round++) {
//       const nums = randomArray(rng, randomInt(rng, 1, 15), -20, 20);
//       const k = randomInt(rng, 1, nums.length);

//       expect(findMaxAverage(nums, k), `nums=${JSON.stringify(nums)} k=${k}`).toBeCloseTo(
//         findMaxAverageBrute(nums, k),
//         DIGITS,
//       );
//     }
//   });
// });
