/**
 * Kth Smallest Element in a BST — see README.md next to this file.
 */

import type { TreeNode } from '@/shared/structures/tree-node.ts';

/** TODO: describe the approach and its complexity. */
// { tree: [3, 1, 4, null, 2], k: 1, expected: 1 },
// { tree: [5, 3, 6, 2, 4, null, null, 1], k: 3, expected: 3 },
// { tree: [1, null, 2, null, 3, null, 4], k: 4, expected: 4 },
export function kthSmallestBrute(root: TreeNode | null, k: number): number {
  if (!root) throw new Error('No root provided');

  const storage: number[] = [];
  const check = (node: TreeNode) => {
    if (!node) return null;

    if (node.left) check(node.left);
    if (node.right) check(node.right);

    storage.push(node.val);
  };

  check(root);

  return storage.sort((a, b) => a - b).at(k - 1)!;
}

/** TODO: describe the approach and its complexity. */
export function kthSmallest(root: TreeNode | null, k: number): number {
  if (!root) throw new Error('No root provided');
  let result = 0;
  let counter = 0;

  const check = (node: TreeNode) => {
    if (!node) return null;
    if (counter > k) return null;

    if (node.left) {
      check(node.left);
    }
    counter++;
    if (counter === k) {
      result = node.val;
    }

    if (node.right) {
      check(node.right);
    }
  };

  check(root);
  return result;
}
