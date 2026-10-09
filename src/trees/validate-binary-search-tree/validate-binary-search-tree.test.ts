import { describe, expect, it } from 'vitest';
import { TreeNode, arrayToTree } from '@/shared/structures/tree-node.ts';
import { isValidBST } from './validate-binary-search-tree.ts';

type Solver = (root: TreeNode | null) => boolean;

// A second approach is one more row here.
const implementations: [string, Solver][] = [['isValidBST', isValidBST]];

const INT_MIN = -(2 ** 31);
const INT_MAX = 2 ** 31 - 1;

/** A height-balanced BST holding `values[lo..hi]`, which must be sorted ascending. */
function balancedBst(values: readonly number[], lo = 0, hi = values.length - 1): TreeNode | null {
  if (lo > hi) return null;
  const mid = (lo + hi) >> 1;
  return new TreeNode(
    values[mid] as number,
    balancedBst(values, lo, mid - 1),
    balancedBst(values, mid + 1, hi),
  );
}

/** A straight chain, every child on the given side, values in the given order from the root. */
function chain(values: readonly number[], side: 'left' | 'right'): TreeNode | null {
  let root: TreeNode | null = null;
  for (let i = values.length - 1; i >= 0; i--) {
    const node: TreeNode = new TreeNode(values[i] as number);
    node[side] = root;
    root = node;
  }
  return root;
}

describe.each(implementations)('%s', (_name, solve) => {
  // Examples from the statement.
  it.each([
    { tree: [2, 1, 3], expected: true },
    { tree: [5, 1, 4, null, null, 3, 6], expected: false },
    { tree: [5, 4, 6, null, null, 3, 7], expected: false },
  ])('returns $expected for $tree', ({ tree, expected }) => {
    expect(solve(arrayToTree(tree))).toBe(expected);
  });

  // Edge cases.
  it.each([
    { tree: [0], expected: true, note: 'a single node' },
    { tree: [INT_MIN], expected: true, note: 'a single node holding the minimum value' },
    { tree: [INT_MAX], expected: true, note: 'a single node holding the maximum value' },
    { tree: [0, INT_MIN, INT_MAX], expected: true, note: 'both range boundaries as children' },
    { tree: [INT_MAX, INT_MAX], expected: false, note: 'a duplicate at the maximum value' },
    { tree: [2, 2], expected: false, note: 'a left child equal to its parent' },
    { tree: [2, null, 2], expected: false, note: 'a right child equal to its parent' },
    { tree: [5, 3, 7, null, null, 5], expected: false, note: 'a node equal to a grandparent' },
    { tree: [5, 3, null, 1, 6], expected: false, note: 'a deep left-subtree node above the root' },
    // { tree: [-1, -3, 0, -4, -2], expected: true, note: 'negative values' },
    // { tree: [3, 2, null, 1], expected: true, note: 'a descending left chain' },
    // { tree: [3, 1, 5, 0, 2, 4, 6], expected: true, note: 'a perfect valid BST' },
  ])('returns $expected for $note: $tree', ({ tree, expected }) => {
    expect(solve(arrayToTree(tree))).toBe(expected);
  });

  // Larger input.
  it('accepts a balanced BST of 10^4 nodes', () => {
    const values = Array.from({ length: 10_000 }, (_, i) => i * 2 - 10_000);
    expect(solve(balancedBst(values))).toBe(true);
  });

  it('rejects a balanced BST of 10^4 nodes with its smallest and largest values swapped', () => {
    const values = Array.from({ length: 10_000 }, (_, i) => i * 2 - 10_000);
    [values[0], values[9_999]] = [values[9_999] as number, values[0] as number];
    expect(solve(balancedBst(values))).toBe(false);
  });
});
