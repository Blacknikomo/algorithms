import { describe, expect, it } from 'vitest';
import { arrayToList, listToArray, type ListNode } from '@/shared/structures/list-node.ts';
import { reverseList, reverseListRecursive } from './reverse-linked-list.ts';

type Solver = (head: ListNode | null) => ListNode | null;

// A second approach is one more row here. Each test builds a fresh list, so reversing
// in place in one implementation cannot leak into the other.
const implementations: [string, Solver][] = [
  ['reverseList (iterative)', reverseList],
  ['reverseListRecursive', reverseListRecursive],
];

describe.each(implementations)('%s', (_name, solve) => {
  it.each([
    { values: [1, 2, 3, 4, 5], expected: [5, 4, 3, 2, 1] },
    { values: [1, 2], expected: [2, 1] },
    { values: [], expected: [] },
  ])('reverses $values into $expected', ({ values, expected }) => {
    expect(listToArray(solve(arrayToList(values)))).toEqual(expected);
  });

  it.each([
    { name: 'a single node', values: [7], expected: [7] },
    { name: 'an odd-length list', values: [1, 2, 3], expected: [3, 2, 1] },
    { name: 'two equal values', values: [4, 4], expected: [4, 4] },
    { name: 'duplicates (a palindrome)', values: [1, 2, 2, 1], expected: [1, 2, 2, 1] },
    {
      name: 'negative, zero and boundary values',
      values: [-5000, 0, 5000],
      expected: [5000, 0, -5000],
    },
  ])('handles $name', ({ values, expected }) => {
    expect(listToArray(solve(arrayToList(values)))).toEqual(expected);
  });

  it('returns null for an empty list', () => {
    expect(solve(null)).toBeNull();
  });

  it('reverses a 5000-node list', () => {
    const n = 5000;
    const values = Array.from({ length: n }, (_, i) => i + 1);
    expect(listToArray(solve(arrayToList(values)))).toEqual([...values].reverse());
  });
});
