import { describe, expect, it } from 'vitest';
import { TreeNode, arrayToTree, treeToArray } from '@/shared/structures/tree-node.ts';
import { invertTree } from './invert-binary-tree.ts';

type Solver = (root: TreeNode | null) => TreeNode | null;

// A second approach is one more row here.
const implementations: [string, Solver][] = [['invertTree', invertTree]];

/** Level order of a straight chain 1..length, every child on the given side. */
function chain(length: number, side: 'left' | 'right'): (number | null)[] {
  const values: (number | null)[] = [1];
  for (let i = 2; i <= length; i++) {
    values.push(...(side === 'left' ? [i, null] : [null, i]));
  }
  return values;
}

describe.each(implementations)('%s', (_name, solve) => {
  // Examples from the statement.
  it.each([
    { tree: [4, 2, 7, 1, 3, 6, 9], expected: [4, 7, 2, 9, 6, 3, 1] },
    { tree: [2, 1, 3], expected: [2, 3, 1] },
    { tree: [], expected: [] },
  ])('mirrors $tree into $expected', ({ tree, expected }) => {
    expect(treeToArray(solve(arrayToTree(tree)))).toEqual(expected);
  });

  // Edge cases.
  it.each([
    { tree: [1], expected: [1], note: 'a single node' },
    { tree: [1, 2], expected: [1, null, 2], note: 'a lone left child moving right' },
    { tree: [1, null, 2], expected: [1, 2], note: 'a lone right child moving left' },
    { tree: [1, 2, null, 3], expected: [1, null, 2, null, 3], note: 'a left chain' },
    {
      tree: [1, 2, 3, 4, null, null, 5],
      expected: [1, 3, 2, 5, null, null, 4],
      note: 'an asymmetric tree',
    },
    { tree: [1, 2, 3, null, 4, 5], expected: [1, 3, 2, null, 5, 4], note: 'inner grandchildren' },
    {
      tree: [1, 2, 2, 3, 4, 4, 3],
      expected: [1, 2, 2, 3, 4, 4, 3],
      note: 'a symmetric tree (unchanged)',
    },
    {
      tree: [-100, 100, -100, 0],
      expected: [-100, -100, 100, null, null, null, 0],
      note: 'boundary values and duplicates',
    },
  ])('mirrors $note: $tree', ({ tree, expected }) => {
    expect(treeToArray(solve(arrayToTree(tree)))).toEqual(expected);
  });

  // Larger input — the constraints cap the tree at 100 nodes.
  it('turns a 100-node left chain into a right chain', () => {
    expect(treeToArray(solve(arrayToTree(chain(100, 'left'))))).toEqual(chain(100, 'right'));
  });

  it('restores a complete 100-node tree when applied twice', () => {
    const values = Array.from({ length: 100 }, (_, i) => i - 50);
    expect(treeToArray(solve(solve(arrayToTree(values))))).toEqual(values);
  });
});
