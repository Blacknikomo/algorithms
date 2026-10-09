/**
 * Search in a Binary Search Tree — see README.md next to this file.
 */

import type { TreeNode } from '@/shared/structures/tree-node.ts';

/** TODO: describe the approach and its complexity. */
export function searchBST(root: TreeNode | null, val: number): TreeNode | null {
  if (!root) return null;
  if (root.val === val) return root;
  return searchBST(root.val > val ? root.left : root.right, val);
}
  