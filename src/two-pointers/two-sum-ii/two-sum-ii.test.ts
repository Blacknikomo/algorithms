import { describe, expect, it } from 'vitest';
import { createRng, randomArray, randomInt } from '@/shared/utils/random.ts';
import { twoSumII, twoSumIIBrute } from './two-sum-ii.ts';

type Solver = (numbers: readonly number[], target: number) => number[];

const implementations: [string, Solver][] = [
  ['twoSumII', twoSumII],
  // ['twoSumIIBrute (reference)', twoSumIIBrute],
];

/** Number of index pairs i < j with numbers[i] + numbers[j] === target. */
function countPairs(numbers: readonly number[], target: number): number {
  let count = 0;
  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      if ((numbers[i] as number) + (numbers[j] as number) === target) count++;
    }
  }
  return count;
}

describe.each(implementations)('%s', (_name, solve) => {
  it.each([
    { numbers: [2, 7, 11, 15], target: 9, expected: [1, 2] },
    { numbers: [2, 3, 4], target: 6, expected: [1, 3] },
    { numbers: [-1, 0], target: -1, expected: [1, 2] },
  ])(
    'returns $expected for $numbers, target $target (statement example)',
    ({ numbers, target, expected }) => {
      expect(solve(numbers, target)).toEqual(expected);
    },
  );

  it.each([
    {
      numbers: [-1000, 1000],
      target: 0,
      expected: [1, 2],
      covers: 'minimum size, range boundaries',
    },
    {
      numbers: [-1000, -1000, 5, 1000],
      target: -2000,
      expected: [1, 2],
      covers: 'smallest possible sum',
    },
    {
      numbers: [1, 3, 5],
      target: 6,
      expected: [1, 3],
      covers: 'not using the middle element twice',
    },
    {
      numbers: [1, 2, 3, 4, 50, 60],
      target: 110,
      expected: [5, 6],
      covers: 'answer at the last two positions',
    },
    {
      numbers: [1, 4, 5, 6, 20],
      target: 21,
      expected: [1, 5],
      covers: 'answer at the first and last positions',
    },
    {
      numbers: [-9, -7, -4, -2, -1],
      target: -6,
      expected: [3, 4],
      covers: 'all-negative input, answer in the middle',
    },
    { numbers: [-3, 0, 1, 2, 7], target: -1, expected: [1, 4], covers: 'pair crosses zero' },
    { numbers: [0, 0, 3, 4], target: 0, expected: [1, 2], covers: 'equal values form the pair' },
    {
      numbers: [1, 1, 1, 1, 2, 9],
      target: 11,
      expected: [5, 6],
      covers: 'answer after a run of duplicates',
    },
  ])(
    'returns $expected for $numbers, target $target — $covers',
    ({ numbers, target, expected }) => {
      expect(solve(numbers, target)).toEqual(expected);
    },
  );

  it('handles the maximum size with long runs of duplicates around the answer', () => {
    // 14 999 × -1000, then 7 and 993, then 14 999 × 1000: only 7 + 993 reaches 1000.
    const numbers = [
      ...Array<number>(14_999).fill(-1000),
      7,
      993,
      ...Array<number>(14_999).fill(1000),
    ];
    expect(numbers.length).toBe(30_000);
    expect(solve(numbers, 1000)).toEqual([15_000, 15_001]);
  });
});

// describe('twoSumII vs twoSumIIBrute', () => {
//   it('agrees with the reference implementation on random input', () => {
//     const rng = createRng(20260929);

//     let checked = 0;
//     while (checked < 500) {
//       const numbers = randomArray(rng, randomInt(rng, 2, 12), -10, 10).sort((a, b) => a - b);
//       const i = randomInt(rng, 0, numbers.length - 2);
//       const j = randomInt(rng, i + 1, numbers.length - 1);
//       const target = (numbers[i] as number) + (numbers[j] as number);

//       // The statement guarantees exactly one solution — skip inputs that break it.
//       if (countPairs(numbers, target) !== 1) continue;
//       checked++;

//       const message = `numbers=${JSON.stringify(numbers)} target=${target}`;
//       expect(twoSumII(numbers, target), message).toEqual(twoSumIIBrute(numbers, target));
//     }
//   });
// });
