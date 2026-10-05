import { describe, expect, it } from 'vitest';
import { trap } from './trapping-rain-water.ts';

type Solver = (height: readonly number[]) => number;

// A second approach is one more row here.
const implementations: [string, Solver][] = [['trap', trap]];

describe.each(implementations)('%s', (_name, solve) => {
  it.each([
    { height: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1], expected: 6 },
    { height: [4, 2, 0, 3, 2, 5], expected: 9 },
  ])('returns $expected for $height', ({ height, expected }) => {
    expect(solve(height)).toBe(expected);
  });

  it.each([
    { name: 'a single bar', height: [5], expected: 0 },
    { name: 'two bars', height: [3, 5], expected: 0 },
    { name: 'all-zero heights', height: [0, 0, 0], expected: 0 },
    { name: 'all-equal heights', height: [3, 3, 3, 3], expected: 0 },
    { name: 'strictly increasing heights', height: [1, 2, 3, 4, 5], expected: 0 },
    { name: 'strictly decreasing heights', height: [5, 4, 3, 2, 1], expected: 0 },
    { name: 'a mountain (peak in the middle)', height: [1, 2, 3, 2, 1], expected: 0 },
    { name: 'a single one-cell valley', height: [3, 0, 3], expected: 3 },
    { name: 'walls of different height', height: [5, 0, 0, 2], expected: 4 },
    { name: 'an inner bar standing in the water', height: [3, 0, 2, 0, 4], expected: 7 },
    { name: 'plateau walls around a flat bottom', height: [2, 2, 0, 0, 2, 2], expected: 4 },
    { name: 'maximum height values', height: [100000, 0, 100000], expected: 100000 },
  ])('handles $name', ({ height, expected }) => {
    expect(solve(height)).toBe(expected);
  });

  it('handles 20 000 bars: two max-height walls around a zero floor', () => {
    const n = 20_000;
    const height = Array.from({ length: n }, (_, i) => (i === 0 || i === n - 1 ? 100_000 : 0));
    expect(solve(height)).toBe(100_000 * (n - 2));
  });
});
