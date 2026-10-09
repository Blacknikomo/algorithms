import { describe, expect, it } from 'vitest';
import { TreeNode, arrayToTree } from '@/shared/structures/tree-node.ts';
import { kthSmallest, kthSmallestBrute } from './kth-smallest-element-in-a-bst.ts';

type Solver = (root: TreeNode | null, k: number) => number;

// A second approach is one more row here.
const implementations: [string, Solver][] = [
  ['kthSmallest', kthSmallest],
  ['kthSmallestBrute (reference)', kthSmallestBrute],
];

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
    { tree: [3, 1, 4, null, 2], k: 1, expected: 1 },
    { tree: [5, 3, 6, 2, 4, null, null, 1], k: 3, expected: 3 },
    { tree: [1, null, 2, null, 3, null, 4], k: 4, expected: 4 },
  ])('returns $expected for k = $k in $tree', ({ tree, k, expected }) => {
    expect(solve(arrayToTree(tree), k)).toBe(expected);
  });

  // Edge cases.
  it.each([
    { tree: [7], k: 1, expected: 7, note: 'a single node' },
    { tree: [0, null, 10_000], k: 1, expected: 0, note: 'the minimum value 0' },
    { tree: [0, null, 10_000], k: 2, expected: 10_000, note: 'the maximum value 10^4' },
    { tree: [3, 1, 4, null, 2], k: 4, expected: 4, note: 'k = n' },
    { tree: [5, 3, 6, 2, 4, null, null, 1], k: 5, expected: 5, note: 'the answer at the root' },
    {
      tree: [5, 3, 6, 2, 4, null, null, 1],
      k: 4,
      expected: 4,
      note: 'a right child in the left subtree',
    },
    { tree: [4, 3, null, 2, null, 1], k: 1, expected: 1, note: 'the bottom of a left chain' },
    { tree: [1, null, 3, 2], k: 2, expected: 2, note: 'a left child in the right subtree' },
  ])('returns $expected for $note', ({ tree, k, expected }) => {
    expect(solve(arrayToTree(tree), k)).toBe(expected);
  });

  it('returns every rank of a perfect BST', () => {
    const tree = [40, 20, 60, 10, 30, 50, 70];
    const sorted = [10, 20, 30, 40, 50, 60, 70];
    sorted.forEach((value, i) => {
      expect(solve(arrayToTree(tree), i + 1)).toBe(value);
    });
  });

  // Larger input.
  it('finds the first, middle and last rank of a balanced BST of 10^4 nodes', () => {
    const values = Array.from({ length: 10_000 }, (_, i) => i);
    const root = balancedBst(values);
    expect(solve(root, 1)).toBe(0);
    expect(solve(root, 5_000)).toBe(4_999);
    expect(solve(root, 10_000)).toBe(9_999);
  });

  it('finds k = 1 at the bottom of a 10^4-node left chain (maximum skew)', () => {
    const values = Array.from({ length: 10_000 }, (_, i) => 10_000 - i);
    expect(solve(chain(values, 'left'), 1)).toBe(1);
  });

  it('finds k = n at the bottom of a 10^4-node right chain (maximum skew)', () => {
    const values = Array.from({ length: 10_000 }, (_, i) => i + 1);
    expect(solve(chain(values, 'right'), 10_000)).toBe(10_000);
  });
});
