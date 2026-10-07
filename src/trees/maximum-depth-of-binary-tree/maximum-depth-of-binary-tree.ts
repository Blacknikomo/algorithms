/**
 * Maximum Depth of Binary Tree — see README.md next to this file.
 */
import type { TreeNode } from '@/shared/structures/tree-node.ts';

/**
 * Bottom-up: each call returns the height of its subtree, the parent combines them.
 * TODO: describe the approach and its complexity.
 */
export function maxDepth(root: TreeNode | null): number {
  if (!root) return 0;

  const result = 1 + Math.max(maxDepth(root.left), maxDepth(root.right));

  return result;
}

/**
 * Top-down: the current depth is passed down as an argument, leaves report it.
 * TODO: describe the approach and its complexity.
 */
export function maxDepthTopDown(root: TreeNode | null): number {
  let best = 0;

  (function go(r: TreeNode | null, localMax: number) {
    if (r == null) return null;

    const depth = localMax + 1;
    go(r.left, localMax + 1);
    go(r.right, localMax + 1);

    best = Math.max(best, depth - 1);

    return r;
  })(root, 1);

  return best;
}
