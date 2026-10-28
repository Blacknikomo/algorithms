import { describe, expect, it } from 'vitest';
import { TreeNode, arrayToTree } from '@/shared/structures/tree-node.ts';
import { levelOrder, levelOrderDfs } from './binary-tree-level-order-traversal.ts';

type Solver = (root: TreeNode | null) => number[][];

// A second approach is one more row here.
const implementations: [string, Solver][] = [
  ['levelOrder (BFS)', levelOrder],
  ['levelOrderDfs', levelOrderDfs],
];

/** A straight chain of `values.length` nodes, every child on the given side. */
function chain(values: readonly number[], side: 'left' | 'right'): TreeNode | null {
  let root: TreeNode | null = null;
  for (let i = values.length - 1; i >= 0; i--) {
    const node: TreeNode = new TreeNode(values[i] as number);
    node[side] = root;
    root = node;
  }
  return root;
}

/** A perfect tree whose node with BFS index `i` (root = 1) holds `i - 1000`. */
function perfectTree(levels: number, index = 1): TreeNode | null {
  if (index >= 2 ** levels) return null;
  return new TreeNode(
    index - 1000,
    perfectTree(levels, 2 * index),
    perfectTree(levels, 2 * index + 1),
  );
}

describe.each(implementations)('%s', (_name, solve) => {
  // Examples from the statement.
  it.each([
    { tree: [3, 9, 20, null, null, 15, 7], expected: [[3], [9, 20], [15, 7]] },
    { tree: [1], expected: [[1]] },
    { tree: [], expected: [] },
  ])('returns $expected for $tree', ({ tree, expected }) => {
    expect(solve(arrayToTree(tree))).toEqual(expected);
  });

  // Edge cases.
  it.each([
    { tree: [-1000], expected: [[-1000]], note: 'a single node with the minimum value' },
    { tree: [0, -1000, 1000], expected: [[0], [-1000, 1000]], note: 'boundary values' },
    { tree: [1, 2], expected: [[1], [2]], note: 'a single left child' },
    { tree: [1, null, 2], expected: [[1], [2]], note: 'a single right child' },
    { tree: [5, 9, 1], expected: [[5], [9, 1]], note: 'a level in tree order, not sorted' },
    { tree: [1, 1, 1, 1], expected: [[1], [1, 1], [1]], note: 'duplicate values' },
    {
      tree: [1, 2, 3, 4, 5, 6, 7],
      expected: [[1], [2, 3], [4, 5, 6, 7]],
      note: 'a perfect tree',
    },
    {
      tree: [1, 2, 3, 4, null, null, 5],
      expected: [[1], [2, 3], [4, 5]],
      note: 'a level spanning different parents with gaps',
    },
    {
      tree: [1, 2, 3, null, 4, 5, null, 6, null, null, 7],
      expected: [[1], [2, 3], [4, 5], [6, 7]],
      note: 'inner children only',
    },
    {
      tree: [1, 2, 3, null, null, 4, 5, null, null, 6],
      expected: [[1], [2, 3], [4, 5], [6]],
      note: 'the deepest level only under the right subtree',
    },
  ])('returns $expected for $note: $tree', ({ tree, expected }) => {
    expect(solve(arrayToTree(tree))).toEqual(expected);
  });

  // Larger input.
  it('handles a perfect tree of 1023 nodes', () => {
    const levels = 10;
    const expected: number[][] = [];
    for (let level = 0; level < levels; level++) {
      const row: number[] = [];
      for (let i = 2 ** level; i < 2 ** (level + 1); i++) row.push(i - 1000);
      expected.push(row);
    }
    expect(solve(perfectTree(levels))).toEqual(expected);
  });

  it('handles a 2000-node chain of left children (maximum depth)', () => {
    const values = Array.from({ length: 2000 }, (_, i) => i - 1000);
    expect(solve(chain(values, 'left'))).toEqual(values.map((v) => [v]));
  });

  it('handles a 2000-node chain of right children (maximum depth)', () => {
    const values = Array.from({ length: 2000 }, (_, i) => 999 - i);
    expect(solve(chain(values, 'right'))).toEqual(values.map((v) => [v]));
  });
});
