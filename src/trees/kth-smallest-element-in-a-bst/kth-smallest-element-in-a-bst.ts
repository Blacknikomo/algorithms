/**
 * Kth Smallest Element in a BST — see README.md next to this file.
 */

import { TreeNode } from '@/shared/structures/tree-node.ts';

/** TODO: describe the approach and its complexity. */
export function kthSmallestBrute(root: TreeNode | null, k: number): number {
  const results = [];
  const queue: TreeNode[] = root ? [root!] : [];

  let head = 0;
  while (head < queue.length) {
    const el = queue[head++];
    const { left, right } = el;

    if (left) queue.push(left);
    if (right) queue.push(right);

    results.push(el.val);
  }

  return results.sort((a, b) => a - b)[k - 1];
}

/** TODO: describe the approach and its complexity. */
export function kthSmallest(root: TreeNode | null, k: number): number {
  // In Binary Tree the left element is always smaller than right one. So we
  // have to iterate preorder (left item first)
  const results: number[] = [];

  (function dfs(item: TreeNode | null) {
    if (!item) return;

    const { left, right, val } = item;

    if (left) dfs(left);

    results.push(val);
    if (results.length == k) return;
    if (right) dfs(right);
  })(root);

  return results[k - 1];
}

export function kthSmallestStack(root: TreeNode | null, k: number): number {
  const stack: TreeNode[] = [];
  let current: TreeNode | null = root;
  let count = 0;

  while (stack.length || current) {
    while (current) {
      stack.push(current);
      current = current.left;
    }

    const node = stack.pop()!;
    count++;

    if (count === k) return node.val;
    current = node.right; 
  }

  return -1;
}
