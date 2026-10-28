# Binary Tree Level Order Traversal

Source: [LeetCode 102](https://leetcode.com/problems/binary-tree-level-order-traversal/) · Difficulty: medium · Tags: binary tree

## Problem

Given the root of a binary tree (`TreeNode | null`), return its node values **level by
level**: an array with one inner array per depth, from the root's level down, each inner
array listing that level's values **left to right**. An empty tree (`null`) gives `[]`.

Solve it two ways, both with the signature `(root: TreeNode | null) => number[][]`:

- `levelOrder` — BFS with a level snapshot, **without `Array.prototype.shift()`**.
- `levelOrderDfs` — bonus: DFS that appends each value to `res[depth]`.

Trees in the tests are written as LeetCode level-order arrays (`null` = missing child).

### Examples

- `[3,9,20,null,null,15,7]` → `[[3],[9,20],[15,7]]`
- `[1]` → `[[1]]`
- `[]` → `[]` (empty tree)

### Constraints

- Number of nodes in `[0, 2000]`.
- `-1000 ≤ Node.val ≤ 1000`.
- Target: `O(n)` time; `O(w)` queue space (`w` = max level width) besides the `O(n)` output.

## Approaches

| Approach | Time | Space | Note |
| -------- | ---- | ----- | ---- |
| BFS      | TODO | TODO  |      |
| DFS      | TODO | TODO  |      |

## Key idea

TODO — the one sentence you would need to hear to solve this again in six months.

## Traps

- Empty tree returns `[]`, not `[[]]`.
- A level is ordered by position in the tree, not by value, and may span several parents
  with gaps between them.
- A node with one child: the missing side must not add an empty level or a `null` value.
- A 2000-node chain means 2000 levels, and 2000 nested calls for a recursive solution.
- `shift()` is `O(n)` per call on a JS array — the target forbids it.

## Follow-ups

- TODO
