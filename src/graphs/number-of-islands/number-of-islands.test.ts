import { describe, expect, it } from 'vitest';
import { numIslands } from './number-of-islands.ts';

type Solver = (grid: string[][]) => number;

// A second approach is one more row here.
const implementations: [string, Solver][] = [['numIslands', numIslands]];

/** `["110", "001"]` → `[["1","1","0"], ["0","0","1"]]`. A fresh grid per call, so nothing leaks if a solver overwrites it. */
const toGrid = (rows: readonly string[]): string[][] => rows.map((row) => row.split(''));

/** Builds a `size × size` grid from a cell predicate. */
const buildGrid = (size: number, isLand: (r: number, c: number) => boolean): string[][] =>
  Array.from({ length: size }, (_, r) =>
    Array.from({ length: size }, (_, c) => (isLand(r, c) ? '1' : '0')),
  );

describe.each(implementations)('%s', (_name, solve) => {
  it.each([
    { rows: ['11110', '11010', '11000', '00000'], expected: 1 },
    { rows: ['11000', '11000', '00100', '00011'], expected: 3 },
    { rows: ['11001', '10011', '00100', '01011'], expected: 5 },
  ])('counts $expected in $rows (statement example)', ({ rows, expected }) => {
    expect(solve(toGrid(rows))).toBe(expected);
  });

  it.each([
    { rows: ['1'], expected: 1, covers: '1×1 land' },
    { rows: ['0'], expected: 0, covers: '1×1 water' },
    { rows: ['000', '000', '000'], expected: 0, covers: 'all water' },
    { rows: ['1111', '1111', '1111'], expected: 1, covers: 'all land' },
    { rows: ['10101'], expected: 3, covers: 'single row' },
    { rows: ['1', '0', '1', '1'], expected: 2, covers: 'single column' },
    { rows: ['101', '010', '101'], expected: 5, covers: 'diagonal neighbours do not connect' },
    { rows: ['101', '000', '101'], expected: 4, covers: 'land in every corner of the grid' },
    { rows: ['101', '111'], expected: 1, covers: 'two arms that join below' },
    {
      rows: ['111', '001', '111', '100', '111'],
      expected: 1,
      covers: 'snake that turns both ways',
    },
    {
      rows: ['11111', '10001', '10101', '10001', '11111'],
      expected: 2,
      covers: 'island inside a lake inside a ring',
    },
  ])('counts $expected — $covers', ({ rows, expected }) => {
    expect(solve(toGrid(rows))).toBe(expected);
  });

  it('counts one island in a 300×300 grid of all land', () => {
    expect(solve(buildGrid(300, () => true))).toBe(1);
  });

  it('counts 45 000 islands in a 300×300 checkerboard', () => {
    expect(solve(buildGrid(300, (r, c) => (r + c) % 2 === 0))).toBe(45_000);
  });

  it('counts one island in a 300×300 serpentine path', () => {
    // Even rows are full land; odd rows connect them at alternating ends, so the whole
    // grid is one path about 45 000 cells long.
    const grid = buildGrid(300, (r, c) => r % 2 === 0 || (r % 4 === 1 ? c === 299 : c === 0));
    expect(solve(grid)).toBe(1);
  });
});
