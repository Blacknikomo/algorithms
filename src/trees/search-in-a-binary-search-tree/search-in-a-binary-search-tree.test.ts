import { describe, expect, it } from 'vitest';
import { TreeNode, arrayToTree, treeToArray } from '@/shared/structures/tree-node.ts';
import { searchBST } from './search-in-a-binary-search-tree.ts';

type Solver = (root: TreeNode | null, val: number) => TreeNode | null;

// A second approach is one more row here.
const implementations: [string, Solver][] = [['searchBST', searchBST]];

/**
 * A height-balanced BST holding the sorted `values`. Every node it creates is
 * recorded in `byValue`, so a test can assert the exact node that must come back.
 */
function balancedBst(
  values: readonly number[],
  byValue: Map<number, TreeNode>,
  lo = 0,
  hi = values.length - 1,
): TreeNode | null {
  if (lo > hi) return null;
  const mid = (lo + hi) >> 1;
  const node = new TreeNode(values[mid] as number);
  byValue.set(node.val, node);
  node.left = balancedBst(values, byValue, lo, mid - 1);
  node.right = balancedBst(values, byValue, mid + 1, hi);
  return node;
}

describe.each(implementations)('%s', (_name, solve) => {
  // Examples from the statement.
  it.each([
    { tree: [4, 2, 7, 1, 3], val: 2, expected: [2, 1, 3] },
    { tree: [4, 2, 7, 1, 3], val: 5, expected: [] },
  ])('returns $expected for $val in $tree', ({ tree, val, expected }) => {
    expect(treeToArray(solve(arrayToTree(tree), val))).toEqual(expected);
  });

  // Edge cases.
  it.each([
    { tree: [1], val: 1, expected: [1], note: 'a single node that matches' },
    { tree: [1], val: 2, expected: [], note: 'a single node that does not match' },
    { tree: [4, 2, 7, 1, 3], val: 4, expected: [4, 2, 7, 1, 3], note: 'a match at the root' },
    { tree: [4, 2, 7, 1, 3], val: 7, expected: [7], note: 'a match at a right leaf' },
    { tree: [8, 4, 12, 2, 6, 10, 14], val: 6, expected: [6], note: 'a leaf on an inner path' },
    { tree: [8, 4, 12, 2, 6, 10, 14], val: 1, expected: [], note: 'a value below the minimum' },
    { tree: [8, 4, 12, 2, 6, 10, 14], val: 15, expected: [], note: 'a value above the maximum' },
    { tree: [8, 4, 12, 2, 6, 10, 14], val: 9, expected: [], note: 'a value between two keys' },
    { tree: [5, 3, null, 2, null, 1], val: 1, expected: [1], note: 'the bottom of a left chain' },
    {
      tree: [1, null, 10_000_000],
      val: 10_000_000,
      expected: [10_000_000],
      note: 'the maximum allowed value',
    },
  ])('returns $expected for $note', ({ tree, val, expected }) => {
    expect(treeToArray(solve(arrayToTree(tree), val))).toEqual(expected);
  });

  it('returns the node from the tree itself, not a copy', () => {
    const root = arrayToTree([4, 2, 7, 1, 3]);
    expect(solve(root, 2)).toBe(root?.left);
  });

  // Larger input.
  it('finds every key of a balanced BST of 5000 nodes', () => {
    const byValue = new Map<number, TreeNode>();
    const values = Array.from({ length: 5000 }, (_, i) => i * 2 + 1);
    const root = balancedBst(values, byValue);
    for (const value of values) {
      expect(solve(root, value)).toBe(byValue.get(value));
    }
  });

  it('misses every gap of a balanced BST of 5000 nodes', () => {
    const values = Array.from({ length: 5000 }, (_, i) => i * 2 + 1);
    const root = balancedBst(values, new Map());
    for (let gap = 2; gap <= 10_000; gap += 2) {
      expect(solve(root, gap)).toBeNull();
    }
  });

  it('finds the last node of a 5000-node right chain (maximum skew)', () => {
    let root: TreeNode | null = null;
    for (let value = 5000; value >= 1; value--) root = new TreeNode(value, null, root);
    let last = root as TreeNode;
    while (last.right) last = last.right;
    expect(solve(root, 5000)).toBe(last);
  });
});
