import { describe, expect, it, test } from 'vitest';

import { binarySearch } from './binary-search';

const input = [0, 0, 1, 4, 6, 7, 34, 59, 59, 60, 61, 64];

describe('binary search', () => {
  it.each([
    { nums: input, target: 1, expected: 2 },
    { nums: input, target: 34, expected: 6 },
    { nums: input, target: 60, expected: 9 },
    { nums: input, target: 112, expected: -1 },
    { nums: input, target: -23, expected: -1 },
    { nums: [], target: 1, expected: -1 },
  ])('finds $expected in $nums for target $target', ({ nums, target, expected }) => {
    expect(binarySearch(nums, target)).toEqual(expected);
  });

  test('returns error when the 2nd argument is NaN', () => {
    // @ts-expect-error
    expect(() => binarySearch(input, 'Admin123')).toThrowError('Wrong search term');
  });
});
