/**
 * Maximum Depth of Binary Tree — see README.md next to this file.
 */
import type { TreeNode } from '@/shared/structures/tree-node.ts';

/**
 * Bottom-up: each call returns the height of its subtree, the parent combines them.
 * TODO: describe the approach and its complexity.
 */
export function maxDepth(root: TreeNode | null): number {
  throw new Error('maxDepth: not implemented');
}

/**
 * Top-down: the current depth is passed down as an argument, leaves report it.
 * TODO: describe the approach and its complexity.
 */
export function maxDepthTopDown(root: TreeNode | null): number {
  throw new Error('maxDepthTopDown: not implemented');
}

/**
 * Iterative, level by level (BFS) — no recursion.
 * TODO: describe the approach and its complexity.
 */
export function maxDepthBfs(root: TreeNode | null): number {
  throw new Error('maxDepthBfs: not implemented');
}
