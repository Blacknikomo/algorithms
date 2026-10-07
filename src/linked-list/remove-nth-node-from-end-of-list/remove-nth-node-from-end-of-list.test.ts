import { describe, expect, it } from 'vitest';
import { arrayToList, listToArray, type ListNode } from '@/shared/structures/list-node.ts';
import { removeNthFromEnd } from './remove-nth-node-from-end-of-list.ts';

type Solver = (head: ListNode | null, n: number) => ListNode | null;

// A second approach is one more row here. Each test builds a fresh list, so unlinking
// in one implementation cannot leak into the other.
const implementations: [string, Solver][] = [['removeNthFromEnd', removeNthFromEnd]];

const nodesOf = (head: ListNode | null): ListNode[] => {
  const nodes: ListNode[] = [];
  for (let node = head; node !== null; node = node.next) nodes.push(node);
  return nodes;
};

describe.each(implementations)('%s', (_name, solve) => {
  it.each([
    { values: [1, 2, 3, 4, 5], n: 2, expected: [1, 2, 3, 5] },
    { values: [1], n: 1, expected: [] },
    { values: [1, 2], n: 1, expected: [1] },
  ])('removes node $n from the end of $values', ({ values, n, expected }) => {
    expect(listToArray(solve(arrayToList(values), n))).toEqual(expected);
  });

  it.each([
    { name: 'removing the head (n = length)', values: [1, 2, 3], n: 3, expected: [2, 3] },
    { name: 'removing the head of a two-node list', values: [1, 2], n: 2, expected: [2] },
    { name: 'removing the tail (n = 1)', values: [1, 2, 3], n: 1, expected: [1, 2] },
    { name: 'removing the exact middle', values: [1, 2, 3, 4, 5], n: 3, expected: [1, 2, 4, 5] },
    { name: 'all-equal values', values: [7, 7, 7, 7], n: 2, expected: [7, 7, 7] },
    { name: 'boundary values', values: [0, 100, 0], n: 2, expected: [0, 0] },
  ])('handles $name', ({ values, n, expected }) => {
    expect(listToArray(solve(arrayToList(values), n))).toEqual(expected);
  });

  it('returns null when the only node is removed', () => {
    expect(solve(arrayToList([42]), 1)).toBeNull();
  });

  it('unlinks the right node and keeps the others (identity, not value)', () => {
    const head = arrayToList([1, 1, 1]);
    const [first, , third] = nodesOf(head);

    expect(nodesOf(solve(head, 2))).toEqual([first, third]);
    expect(nodesOf(head).every((node, i) => node === [first, third][i])).toBe(true);
  });

  it.each([1, 15, 30])('removes node %i from the end of a 30-node list (maximum size)', (n) => {
    const values = Array.from({ length: 30 }, (_, i) => i);
    // Node n from the end of 0..29 holds the value 30 - n.
    const expected = values.filter((value) => value !== 30 - n);
    expect(listToArray(solve(arrayToList(values), n))).toEqual(expected);
  });
});
