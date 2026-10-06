import { describe, expect, it } from 'vitest';
import { arrayToList, listToArray, type ListNode } from '@/shared/structures/list-node.ts';
import { mergeTwoLists } from './merge-two-sorted-lists.ts';

type Solver = (list1: ListNode | null, list2: ListNode | null) => ListNode | null;

// A second approach is one more row here. Each test builds fresh lists, so splicing in
// one implementation cannot leak into the other.
const implementations: [string, Solver][] = [['mergeTwoLists', mergeTwoLists]];

const nodesOf = (head: ListNode | null): ListNode[] => {
  const nodes: ListNode[] = [];
  for (let node = head; node !== null; node = node.next) nodes.push(node);
  return nodes;
};

describe.each(implementations)('%s', (_name, solve) => {
  it.each([
    { list1: [1, 2, 4], list2: [1, 3, 4], expected: [1, 1, 2, 3, 4, 4] },
    { list1: [], list2: [], expected: [] },
    { list1: [], list2: [0], expected: [0] },
  ])('merges $list1 and $list2 into $expected', ({ list1, list2, expected }) => {
    expect(listToArray(solve(arrayToList(list1), arrayToList(list2)))).toEqual(expected);
  });

  it.each([
    { name: 'an empty second list', list1: [0], list2: [], expected: [0] },
    { name: 'one node each, second smaller', list1: [2], list2: [1], expected: [1, 2] },
    {
      name: 'every node of list1 smaller',
      list1: [1, 2, 3],
      list2: [4, 5, 6],
      expected: [1, 2, 3, 4, 5, 6],
    },
    {
      name: 'every node of list2 smaller',
      list1: [4, 5, 6],
      list2: [1, 2, 3],
      expected: [1, 2, 3, 4, 5, 6],
    },
    {
      name: 'strictly alternating values',
      list1: [1, 3, 5],
      list2: [2, 4, 6],
      expected: [1, 2, 3, 4, 5, 6],
    },
    {
      name: 'lists of very different length',
      list1: [5],
      list2: [1, 2, 3, 4, 6, 7],
      expected: [1, 2, 3, 4, 5, 6, 7],
    },
    { name: 'all-equal values', list1: [2, 2], list2: [2, 2, 2], expected: [2, 2, 2, 2, 2] },
    {
      name: 'negative and boundary values',
      list1: [-100, 0],
      list2: [-50, 100],
      expected: [-100, -50, 0, 100],
    },
  ])('handles $name', ({ list1, list2, expected }) => {
    expect(listToArray(solve(arrayToList(list1), arrayToList(list2)))).toEqual(expected);
  });

  it('splices the input nodes instead of copying them', () => {
    const list1 = arrayToList([1, 4, 6]);
    const list2 = arrayToList([2, 3, 5, 7]);
    const inputNodes = new Set([...nodesOf(list1), ...nodesOf(list2)]);

    const merged = nodesOf(solve(list1, list2));

    expect(merged.map((node) => node.val)).toEqual([1, 2, 3, 4, 5, 6, 7]);
    expect(merged.every((node) => inputNodes.has(node))).toBe(true);
    expect(new Set(merged).size).toBe(inputNodes.size);
  });

  it('merges two 50-node lists (maximum size)', () => {
    // list1 = -100, -98, …, -2 and list2 = -99, -97, …, -1 interleave into -100 … -1.
    const list1 = Array.from({ length: 50 }, (_, i) => -100 + 2 * i);
    const list2 = Array.from({ length: 50 }, (_, i) => -99 + 2 * i);
    const expected = Array.from({ length: 100 }, (_, i) => -100 + i);
    expect(listToArray(solve(arrayToList(list1), arrayToList(list2)))).toEqual(expected);
  });
});
