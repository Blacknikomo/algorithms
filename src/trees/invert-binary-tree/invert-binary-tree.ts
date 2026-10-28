/**
 * Invert Binary Tree — see README.md next to this file.
 */
import type { TreeNode } from '@/shared/structures/tree-node.ts';

/** TODO: describe the approach and its complexity. */
export function invertTree(root: TreeNode | null): TreeNode | null {
  const queue: TreeNode[] = root ? [root] : [];

  while (queue.length) {
    const element: TreeNode = queue.splice(0, 1)[0];
    const { left, right } = element;

    if (left) queue.push(left);
    if (right) queue.push(right);

    element.right = left;
    element.left = right;
  }

  return root;
}
