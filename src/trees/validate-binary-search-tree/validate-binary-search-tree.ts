/**
 * Validate Binary Search Tree — see README.md next to this file.
 */

import type { TreeNode } from '@/shared/structures/tree-node.ts';

/** TODO: describe the approach and its complexity. */
export function isValidBST(root: TreeNode | null): boolean {
  const check = (node: TreeNode | null, min = -Infinity, max = +Infinity): boolean => {
    if (!node) return true;
    if (node.val <= min || node.val >= max) return false;
    return check(node.left, min, node.val) && check(node.right, node.val, max);
  };

  return check(root);
}
