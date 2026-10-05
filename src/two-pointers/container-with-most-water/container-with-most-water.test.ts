import { describe, expect, it } from 'vitest';
import { maxArea } from './container-with-most-water.ts';

type Solver = (height: readonly number[]) => number;

// A second approach is one more row here.
const implementations: [string, Solver][] = [['maxArea', maxArea]];

describe.each(implementations)('%s', (_name, solve) => {
  it.each([
    { height: [1, 8, 6, 2, 5, 4, 8, 3, 7], expected: 49 },
    { height: [1, 1], expected: 1 },
  ])('returns $expected for $height', ({ height, expected }) => {
    expect(solve(height)).toBe(expected);
  });

  it.each([
    { name: 'two lines of different height', height: [3, 9], expected: 3 },
    { name: 'two zero-height lines', height: [0, 0], expected: 0 },
    { name: 'a single non-zero line among zeros', height: [0, 5, 0], expected: 0 },
    { name: 'all-equal heights', height: [4, 4, 4, 4, 4], expected: 16 },
    { name: 'strictly increasing heights', height: [1, 2, 3, 4, 5], expected: 6 },
    { name: 'strictly decreasing heights', height: [5, 4, 3, 2, 1], expected: 6 },
    { name: 'answer at the two outermost lines', height: [5, 1, 1, 1, 5], expected: 20 },
    { name: 'answer at two adjacent middle lines', height: [1, 9, 9, 1], expected: 9 },
    {
      name: 'a wide short container beating the tallest line',
      height: [1, 20, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      expected: 10,
    },
    { name: 'the best pair hidden in the middle', height: [2, 3, 4, 5, 18, 17, 6], expected: 17 },
    { name: 'maximum height values', height: [10000, 10000], expected: 10000 },
  ])('handles $name', ({ height, expected }) => {
    expect(solve(height)).toBe(expected);
  });

  it('handles 10 000 increasing lines in linear time', () => {
    // height[i] = i + 1; pairing line k-1 with the last line gives k * (n - k), max at k = n / 2.
    const n = 10_000;
    const height = Array.from({ length: n }, (_, i) => i + 1);
    expect(solve(height)).toBe((n / 2) * (n / 2));
  });
});
