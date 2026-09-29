import { describe, expect, it } from 'vitest';
import { createRng, randomArray, randomInt, shuffle } from '@/shared/utils/random.ts';
import { threeSum, threeSumBrute } from './three-sum.ts';

type Solver = (nums: readonly number[]) => number[][];

const implementations: [string, Solver][] = [
  ['threeSum', threeSum],
  // ['threeSumBrute (reference)', threeSumBrute],
];

/**
 * Order doesn't matter — neither of the triplets nor inside one — so sort both levels
 * before comparing. A duplicated triplet survives this and changes the length, so
 * `toEqual` still catches it. `+ 0` turns `-0` into `0`, which `toEqual` tells apart.
 */
function normalize(triplets: readonly (readonly number[])[]): number[][] {
  return triplets
    .map((triplet) => triplet.map((x) => x + 0).sort((a, b) => a - b))
    .sort(
      (a, b) =>
        (a[0] as number) - (b[0] as number) ||
        (a[1] as number) - (b[1] as number) ||
        (a[2] as number) - (b[2] as number),
    );
}

describe.each(implementations)('%s', (_name, solve) => {
  it.each([
    {
      nums: [-1, 0, 1, 2, -1, -4],
      expected: [
        [-1, -1, 2],
        [-1, 0, 1],
      ],
    },
    { nums: [0, 1, 1], expected: [] },
    { nums: [0, 0, 0], expected: [[0, 0, 0]] },
  ])('returns $expected for $nums (statement example)', ({ nums, expected }) => {
    expect(normalize(solve(nums))).toEqual(normalize(expected));
  });

  it.each([
    { nums: [-1, 0, 1], expected: [[-1, 0, 1]], covers: 'minimum size with an answer' },
    { nums: [1, 2, 3], expected: [], covers: 'all positive, no answer' },
    { nums: [-5, -3, -1], expected: [], covers: 'all negative, no answer' },
    { nums: [-2, 1, 3, 4], expected: [], covers: 'an element cannot be used twice (-2 + 1 + 1)' },
    {
      nums: [0, 0, -1, 1],
      expected: [[-1, 0, 1]],
      covers: 'two zeros are not enough for [0, 0, 0]',
    },
    { nums: [0, 0, 0, 0, 0], expected: [[0, 0, 0]], covers: 'many zeros give one triplet' },
    {
      nums: [-2, 0, 0, 2, 2],
      expected: [[-2, 0, 2]],
      covers: 'duplicates on both sides give one triplet',
    },
    {
      nums: [3, 2, 1, 0, -1, -2, -3],
      expected: [
        [-3, 0, 3],
        [-3, 1, 2],
        [-2, -1, 3],
        [-2, 0, 2],
        [-1, 0, 1],
      ],
      covers: 'reverse-sorted input, triplets sharing elements',
    },
    {
      nums: [-100000, 0, 50000, 50000, 100000],
      expected: [
        [-100000, 0, 100000],
        [-100000, 50000, 50000],
      ],
      covers: 'range boundaries',
    },
  ])('returns $expected for $nums — $covers', ({ nums, expected }) => {
    expect(normalize(solve(nums))).toEqual(normalize(expected));
  });
});

// Maximum size — threeSum only: the O(n^3) reference would take minutes here.
describe('threeSum at the maximum size', () => {
  it('finds the single triplet among 3000 zeros', () => {
    expect(normalize(threeSum(Array<number>(3000).fill(0)))).toEqual([[0, 0, 0]]);
  });

  it('finds the single triplet among 1500 × -1 and 1500 × 2, shuffled', () => {
    // -1 + -1 + 2 is the only zero sum these two values can make.
    const nums = shuffle(createRng(20260929), [
      ...Array<number>(1500).fill(-1),
      ...Array<number>(1500).fill(2),
    ]);
    expect(normalize(threeSum(nums))).toEqual([[-1, -1, 2]]);
  });
});

// describe('threeSum vs threeSumBrute', () => {
//   it('agrees with the reference implementation on random input', () => {
//     const rng = createRng(20260929);

//     for (let round = 0; round < 500; round++) {
//       const nums = randomArray(rng, randomInt(rng, 3, 10), -6, 6);
//       expect(normalize(threeSum(nums)), `nums=${JSON.stringify(nums)}`).toEqual(
//         normalize(threeSumBrute(nums)),
//       );
//     }
//   });
// });
