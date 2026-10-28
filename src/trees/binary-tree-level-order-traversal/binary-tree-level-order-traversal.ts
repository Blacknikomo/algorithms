/**
 * Binary Tree Level Order Traversal — see README.md next to this file.
 */
import { TreeNode } from '@/shared/structures/tree-node.ts';

/** BFS. TODO: describe the approach and its complexity. */
export function levelOrder(root: TreeNode | null): number[][] {
  if (!root) return [];

  const result: number[][] = [];
  let queue: TreeNode[] = [root];

  while (queue.length) {
    let level = [];
    let next: TreeNode[] = [];

    for (const item of queue) {
      level.push(item.val);
      if (item.left) next.push(item.left);
      if (item.right) next.push(item.right);
    }

    result.push(level);
    queue = next;
  }

  return result;
}

/** DFS (bonus). TODO: describe the approach and its complexity. */
export function levelOrderDfs(root: TreeNode | null): number[][] {

  const levels: { [k: number]: number[] } = {};

  (function dfs(item: TreeNode | null, level = 0) {
    if (!item) return;

    const { left, right, val } = item;

    if (!levels[level]) levels[level] = [];
    levels[level].push(val);

    if (left) dfs(left, level + 1);
    if (right) dfs(right, level + 1);
  })(root);

  return Object.values(levels);
}
