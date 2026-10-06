import { describe, expect, it } from 'vitest';
import { arrayToCyclicList, type ListNode } from '@/shared/structures/list-node.ts';
import { detectCycle } from './linked-list-cycle-ii.ts';

type Solver = (head: ListNode | null) => ListNode | null;

// A second approach is one more row here. Each test builds a fresh list.
const implementations: [string, Solver][] = [['detectCycle', detectCycle]];

/** The first `n` nodes in list order — safe on a cyclic list because it stops after `n`. */
const firstNodes = (head: ListNode | null, n: number): ListNode[] => {
  const nodes: ListNode[] = [];
  for (let node = head; node !== null && nodes.length < n; node = node.next) nodes.push(node);
  return nodes;
};

/** Builds the list and returns it with the node the answer must be (`null` when pos = -1). */
const build = (values: number[], pos: number) => {
  const head = arrayToCyclicList(values, pos);
  const expected = pos === -1 ? null : (firstNodes(head, values.length)[pos] as ListNode);
  return { head, expected };
};

describe.each(implementations)('%s', (_name, solve) => {
  it.each([
    { values: [3, 2, 0, -4], pos: 1 },
    { values: [1, 2], pos: 0 },
    { values: [1], pos: -1 },
  ])('finds the node at pos $pos in $values', ({ values, pos }) => {
    const { head, expected } = build(values, pos);
    expect(solve(head)).toBe(expected);
  });

  it.each([
    { name: 'an empty list', values: [], pos: -1 },
    { name: 'a single node pointing at itself', values: [1], pos: 0 },
    { name: 'a longer list without a cycle', values: [1, 2, 3, 4], pos: -1 },
    { name: 'the whole list as the cycle (tail -> head)', values: [1, 2, 3, 4, 5], pos: 0 },
    { name: 'the tail pointing at itself', values: [1, 2, 3, 4, 5], pos: 4 },
    { name: 'a long tail into a two-node cycle', values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], pos: 8 },
    { name: 'an odd-length cycle', values: [1, 2, 3, 4, 5, 6], pos: 3 },
    { name: 'repeated values (identity, not value)', values: [7, 7, 7, 7], pos: 2 },
    { name: 'boundary values', values: [-100000, 100000, 0], pos: 1 },
  ])('handles $name', ({ values, pos }) => {
    const { head, expected } = build(values, pos);
    expect(solve(head)).toBe(expected);
  });

  it('does not modify the list', () => {
    const values = [3, 2, 0, -4, 5];
    const { head } = build(values, 2);
    const before = firstNodes(head, values.length).map((node) => [node.val, node.next]);

    solve(head);

    expect(firstNodes(head, values.length).map((node) => [node.val, node.next])).toEqual(before);
  });

  it('finds the cycle start in a 10 000-node list', () => {
    const values = Array.from({ length: 10_000 }, (_, i) => i % 100);
    const { head, expected } = build(values, 6789);
    expect(solve(head)).toBe(expected);
  });
});
