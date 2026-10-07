import { describe, expect, it } from 'vitest';
import { TreeNode, arrayToTree } from '@/shared/structures/tree-node.ts';
import { maxDepth, maxDepthTopDown } from './maximum-depth-of-binary-tree.ts';

type Solver = (root: TreeNode | null) => number;

const implementations: [string, Solver][] = [
  ['maxDepth (bottom-up)', maxDepth],
  ['maxDepthTopDown', maxDepthTopDown],
];

/** A straight chain of `length` nodes, every child on the given side. */
function chain(length: number, side: 'left' | 'right'): TreeNode | null {
  let root: TreeNode | null = null;
  for (let i = length; i >= 1; i--) {
    const node: TreeNode = new TreeNode(i);
    node[side] = root;
    root = node;
  }
  return root;
}

/** A perfect tree with `levels` full levels: 2^levels - 1 nodes. */
function perfectTree(levels: number): TreeNode | null {
  if (levels === 0) return null;
  return new TreeNode(levels, perfectTree(levels - 1), perfectTree(levels - 1));
}

describe.each(implementations)('%s', (_name, solve) => {
  // Examples from the statement.
  it.each([
    { tree: [3, 9, 20, null, null, 15, 7], expected: 3 },
    { tree: [1, null, 2], expected: 2 },
    { tree: [], expected: 0 },
  ])('returns $expected for $tree', ({ tree, expected }) => {
    expect(solve(arrayToTree(tree))).toBe(expected);
  });

  // Edge cases.
  it.each([
    { tree: [0], expected: 1, note: 'a single node' },
    { tree: [1, 2], expected: 2, note: 'a single left child' },
    { tree: [-100, 100, -100], expected: 2, note: 'boundary and negative values' },
    { tree: [1, 2, 3, 4, 5, 6, 7], expected: 3, note: 'a perfect tree' },
    { tree: [1, 2, 3, 4, null, null, null, 5], expected: 4, note: 'the deepest leaf on the left' },
    {
      tree: [1, 2, 3, null, null, null, 4, null, 5],
      expected: 4,
      note: 'the deepest leaf on the right',
    },
    { tree: [1, 2, null, null, 3, 4, null, null, 5], expected: 5, note: 'a zig-zag path' },
    {
      tree: [1, 2, 3, 4, 5, null, 6, null, null, 7],
      expected: 4,
      note: 'the deepest leaf in the middle',
    },
  ])('returns $expected for $note: $tree', ({ tree, expected }) => {
    expect(solve(arrayToTree(tree))).toBe(expected);
  });

  // Larger input.
  it('handles a perfect tree of 8191 nodes', () => {
    expect(solve(perfectTree(13))).toBe(13);
  });

  it('handles a 10^4-node chain of right children (maximum skew)', () => {
    expect(solve(chain(10_000, 'right'))).toBe(10_000);
  });

  it('handles a 10^4-node chain of left children (maximum skew)', () => {
    expect(solve(chain(10_000, 'left'))).toBe(10_000);
  });
});
